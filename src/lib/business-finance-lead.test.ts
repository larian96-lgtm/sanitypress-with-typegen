import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { validateLeadPayload } from './business-finance-lead'

const validPayload = {
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
		phone: '0412345678',
	},
	attribution: {
		landingPageUrl: 'https://comparisonone.com.au/business-loans/matching-engine',
		utmSource: 'meta',
	},
}

describe('business finance lead validation', () => {
	test('records form submission as consent without requiring a checkbox value', () => {
		const result = validateLeadPayload(validPayload)
		assert.equal(result.ok, true)
		if (result.ok) assert.equal(result.value.answers.consent, 'yes')
	})

	test('requires a business name on the final form', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, business_name: '' },
		})

		assert.equal(result.ok, false)
		if (!result.ok) assert.equal(result.errors.business_name, 'This field is required')
	})

	test('removes obsolete fact-find fields from the broker payload', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: {
				...validPayload.answers,
				abn: '51824753556',
				loan_term: 'three_to_five_years',
				gst_registered: 'yes',
			},
		})

		assert.equal(result.ok, true)
		if (result.ok) {
			assert.equal(result.value.answers.abn, undefined)
			assert.equal(result.value.answers.loan_term, undefined)
			assert.equal(result.value.answers.gst_registered, undefined)
		}
	})

	test('accepts a vehicle lead with vehicle type and source', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, purpose: 'new_vehicle', vehicle_type: 'ute_or_van', vehicle_source: 'used_from_dealer' },
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

	test('rejects a vehicle lead without a vehicle source', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, purpose: 'new_vehicle', vehicle_type: 'ute_or_van' },
		})

		assert.equal(result.ok, false)
		if (!result.ok) assert.equal(result.errors.vehicle_source, 'Select where you are buying the vehicle from')
	})

	test('rejects malformed contact details', () => {
		const result = validateLeadPayload({
			...validPayload,
			answers: { ...validPayload.answers, email: 'not-an-email', phone: '12' },
		})

		assert.equal(result.ok, false)
		if (!result.ok) {
			assert.equal(result.errors.email, 'Enter a valid email address')
			assert.equal(result.errors.phone, 'Enter a valid Australian phone number')
		}
	})
})
