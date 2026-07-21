import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { validateLeadPayload } from './business-finance-lead'

const validPayload = {
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
		business_name: 'Example Plumbing Pty Ltd',
		abn: '51824753556',
		first_name: 'Sam',
		last_name: 'Taylor',
		email: 'sam@example.com',
		phone: '0412345678',
		consent: 'yes',
	},
	attribution: {
		landingPageUrl: 'https://comparisonone.com.au/business-loans/matching-engine',
		utmSource: 'meta',
	},
}

describe('business finance lead validation', () => {
	test('accepts a complete lead without altering the selected amount', () => {
		const result = validateLeadPayload(validPayload)
		assert.equal(result.ok, true)
		if (result.ok) assert.equal(result.value.answers.amount, '75000')
	})

	test('rejects missing consent and malformed contact details', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, consent: 'no', email: 'not-an-email', phone: '12' },
		})

		assert.equal(result.ok, false)
		if (!result.ok) {
			assert.equal(result.errors.consent, 'Consent is required')
			assert.equal(result.errors.email, 'Enter a valid email address')
			assert.equal(result.errors.phone, 'Enter a valid Australian phone number')
		}
	})
})
