import type { C1PageData } from '@/lib/c1-pages'
import type { C1LenderRateRow } from '@/lib/c1-rate-table'
import {
	C1_AUTHOR_ID,
	C1_ORGANIZATION_ID,
	C1_WEBSITE_ID,
	buildC1AuthorSchema,
	buildC1FaqSchema,
	buildC1OrganizationSchema,
	c1CanonicalUrl,
} from '@/lib/c1-seo'

function asTitle(part: string) {
	return part
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

function rateLabel(row: C1LenderRateRow) {
	return typeof row.rateTo === 'number' && row.rateTo > row.rateFrom
		? `${row.rateFrom.toFixed(2)}% - ${row.rateTo.toFixed(2)}%`
		: `${row.rateFrom.toFixed(2)}%`
}

export function buildC1StructuredData(page: C1PageData, rateRows: C1LenderRateRow[] = []) {
	const url = c1CanonicalUrl(page.path)
	const baseUrl = c1CanonicalUrl('/')
	const breadcrumbs = page.path.split('/').filter(Boolean)
	const breadcrumbItems = [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
		...breadcrumbs.map((part, index) => ({
			'@type': 'ListItem',
			position: index + 2,
			name: asTitle(part),
			item: `${baseUrl}/${breadcrumbs.slice(0, index + 1).join('/')}`,
		})),
	]

	const financialProducts = rateRows.map((row) => ({
		'@type': 'FinancialProduct',
		name: `${row.lenderName} ${row.productName}`,
		brand: { '@type': 'Brand', name: row.lenderName },
		category: row.productType,
		annualPercentageRate: rateLabel(row),
		offers: {
			'@type': 'Offer',
			priceCurrency: 'AUD',
			priceSpecification: {
				'@type': 'UnitPriceSpecification',
				price: row.rateFrom.toFixed(2),
				priceCurrency: 'AUD',
				unitCode: 'P1',
			},
		},
		feesAndCommissionsSpecification:
			'Rates shown are advertised starting rates. Lender fees and assessment criteria apply.',
	}))

	const faqSchema = buildC1FaqSchema(page.faqs, url)

	return {
		'@context': 'https://schema.org',
		'@graph': [
			buildC1OrganizationSchema(),
			buildC1AuthorSchema(),
			{
				'@type': page.type === 'lender' || page.type === 'blog' ? 'Article' : 'WebPage',
				'@id': `${url}#webpage`,
				url,
				name: page.seoTitle || page.title,
				headline: page.headline,
				description: page.seoDescription || page.summary,
				dateModified: page.lastReviewed,
				isPartOf: { '@id': C1_WEBSITE_ID },
				isAccessibleForFree: true,
				author: { '@id': C1_AUTHOR_ID },
				publisher: { '@id': C1_ORGANIZATION_ID },
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumbs`,
				itemListElement: breadcrumbItems,
			},
			...(faqSchema ? [faqSchema] : []),
			...(financialProducts.length
				? [
						{
							'@type': 'ItemList',
							'@id': `${url}#rate-comparison`,
							name: 'Business loan rate comparison',
							itemListElement: financialProducts.map((item, index) => ({
								'@type': 'ListItem',
								position: index + 1,
								item,
							})),
						},
					]
				: []),
		],
	}
}
