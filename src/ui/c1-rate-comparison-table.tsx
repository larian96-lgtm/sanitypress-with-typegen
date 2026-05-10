'use client'

import Link from 'next/link'
import type { C1LenderRateRow } from '@/lib/c1-rate-table'

type Props = {
	rows: C1LenderRateRow[]
	amountForCta: number | null
}

function formatAmount(amount: number) {
	return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(amount)
}

function formatRate(row: C1LenderRateRow) {
	if (typeof row.rateTo === 'number' && row.rateTo > row.rateFrom) {
		return `${row.rateFrom.toFixed(2)}% - ${row.rateTo.toFixed(2)}%`
	}
	return `${row.rateFrom.toFixed(2)}%`
}

function formatTerm(row: C1LenderRateRow) {
	const minYears = (row.minTermMonths / 12).toFixed(1).replace(/\.0$/, '')
	const maxYears = (row.maxTermMonths / 12).toFixed(1).replace(/\.0$/, '')
	if (minYears === maxYears) return `${minYears} years`
	return `${minYears}-${maxYears} years`
}

export function C1RateComparisonTable({ rows, amountForCta }: Props) {
	if (rows.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-[#BFD0C9] bg-white px-6 py-8 text-center text-sm text-[#4E5A72]">
				No lenders match your filters — adjust criteria above.
			</div>
		)
	}

	return (
		<div className="overflow-hidden rounded-2xl bg-white shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
			<div className="hidden overflow-x-auto md:block">
				<table className="w-full min-w-[980px] border-collapse text-left">
					<thead>
						<tr>
							{['Lender', 'Product', 'Rate from', 'Amount', 'Term', 'Speed', 'Compare'].map((header) => (
								<th
									key={header}
									className="border-b border-[#E7ECEA] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6A7283]"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => {
							const quizHref = amountForCta
								? `/quiz?lender=${encodeURIComponent(row.lenderName)}&amount=${amountForCta}`
								: `/quiz?lender=${encodeURIComponent(row.lenderName)}`

							return (
								<tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAF9]'}>
									<td className="px-4 py-4 text-sm font-semibold text-[#074C3E]">{row.lenderName}</td>
									<td className="px-4 py-4 text-sm text-[#364156]">
										<div className="font-medium">{row.productName}</div>
										{row.bestFor && <div className="mt-1 text-xs text-[#6A7283]">{row.bestFor}</div>}
									</td>
									<td className="px-4 py-4 text-sm font-semibold text-[#222E48]">{formatRate(row)}</td>
									<td className="px-4 py-4 text-sm text-[#364156]">{formatAmount(row.minAmount)} - {formatAmount(row.maxAmount)}</td>
									<td className="px-4 py-4 text-sm text-[#364156]">{formatTerm(row)}</td>
									<td className="px-4 py-4 text-sm text-[#364156]">{row.fundingSpeed}</td>
									<td className="px-4 py-4 text-sm">
										<Link
											href={quizHref}
											className="inline-flex items-center rounded-full bg-[#FCB650] px-3 py-1.5 text-xs font-semibold text-[#03211B] no-underline transition-colors hover:bg-[#f8c46f]"
										>
											Compare now
										</Link>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			<div className="space-y-3 p-3 md:hidden">
				{rows.map((row) => {
					const quizHref = amountForCta
						? `/quiz?lender=${encodeURIComponent(row.lenderName)}&amount=${amountForCta}`
						: `/quiz?lender=${encodeURIComponent(row.lenderName)}`

					return (
						<div key={row.id} className="rounded-xl border border-[#E5ECE9] bg-white p-4">
							<p className="text-sm font-semibold text-[#074C3E]">{row.lenderName}</p>
							<p className="mt-1 text-sm text-[#222E48]">{row.productName}</p>
							<p className="mt-2 text-sm font-semibold text-[#222E48]">{formatRate(row)}</p>
							<p className="mt-1 text-xs text-[#6A7283]">{formatAmount(row.minAmount)} - {formatAmount(row.maxAmount)} • {formatTerm(row)}</p>
							<p className="mt-1 text-xs text-[#6A7283]">{row.fundingSpeed}</p>
							{row.bestFor && <p className="mt-1 text-xs text-[#6A7283]">Best for: {row.bestFor}</p>}
							<Link href={quizHref} className="mt-3 inline-flex items-center rounded-full bg-[#FCB650] px-3 py-1.5 text-xs font-semibold text-[#03211B] no-underline">
								Compare now
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}
