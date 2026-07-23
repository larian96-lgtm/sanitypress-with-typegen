import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, test } from 'node:test'

import { choiceQuestions } from './questions'

describe('matching-engine questions', () => {
	test('orders state choices like the supplied reference grid', () => {
		assert.deepEqual(
			choiceQuestions.state?.options.map((option) => option.value),
			['NSW', 'VIC', 'QLD', 'SA', 'WA', 'NT', 'ACT', 'TAS'],
		)
	})

	test('uses the supplied state silhouette slices', () => {
		const options = choiceQuestions.state?.options ?? []
		const images = options.map((option) => (option as { stateImage?: string }).stateImage)

		assert.equal(options.length, 8)
		assert.ok(images.every(Boolean))
		assert.equal(new Set(images).size, options.length)
		assert.ok(images.every((image) => existsSync(join(process.cwd(), 'public', image!.replace(/^\//, '')))))
	})

	test('keeps living situation, tax debt and state qualification questions', () => {
		assert.ok(choiceQuestions.living_situation)
		assert.ok(choiceQuestions.tax_debt)
		assert.ok(choiceQuestions.state)
	})

	test('starts monthly revenue options at under ten thousand dollars', () => {
		assert.deepEqual(
			choiceQuestions.monthly_revenue?.options.map((option) => option.value),
			['under_10000', '10000_25000', '25000_50000', '50000_100000', '100000_250000', 'over_250000'],
		)
	})

	test('uses the requested trading-history bands', () => {
		assert.deepEqual(
			choiceQuestions.trading_history?.options.map((option) => option.value),
			['under_12_months', 'one_to_two_years', 'two_to_five_years', 'five_plus_years'],
		)
	})

	test('adds the API vehicle-source question', () => {
		assert.deepEqual(
			choiceQuestions.vehicle_source?.options.map((option) => option.value),
			['used_from_dealer', 'private_sale', 'unknown'],
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
