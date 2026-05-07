'use client'

import Image from 'next/image'
import Link from 'next/link'

export function C1Header({ compact = false }: { compact?: boolean }) {
	return (
		<header className="sticky top-0 z-50 bg-[#03211B]">
			<div className={`mx-auto flex max-w-7xl items-center justify-between px-4 ${compact ? 'py-2.5' : 'py-3'}`}>
				<Link href="/" className="flex items-center rounded-xl bg-white px-3 py-1.5 no-underline" aria-label="Comparison One home">
					<Image src="/comparisonone/logo.png" alt="Comparison One" width={186} height={40} className="h-auto w-[145px] md:w-[174px]" priority />
				</Link>
				<nav className="hidden items-center gap-5 text-sm font-medium lg:flex" aria-label="Primary navigation">
					<Link href="/business-loans" className="text-white/80 no-underline transition-colors hover:text-[#FCB650]">Business Loans</Link>
					<Link href="/business-loans/working-capital" className="text-white/80 no-underline transition-colors hover:text-[#FCB650]">Working Capital</Link>
					<Link href="/business-loans/equipment-finance" className="text-white/80 no-underline transition-colors hover:text-[#FCB650]">Equipment</Link>
					<Link href="/business-loans/invoice-finance" className="text-white/80 no-underline transition-colors hover:text-[#FCB650]">Invoice Finance</Link>
					<Link href="/lenders" className="text-white/80 no-underline transition-colors hover:text-[#FCB650]">Lenders</Link>
					<Link href="/compare/non-bank-business-lenders" className="text-white/80 no-underline transition-colors hover:text-[#FCB650]">Compare</Link>
				</nav>
				<Link href="/quiz" className="rounded-full bg-[#FCB650] px-4 py-2 text-xs font-semibold text-[#03211B] no-underline transition-colors hover:bg-[#fcc970] md:px-5 md:text-sm">
					Check Readiness
				</Link>
			</div>
		</header>
	)
}

export function C1Footer() {
	return (
		<footer className="bg-[#03211B] py-14">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
					<div className="lg:col-span-2">
						<div className="mb-4 inline-flex rounded-xl bg-white px-3 py-2">
							<Image src="/comparisonone/logo.png" alt="Comparison One" width={186} height={40} className="h-auto w-[170px]" />
						</div>
						<p className="max-w-md text-sm leading-relaxed text-white/60">
							Helping Australian SMEs avoid applying blind by checking the funding path, document requirements and lender-fit factors before they apply.
						</p>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Funding</h4>
						<div className="space-y-2 text-sm">
							<Link href="/business-loans" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Business Loans</Link>
							<Link href="/business-loans/working-capital" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Working Capital</Link>
							<Link href="/business-loans/equipment-finance" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Equipment Finance</Link>
							<Link href="/business-loans/invoice-finance" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Invoice Finance</Link>
							<Link href="/business-loans/unsecured-business-loans" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Unsecured Loans</Link>
							<Link href="/business-loans/knocked-back-by-bank" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Bank Decline Guide</Link>
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Lenders</h4>
						<div className="space-y-2 text-sm">
							<Link href="/lenders" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Lender Directory</Link>
							<Link href="/lenders/prospa" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Prospa Profile</Link>
							<Link href="/lenders/moula" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Moula Profile</Link>
							<Link href="/lenders/ondeck" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">OnDeck Profile</Link>
							<Link href="/lenders/scotpac" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">ScotPac Profile</Link>
							<Link href="/lenders/judo-bank" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Judo Bank Profile</Link>
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Compare</h4>
						<div className="space-y-2 text-sm">
							<Link href="/compare/non-bank-business-lenders" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Non-bank Lenders</Link>
							<Link href="/compare/prospa-vs-moula" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Prospa vs Moula</Link>
							<Link href="/compare/prospa-vs-ondeck" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Prospa vs OnDeck</Link>
							<Link href="/compare/moula-vs-lumi" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Moula vs Lumi</Link>
							<Link href="/compare/judo-bank-vs-non-bank-business-lenders" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Judo vs Non-bank</Link>
							<Link href="/compare/scotpac-vs-business-loan" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">ScotPac vs Business Loan</Link>
						</div>
					</div>
					<div>
						<h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
						<div className="space-y-2 text-sm">
							<Link href="/privacy-policy" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Privacy Policy</Link>
							<Link href="/terms-and-conditions" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Terms & Conditions</Link>
							<Link href="/editorial-policy" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Editorial Policy</Link>
							<Link href="/quiz" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">Check Readiness</Link>
							<Link href="/sitemap.xml" className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">XML Sitemap</Link>
						</div>
					</div>
				</div>
				<div className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
					Comparison One provides general information and online enquiry pathways for Australian SME funding. Comparison One is not a lender and does not provide financial, credit, legal, tax or accounting advice. Approval, rates, terms, settlement timing and availability depend on lender criteria and business circumstances. <Link href="/sitemap.xml" className="font-semibold text-white/60 underline underline-offset-4 hover:text-[#FCB650]">XML sitemap</Link>. © {new Date().getFullYear()} Comparison One.
				</div>
			</div>
		</footer>
	)
}
