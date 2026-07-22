export type LeadAnswers = Record<string, string>

export type LeadAttribution = {
	landingPageUrl?: string
	referringUrl?: string
	utmSource?: string
	utmMedium?: string
	utmCampaign?: string
	utmContent?: string
	utmTerm?: string
	gclid?: string
	fbclid?: string
}

export type ValidatedLead = {
	answers: LeadAnswers
	attribution: LeadAttribution
}

type ValidationResult =
	| { ok: true; value: ValidatedLead }
	| { ok: false; errors: Record<string, string> }

const PURPOSES = new Set([
	'cashflow',
	'new_vehicle',
	'new_equipment',
	'stock',
	'property',
	'fitout',
	'buy_business',
	'start_business',
	'other',
])

const ANSWER_FIELDS = new Set([
	'purpose',
	'vehicle_type',
	'equipment_type',
	'amount',
	'monthly_revenue',
	'trading_history',
	'living_situation',
	'tax_debt',
	'state',
	'full_name',
	'email',
	'phone',
	'consent',
])

const REQUIRED_FIELDS = [
	'purpose',
	'amount',
	'monthly_revenue',
	'trading_history',
	'living_situation',
	'tax_debt',
	'state',
	'full_name',
	'email',
	'phone',
] as const

function stringRecord(value: unknown, allowedFields?: Set<string>): Record<string, string> {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
	return Object.fromEntries(
		Object.entries(value)
			.filter(
				(entry): entry is [string, string] =>
					typeof entry[1] === 'string' && (!allowedFields || allowedFields.has(entry[0])),
			)
			.map(([key, entryValue]) => [key, entryValue.trim().slice(0, 500)]),
	)
}

export function validateLeadPayload(payload: unknown): ValidationResult {
	if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
		return { ok: false, errors: { payload: 'Invalid submission' } }
	}

	const source = payload as Record<string, unknown>
	const answers = stringRecord(source.answers, ANSWER_FIELDS)
	const attribution = stringRecord(source.attribution) as LeadAttribution
	const errors: Record<string, string> = {}

	for (const field of REQUIRED_FIELDS) {
		if (!answers[field]) errors[field] = 'This field is required'
	}

	if (answers.purpose && !PURPOSES.has(answers.purpose)) {
		errors.purpose = 'Select a valid loan purpose'
	}

	const amount = Number(answers.amount)
	if (!answers.amount || !Number.isFinite(amount) || amount <= 0) {
		errors.amount = 'Enter a valid loan amount'
	}

	if (answers.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
		errors.email = 'Enter a valid email address'
	}

	const normalizedPhone = answers.phone?.replace(/[\s()-]/g, '')
	if (answers.phone && !/^(?:\+?61|0)[2-478]\d{8}$/.test(normalizedPhone)) {
		errors.phone = 'Enter a valid Australian phone number'
	}

	if (answers.consent !== 'yes') {
		errors.consent = 'Consent is required'
	}

	if (answers.purpose === 'new_vehicle' && !answers.vehicle_type) {
		errors.vehicle_type = 'Select a vehicle type'
	}

	if (answers.purpose === 'new_equipment' && !answers.equipment_type) {
		errors.equipment_type = 'Select an equipment type'
	}

	if (Object.keys(errors).length > 0) return { ok: false, errors }

	return { ok: true, value: { answers, attribution } }
}
