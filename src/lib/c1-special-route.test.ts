import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { getC1SpecialRoute } from './c1-special-route'

describe('Comparison One special route resolution', () => {
	test('keeps legacy quote routes separate from the native matching engine', () => {
		assert.equal(getC1SpecialRoute('/quiz'), 'quote')
		assert.equal(getC1SpecialRoute('/funding-fit-check'), 'quote')
		assert.equal(getC1SpecialRoute('/business-loans/matching-engine'), 'matching-engine')
	})

	test('returns null for normal content routes', () => {
		assert.equal(getC1SpecialRoute('/business-loans'), null)
	})
})
