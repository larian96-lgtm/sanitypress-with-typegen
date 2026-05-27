'use client'

import Image from 'next/image'
import { C1EmbeddedQuoteFrame } from '@/ui/c1-funding-widget'

const heroTicks = [
	'Up to $500k',
	'24-hour approval',
	'No credit pull',
	'Low-doc',
	'SSL secure',
	'Unsecured options',
]

const proofCards = [
	{
		title: 'Funding amount',
		body: 'Funding up to $500k may be available depending on the lender, business revenue, trading history, funding purpose, security and repayment fit.',
	},
	{
		title: 'Fast response',
		body: 'Some lender responses may be possible within 24 hours when the business profile, documents and funding request are clear. Timing varies by lender and application details.',
	},
	{
		title: 'Credit check control',
		body: 'The Business Funding Fit Check starts with amount, timing and business purpose. A lender credit check should only occur if you choose to continue with a lender that requires one.',
	},
	{
		title: 'Low-doc context',
		body: 'Low-doc options may suit some businesses where revenue, invoices, assets or trading data support the request. Final document requirements are set by each lender.',
	},
	{
		title: 'Payday Super cash-flow pressure',
		body: 'From 1 July 2026, employers move toward paying super on payday rather than quarterly. For some SMEs, that can change the timing of cash leaving the business.',
	},
	{
		title: 'Economic Resilience Program context',
		body: 'The federal Economic Resilience Program is targeted at selected logistics and manufacturing sectors. If that pathway does not fit, comparing non-bank options may still be useful.',
	},
]

export default function C1QuotePage() {
	return (
		<main className="min-h-screen bg-[#F5F6F7] text-[#222E48]">
			<header className="bg-[#063D32] px-4 py-3">
				<div className="mx-auto flex max-w-7xl justify-center">
					<Image src="/comparisonone/logo.png?v=7" alt="Comparison One" width={186} height={40} className="h-auto w-[156px] md:w-[178px]" priority />
				</div>
			</header>

			<section className="relative overflow-hidden bg-[#063D32] px-3 pb-5 pt-3 sm:px-4 md:pb-8">
				<div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#FCB650] opacity-20 blur-3xl" />
				<div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#D8F07B] opacity-10 blur-3xl" />
				<div className="relative mx-auto grid max-w-4xl gap-5">
					<div className="text-center text-white md:text-left">
						<h1 className="text-4xl font-black leading-[0.96] tracking-[-0.04em] md:text-5xl lg:text-6xl">
							Get your Business Funding Fit Check in two minutes
						</h1>
						<div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-2 text-left text-sm font-bold text-white md:text-base">
							{heroTicks.map((tick) => (
								<div key={tick} className="flex items-center gap-2">
									<span className="text-[#D8F07B]">✓</span>
									<span>{tick}</span>
								</div>
							))}
						</div>
					</div>

					<div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
						<C1EmbeddedQuoteFrame showDirectLink={false} showHeader={false} compact cropIframeTop={84} />
					</div>
				</div>
			</section>

			<section className="px-4 py-8 md:py-12">
				<div className="mx-auto max-w-7xl">
					<div className="mb-5 max-w-3xl">
						<h2 className="text-3xl font-black tracking-[-0.03em] text-[#03211B] md:text-4xl">Funding Options Are Changing in 2026</h2>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{proofCards.map((card) => (
							<article key={card.title} className="rounded-3xl border border-[#DCE7E2] bg-white p-5 shadow-[0_10px_30px_rgba(7,76,62,0.06)]">
								<h3 className="text-lg font-black text-[#063D32]">{card.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-[#526070]">{card.body}</p>
							</article>
						))}
					</div>
					<div className="mt-6 rounded-3xl border border-[#DCE7E2] bg-white p-5 text-sm leading-relaxed text-[#526070] shadow-[0_10px_30px_rgba(7,76,62,0.05)] md:p-6">
						<strong className="text-[#063D32]">Comparison One is a comparison pathway, not a lender.</strong> Any finance offer, approval time, loan amount, rate, document requirement or credit assessment depends on the lender’s criteria.
					</div>
				</div>
			</section>
		</main>
	)
}
