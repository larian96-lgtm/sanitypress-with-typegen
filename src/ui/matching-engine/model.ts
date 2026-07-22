export type MatchingAnswers = Record<string, string>

export type StepId =
	| 'purpose'
	| 'vehicle_type'
	| 'equipment_type'
	| 'amount'
	| 'monthly_revenue'
	| 'trading_history'
	| 'living_situation'
	| 'tax_debt'
	| 'state'
	| 'contact'

const COMMON_FINAL_STEPS: StepId[] = [
	'amount',
	'monthly_revenue',
	'trading_history',
	'living_situation',
	'tax_debt',
	'state',
	'contact',
]

export function buildJourney(answers: MatchingAnswers): StepId[] {
	const journey: StepId[] = ['purpose']

	if (answers.purpose === 'new_vehicle') journey.push('vehicle_type')
	if (answers.purpose === 'new_equipment') journey.push('equipment_type')

	journey.push(...COMMON_FINAL_STEPS)
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
