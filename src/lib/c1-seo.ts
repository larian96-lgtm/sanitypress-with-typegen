import type { Metadata } from 'next'

export const C1_CANONICAL_BASE_URL = 'https://comparison-one-sanitypress.vercel.app'
export const C1_SITE_NAME = 'Comparison One'
export const C1_ORGANIZATION_ID = `${C1_CANONICAL_BASE_URL}/#organization`
export const C1_WEBSITE_ID = `${C1_CANONICAL_BASE_URL}/#website`
export const C1_AUTHOR_ID = `${C1_CANONICAL_BASE_URL}/#sme-finance-editorial-team`

export type C1FaqLike = { question?: string | null; answer?: string | null }

export function normaliseC1Path(path?: string | null) {
	if (!path || path === 'index') return '/'
	const withSlash = path.startsWith('/') ? path : `/${path}`
	return withSlash === '/' ? '/' : withSlash.replace(/\/$/, '')
}

export function c1CanonicalUrl(path?: string | null) {
	const normalised = normaliseC1Path(path)
	return `${C1_CANONICAL_BASE_URL}${normalised === '/' ? '' : normalised}`
}

export function c1OgImageUrl(path?: string | null) {
	const normalised = normaliseC1Path(path)
	const slug = normalised === '/' ? 'index' : normalised.replace(/^\//, '')
	return `${C1_CANONICAL_BASE_URL}/api/og?slug=${encodeURIComponent(slug)}`
}

export function buildC1Metadata({
	path,
	title,
	description,
	type = 'website',
	noIndex = false,
}: {
	path: string
	title: string
	description: string
	type?: 'website' | 'article'
	noIndex?: boolean
}): Metadata {
	const url = c1CanonicalUrl(path)
	const image = c1OgImageUrl(path)

	return {
		metadataBase: new URL(C1_CANONICAL_BASE_URL),
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			siteName: C1_SITE_NAME,
			type,
			images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${C1_SITE_NAME}` }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
		robots: noIndex ? { index: false, follow: false } : undefined,
	}
}

export function buildC1OrganizationSchema() {
	return {
		'@type': 'Organization',
		'@id': C1_ORGANIZATION_ID,
		name: C1_SITE_NAME,
		url: C1_CANONICAL_BASE_URL,
		logo: `${C1_CANONICAL_BASE_URL}/comparisonone/logo.png?v=2`,
		description: 'Australian SME finance comparison resource focused on funding fit, lender criteria and document readiness.',
	}
}

export function buildC1AuthorSchema() {
	return {
		'@type': 'Person',
		'@id': C1_AUTHOR_ID,
		name: 'Comparison One SME Finance Editorial Team',
		jobTitle: 'SME finance editorial team',
		affiliation: { '@id': C1_ORGANIZATION_ID },
		description: 'Finance editors reviewing Australian SME funding pathways, lender criteria, document readiness and cash-flow use cases.',
	}
}

export function buildC1WebSiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': C1_WEBSITE_ID,
		url: C1_CANONICAL_BASE_URL,
		name: C1_SITE_NAME,
		publisher: { '@id': C1_ORGANIZATION_ID },
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${C1_CANONICAL_BASE_URL}/search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	}
}

export function buildC1FaqSchema(faqs: C1FaqLike[] | undefined, url: string) {
	const validFaqs = (faqs || []).filter((faq) => faq.question && faq.answer)
	if (!validFaqs.length) return null

	return {
		'@type': 'FAQPage',
		'@id': `${url}#faq`,
		mainEntity: validFaqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer },
		})),
	}
}

export function buildC1HomepageStructuredData(page: {
	heroHeadline?: string
	heroSubtitle?: string
	seoTitle?: string
	seoDescription?: string
	faqs?: C1FaqLike[]
}) {
	const url = c1CanonicalUrl('/')
	const faqSchema = buildC1FaqSchema(page.faqs, url)

	return {
		'@context': 'https://schema.org',
		'@graph': [
			buildC1OrganizationSchema(),
			buildC1AuthorSchema(),
			buildC1WebSiteSchema(),
			{
				'@type': 'WebPage',
				'@id': `${url}#webpage`,
				url,
				name: page.seoTitle || 'Avoid Applying Blind for Business Funding | Comparison One',
				headline: page.heroHeadline || 'Avoid applying blind for business funding',
				description: page.seoDescription || page.heroSubtitle,
				isPartOf: { '@id': C1_WEBSITE_ID },
				isAccessibleForFree: true,
				author: { '@id': C1_AUTHOR_ID },
				publisher: { '@id': C1_ORGANIZATION_ID },
			},
			...(faqSchema ? [faqSchema] : []),
		],
	}
}
