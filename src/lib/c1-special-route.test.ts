import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { getC1SpecialRoute } from './c1-special-route'

describe('Comparison One special route resolution', () => {
	test('keeps the old quiz shell while replacing its iframe with the native engine', () => {
		assert.equal(getC1SpecialRoute('/quiz'), 'quote')
		assert.equal(getC1SpecialRoute('/funding-fit-check'), 'quote')
		assert.equal(getC1SpecialRoute('/business-loans/matching-engine'), 'matching-engine')
		assert.equal(getC1SpecialRoute('/thanks'), 'thanks')
	})

	test('returns null for normal content routes', () => {
		assert.equal(getC1SpecialRoute('/business-loans'), null)
	})
})
