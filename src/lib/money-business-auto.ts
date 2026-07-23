import type { LeadAnswers } from './business-finance-lead'

const PURPOSE_MAP: Record<string, string> = {
	cashflow: 'DAY_TO_DAY',
	new_vehicle: 'VEHICLES_OR_TRANSPORT',
	new_equipment: 'MACHINERY_EQUIPMENT',
	stock: 'INVENTORY',
	property: 'PROPERTY',
	fitout: 'NEW_FIT_OUT',
	buy_business: 'PURCHASE_EXISTING_BUSINESS',
	start_business: 'START_NEW_BUSINESS',
	other: 'OTHER',
}

const VEHICLE_TYPE_MAP: Record<string, string> = {
	car: 'CAR',
	ute_or_van: 'UTE',
	truck: 'TRUCK',
	trailer: 'TRAILER',
	other: 'OTHER',
}

const VEHICLE_SOURCE_MAP: Record<string, string> = {
	used_from_dealer: 'USED_FROM_DEALER',
	private_sale: 'PRIVATE_SALE',
	unknown: 'UNKNOWN',
}

const MONTHS_IN_BUSINESS_MAP: Record<string, number> = {
	under_12_months: 6,
	one_to_two_years: 18,
	two_to_five_years: 42,
	five_plus_years: 72,
}

const MONTHLY_SALES_MAP: Record<string, number> = {
	under_10000: 5000,
	'10000_25000': 17500,
	'25000_50000': 37500,
	'50000_100000': 75000,
	'100000_250000': 175000,
	over_250000: 300000,
}

export type MoneyBusinessAutoLead = {
	first_name: string
	last_name: string
	email: string
	phone_number: string
	loan_amount: number
	purpose: string
	organisation_name: string
	months_in_business: number
	sales_monthly: number
	vehicle_type: string
	vehicle_source: string
}

export function buildMoneyBusinessAutoLead(answers: LeadAnswers): MoneyBusinessAutoLead {
	const nameParts = (answers.full_name ?? '').trim().split(/\s+/).filter(Boolean)
	const firstName = nameParts.shift() ?? ''
	const lastName = nameParts.join(' ')
	const isVehiclePurpose = answers.purpose === 'new_vehicle'

	return {
		first_name: firstName,
		last_name: lastName,
		email: answers.email ?? '',
		phone_number: answers.phone ?? '',
		loan_amount: Number(answers.amount),
		purpose: PURPOSE_MAP[answers.purpose] ?? 'OTHER',
		organisation_name: answers.business_name ?? '',
		months_in_business: MONTHS_IN_BUSINESS_MAP[answers.trading_history] ?? 0,
		sales_monthly: MONTHLY_SALES_MAP[answers.monthly_revenue] ?? 0,
		vehicle_type: isVehiclePurpose ? VEHICLE_TYPE_MAP[answers.vehicle_type] ?? 'OTHER' : 'OTHER',
		vehicle_source: isVehiclePurpose ? VEHICLE_SOURCE_MAP[answers.vehicle_source] ?? 'UNKNOWN' : 'UNKNOWN',
	}
}

function requiredEnv(name: string) {
	const value = process.env[name]?.trim()
	if (!value) throw new Error(`${name} is not configured`)
	return value
}

export class MoneyBusinessAutoError extends Error {
	constructor(
		message: string,
		readonly status?: number,
	) {
		super(message)
		this.name = 'MoneyBusinessAutoError'
	}
}

export async function submitMoneyBusinessAutoLead(answers: LeadAnswers, idempotencyKey: string) {
	const baseUrl = (process.env.MONEY_API_BASE_URL || 'https://api-staging.money.com.au').replace(/\/$/, '')
	const clientId = requiredEnv('MONEY_API_CLIENT_ID')
	const clientSecret = requiredEnv('MONEY_API_CLIENT_SECRET')

	const tokenResponse = await fetch(`${baseUrl}/oauth/token`, {
		method: 'POST',
		cache: 'no-store',
		redirect: 'error',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'client_credentials',
			client_id: clientId,
			client_secret: clientSecret,
			scope: '',
		}),
		signal: AbortSignal.timeout(10_000),
	})

	if (!tokenResponse.ok) {
		throw new MoneyBusinessAutoError('Money API authentication failed', tokenResponse.status)
	}

	const tokenBody = (await tokenResponse.json()) as { access_token?: string }
	if (!tokenBody.access_token) throw new MoneyBusinessAutoError('Money API did not return an access token')

	const leadResponse = await fetch(`${baseUrl}/v1/funnels/business-auto`, {
		method: 'POST',
		cache: 'no-store',
		redirect: 'error',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${tokenBody.access_token}`,
			'Idempotency-Key': idempotencyKey,
		},
		body: JSON.stringify(buildMoneyBusinessAutoLead(answers)),
		signal: AbortSignal.timeout(10_000),
	})

	if (!leadResponse.ok) {
		throw new MoneyBusinessAutoError('Money API rejected the lead', leadResponse.status)
	}

	return { status: leadResponse.status }
}
