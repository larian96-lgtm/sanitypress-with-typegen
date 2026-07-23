import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { before, describe, test } from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
require.extensions['.css'] = (module) => {
	const classes = new Proxy({}, { get: (_target, property) => String(property) })
	module.exports = { __esModule: true, default: classes }
}

let html = ''

before(async () => {
	const { default: C1QuotePage } = await import('./c1-quote-page')
	html = renderToStaticMarkup(<C1QuotePage />)
})

describe('Comparison One paid-traffic quiz page', () => {
	test('puts the lender-fit proposition and first question above the form', () => {
		assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
		assert.match(html, /Compare 50\+ Business Lenders/)
		assert.match(html, /The Top-Rated Lender May Not Fit Your Business/)
		assert.match(html, /Get a broker with years of experience on your side to compare options, help prepare your application and work to move it forward\./)
		assert.match(html, /Start Your Funding Fit Check/)
		assert.match(html, /What is the purpose of this loan\?/)
		assert.match(html, />Continue</)
		assert.doesNotMatch(html, /Answer a few quick questions/)
		assert.doesNotMatch(html, /24-hour approval/)
	})

	test('explains broker value, common uses, the process and likely eligibility', () => {
		assert.match(html, /More Than A List Of Lenders/)
		assert.match(html, /What Are You Looking To Fund\?/)
		assert.match(html, /A gap while waiting for invoices/)
		assert.match(html, /lg:grid-cols-7/)
		assert.match(html, /What Happens Next\?/)
		assert.match(html, /Who May Be Eligible\?/)
		assert.match(html, /Approved businesses may be able to access funding within 24 hours\./)
		assert.match(html, /Find A Funding Path That Fits Your Business/)
		assert.match(html, /Check My Funding Options/)
	})

	test('shows a compact twelve-lender panel with the required lenders', () => {
		assert.equal((html.match(/data-lender-logo=/g) ?? []).length, 12)
		for (const lender of ['Prospa', 'Lumi', 'Moneytech', 'Bizcap']) {
			assert.match(html, new RegExp(`alt="${lender}"`))
		}
		assert.match(html, /Options Across 50\+ Business Lenders/)
		assert.match(html, /Not every lender or product will be available to every applicant\./)
	})

	test('auto-scrolls customer reviews without visible Money.com.au partnership copy', () => {
		assert.match(html, /data-autoscroll="slow"/)
		assert.match(html, /Customer reviews/)
		assert.doesNotMatch(html, /Money\.com\.au/)
		assert.doesNotMatch(html, /partner pathway/i)
	})
})
