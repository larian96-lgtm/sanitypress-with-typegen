import assert from 'node:assert/strict'
import { afterEach, describe, test } from 'node:test'

import { POST } from './route'

const completeLead = {
	answers: {
		purpose: 'cashflow',
		timing: 'within_week',
		amount: '75000',
		loan_term: 'three_years',
		trading_history: 'two_plus_years',
		monthly_revenue: '50000_100000',
		living_situation: 'homeowner',
		gst_registered: 'yes',
		tax_debt: 'no',
		state: 'NSW',
		business_name: 'Taylor Fabrication',
		abn: '51824753556',
		first_name: 'Sam',
		last_name: 'Taylor',
		email: 'sam@example.com',
		phone: '0412 345 678',
		consent: 'yes',
	},
	attribution: {
		landingPageUrl: 'https://comparisonone.com.au/business-loans/matching-engine',
	},
}

const originalFetch = globalThis.fetch
const mutableEnv = process.env as Record<string, string | undefined>
const originalHandlerUrl = mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_URL
const originalHandlerSecret = mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_SECRET
const originalNodeEnv = mutableEnv.NODE_ENV

afterEach(() => {
	globalThis.fetch = originalFetch
	if (originalHandlerUrl === undefined) delete mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_URL
	else mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_URL = originalHandlerUrl
	if (originalHandlerSecret === undefined) delete mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_SECRET
	else mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_SECRET = originalHandlerSecret
	if (originalNodeEnv === undefined) delete mutableEnv.NODE_ENV
	else mutableEnv.NODE_ENV = originalNodeEnv
})

describe('business finance lead API route', () => {
	test('rejects malformed leads before calling the connector', async () => {
		let fetchCalled = false
		globalThis.fetch = async () => {
			fetchCalled = true
			return new Response()
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ consent: false }),
			}),
		)

		assert.equal(response.status, 422)
		assert.equal(fetchCalled, false)
	})

	test('fails closed in production when no connector is configured', async () => {
		mutableEnv.NODE_ENV = 'production'
		delete mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_URL
		delete mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_SECRET

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(completeLead),
			}),
		)

		assert.equal(response.status, 503)
	})

	test('constrains connector requests and never returns the connector credential', async () => {
		mutableEnv.NODE_ENV = 'production'
		mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_URL = 'https://connector.example.test/leads'
		mutableEnv.BUSINESS_FINANCE_LEAD_HANDLER_SECRET = 'server-only-secret'
		let capturedInput: RequestInfo | URL | undefined
		let capturedInit: RequestInit | undefined
		globalThis.fetch = async (input, init) => {
			capturedInput = input
			capturedInit = init
			return Response.json({ leadId: 'lead-123' })
		}

		const response = await POST(
			new Request('http://localhost/api/business-finance-lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(completeLead),
			}),
		)
		const body = await response.json()

		assert.equal(response.status, 200)
		assert.match(body.submissionId, /^[a-f0-9-]{36}$/)
		assert.doesNotMatch(JSON.stringify(body), /server-only-secret/)
		assert.equal(capturedInput, 'https://connector.example.test/leads')
		assert.equal(capturedInit?.method, 'POST')
		assert.equal(capturedInit?.cache, 'no-store')
		assert.equal(capturedInit?.redirect, 'error')
		assert.ok(capturedInit?.signal instanceof AbortSignal)
		assert.equal(new Headers(capturedInit?.headers).get('authorization'), 'Bearer server-only-secret')
		assert.equal(new Headers(capturedInit?.headers).get('idempotency-key'), body.submissionId)
	})
})
