import Image from 'next/image'

import { philCollardQuote, quizLenderLogos, quizTestimonials } from '@/lib/c1-quiz-proof-data'

const lenderHeading =
	'Our helpful and friendly broker will guide you through your application and help find the right fit from a panel of 50+ lenders including:'

export default function C1QuizProofSections() {
	return (
		<>
			<section className="bg-[#F8FBFD] px-4 py-14 md:py-20" aria-labelledby="lender-panel-title">
				<div className="mx-auto max-w-7xl">
					<h2
						id="lender-panel-title"
						className="mx-auto max-w-5xl text-center text-3xl font-black leading-tight tracking-[-0.035em] text-[#061B2B] md:text-4xl"
					>
						{lenderHeading}
					</h2>
					<div className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-3 sm:grid-cols-4 md:gap-x-8 lg:grid-cols-7" aria-label="Lender panel">
						{quizLenderLogos.map((lender) => (
							<div key={lender.name} className="flex h-20 items-center justify-center px-2 py-3">
								<Image
									src={lender.src}
									alt={lender.name}
									width={220}
									height={88}
									className="max-h-14 w-auto max-w-full object-contain"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#EAF5FA] px-4 py-14 md:py-20" aria-labelledby="phil-quote-title">
				<div className="mx-auto max-w-5xl">
					<h2 id="phil-quote-title" className="text-3xl font-black tracking-[-0.035em] text-[#061B2B] md:text-4xl">
						We look after clients&apos; short and long-term goals
					</h2>
					<div className="mt-9 grid items-start gap-8 md:grid-cols-[176px_minmax(0,1fr)] md:gap-12">
						<Image
							src="/comparisonone/quiz/phil-collard.webp"
							alt="Phil Collard, Commercial Finance Broker"
							width={176}
							height={176}
							className="h-36 w-36 rounded-full object-cover object-top shadow-[0_14px_34px_rgba(6,27,43,0.16)] md:h-44 md:w-44"
						/>
						<div className="relative pt-2">
							<span className="absolute -left-1 -top-7 text-7xl font-black leading-none text-[#389BDD]/25" aria-hidden="true">
								“
							</span>
							<blockquote className="relative text-lg font-medium leading-8 text-[#173846] md:text-xl md:leading-9">
								{philCollardQuote}
							</blockquote>
							<p className="mt-6 font-black text-[#236F9E]">Phil Collard, Commercial Finance Broker</p>
						</div>
					</div>
				</div>
			</section>

			<section className="overflow-hidden bg-[#F8FBFD] py-14 md:py-20" aria-labelledby="testimonials-title">
				<div className="mx-auto max-w-7xl px-4">
					<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
						<div>
							<h2 id="testimonials-title" className="text-3xl font-black tracking-[-0.035em] text-[#061B2B] md:text-4xl">
								Don&apos;t just take our word for it
							</h2>
							<p className="mt-3 max-w-3xl text-sm leading-6 text-[#5F7480]">
								Customer reviews of the finance team behind our Money.com.au partner pathway.
							</p>
						</div>
						<p className="text-sm font-bold text-[#236F9E]">Scroll to read more reviews</p>
					</div>
				</div>

				<div
					className="mx-auto mt-8 flex max-w-[1600px] snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-6 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#389BDD] md:gap-5"
					tabIndex={0}
					role="region"
					aria-label="Customer testimonials. Scroll horizontally to read more."
				>
					{quizTestimonials.map((review, index) => (
						<article
							key={`${review.name}-${index}`}
							className="w-[min(84vw,340px)] shrink-0 snap-start rounded-2xl border border-[#DCE8EE] bg-[#F1F4F6] p-6 shadow-[0_10px_24px_rgba(6,27,43,0.06)]"
						>
							<div className="text-xl tracking-[0.12em] text-[#55C7E8]" aria-label="5 out of 5 stars">
								★★★★★
							</div>
							<blockquote className="mt-5 text-[15px] font-semibold leading-6 text-[#173846]">“{review.quote}”</blockquote>
							<p className="mt-6 text-sm text-[#5F7480]">
								<strong className="text-[#061B2B]">{review.name}</strong> · {review.when}
							</p>
						</article>
					))}
				</div>
				<p className="mx-auto mt-2 max-w-7xl px-4 text-center text-xs leading-5 text-[#718791]">Showing the partner finance team&apos;s favourite recent reviews.</p>
			</section>
		</>
	)
}
