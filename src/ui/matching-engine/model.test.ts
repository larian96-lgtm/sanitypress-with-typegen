import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { buildJourney, getNextStepId, getProgress } from './model'

describe('matching-engine branching', () => {
	test('routes asset purposes into one relevant type question', () => {
		assert.equal(getNextStepId('purpose', { purpose: 'new_vehicle' }), 'vehicle_type')
		assert.equal(getNextStepId('purpose', { purpose: 'new_equipment' }), 'equipment_type')
		assert.equal(getNextStepId('purpose', { purpose: 'cashflow' }), 'amount')
	})

	test('uses the streamlined general-business journey', () => {
		assert.deepEqual(buildJourney({ purpose: 'cashflow' }), [
			'purpose',
			'amount',
			'monthly_revenue',
			'trading_history',
			'living_situation',
			'tax_debt',
			'state',
			'contact',
		])
	})

	test('adds only the selected asset type question', () => {
		const journey = buildJourney({ purpose: 'new_vehicle', tax_debt: 'yes' })

		const steps = journey as string[]
		assert.ok(steps.includes('vehicle_type'))
		assert.ok(!steps.includes('equipment_type'))
		assert.ok(!steps.includes('vehicle_found'))
		assert.ok(!steps.includes('asset_purchase_source'))
		assert.ok(!steps.includes('tax_debt_amount'))
	})

	test('calculates progress from the active streamlined branch', () => {
		const answers = { purpose: 'cashflow', tax_debt: 'no' }
		const journey = buildJourney(answers)
		assert.equal(getProgress('purpose', answers), Math.round(100 / journey.length))
		assert.equal(getProgress('contact', answers), 100)
	})
})
