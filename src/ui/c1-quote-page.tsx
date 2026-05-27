'use client'

import { C1EmbeddedQuoteFrame } from '@/ui/c1-funding-widget'

const heroTicks = [
	'Funding options up to $500k, depending on lender criteria',
	'Fast lender responses, with some decisions possible within 24 hours',
	'No credit pull to start the Funding Fit Check',
	'Low-doc pathways may be available for suitable businesses',
]

const proofCards = [
	{
		title: 'Why non-bank funding?',
		body: 'Bank finance is not always the right fit for urgent working capital, equipment, vehicle or invoice-backed funding. The check starts with the funding purpose first, then points toward lender options that may suit.',
	},
	{
		title: 'What “up to $500k” means',
		body: 'Available amounts depend on the lender, business revenue, trading history, purpose, security and repayment fit. The check helps route the enquiry before a full application.',
	},
	{
		title: 'No credit pull to start',
		body: 'You can begin with business needs, amount and timing before any lender assessment. If you continue with a lender, that lender may run its own checks before providing finance.',
	},
	{
		title: 'Low-doc options may exist',
		body: 'Some lenders can assess certain businesses with fewer documents, especially where revenue, invoices, assets or trading data support the request. Final document needs vary by lender.',
	},
	{
		title: 'Payday Super cash-flow pressure',
		body: 'From 1 July 2026, employers move toward paying super on payday rather than quarterly. For some SMEs, that can change the timing of cash leaving the business and make working-capital planning more important.',
	},
	{
		title: 'Economic Resilience Program context',
		body: 'The federal Economic Resilience Program is targeted at selected logistics and manufacturing sectors. If that pathway does not fit, it can still be useful to compare non-bank funding options for the business need.',
	},
]

const lenderTypes = ['Working capital', 'Equipment finance', 'Vehicle finance', 'Invoice-backed funding', 'Asset-based lending']

export default function C1QuotePage() {
	return (
		<main className="min-h-screen bg-[#F5F6F7] text-[#222E48]">
			<section className="relative overflow-hidden bg-[#063D32] px-3 py-4 sm:px-4 md:py-8">
				<div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#FCB650] opacity-20 blur-3xl" />
				<div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#D8F07B] opacity-10 blur-3xl" />
				<div className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
					<div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur md:p-8 lg:sticky lg:top-6">
						<p className="mb-3 inline-flex rounded-full bg-[#FCB650] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#03211B]">
							Funding fit check
						</p>
						<h1 className="text-4xl font-black leading-[0.96] tracking-[-0.04em] md:text-5xl lg:text-6xl">
							Get your Funding Fit Check in two minutes
						</h1>
						<p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
							If bank finance does not fit the way your business needs to fund growth, compare non-bank lender options before you apply. This is built for working-capital pressure, asset purchases, invoice gaps, Payday Super planning and businesses checking whether the Economic Resilience Program is actually the right path.
						</p>
						<div className="mt-5 grid gap-2">
							{heroTicks.map((tick) => (
								<div key={tick} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#063D32] shadow-sm">
									<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D8F07B] text-xs">✓</span>
									<span>{tick}</span>
								</div>
							))}
						</div>
						<div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-white/80">
							{lenderTypes.map((item) => (
								<span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">{item}</span>
							))}
						</div>
					</div>

					<div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
						<div className="border-b border-[#E5EEE9] bg-white px-4 py-3 sm:px-6">
							<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="text-sm font-black uppercase tracking-[0.14em] text-[#0B6B57]">Start here</p>
									<p className="text-sm text-[#6A7283]">Secure partner form, no external links on this page.</p>
								</div>
								<div className="flex gap-2 text-xs font-black text-[#063D32]">
									<span className="rounded-full bg-[#EFF7F2] px-3 py-1">2 min</span>
									<span className="rounded-full bg-[#FFF4DF] px-3 py-1">No credit pull to start</span>
								</div>
							</div>
						</div>
						<C1EmbeddedQuoteFrame showDirectLink={false} showHeader={false} compact cropIframeTop={84} />
					</div>
				</div>
			</section>

			<section className="px-4 py-8 md:py-12">
				<div className="mx-auto max-w-7xl">
					<div className="mb-5 max-w-3xl">
						<p className="text-sm font-black uppercase tracking-[0.16em] text-[#0B6B57]">Why this check exists</p>
						<h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#03211B] md:text-4xl">Bank loan or nothing is no longer the smartest starting point.</h2>
						<p className="mt-3 text-base leading-relaxed text-[#4D5A69]">Different funding problems need different lender paths. These notes explain the claims above before you continue.</p>
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
						<strong className="text-[#063D32]">Comparison One is a comparison pathway, not a lender.</strong> The Funding Fit Check helps route Australian SMEs toward lender options based on amount, purpose, timing and business situation. Any finance offer, approval time, loan amount, rate, document requirement or credit assessment depends on the lender’s criteria.
					</div>
				</div>
			</section>
		</main>
	)
}
