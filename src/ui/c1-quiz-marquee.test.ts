import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { advanceMarqueePosition } from './c1-quiz-marquee'

describe('testimonial marquee position', () => {
	test('accumulates sub-pixel movement across animation frames', () => {
		let position = 0
		for (let frame = 0; frame < 5; frame += 1) {
			position = advanceMarqueePosition(position, 16, 4000)
		}
		assert.ok(position > 1)
	})

	test('loops seamlessly after the duplicated sequence', () => {
		const position = advanceMarqueePosition(999.9, 16, 1000)
		assert.ok(position >= 0 && position < 1)
	})
})
