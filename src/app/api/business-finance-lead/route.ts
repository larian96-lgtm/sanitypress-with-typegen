import { NextResponse } from 'next/server'

import { validateLeadPayload } from '@/lib/business-finance-lead'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 64 * 1024

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

	const handlerUrl = process.env.BUSINESS_FINANCE_LEAD_HANDLER_URL
	const handlerSecret = process.env.BUSINESS_FINANCE_LEAD_HANDLER_SECRET

	if (!handlerUrl || !handlerSecret) {
		if (process.env.NODE_ENV !== 'production') {
			return NextResponse.json({ ok: true, mode: 'preview' })
		}
		return NextResponse.json(
			{ ok: false, message: 'Secure lead delivery has not been activated yet.' },
			{ status: 503 },
		)
	}

	const suppliedKey = request.headers.get('x-idempotency-key')
	const idempotencyKey =
		suppliedKey && /^[a-zA-Z0-9_-]{16,128}$/.test(suppliedKey) ? suppliedKey : crypto.randomUUID()

	try {
		const deliveryResponse = await fetch(handlerUrl, {
			method: 'POST',
			cache: 'no-store',
			redirect: 'error',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${handlerSecret}`,
				'Idempotency-Key': idempotencyKey,
			},
			body: JSON.stringify({
				submissionId: idempotencyKey,
				source: 'comparison-one-matching-engine',
				submittedAt: new Date().toISOString(),
				...result.value,
			}),
			signal: AbortSignal.timeout(10_000),
		})

		if (!deliveryResponse.ok) {
			return NextResponse.json(
				{ ok: false, message: 'We could not deliver your details. Please try again.' },
				{ status: 502 },
			)
		}

		return NextResponse.json({ ok: true, submissionId: idempotencyKey })
	} catch {
		return NextResponse.json(
			{ ok: false, message: 'The secure submission service is temporarily unavailable.' },
			{ status: 503 },
		)
	}
}
