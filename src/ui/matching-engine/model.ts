export type MatchingAnswers = Record<string, string>

export type StepId =
	| 'purpose'
	| 'timing'
	| 'vehicle_type'
	| 'vehicle_found'
	| 'equipment_type'
	| 'equipment_found'
	| 'asset_purchase_source'
	| 'finance_full_purchase'
	| 'amount'
	| 'loan_term'
	| 'trading_history'
	| 'monthly_revenue'
	| 'living_situation'
	| 'gst_registered'
	| 'tax_debt'
	| 'tax_debt_amount'
	| 'state'
	| 'business_details'
	| 'contact'
	| 'consent'

const COMMON_FINAL_STEPS: StepId[] = [
	'amount',
	'loan_term',
	'trading_history',
	'monthly_revenue',
	'living_situation',
	'gst_registered',
	'tax_debt',
	'state',
	'business_details',
	'contact',
	'consent',
]

export function buildJourney(answers: MatchingAnswers): StepId[] {
	const journey: StepId[] = ['purpose', 'timing']

	if (answers.purpose === 'new_vehicle') {
		journey.push('vehicle_type', 'vehicle_found')
		if (answers.vehicle_found === 'yes') {
			journey.push('asset_purchase_source', 'finance_full_purchase')
		}
	}

	if (answers.purpose === 'new_equipment') {
		journey.push('equipment_type', 'equipment_found')
		if (answers.equipment_found === 'yes') {
			journey.push('asset_purchase_source', 'finance_full_purchase')
		}
	}

	journey.push(...COMMON_FINAL_STEPS)

	if (answers.tax_debt === 'yes') {
		const stateIndex = journey.indexOf('state')
		journey.splice(stateIndex, 0, 'tax_debt_amount')
	}

	return journey
}

export function getNextStepId(currentStepId: string, answers: MatchingAnswers): StepId | null {
	const journey = buildJourney(answers)
	const index = journey.indexOf(currentStepId as StepId)
	return index >= 0 ? journey[index + 1] ?? null : null
}

export function getPreviousStepId(currentStepId: string, answers: MatchingAnswers): StepId | null {
	const journey = buildJourney(answers)
	const index = journey.indexOf(currentStepId as StepId)
	return index > 0 ? journey[index - 1] : null
}

export function getProgress(currentStepId: string, answers: MatchingAnswers): number {
	const journey = buildJourney(answers)
	const index = journey.indexOf(currentStepId as StepId)
	if (index < 0) return 0
	return Math.round(((index + 1) / journey.length) * 100)
}
