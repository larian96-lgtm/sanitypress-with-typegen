'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const BASE_QUOTE_PARAMS: Record<string, string> = {
	af: '00ixgSU',
	send_type: 'Auto',
	force_send: '1',
	application_type: 'undefined',
}

const QUOTE_IFRAME_BASE_URL = 'https://application.lend.com.au/quote/iframe'

export function buildC1QuoteUrl(amount?: string | number, iframe = false) {
	const params = new URLSearchParams(BASE_QUOTE_PARAMS)
	const cleanAmount = String(amount ?? '').replace(/[^0-9]/g, '')
	if (cleanAmount) params.set('amount', cleanAmount)
	return `${QUOTE_IFRAME_BASE_URL}?${params.toString()}`
}

export const C1_QUOTE_URL = buildC1QuoteUrl()
export const C1_QUOTE_IFRAME_URL = buildC1QuoteUrl(undefined, true)

type C1FundingWidgetProps = {
	variant?: 'dark' | 'light'
	buttonLabel?: string
	className?: string
	defaultAmount?: string
}

export function C1FundingWidget({
	variant = 'dark',
	buttonLabel = 'Compare now',
	className = '',
	defaultAmount = '',
}: C1FundingWidgetProps) {
	const router = useRouter()
	const [amount, setAmount] = useState(defaultAmount)
	const isDark = variant === 'dark'

	function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const cleanAmount = amount.replace(/[^0-9]/g, '')
		router.push(cleanAmount ? `/quiz?amount=${cleanAmount}` : '/quiz')
	}

	return (
		<form className={className} onSubmit={submit}>
			<div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-stretch">
				<label className="flex min-h-[58px] flex-1 items-center gap-3 rounded-full bg-white px-5 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
					<span className="text-xl font-bold text-[#074C3E]">$</span>
					<input
						type="text"
						inputMode="numeric"
						placeholder="Enter amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						aria-label="Funding amount"
						className="w-full border-0 bg-transparent text-base font-semibold text-[#222E48] outline-none placeholder:text-[#6A7283]"
					/>
				</label>
				<button
					type="submit"
					className="inline-flex min-h-[58px] min-w-[9rem] cursor-pointer items-center justify-center rounded-full border-0 bg-[#FCB650] px-7 text-base font-bold text-[#03211B] shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#fcc970]"
				>
					{buttonLabel} <span className="ml-2">→</span>
				</button>
			</div>
			<p className={`mt-3 text-xs ${isDark ? 'text-white/65' : 'text-[#6A7283]'}`}>
				Start with an amount, then continue to the quote form.
			</p>
		</form>
	)
}

export function C1EmbeddedQuoteFrame() {
	const searchParams = useSearchParams()
	const amount = searchParams.get('amount') ?? ''
	const iframeUrl = useMemo(() => buildC1QuoteUrl(amount, true), [amount])
	const directUrl = useMemo(() => buildC1QuoteUrl(amount, false), [amount])

	return (
		<div className="overflow-hidden rounded-3xl bg-white shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)]">
			<div className="flex flex-col gap-2 bg-[rgba(7,76,62,0.05)] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-[#222E48]">Secure partner quote form</p>
					<p className="text-xs text-[#6A7283]">
						{amount ? `Starting amount: $${Number(amount).toLocaleString('en-AU')}` : 'Enter an amount on any page or continue below.'}
					</p>
				</div>
				<Link href={directUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#074C3E] underline underline-offset-4">
					Open in new tab
				</Link>
			</div>
			<iframe
				src={iframeUrl}
				title="Comparison One funding quote application"
				className="h-[760px] w-full border-0 md:h-[880px]"
				allow="clipboard-write"
			/>
		</div>
	)
}
