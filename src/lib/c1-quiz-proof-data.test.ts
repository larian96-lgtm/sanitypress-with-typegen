import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { quizTestimonials } from './c1-quiz-proof-data'

describe('quiz testimonial source integrity', () => {
	test('keeps the selected review copy verbatim', () => {
		assert.equal(quizTestimonials.length, 12)
		assert.equal(
			quizTestimonials[0]?.quote,
			'The representative who assisted me whose name was Joseph was an absolute professional and pleasure to deal with. Will be recommending to future colleagues',
		)
		assert.equal(
			quizTestimonials[8]?.quote,
			'I worked with Fi Ahlstrom, and she was phenomenal in assisting us with securing a $50k loan for our small business at a competitive interest rate. Her support, professionalism, and clear communication made the entire process smooth and efficient.',
		)
	})

	test('excludes reviews that name another brand or make a 24-hour outcome claim', () => {
		const renderedReviewCopy = quizTestimonials.map((review) => review.quote).join(' ')
		assert.doesNotMatch(renderedReviewCopy, /Money\.com\.au/i)
		assert.doesNotMatch(renderedReviewCopy, /24\s*(?:hours?|hrs?)/i)
	})
})
