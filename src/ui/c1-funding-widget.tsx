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

const QUOTE_IFRAME_BASE_URL = 'https://comparisonone.lend.com.au/quote/iframe'

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
	compact?: boolean
}

export function C1FundingWidget({
	variant = 'dark',
	buttonLabel = 'Compare now',
	className = '',
	defaultAmount = '',
	compact = false,
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
			<div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'sm:grid-cols-[minmax(0,1fr)_auto] sm:items-stretch'}`}>
				<label className="flex min-h-[58px] flex-1 items-center gap-3 rounded-full bg-white px-5 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
					<span className="text-xl font-bold text-[#389BDD]">$</span>
					<input
						type="text"
						inputMode="numeric"
						placeholder="Enter amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						aria-label="Funding amount"
						className="w-full border-0 bg-transparent text-base font-semibold text-[#102633] outline-none placeholder:text-[#5F7480]"
					/>
				</label>
				<button
					type="submit"
					className={`inline-flex min-h-[58px] ${compact ? 'w-full' : 'min-w-[9rem]'} cursor-pointer items-center justify-center rounded-full border-0 bg-[#C9F3FF] px-7 text-base font-bold text-[#061B2B] shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#E6F9FF]`}
				>
					{buttonLabel} <span className="ml-2">→</span>
				</button>
			</div>
			<p className={`mt-3 text-xs ${isDark ? 'text-white/65' : 'text-[#5F7480]'}`}>
				Start with an amount, then continue to the quote form.
			</p>
		</form>
	)
}

export function C1EmbeddedQuoteFrame({
	showDirectLink = true,
	showHeader = true,
	compact = false,
	cropIframeTop = 0,
}: { showDirectLink?: boolean; showHeader?: boolean; compact?: boolean; cropIframeTop?: number } = {}) {
	const searchParams = useSearchParams()
	const amount = searchParams.get('amount') ?? ''
	const iframeUrl = useMemo(() => buildC1QuoteUrl(amount, true), [amount])
	const directUrl = useMemo(() => buildC1QuoteUrl(amount, false), [amount])
	const baseIframeHeight = compact ? 690 : 760

	return (
		<div className={compact ? "overflow-hidden bg-white" : "overflow-hidden rounded-3xl bg-white shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)]"}>
			{showHeader && (
				<div className="flex flex-col gap-2 bg-[rgba(7,76,62,0.05)] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-[#102633]">Secure partner quote form</p>
					<p className="text-xs text-[#5F7480]">
						{amount ? `Starting amount: $${Number(amount).toLocaleString('en-AU')}` : 'Enter an amount on any page or continue below.'}
					</p>
				</div>
				{showDirectLink && (
					<Link href={directUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-xs font-semibold text-[#389BDD] underline underline-offset-4">
						Open in new tab
					</Link>
				)}
				</div>
			)}
			<div style={cropIframeTop ? { height: `calc(${baseIframeHeight}px - ${cropIframeTop}px)` } : undefined} className={cropIframeTop ? 'overflow-hidden md:h-[calc(780px-84px)]' : undefined}>
				<iframe
					src={iframeUrl}
					title="Comparison One funding quote application"
					className="w-full border-0"
					style={{ height: `${baseIframeHeight + cropIframeTop}px`, transform: cropIframeTop ? `translateY(-${cropIframeTop}px)` : undefined }}
					allow="clipboard-write"
				/>
			</div>
		</div>
	)
}
