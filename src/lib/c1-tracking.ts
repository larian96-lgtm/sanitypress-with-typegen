export type TrackingAnswers = Record<string, string>

export const C1_QUALIFIED_LEAD_EVENT = 'c1_qualified_business_finance_lead'
export const C1_PURCHASE_EVENT = 'purchase'

const QUALIFYING_REVENUE_BANDS = new Set([
	'10000_25000',
	'25000_50000',
	'50000_100000',
	'100000_250000',
	'over_250000',
])

const QUALIFYING_TRADING_HISTORY = new Set(['one_to_two_years', 'two_to_five_years', 'five_plus_years'])

type DataLayerEvent = Record<string, unknown>

declare global {
	interface Window {
		dataLayer?: DataLayerEvent[]
	}
}

export function isQualifiedBusinessFinanceLead(answers: TrackingAnswers) {
	return (
		QUALIFYING_REVENUE_BANDS.has(answers.monthly_revenue ?? '') &&
		QUALIFYING_TRADING_HISTORY.has(answers.trading_history ?? '')
	)
}

export function pushQualifiedBusinessFinanceLead(answers: TrackingAnswers, transactionId?: string) {
	if (typeof window === 'undefined') return

	window.dataLayer = window.dataLayer ?? []

	const eventData = {
		lead_quality: 'qualified',
		conversion_event: 'Purchase',
		meta_pixel_event: 'Purchase',
		value: 1,
		currency: 'AUD',
		transaction_id: transactionId,
		monthly_revenue_band: answers.monthly_revenue,
		trading_history: answers.trading_history,
		purpose: answers.purpose,
	}

	window.dataLayer.push({
		event: C1_QUALIFIED_LEAD_EVENT,
		...eventData,
	})

	window.dataLayer.push({
		event: C1_PURCHASE_EVENT,
		...eventData,
	})
}

export {}
