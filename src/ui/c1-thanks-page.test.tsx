import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import C1ThanksPage from './c1-thanks-page'

const router = {
	back() {},
	forward() {},
	refresh() {},
	hmrRefresh() {},
	push() {},
	replace() {},
	prefetch() {},
}

describe('Comparison One post-submit page', () => {
	test('renders the site shell and the complete lender-assessment article', () => {
		const html = renderToStaticMarkup(
			<AppRouterContext.Provider value={router}>
				<C1ThanksPage />
			</AppRouterContext.Provider>,
		)

		assert.match(html, /Thanks for your application/)
		assert.match(html, /One of our brokers will be in touch very soon/)
		assert.doesNotMatch(html, />How business lenders assess applications<\/h2>/)
		assert.match(html, /aria-label="Primary navigation"/)
		assert.match(html, /href="\/business-loans"/)
		assert.match(html, /How Business Lenders Assess Applications/)
		assert.match(html, /How lenders may assess the application/)
		assert.match(html, /Frequently asked questions/)
		assert.match(html, /<footer/)
		assert.match(html, /Privacy Policy/)
	})
})
