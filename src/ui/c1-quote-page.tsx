'use client'

import Image from 'next/image'

import C1QuizFooter from '@/ui/c1-quiz-footer'
import C1QuizProofSections from '@/ui/c1-quiz-proof-sections'
import C1MatchingEngine from '@/ui/matching-engine/c1-matching-engine'

export default function C1QuotePage() {
	return (
		<main className="min-h-screen bg-[#F7FAFB] text-[#102633]">
			<header className="relative z-20 border-b border-white/10 bg-[#061B2B] px-4 py-3">
				<div className="mx-auto flex max-w-7xl justify-center">
					<Image
						src="/comparisonone/logo.png?v=7"
						alt="Comparison One"
						width={186}
						height={40}
						className="h-auto w-[150px] md:w-[168px]"
						priority
					/>
				</div>
			</header>

			<section className="relative isolate overflow-hidden bg-[#061B2B] px-3 pb-8 pt-5 sm:px-4 md:pb-14 md:pt-8">
				<div className="pointer-events-none absolute left-1/2 top-[7rem] -z-10 h-[62rem] w-[62rem] -translate-x-1/2 rounded-full border border-[#389BDD]/16" aria-hidden="true" />
				<div className="pointer-events-none absolute -right-24 -top-20 -z-10 h-72 w-72 rounded-full bg-[#389BDD]/12 blur-3xl" aria-hidden="true" />

				<div className="relative mx-auto max-w-7xl">
					<div className="mx-auto max-w-4xl text-center text-white">
						<p className="text-xs font-black uppercase tracking-[0.16em] text-[#7DD5F0] md:text-sm">Compare 50+ Business Lenders</p>
						<h1 className="mx-auto mt-3 max-w-4xl text-[clamp(2rem,5.7vw,4.5rem)] font-black leading-[1.01] tracking-[-0.045em]">
							The Top-Rated Lender May Not Fit Your Business
						</h1>
						<p className="mx-auto mt-4 max-w-3xl text-[15px] leading-6 text-white/76 md:text-lg md:leading-7">
							Get a broker with years of experience on your side to compare options, help prepare your application and work to move it forward.
						</p>
					</div>

					<div id="funding-fit-check" className="mx-auto mt-6 max-w-[900px] scroll-mt-4 overflow-hidden rounded-[1.4rem] border border-white/12 bg-white shadow-[0_24px_72px_rgba(0,0,0,0.24)] md:mt-8 md:rounded-[1.75rem]">
						<div className="border-b border-[#DCE8EE] bg-[#F3F8FA] px-5 py-3 text-center md:px-8 md:py-4">
							<p className="text-sm font-black text-[#061B2B] md:text-base">Start Your Funding Fit Check</p>
						</div>
						<C1MatchingEngine embedded />
					</div>
				</div>
			</section>

			<C1QuizProofSections />
			<C1QuizFooter />
		</main>
	)
}
