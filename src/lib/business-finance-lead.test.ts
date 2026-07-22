import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { validateLeadPayload } from './business-finance-lead'

const validPayload = {
	answers: {
		purpose: 'cashflow',
		amount: '75000',
		monthly_revenue: '50000_100000',
		trading_history: 'two_plus_years',
		living_situation: 'homeowner',
		tax_debt: 'no',
		state: 'NSW',
		full_name: 'Sam Taylor',
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

	test('removes obsolete fact-find fields from the broker payload', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: {
				...validPayload.answers,
				abn: '51824753556',
				business_name: 'Legacy Business',
				loan_term: 'three_to_five_years',
				gst_registered: 'yes',
			},
		})

		assert.equal(result.ok, true)
		if (result.ok) {
			assert.equal(result.value.answers.abn, undefined)
			assert.equal(result.value.answers.business_name, undefined)
			assert.equal(result.value.answers.loan_term, undefined)
			assert.equal(result.value.answers.gst_registered, undefined)
		}
	})

	test('accepts a vehicle lead with only the vehicle type added', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, purpose: 'new_vehicle', vehicle_type: 'ute_or_van' },
		})

		assert.equal(result.ok, true)
	})

	test('rejects a vehicle lead without a vehicle type', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, purpose: 'new_vehicle' },
		})

		assert.equal(result.ok, false)
		if (!result.ok) assert.equal(result.errors.vehicle_type, 'Select a vehicle type')
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
