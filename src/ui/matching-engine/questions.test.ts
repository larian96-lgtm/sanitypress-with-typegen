import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { choiceQuestions } from './questions'

describe('matching-engine state choices', () => {
	test('provides an original distinct silhouette for every state and territory', () => {
		const options = choiceQuestions.state?.options ?? []
		const paths = options.map((option) => option.statePath)

		assert.equal(options.length, 8)
		assert.ok(paths.every(Boolean))
		assert.equal(new Set(paths).size, options.length)
	})
})
