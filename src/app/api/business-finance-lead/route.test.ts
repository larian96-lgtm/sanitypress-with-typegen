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

	test('delivers the full validated lead only to the Integrately webhook', async () => {
		mutableEnv.NODE_ENV = 'production'
		process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL = 'https://webhooks.example.test/c1-leads'
		delete process.env.MONEY_API_CLIENT_ID
		delete process.env.MONEY_API_CLIENT_SECRET
		delete process.env.BUSINESS_FINANCE_LEAD_SHEET_WEBHOOK_URL
		delete process.env.BUSINESS_FINANCE_LEAD_SHEET_WEBHOOK_SECRET

		const calls: Array<{ url: string; init?: RequestInit }> = []
		globalThis.fetch = async (input, init) => {
			calls.push({ url: String(input), init })
			return Response.json({ received: true }, { status: 200 })
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json', 'x-idempotency-key': 'submission_webhook_only' },
				body: JSON.stringify(completeLead),
			}),
		)
		const body = await response.json()

		assert.equal(response.status, 200)
		assert.deepEqual(body, {
			ok: true,
			submissionId: 'submission_webhook_only',
			deliveries: [{ destination: 'integrately-webhook', status: 200 }],
		})
		assert.equal(calls.length, 1)
		assert.equal(calls[0].url, 'https://webhooks.example.test/c1-leads')
		assert.equal(calls[0].init?.method, 'POST')
		const webhookHeaders = new Headers(calls[0].init?.headers)
		assert.equal(webhookHeaders.get('content-type'), 'application/json')
		assert.equal(webhookHeaders.get('x-idempotency-key'), 'submission_webhook_only')

		const webhookBody = JSON.parse(String(calls[0].init?.body))
		assert.equal(webhookBody.submission_id, 'submission_webhook_only')
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
	})

	test('returns a safe 503 when the Integrately webhook rejects the lead', async () => {
		mutableEnv.NODE_ENV = 'production'
		process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL = 'https://webhooks.example.test/c1-leads'

		globalThis.fetch = async () => Response.json({ error: 'internal destination detail' }, { status: 500 })

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
