import Image from 'next/image'
import type { IconType } from 'react-icons'
import {
	LuBoxes,
	LuBriefcaseBusiness,
	LuCar,
	LuCog,
	LuPackageOpen,
	LuReceiptText,
	LuTrendingUp,
} from 'react-icons/lu'

import { quizLenderLogos } from '@/lib/c1-quiz-proof-data'
import C1QuizTestimonials from '@/ui/c1-quiz-testimonials'

const fundingUses: { label: string; Icon: IconType }[] = [
	{ label: 'Equipment or machinery', Icon: LuCog },
	{ label: 'Stock or materials', Icon: LuBoxes },
	{ label: 'A vehicle', Icon: LuCar },
	{ label: 'Working capital', Icon: LuBriefcaseBusiness },
	{ label: 'A larger job or contract', Icon: LuPackageOpen },
	{ label: 'Business expansion', Icon: LuTrendingUp },
	{ label: 'A gap while waiting for invoices', Icon: LuReceiptText },
]

const nextSteps = [
	{
		number: '01',
		title: 'Tell Us About Your Business',
		copy: 'Share the amount, timing and funding purpose.',
	},
	{
		number: '02',
		title: 'Speak With A Broker',
		copy: 'An experienced broker discusses your situation and possible funding paths.',
	},
	{
		number: '03',
		title: 'Review Possible Options',
		copy: 'Your broker helps prepare the application and explains the options available to you.',
	},
]

const eligibilityPoints = [
	'An active ABN',
	'At least 12 months trading history',
	'Monthly turnover of $10,000 or more',
	'A clear business use for the funds',
]

export default function C1QuizProofSections() {
	return (
		<>
			<section className="bg-[#EAF5FA] px-4 py-12 md:py-16" aria-labelledby="broker-value-title">
				<div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-14">
					<div>
						<p className="text-xs font-black uppercase tracking-[0.16em] text-[#236F9E]">Broker guidance</p>
						<h2 id="broker-value-title" className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-[#061B2B] md:text-5xl">
							More Than A List Of Lenders
						</h2>
					</div>
					<div className="space-y-4 text-[15px] leading-7 text-[#355461] md:text-base">
						<p>Different lenders assess turnover, trading history, industry, credit profile and funding purpose differently.</p>
						<p>Your broker will take the time to understand your business, compare possible options across 50+ lenders and help prepare and present your application.</p>
						<p className="font-black text-[#173846]">The goal is fewer wrong turns, less guesswork and a clearer funding path without applying blindly.</p>
					</div>
				</div>
			</section>

			<section className="bg-[#F7FAFB] px-4 py-12 md:py-16" aria-labelledby="funding-use-title">
				<div className="mx-auto max-w-7xl">
					<div className="max-w-3xl">
						<h2 id="funding-use-title" className="text-3xl font-black tracking-[-0.035em] text-[#061B2B] md:text-4xl">What Are You Looking To Fund?</h2>
						<p className="mt-3 text-[15px] leading-6 text-[#5F7480]">Fund the next move without unnecessarily draining your business cash buffer.</p>
					</div>
					<ul className="mt-8 grid border-y border-[#D6E3EA] sm:grid-cols-2 lg:grid-cols-7">
						{fundingUses.map(({ label, Icon }) => (
							<li key={label} className="flex min-h-20 items-center gap-3 border-b border-[#D6E3EA] px-3 py-4 last:border-b-0 sm:border-r sm:even:border-r-0 sm:last:border-r-0 lg:border-b-0 lg:border-r lg:even:border-r lg:last:border-r-0">
								<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#DDF2F9] text-[#236F9E]" aria-hidden="true"><Icon className="h-4 w-4" /></span>
								<span className="text-sm font-black leading-5 text-[#173846]">{label}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="bg-[#061B2B] px-4 py-12 text-white md:py-16" aria-labelledby="next-steps-title">
				<div className="mx-auto max-w-6xl">
					<h2 id="next-steps-title" className="text-3xl font-black tracking-[-0.035em] md:text-4xl">What Happens Next?</h2>
					<ol className="mt-8 grid gap-7 md:grid-cols-3 md:gap-0">
						{nextSteps.map((step, index) => (
							<li key={step.number} className={`relative md:px-7 ${index === 0 ? 'md:pl-0' : 'md:border-l md:border-white/15'}`}>
								<span className="text-xs font-black tracking-[0.18em] text-[#7DD5F0]">STEP {step.number}</span>
								<h3 className="mt-3 text-xl font-black leading-6">{step.title}</h3>
								<p className="mt-2 text-sm leading-6 text-white/68">{step.copy}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="bg-[#F7FAFB] px-4 py-12 md:py-16" aria-labelledby="lender-panel-title">
				<div className="mx-auto max-w-6xl text-center">
					<h2 id="lender-panel-title" className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#061B2B] md:text-4xl">Options Across 50+ Business Lenders</h2>
					<p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#5F7480] md:text-base">Your broker helps narrow the lender panel based on your business, funding purpose and application profile.</p>
					<div className="mx-auto mt-7 grid max-w-5xl grid-cols-3 items-center gap-x-3 gap-y-2 sm:grid-cols-4 md:grid-cols-6 md:gap-x-4" aria-label="Lender panel">
						{quizLenderLogos.map((lender) => (
							<div key={lender.name} data-lender-logo={lender.name} className="flex h-14 items-center justify-center bg-transparent p-1 md:h-16">
								<Image src={lender.src} alt={lender.name} width={280} height={96} className="max-h-10 w-auto max-w-full bg-transparent object-contain md:max-h-11" />
							</div>
						))}
					</div>
					<p className="mt-5 text-xs leading-5 text-[#718791]">Not every lender or product will be available to every applicant.</p>
				</div>
			</section>

			<section className="bg-[#EAF5FA] px-4 py-12 md:py-16" aria-labelledby="eligibility-title">
				<div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
					<div>
						<h2 id="eligibility-title" className="text-3xl font-black tracking-[-0.035em] text-[#061B2B] md:text-4xl">Who May Be Eligible?</h2>
						<p className="mt-4 max-w-xl text-sm leading-6 text-[#4E6874]">Business finance may be available to Australian businesses with:</p>
					</div>
					<div>
						<ul className="grid gap-3 sm:grid-cols-2">
							{eligibilityPoints.map((point) => (
								<li key={point} className="flex items-start gap-3 text-sm font-bold leading-6 text-[#173846]">
									<span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#389BDD]" aria-hidden="true" />
									{point}
								</li>
							))}
						</ul>
						<p className="mt-5 text-xs leading-5 text-[#5F7480]">Eligibility and approval depend on the lender and the applicant&apos;s circumstances.</p>
						<p className="mt-5 rounded-xl bg-[#061B2B] px-4 py-3 text-sm font-black leading-6 text-white">Approved businesses may be able to access funding within 24 hours.</p>
					</div>
				</div>
			</section>

			<section className="overflow-hidden bg-[#F7FAFB] py-12 md:py-16" aria-labelledby="testimonials-title">
				<div className="mx-auto max-w-7xl px-4">
					<h2 id="testimonials-title" className="text-3xl font-black tracking-[-0.035em] text-[#061B2B] md:text-4xl">Customer reviews</h2>
					<p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F7480]">Recent feedback about broker support. Individual experiences and outcomes vary.</p>
				</div>
				<div className="mt-7"><C1QuizTestimonials /></div>
			</section>

			<section className="bg-[#DDF2F9] px-4 py-12 text-center md:py-16" aria-labelledby="final-cta-title">
				<div className="mx-auto max-w-3xl">
					<h2 id="final-cta-title" className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#061B2B] md:text-5xl">Find A Funding Path That Fits Your Business</h2>
					<p className="mx-auto mt-4 max-w-2xl text-[15px] leading-6 text-[#4E6874] md:text-base">Start with a few details and get an experienced broker working on your side.</p>
					<a href="#funding-fit-check" className="mt-7 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#236F9E] px-7 py-3 text-sm font-black text-white no-underline transition hover:bg-[#195C86] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#389BDD] sm:w-auto sm:min-w-72">Check My Funding Options</a>
				</div>
			</section>
		</>
	)
}
