'use client'

import { C1Header, C1Footer } from '@/ui/c1-brand'
import { C1EmbeddedQuoteFrame } from '@/ui/c1-funding-widget'

export default function C1QuotePage() {
	return (
		<>
			<C1Header compact />
			<main className="bg-[#F5F6F7]">
				<section className="bg-[#074C3E] py-10 md:py-14">
					<div className="mx-auto max-w-4xl px-4 text-center">
						<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Funding readiness check</p>
						<h1 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-5xl">
							Check the funding path before you apply
						</h1>
						<p className="mx-auto max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
							Use the form below to start with amount, timing and purpose. The aim is to avoid applying blind and move toward the funding pathway that fits the business situation.
						</p>
					</div>
				</section>
				<section className="py-8 md:py-10">
					<div className="mx-auto max-w-5xl px-3 md:px-4">
						<C1EmbeddedQuoteFrame />
					</div>
				</section>
			</main>
			<C1Footer />
		</>
	)
}
