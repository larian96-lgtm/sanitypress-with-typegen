'use client'

import Image from 'next/image'
import Link from 'next/link'

import C1QuizFooter from '@/ui/c1-quiz-footer'
import C1QuizProofSections from '@/ui/c1-quiz-proof-sections'
import C1MatchingEngine from '@/ui/matching-engine/c1-matching-engine'

const heroTicks = [
	'Up to $500k',
	'24-hour approval',
	'No credit pull',
	'Low-doc options',
	'SSL secure',
	'Unsecured options',
]

export default function C1QuotePage() {
	return (
		<main className="min-h-screen bg-[#F8FBFD] text-[#102633]">
			<header className="relative z-20 border-b border-white/10 bg-[#061B2B] px-4 py-3">
				<div className="mx-auto flex max-w-7xl justify-center">
					<Link href="/" aria-label="Comparison One home" className="inline-flex">
						<Image
							src="/comparisonone/logo.png?v=7"
							alt="Comparison One"
							width={186}
							height={40}
							className="h-auto w-[156px] md:w-[178px]"
							priority
						/>
					</Link>
				</div>
			</header>

			<section className="relative isolate overflow-hidden bg-[#061B2B] px-3 pb-10 pt-8 sm:px-4 md:pb-16 md:pt-11">
				<div className="pointer-events-none absolute left-1/2 top-[6rem] -z-10 h-[68rem] w-[68rem] -translate-x-1/2 rounded-full border border-[#389BDD]/20" aria-hidden="true" />
				<div className="pointer-events-none absolute left-1/2 top-[14rem] -z-10 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full border border-[#C9F3FF]/10" aria-hidden="true" />
				<div className="pointer-events-none absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-[#389BDD]/15 blur-3xl" aria-hidden="true" />

				<div className="relative mx-auto max-w-7xl">
					<div className="mx-auto max-w-5xl text-center text-white">
						<h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[0.98] tracking-[-0.05em]">
							Get your Business Funding Fit Check in two minutes
						</h1>
						<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
							Answer a few quick questions and we&apos;ll help narrow the business-finance options worth considering.
						</p>
						<div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-white/90 md:text-base">
							{heroTicks.map((tick) => (
								<span key={tick} className="inline-flex items-center gap-2">
									<span className="grid h-5 w-5 place-items-center rounded-full bg-[#C9F3FF] text-[11px] font-black text-[#061B2B]" aria-hidden="true">✓</span>
									{tick}
								</span>
							))}
						</div>
					</div>

					<div className="mx-auto mt-8 max-w-[940px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-white shadow-[0_28px_90px_rgba(0,0,0,0.26)] md:mt-10">
						<C1MatchingEngine embedded />
					</div>
				</div>
			</section>

			<C1QuizProofSections />
			<C1QuizFooter />
		</main>
	)
}
