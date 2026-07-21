import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { buildJourney, getNextStepId, getProgress } from './model'

describe('matching-engine branching', () => {
	test('routes asset purposes into their relevant detail questions', () => {
		assert.equal(getNextStepId('timing', { purpose: 'new_vehicle' }), 'vehicle_type')
		assert.equal(getNextStepId('timing', { purpose: 'new_equipment' }), 'equipment_type')
		assert.equal(getNextStepId('timing', { purpose: 'cashflow' }), 'amount')
	})

	test('builds only the active vehicle and tax-debt branch', () => {
		const journey = buildJourney({ purpose: 'new_vehicle', vehicle_found: 'yes', tax_debt: 'yes' })

		assert.ok(journey.includes('vehicle_type'))
		assert.ok(journey.includes('asset_purchase_source'))
		assert.ok(journey.includes('tax_debt_amount'))
		assert.ok(!journey.includes('equipment_type'))
	})

	test('calculates progress from the active branch', () => {
		const answers = { purpose: 'cashflow', tax_debt: 'no' }
		const journey = buildJourney(answers)
		assert.equal(getProgress('purpose', answers), Math.round(100 / journey.length))
		assert.equal(getProgress('consent', answers), 100)
	})
})
