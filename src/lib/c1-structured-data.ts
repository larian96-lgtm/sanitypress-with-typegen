import type { C1PageData } from '@/lib/c1-pages'
import type { C1LenderRateRow } from '@/lib/c1-rate-table'

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
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://comparison-one-sanitypress.vercel.app'
	const url = `${baseUrl}${page.path}`
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

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': page.type === 'lender' ? 'Article' : 'WebPage',
				'@id': `${url}#webpage`,
				url,
				name: page.seoTitle || page.title,
				headline: page.headline,
				description: page.seoDescription || page.summary,
				dateModified: page.lastReviewed,
				isAccessibleForFree: true,
				author: { '@type': 'Organization', name: 'Comparison One SME Finance Editorial Team' },
				publisher: { '@type': 'Organization', name: 'Comparison One' },
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumbs`,
				itemListElement: breadcrumbItems,
			},
			...(page.faqs?.length
				? [
						{
							'@type': 'FAQPage',
							'@id': `${url}#faq`,
							mainEntity: page.faqs.map((faq) => ({
								'@type': 'Question',
								name: faq.question,
								acceptedAnswer: { '@type': 'Answer', text: faq.answer },
							})),
						},
					]
				: []),
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
