'use client'

import { C1Header, C1Footer } from '@/ui/c1-brand'
import { C1EmbeddedQuoteFrame } from '@/ui/c1-funding-widget'

export default function C1QuotePage() {
	return (
		<>
			<C1Header compact />
			<main className="bg-[#F5F6F7]">
				<section className="relative overflow-hidden bg-[#074C3E] py-16 md:py-20">
					<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FCB650] opacity-10" />
					<div className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#E0F300] opacity-10" />
					<div className="relative mx-auto max-w-4xl px-4 text-center">
						<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Funding readiness check</p>
						<h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
							Check the funding path before you apply
						</h1>
						<p className="mx-auto max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
							Use the form below to start with amount, timing and purpose. The aim is to avoid applying blind and move toward the funding pathway that fits the business situation.
						</p>
					</div>
				</section>
				<section className="py-10 md:py-14">
					<div className="mx-auto max-w-5xl px-3 md:px-4">
						<C1EmbeddedQuoteFrame />
					</div>
				</section>
			</main>
			<C1Footer />
		</>
	)
}
