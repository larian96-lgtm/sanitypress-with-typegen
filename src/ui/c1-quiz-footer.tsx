import Image from 'next/image'
import Link from 'next/link'

export default function C1QuizFooter() {
	return (
		<footer className="bg-[#061B2B] px-4 py-14 text-white md:py-16">
			<div className="mx-auto max-w-5xl">
				<div className="space-y-5 text-xs leading-6 text-white/55 md:text-sm md:leading-7">
					<p>
						Comparison One provides general information and an online enquiry pathway for Australian businesses seeking finance. Comparison One is not a lender, credit provider or financial adviser. Submitting an enquiry is not a loan application or guarantee of an offer.
					</p>
					<p>
						Any approval, rate, fee, term, repayment structure, document requirement and settlement timing is determined by the relevant lender and depends on the applicant&apos;s circumstances. Product availability and lender criteria may change without notice.
					</p>
					<p>
						Comparison One may receive a commission when an enquiry proceeds through a finance partner. Information on this page is general and does not take account of your objectives, financial situation or needs. Consider whether a product is suitable and seek independent advice where appropriate.
					</p>
				</div>

				<div className="mt-9 border-t border-white/10 pt-7 text-center text-xs leading-6 text-white/55">
					<p>
						By using this service you agree to our{' '}
						<Link href="/terms-and-conditions" className="text-white/75 underline underline-offset-4 hover:text-[#C9F3FF]">Terms and Conditions</Link>
						{' '}and{' '}
						<Link href="/privacy-policy" className="text-white/75 underline underline-offset-4 hover:text-[#C9F3FF]">Privacy Policy</Link>.
					</p>
					<nav className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer links">
						<Link href="/contact" className="text-white/65 no-underline hover:text-[#C9F3FF]">Contact</Link>
						<Link href="/editorial-policy" className="text-white/65 no-underline hover:text-[#C9F3FF]">Editorial Policy</Link>
						<Link href="/sitemap.xml" className="text-white/65 no-underline hover:text-[#C9F3FF]">XML sitemap</Link>
					</nav>
					<p className="mt-5">© {new Date().getFullYear()} Comparison One. All rights reserved.</p>
					<Link href="/" className="mt-6 inline-flex" aria-label="Comparison One home">
						<Image src="/comparisonone/logo.png?v=7" alt="Comparison One" width={186} height={40} className="h-auto w-[168px]" />
					</Link>
				</div>
			</div>
		</footer>
	)
}
