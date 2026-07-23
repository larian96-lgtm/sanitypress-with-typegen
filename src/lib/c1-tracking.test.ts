import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import {
	C1_PURCHASE_EVENT,
	C1_QUALIFIED_LEAD_EVENT,
	isQualifiedBusinessFinanceLead,
	pushQualifiedBusinessFinanceLead,
} from './c1-tracking'

describe('qualified lead tracking', () => {
	test('qualifies the $10,000+ revenue band with 1–2 years trading', () => {
		assert.equal(
			isQualifiedBusinessFinanceLead({
				monthly_revenue: '10000_25000',
				trading_history: 'one_to_two_years',
			}),
			true,
		)
	})

	test('qualifies higher revenue with more than two years trading', () => {
		assert.equal(
			isQualifiedBusinessFinanceLead({
				monthly_revenue: 'over_250000',
				trading_history: 'two_to_five_years',
			}),
			true,
		)
	})

	test('does not qualify below $10,000 or below one year trading', () => {
		assert.equal(
			isQualifiedBusinessFinanceLead({
				monthly_revenue: 'under_10000',
				trading_history: 'two_to_five_years',
			}),
			false,
		)
		assert.equal(
			isQualifiedBusinessFinanceLead({
				monthly_revenue: '10000_25000',
				trading_history: 'under_12_months',
			}),
			false,
		)
	})

	test('uses separate GTM and purchase event names', () => {
		assert.equal(C1_QUALIFIED_LEAD_EVENT, 'c1_qualified_business_finance_lead')
		assert.equal(C1_PURCHASE_EVENT, 'purchase')
	})

	test('pushes both events without contact details', () => {
		const testWindow = { dataLayer: [] as Record<string, unknown>[] }
		Object.defineProperty(globalThis, 'window', {
			configurable: true,
			value: testWindow,
		})

		try {
			pushQualifiedBusinessFinanceLead(
				{
					purpose: 'cashflow',
					monthly_revenue: '10000_25000',
					trading_history: 'one_to_two_years',
					email: 'should-not-be-sent@example.com',
				},
				'submission-123',
			)

			assert.deepEqual(testWindow.dataLayer.map((event) => event.event), [
				C1_QUALIFIED_LEAD_EVENT,
				C1_PURCHASE_EVENT,
			])
			assert.equal(testWindow.dataLayer[0].meta_pixel_event, 'Purchase')
			assert.equal('email' in testWindow.dataLayer[0], false)
		} finally {
			delete (globalThis as { window?: unknown }).window
		}
	})
})
