import { afterEach, describe, test } from 'node:test'
import assert from 'node:assert/strict'

import { POST } from './route'

const completeLead = {
	answers: {
		purpose: 'cashflow',
		amount: '75000',
		monthly_revenue: '50000_100000',
		trading_history: 'two_to_five_years',
		living_situation: 'homeowner',
		tax_debt: 'no',
		state: 'NSW',
		business_name: 'Taylor Trade Co',
		full_name: 'Sam Taylor',
		email: 'sam@example.com',
		phone: '0412 345 678',
	},
	attribution: {
		landingPageUrl: 'https://comparisonone.com.au/quiz',
	},
}

const originalFetch = globalThis.fetch
const mutableEnv = process.env as Record<string, string | undefined>
const originalEnv = { ...process.env }

afterEach(() => {
	globalThis.fetch = originalFetch
	for (const key of Object.keys(process.env)) {
		if (!(key in originalEnv)) delete process.env[key]
	}
	for (const [key, value] of Object.entries(originalEnv)) process.env[key] = value
})

describe('business finance lead API route', () => {
	test('rejects malformed leads before calling either delivery', async () => {
		let fetchCalled = false
		globalThis.fetch = async () => {
			fetchCalled = true
			return new Response()
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ answers: { email: 'bad' } }),
			}),
		)

		assert.equal(response.status, 422)
		assert.equal(fetchCalled, false)
	})

	test('fails closed in production when the Integrately webhook is missing', async () => {
		mutableEnv.NODE_ENV = 'production'
		process.env.MONEY_API_CLIENT_ID = 'legacy-client-id'
		process.env.MONEY_API_CLIENT_SECRET = 'legacy-server-only-secret'
		delete process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL

		globalThis.fetch = async (input) => {
			const url = String(input)
			if (url.endsWith('/oauth/token')) return Response.json({ access_token: 'temporary-token' })
			return Response.json({ ok: true }, { status: 201 })
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(completeLead),
			}),
		)

		assert.equal(response.status, 503)
	})

	test('fails closed in production when Money API credentials are missing', async () => {
		mutableEnv.NODE_ENV = 'production'
		process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL = 'https://webhooks.example.test/c1-leads'
		delete process.env.MONEY_API_CLIENT_ID
		delete process.env.MONEY_API_CLIENT_SECRET
		let fetchCalled = false
		globalThis.fetch = async () => {
			fetchCalled = true
			return Response.json({ received: true })
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(completeLead),
			}),
		)

		assert.equal(response.status, 503)
		assert.equal(fetchCalled, false)
	})

	test('delivers the full validated lead to Money and the Integrately webhook', async () => {
		mutableEnv.NODE_ENV = 'production'
		process.env.MONEY_API_BASE_URL = 'https://api-staging.money.com.au'
		process.env.MONEY_API_CLIENT_ID = 'client-id'
		process.env.MONEY_API_CLIENT_SECRET = 'server-only-secret'
		process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL = 'https://webhooks.example.test/c1-leads'

		const calls: Array<{ url: string; init?: RequestInit }> = []
		globalThis.fetch = async (input, init) => {
			const url = String(input)
			calls.push({ url, init })
			if (url.endsWith('/oauth/token')) return Response.json({ access_token: 'temporary-token' })
			if (url.endsWith('/v1/funnels/business-auto')) return Response.json({ received: true }, { status: 201 })
			return Response.json({ received: true }, { status: 200 })
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json', 'x-idempotency-key': 'submission_dual_delivery' },
				body: JSON.stringify(completeLead),
			}),
		)
		const body = await response.json()

		assert.equal(response.status, 200)
		assert.deepEqual(body, {
			ok: true,
			submissionId: 'submission_dual_delivery',
			deliveries: [
				{ destination: 'money-business-auto', status: 201 },
				{ destination: 'integrately-webhook', status: 200 },
			],
		})
		assert.equal(calls.length, 3)

		const tokenCall = calls.find((call) => call.url.endsWith('/oauth/token'))!
		assert.equal(new URLSearchParams(String(tokenCall.init?.body)).get('client_id'), 'client-id')

		const moneyCall = calls.find((call) => call.url.endsWith('/v1/funnels/business-auto'))!
		const moneyHeaders = new Headers(moneyCall.init?.headers)
		assert.equal(moneyHeaders.get('authorization'), 'Bearer temporary-token')
		assert.equal(moneyHeaders.get('idempotency-key'), 'submission_dual_delivery')
		const moneyBody = JSON.parse(String(moneyCall.init?.body))
		assert.deepEqual(moneyBody, {
			first_name: 'Sam',
			last_name: 'Taylor',
			email: 'sam@example.com',
			phone_number: '0412 345 678',
			loan_amount: 75000,
			purpose: 'DAY_TO_DAY',
			organisation_name: 'Taylor Trade Co',
			months_in_business: 42,
			sales_monthly: 75000,
			vehicle_type: 'OTHER',
			vehicle_source: 'UNKNOWN',
		})

		const webhookCall = calls.find((call) => call.url === 'https://webhooks.example.test/c1-leads')!
		assert.equal(webhookCall.init?.method, 'POST')
		const webhookHeaders = new Headers(webhookCall.init?.headers)
		assert.equal(webhookHeaders.get('content-type'), 'application/json')
		assert.equal(webhookHeaders.get('x-idempotency-key'), 'submission_dual_delivery')

		const webhookBody = JSON.parse(String(webhookCall.init?.body))
		assert.equal(webhookBody.submission_id, 'submission_dual_delivery')
		assert.equal(webhookBody.source, 'comparison-one-matching-engine')
		assert.match(webhookBody.submitted_at, /^\d{4}-\d{2}-\d{2}T/)
		assert.equal(webhookBody.business_name, 'Taylor Trade Co')
		assert.equal(webhookBody.full_name, 'Sam Taylor')
		assert.equal(webhookBody.first_name, 'Sam')
		assert.equal(webhookBody.last_name, 'Taylor')
		assert.equal(webhookBody.email, 'sam@example.com')
		assert.equal(webhookBody.phone, '0412 345 678')
		assert.equal(webhookBody.purpose, 'cashflow')
		assert.equal(webhookBody.loan_amount, 75000)
		assert.equal(webhookBody.monthly_revenue_band, '50000_100000')
		assert.equal(webhookBody.trading_history_band, 'two_to_five_years')
		assert.equal(webhookBody.living_situation, 'homeowner')
		assert.equal(webhookBody.tax_debt, 'no')
		assert.equal(webhookBody.state, 'NSW')
		assert.equal(webhookBody.consent, true)
		assert.equal(webhookBody.landing_page_url, 'https://comparisonone.com.au/quiz')
		assert.equal(webhookBody.vehicle_type, null)
		assert.equal(webhookBody.vehicle_source, null)
		assert.equal(webhookBody.equipment_type, null)
		assert.doesNotMatch(JSON.stringify(body), /server-only-secret/)
	})

	test('returns a safe 503 when the Integrately webhook rejects the lead', async () => {
		mutableEnv.NODE_ENV = 'production'
		process.env.MONEY_API_BASE_URL = 'https://api-staging.money.com.au'
		process.env.MONEY_API_CLIENT_ID = 'client-id'
		process.env.MONEY_API_CLIENT_SECRET = 'server-only-secret'
		process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL = 'https://webhooks.example.test/c1-leads'

		globalThis.fetch = async (input) => {
			const url = String(input)
			if (url.endsWith('/oauth/token')) return Response.json({ access_token: 'temporary-token' })
			if (url.endsWith('/v1/funnels/business-auto')) return Response.json({ received: true }, { status: 201 })
			return Response.json({ error: 'internal destination detail' }, { status: 500 })
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json', 'x-idempotency-key': 'submission_rejected_123' },
				body: JSON.stringify(completeLead),
			}),
		)
		const body = await response.json()

		assert.equal(response.status, 503)
		assert.deepEqual(body, {
			ok: false,
			message: 'The secure submission service is temporarily unavailable.',
		})
		assert.doesNotMatch(JSON.stringify(body), /sam@example\.com|webhooks\.example|internal destination detail/)
	})
})
