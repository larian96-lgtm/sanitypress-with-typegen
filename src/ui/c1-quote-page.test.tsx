import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { describe, test } from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
require.extensions['.css'] = (module) => {
	const classes = new Proxy({}, { get: (_target, property) => String(property) })
	module.exports = { __esModule: true, default: classes }
}

describe('Comparison One quiz landing page', () => {
	test('renders the approved quiz shell, partner proof and compact footer', async () => {
		const { default: C1QuotePage } = await import('./c1-quote-page')
		const html = renderToStaticMarkup(<C1QuotePage />)

		assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
		assert.match(html, /Get your Business Funding Fit Check in two minutes/)
		assert.match(html, /Our helpful and friendly broker will guide you through your application and help find the right fit from a panel of 50\+ lenders including:/)
		assert.match(html, /alt="Angle Finance"/)
		assert.match(html, /We look after clients&#x27; short and long-term goals/)
		assert.match(html, /Phil Collard, Commercial Finance Broker/)
		assert.match(html, /Don&#x27;t just take our word for it/)
		assert.match(html, /Customer reviews of the finance team behind our Money\.com\.au partner pathway/)
		assert.match(html, /Comparison One is not a lender/)
		assert.match(html, /Privacy Policy/)
		assert.doesNotMatch(html, /Funding Options Are Changing in 2026/)
		assert.doesNotMatch(html, /Phil Collard, Comparison One/)
	})
})
