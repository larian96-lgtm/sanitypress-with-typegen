import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { choiceQuestions } from './questions'

describe('matching-engine questions', () => {
	test('provides an original distinct silhouette for every state and territory', () => {
		const options = choiceQuestions.state?.options ?? []
		const paths = options.map((option) => option.statePath)

		assert.equal(options.length, 8)
		assert.ok(paths.every(Boolean))
		assert.equal(new Set(paths).size, options.length)
	})

	test('keeps living situation, tax debt and state qualification questions', () => {
		assert.ok(choiceQuestions.living_situation)
		assert.ok(choiceQuestions.tax_debt)
		assert.ok(choiceQuestions.state)
	})

	test('supports pre-revenue and early-stage businesses without free text', () => {
		assert.deepEqual(
			choiceQuestions.monthly_revenue?.options.map((option) => option.value),
			['pre_revenue', 'under_10000', '10000_25000', '25000_50000', '50000_100000', '100000_250000', 'over_250000'],
		)
		assert.deepEqual(
			choiceQuestions.trading_history?.options.map((option) => option.value),
			['not_trading', 'under_six_months', 'six_to_twelve_months', 'one_to_two_years', 'two_plus_years'],
		)
	})

	test('removes the broker fact-find questions from the lead funnel', () => {
		const questions = choiceQuestions as Record<string, unknown>
		assert.equal(questions.timing, undefined)
		assert.equal(questions.vehicle_found, undefined)
		assert.equal(questions.equipment_found, undefined)
		assert.equal(questions.asset_purchase_source, undefined)
		assert.equal(questions.finance_full_purchase, undefined)
		assert.equal(questions.loan_term, undefined)
		assert.equal(questions.gst_registered, undefined)
	})
})
