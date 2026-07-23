import { NextResponse } from 'next/server'

import { validateLeadPayload } from '@/lib/business-finance-lead'
import { submitMoneyBusinessAutoLead } from '@/lib/money-business-auto'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 64 * 1024

function isMoneyApiConfigured() {
	return Boolean(process.env.MONEY_API_CLIENT_ID?.trim() && process.env.MONEY_API_CLIENT_SECRET?.trim())
}

function isLeadWebhookConfigured() {
	return Boolean(process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL?.trim())
}

export async function POST(request: Request) {
	const contentLength = Number(request.headers.get('content-length') || 0)
	if (contentLength > MAX_BODY_BYTES) {
		return NextResponse.json({ ok: false, message: 'Submission is too large' }, { status: 413 })
	}

	let payload: unknown
	try {
		payload = await request.json()
	} catch {
		return NextResponse.json({ ok: false, message: 'Invalid JSON submission' }, { status: 400 })
	}

	const result = validateLeadPayload(payload)
	if (!result.ok) {
		return NextResponse.json(
			{ ok: false, message: 'Check the highlighted fields', errors: result.errors },
			{ status: 422 },
		)
	}

	const moneyApiConfigured = isMoneyApiConfigured()
	const leadWebhookConfigured = isLeadWebhookConfigured()
	const isProduction = process.env.NODE_ENV === 'production'
	if (isProduction && (!moneyApiConfigured || !leadWebhookConfigured)) {
		return NextResponse.json(
			{ ok: false, message: 'Secure lead delivery has not been activated yet.' },
			{ status: 503 },
		)
	}

	if (!moneyApiConfigured || !leadWebhookConfigured) {
		return NextResponse.json({ ok: true, mode: 'preview' })
	}

	const suppliedKey = request.headers.get('x-idempotency-key')
	const idempotencyKey =
		suppliedKey && /^[a-zA-Z0-9_-]{16,128}$/.test(suppliedKey) ? suppliedKey : crypto.randomUUID()
	const submittedAt = new Date().toISOString()
	const { answers, attribution } = result.value
	const nameParts = answers.full_name.trim().split(/\s+/)
	const firstName = nameParts.shift() || ''
	const lastName = nameParts.join(' ')

	try {
		const moneyDelivery = submitMoneyBusinessAutoLead(answers, idempotencyKey).then(({ status }) => ({
			destination: 'money-business-auto',
			status,
		}))
		const webhookDelivery = fetch(process.env.BUSINESS_FINANCE_LEAD_WEBHOOK_URL!.trim(), {
			method: 'POST',
			cache: 'no-store',
			redirect: 'error',
			headers: {
				'Content-Type': 'application/json',
				'X-Idempotency-Key': idempotencyKey,
			},
			body: JSON.stringify({
				submission_id: idempotencyKey,
				source: 'comparison-one-matching-engine',
				submitted_at: submittedAt,
				business_name: answers.business_name,
				full_name: answers.full_name,
				first_name: firstName,
				last_name: lastName,
				email: answers.email,
				phone: answers.phone,
				purpose: answers.purpose,
				loan_amount: Number(answers.amount),
				monthly_revenue_band: answers.monthly_revenue,
				trading_history_band: answers.trading_history,
				living_situation: answers.living_situation,
				tax_debt: answers.tax_debt,
				tax_debt_amount: answers.tax_debt_amount || null,
				state: answers.state,
				vehicle_type: answers.vehicle_type || null,
				vehicle_source: answers.vehicle_source || null,
				equipment_type: answers.equipment_type || null,
				consent: answers.consent === 'yes',
				landing_page_url: attribution.landingPageUrl || null,
				referring_url: attribution.referringUrl || null,
				utm_source: attribution.utmSource || null,
				utm_medium: attribution.utmMedium || null,
				utm_campaign: attribution.utmCampaign || null,
				utm_content: attribution.utmContent || null,
				utm_term: attribution.utmTerm || null,
				gclid: attribution.gclid || null,
				fbclid: attribution.fbclid || null,
			}),
			signal: AbortSignal.timeout(10_000),
		}).then((webhookResponse) => {
			if (!webhookResponse.ok) throw new Error(`Integrately webhook returned ${webhookResponse.status}`)
			return { destination: 'integrately-webhook', status: webhookResponse.status }
		})

		const deliveryResults = await Promise.all([moneyDelivery, webhookDelivery])
		console.info('[business-finance-lead] delivery_succeeded', {
			submissionId: idempotencyKey,
			deliveries: deliveryResults,
		})
		return NextResponse.json({ ok: true, submissionId: idempotencyKey, deliveries: deliveryResults })
	} catch (error) {
		console.error('[business-finance-lead] delivery_failed', {
			submissionId: idempotencyKey,
			error: error instanceof Error ? error.message : 'Unknown delivery error',
		})
		return NextResponse.json(
			{ ok: false, message: 'The secure submission service is temporarily unavailable.' },
			{ status: 503 },
		)
	}
}
