import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import {
	PRIVACY_POLICY_URL,
	SUBMISSION_CONSENT_TEXT,
	TERMS_OF_USE_URL,
} from './consent-copy'

describe('matching-engine submission consent', () => {
	test('uses the requested automatic submission wording', () => {
		assert.equal(
			SUBMISSION_CONSENT_TEXT,
			'By submitting this form, you agree that Comparison One and its partners may contact you about business loan opportunities, as outlined in the Terms of Use and Privacy Policy. Approval is not guaranteed.',
		)
	})

	test('links to the supplied terms and privacy policies', () => {
		assert.equal(TERMS_OF_USE_URL, 'https://www.money.com.au/terms-of-use?target=_blank')
		assert.equal(PRIVACY_POLICY_URL, 'https://www.money.com.au/privacy-policy?target=_blank')
	})
})
