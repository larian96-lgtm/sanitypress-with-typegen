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
	rateFrom: number
	rateTo?: number
	comparisonRate?: number
	minAmount: number
	maxAmount: number
	minTermMonths: number
	maxTermMonths: number
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
	updatedAt: '2026-05-10',
	methodologyNote:
		'Rates shown are publicly advertised starting rates and ranges where available. Your actual rate depends on lender assessment, security, turnover, time in business, credit profile and loan structure. Updated 10 May 2026.',
	rows: [
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
		{
			id: 'prospa-unsecured',
			lenderSlug: 'prospa',
			lenderName: 'Prospa',
			productName: 'Prospa Business Loan',
			productType: 'unsecured',
			rateFrom: 13.9,
			minAmount: 5000,
			maxAmount: 500000,
			minTermMonths: 3,
			maxTermMonths: 36,
			fundingSpeed: 'Within 24 hours',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Fast unsecured working-capital access',
		},
		{
			id: 'moula-working-capital',
			lenderSlug: 'moula',
			lenderName: 'Moula',
			productName: 'Moula Business Loan',
			productType: 'workingCapital',
			rateFrom: 15.8,
			minAmount: 5000,
			maxAmount: 250000,
			minTermMonths: 3,
			maxTermMonths: 24,
			fundingSpeed: 'Same day possible',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Short-term cash-flow funding',
		},
		{
			id: 'ondeck-unsecured',
			lenderSlug: 'ondeck',
			lenderName: 'OnDeck',
			productName: 'OnDeck Business Loan',
			productType: 'unsecured',
			rateFrom: 15.0,
			minAmount: 10000,
			maxAmount: 250000,
			minTermMonths: 6,
			maxTermMonths: 36,
			fundingSpeed: '24-48 hours',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Fast online unsecured lending',
		},
		{
			id: 'judo-secured',
			lenderSlug: 'judo-bank',
			lenderName: 'Judo Bank',
			productName: 'Judo Business Loan',
			productType: 'secured',
			rateFrom: 8.5,
			rateTo: 13.95,
			minAmount: 100000,
			maxAmount: 3000000,
			minTermMonths: 12,
			maxTermMonths: 120,
			fundingSpeed: '3-10 business days',
			securityType: 'secured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Larger SME growth and acquisition loans',
		},
		{
			id: 'scotpac-invoice',
			lenderSlug: 'scotpac',
			lenderName: 'ScotPac',
			productName: 'ScotPac Invoice Finance',
			productType: 'invoice',
			rateFrom: 2.5,
			rateTo: 5.5,
			minAmount: 20000,
			maxAmount: 5000000,
			minTermMonths: 3,
			maxTermMonths: 24,
			fundingSpeed: '24-72 hours',
			securityType: 'asset-backed',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'B2B receivables and invoice-led cash flow',
		},
		{
			id: 'banjo-working-capital',
			lenderSlug: 'banjo',
			lenderName: 'Banjo',
			productName: 'Banjo Business Finance',
			productType: 'workingCapital',
			rateFrom: 14.2,
			minAmount: 20000,
			maxAmount: 500000,
			minTermMonths: 3,
			maxTermMonths: 36,
			fundingSpeed: '1-2 business days',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Growing SMEs needing flexible capital',
		},
		{
			id: 'capify-working-capital',
			lenderSlug: 'capify',
			lenderName: 'Capify',
			productName: 'Capify Business Loan',
			productType: 'workingCapital',
			rateFrom: 16.5,
			minAmount: 5000,
			maxAmount: 300000,
			minTermMonths: 3,
			maxTermMonths: 24,
			fundingSpeed: 'Within 24 hours',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Short-term revenue-linked funding',
		},
		{
			id: 'lumi-line-of-credit',
			lenderSlug: 'lumi',
			lenderName: 'Lumi',
			productName: 'Lumi Line of Credit',
			productType: 'lineOfCredit',
			rateFrom: 14.55,
			minAmount: 10000,
			maxAmount: 750000,
			minTermMonths: 6,
			maxTermMonths: 60,
			fundingSpeed: '24-48 hours',
			securityType: 'unsecured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Reusable credit for ongoing gaps',
		},
		{
			id: 'shift-invoice',
			lenderSlug: 'shift',
			lenderName: 'Shift',
			productName: 'Shift Debtor Finance',
			productType: 'invoice',
			rateFrom: 2.7,
			rateTo: 5.9,
			minAmount: 10000,
			maxAmount: 2000000,
			minTermMonths: 3,
			maxTermMonths: 24,
			fundingSpeed: '24-48 hours',
			securityType: 'asset-backed',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Invoice-backed cash-flow acceleration',
		},
		{
			id: 'westpac-vehicle',
			lenderSlug: 'westpac',
			lenderName: 'Westpac',
			productName: 'Westpac Vehicle & Equipment Finance',
			productType: 'vehicle',
			rateFrom: 7.99,
			minAmount: 15000,
			maxAmount: 1000000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '3-7 business days',
			securityType: 'asset-backed',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Business vehicles and fleets',
		},
		{
			id: 'commbank-secured',
			lenderSlug: 'commbank',
			lenderName: 'CommBank',
			productName: 'CommBank BetterBusiness Loan',
			productType: 'secured',
			rateFrom: 8.15,
			rateTo: 14.25,
			minAmount: 10000,
			maxAmount: 500000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '2-6 business days',
			securityType: 'secured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Bank pathway with relationship banking',
		},
		{
			id: 'nab-secured',
			lenderSlug: 'nab',
			lenderName: 'NAB',
			productName: 'NAB Business Options Loan',
			productType: 'secured',
			rateFrom: 8.2,
			rateTo: 14.4,
			minAmount: 10000,
			maxAmount: 1000000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '3-7 business days',
			securityType: 'secured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'SMEs wanting bank-backed facilities',
		},
		{
			id: 'anz-secured',
			lenderSlug: 'anz',
			lenderName: 'ANZ',
			productName: 'ANZ Business Loan',
			productType: 'secured',
			rateFrom: 8.35,
			rateTo: 14.75,
			minAmount: 20000,
			maxAmount: 1000000,
			minTermMonths: 12,
			maxTermMonths: 84,
			fundingSpeed: '3-7 business days',
			securityType: 'secured',
			updatedAt: '2026-05-10',
			isActive: true,
			bestFor: 'Established SMEs with stronger docs',
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
	return path.startsWith('/business-loans/')
}
