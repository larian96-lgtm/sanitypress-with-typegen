'use client'

import { useMemo, useState } from 'react'

type Props = {
	defaultRate?: number
	title?: string
}

function monthlyRepayment(principal: number, annualRate: number, years: number) {
	const monthlyRate = annualRate / 100 / 12
	const periods = years * 12
	if (monthlyRate === 0) return principal / periods
	return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -periods))
}

export function C1RepaymentCalculator({
	defaultRate = 11.5,
	title = 'Estimate repayments before you apply',
}: Props) {
	const [amount, setAmount] = useState(120000)
	const [annualRate, setAnnualRate] = useState(defaultRate)
	const [years, setYears] = useState(3)

	const result = useMemo(() => {
		const repayment = monthlyRepayment(amount, annualRate, years)
		const totalRepayment = repayment * years * 12
		const totalInterest = totalRepayment - amount
		return { repayment, totalRepayment, totalInterest }
	}, [amount, annualRate, years])

	return (
		<section className="rounded-2xl border border-[#DCE3E0] bg-white p-5 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] md:p-6">
			<h3 className="text-xl font-bold text-[#222E48]">{title}</h3>
			<p className="mt-1 text-xs text-[#6A7283]">Guide only. Lender fees, frequency, and structure can change the final cost.</p>

			<div className="mt-4 grid gap-3 md:grid-cols-3">
				<label className="block">
					<span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#6A7283]">Loan amount</span>
					<input
						type="number"
						min={1000}
						step={1000}
						value={amount}
						onChange={(event) => setAmount(Number(event.target.value) || 0)}
						className="w-full rounded-xl border border-[#DCE3E0] px-3 py-2 text-sm text-[#222E48]"
					/>
				</label>

				<label className="block">
					<span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#6A7283]">Interest rate (% p.a.)</span>
					<input
						type="number"
						min={0.1}
						step={0.05}
						value={annualRate}
						onChange={(event) => setAnnualRate(Number(event.target.value) || 0)}
						className="w-full rounded-xl border border-[#DCE3E0] px-3 py-2 text-sm text-[#222E48]"
					/>
				</label>

				<label className="block">
					<span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#6A7283]">Term (years)</span>
					<input
						type="number"
						min={1}
						max={10}
						step={1}
						value={years}
						onChange={(event) => setYears(Number(event.target.value) || 1)}
						className="w-full rounded-xl border border-[#DCE3E0] px-3 py-2 text-sm text-[#222E48]"
					/>
				</label>
			</div>

			<div className="mt-4 grid gap-3 sm:grid-cols-3">
				<div className="rounded-xl bg-[#F5F8F6] p-3">
					<p className="text-xs uppercase tracking-wider text-[#6A7283]">Estimated monthly</p>
					<p className="mt-1 text-lg font-bold text-[#074C3E]">{result.repayment.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })}</p>
				</div>
				<div className="rounded-xl bg-[#F5F8F6] p-3">
					<p className="text-xs uppercase tracking-wider text-[#6A7283]">Estimated total repay</p>
					<p className="mt-1 text-lg font-bold text-[#222E48]">{result.totalRepayment.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })}</p>
				</div>
				<div className="rounded-xl bg-[#F5F8F6] p-3">
					<p className="text-xs uppercase tracking-wider text-[#6A7283]">Estimated total interest</p>
					<p className="mt-1 text-lg font-bold text-[#222E48]">{result.totalInterest.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })}</p>
				</div>
			</div>
		</section>
	)
}
