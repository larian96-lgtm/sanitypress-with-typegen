export type C1RateProductType =
	| 'secured'
	| 'unsecured'
	| 'lineOfCredit'
	| 'equipment'
	| 'invoice'
	| 'vehicle'
	| 'workingCapital'

export type C1SecurityType = 'secured' | 'unsecured' | 'asset-backed'

export interface C1LenderRateRow {
	id: string
	lenderSlug: string
	lenderName: string
	productName: string
	productType: C1RateProductType
	// Undefined when the lender does not publish a rate (shown as "Not published").
	rateFrom?: number
	rateTo?: number
	comparisonRate?: number
	minAmount: number
	maxAmount: number
	minTermMonths?: number
	maxTermMonths?: number
	fundingSpeed: string
	securityType: C1SecurityType
	updatedAt: string
	isActive: boolean
	bestFor?: string
}

export interface C1RateTableData {
	slug: string
	title: string
	updatedAt: string
	methodologyNote: string
	rows: C1LenderRateRow[]
}

export const c1FallbackRateTable: C1RateTableData = {
	slug: 'business-loans-rates',
	title: 'Compare business loan rates and lenders in Australia',
	updatedAt: '2026-10-20',
	methodologyNote:
		'Online lender rows (Moula, Prospa, OnDeck, Lumi, Bizcap, Banjo) checked against each lender\'s own website on 20 October 2026; BOQ, Liberty and Moneytech rates are from the Money.com.au lender panel as at 10 May 2026. Most online lenders do not publish rates and quote each business individually, so those show as "Not published". Your rate depends on lender assessment, security, turnover, time in business and credit profile.',
	rows: [
		{
			id: 'moula-unsecured',
			lenderSlug: 'moula',
			lenderName: 'Moula',
			productName: 'Moula Business Loan',
			productType: 'unsecured',
			rateFrom: 15.99,
			rateTo: 35.99,
			minAmount: 10000,
			maxAmount: 500000,
			maxTermMonths: 60,
			fundingSpeed: 'Within 24 hours of approval',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Unsecured loans with a published rate range',
		},
		{
			id: 'prospa-small-business-loan',
			lenderSlug: 'prospa',
			lenderName: 'Prospa',
			productName: 'Prospa Small Business Loan',
			productType: 'unsecured',
			minAmount: 5000,
			maxAmount: 500000,
			maxTermMonths: 60,
			fundingSpeed: 'Same day possible',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Newer businesses: 6 months trading, $6k monthly turnover',
		},
		{
			id: 'ondeck-lightning-loan',
			lenderSlug: 'ondeck',
			lenderName: 'OnDeck',
			productName: 'OnDeck Lightning Loan',
			productType: 'unsecured',
			minAmount: 10000,
			maxAmount: 300000,
			fundingSpeed: 'Same day',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Fully unsecured, decisions in minutes',
		},
		{
			id: 'lumi-business-loan',
			lenderSlug: 'lumi',
			lenderName: 'Lumi',
			productName: 'Lumi Business Loan',
			productType: 'unsecured',
			minAmount: 0,
			maxAmount: 1000000,
			maxTermMonths: 60,
			fundingSpeed: 'Same day',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Larger unsecured needs up to $1m',
		},
		{
			id: 'lumi-line-of-credit',
			lenderSlug: 'lumi',
			lenderName: 'Lumi',
			productName: 'Lumi Line of Credit',
			productType: 'lineOfCredit',
			minAmount: 0,
			maxAmount: 1000000,
			fundingSpeed: 'Same-day approval',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Ongoing cash-flow access, no early repayment fees',
		},
		{
			id: 'bizcap-fast-business-loan',
			lenderSlug: 'bizcap',
			lenderName: 'Bizcap',
			productName: 'Bizcap Fast Business Loan',
			productType: 'workingCapital',
			minAmount: 5000,
			maxAmount: 7500000,
			fundingSpeed: 'Same day',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Low entry bar: 4 months trading, $12k monthly revenue',
		},
		{
			id: 'banjo-business-loan-excel',
			lenderSlug: 'banjo-loans',
			lenderName: 'Banjo',
			productName: 'Banjo Business Loan Excel',
			productType: 'workingCapital',
			minAmount: 20000,
			maxAmount: 2000000,
			fundingSpeed: 'Fast decisions',
			securityType: 'unsecured',
			updatedAt: '2026-10-20',
			isActive: true,
			bestFor: 'Larger working capital loans up to $2m',
		},
		{
			id: 'boq-secured-loan',
			lenderSlug: 'boq',
			lenderName: 'BOQ',
			productName: 'BOQ Business Loan',
			productType: 'secured',
			rateFrom: 7.5,
			minAmount: 20000,
			maxAmount: 250000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '2-5 business days',
			securityType: 'secured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Established SMEs with strong financials',
		},
		{
			id: 'liberty-business-loan',
			lenderSlug: 'liberty',
			lenderName: 'Liberty',
			productName: 'Liberty Business Loan',
			productType: 'unsecured',
			rateFrom: 7.95,
			rateTo: 17.45,
			minAmount: 10000,
			maxAmount: 350000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '24-72 hours',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Flexible criteria and sole traders',
		},
		{
			id: 'moneytech-equipment',
			lenderSlug: 'moneytech',
			lenderName: 'Moneytech',
			productName: 'Moneytech Equipment & Asset Finance',
			productType: 'equipment',
			rateFrom: 7.99,
			rateTo: 9.56,
			minAmount: 25000,
			maxAmount: 2000000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '24-72 hours',
			securityType: 'asset-backed',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Higher-ticket equipment and vehicles',
		},
	],
}

const productTypesByPathFragment: Record<string, C1RateProductType[]> = {
	'working-capital': ['workingCapital'],
	'invoice-finance': ['invoice'],
	'equipment-finance': ['equipment', 'secured'],
	'unsecured-business-loans': ['unsecured'],
	'line-of-credit': ['lineOfCredit'],
	'vehicle-finance': ['vehicle', 'secured'],
	'trade-finance': ['workingCapital', 'lineOfCredit'],
	'tax-debt': ['workingCapital', 'unsecured'],
	'commercial-fitout': ['secured', 'workingCapital'],
	'knocked-back-by-bank': ['unsecured', 'workingCapital'],
}

export function inferDefaultProductTypes(path: string): C1RateProductType[] {
	if (path === '/business-loans') {
		return ['secured', 'unsecured', 'lineOfCredit', 'equipment', 'invoice', 'vehicle', 'workingCapital']
	}

	for (const [fragment, types] of Object.entries(productTypesByPathFragment)) {
		if (path.includes(fragment)) return types
	}

	if (path.startsWith('/lenders/')) {
		return ['secured', 'unsecured', 'lineOfCredit', 'equipment', 'invoice', 'vehicle', 'workingCapital']
	}

	if (path.startsWith('/compare/')) {
		if (path.includes('non-bank')) return ['unsecured', 'workingCapital', 'lineOfCredit']
		if (path.includes('equipment')) return ['equipment', 'secured']
		if (path.includes('invoice')) return ['invoice']
		return ['secured', 'unsecured', 'lineOfCredit', 'workingCapital']
	}

	return ['secured', 'unsecured', 'lineOfCredit', 'workingCapital']
}

export function inferPreferredLenderSlug(path: string): string | undefined {
	if (!path.startsWith('/lenders/')) return undefined
	return path.replace('/lenders/', '').trim() || undefined
}

export function shouldShowRateWidget(path: string): boolean {
	return path === '/business-loans' || path.startsWith('/business-loans/') || path.startsWith('/lenders/') || path.startsWith('/compare/')
}

export function shouldShowCalculator(path: string): boolean {
	return path.startsWith('/business-loans/') || path === '/business-loan-calculator'
}
