'use client'

import Image from 'next/image'
import Link from 'next/link'

const mainNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Business Loans', href: '/business-loans' },
	{ label: 'Services', href: '/#services' },
	{ label: 'Lenders', href: '/lenders' },
	{ label: 'Non-bank Lenders', href: '/compare/non-bank-business-lenders' },
	{ label: 'Calculator', href: '/#calculator' },
	{ label: 'FAQs', href: '/#faq' },
]

const footerGroups = [
	{
		title: 'Funding',
		links: [
			{ label: 'Business Loans', href: '/business-loans' },
			{ label: 'Working Capital', href: '/business-loans/working-capital' },
			{ label: 'Equipment Finance', href: '/business-loans/equipment-finance' },
			{ label: 'Invoice Finance', href: '/business-loans/invoice-finance' },
			{ label: 'Vehicle Finance', href: '/business-loans/vehicle-finance' },
			{ label: 'Line of Credit', href: '/business-loans/line-of-credit' },
			{ label: 'Trade Finance', href: '/business-loans/trade-finance' },
			{ label: 'Tax Debt Funding', href: '/business-loans/tax-debt' },
			{ label: 'Commercial Fitout', href: '/business-loans/commercial-fitout' },
			{ label: 'Unsecured Loans', href: '/business-loans/unsecured-business-loans' },
			{ label: 'Bank Decline Guide', href: '/business-loans/knocked-back-by-bank' },
		],
	},
	{
		title: 'Non-bank lenders',
		links: [
			{ label: 'Lender Directory', href: '/lenders' },
			{ label: 'Prospa', href: '/lenders/prospa' },
			{ label: 'Moula', href: '/lenders/moula' },
			{ label: 'OnDeck', href: '/lenders/ondeck' },
			{ label: 'Lumi', href: '/lenders/lumi' },
			{ label: 'Banjo Loans', href: '/lenders/banjo-loans' },
			{ label: 'Moneytech', href: '/lenders/moneytech' },
			{ label: 'Capify', href: '/lenders/capify' },
			{ label: 'Shift / GetCapital', href: '/lenders/shift-getcapital' },
			{ label: 'ScotPac', href: '/lenders/scotpac' },
			{ label: 'Liberty Business Finance', href: '/lenders/liberty-business-finance' },
		],
	},
	{
		title: 'Compare',
		links: [
			{ label: 'Non-bank Business Lenders', href: '/compare/non-bank-business-lenders' },
			{ label: 'Prospa vs Moula', href: '/compare/prospa-vs-moula' },
			{ label: 'Prospa vs OnDeck', href: '/compare/prospa-vs-ondeck' },
			{ label: 'Moula vs Lumi', href: '/compare/moula-vs-lumi' },
			{ label: 'ScotPac vs Business Loan', href: '/compare/scotpac-vs-business-loan' },
		],
	},
	{
		title: 'Guides',
		links: [
			{ label: 'Business Loan Requirements', href: '/blog/business-loan-requirements-australia' },
			{ label: 'How Lenders Assess Applications', href: '/blog/how-business-lenders-assess-applications' },
			{ label: 'Interest Rates and Fees', href: '/blog/business-loan-interest-rates-and-fees' },
			{ label: 'Secured vs Unsecured', href: '/blog/secured-vs-unsecured-business-loans' },
			{ label: 'Bank vs Non-bank Guide', href: '/blog/bank-vs-non-bank-business-lenders' },
			{ label: 'Zero-interest Loan Access Gap', href: '/advertorial/zero-interest-loan-access-gap' },
		],
	},
	{
		title: 'Bank profiles',
		links: [
			{ label: 'ANZ Business Loans', href: '/lenders/anz-business-loans' },
			{ label: 'NAB Business Loans', href: '/lenders/nab-business-loans' },
			{ label: 'Westpac Business Loans', href: '/lenders/westpac-business-loans' },
			{ label: 'CommBank Business Loans', href: '/lenders/commbank-business-loans' },
			{ label: 'Judo Bank', href: '/lenders/judo-bank' },
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'Check Readiness', href: '/quiz' },
			{ label: 'Privacy Policy', href: '/privacy-policy' },
			{ label: 'Terms & Conditions', href: '/terms-and-conditions' },
			{ label: 'Editorial Policy', href: '/editorial-policy' },
			{ label: 'XML Sitemap', href: '/sitemap.xml' },
		],
	},
]

export function C1Header({ compact = false }: { compact?: boolean }) {
	return (
		<header className="sticky top-0 z-50 bg-[#03211B] shadow-[0px_6px_30px_0px_rgba(0,0,0,0.10)]">
			<div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 ${compact ? 'py-2.5' : 'py-3'}`}>
				<Link href="/" className="flex shrink-0 items-center rounded-xl bg-white px-3 py-1.5 no-underline" aria-label="Comparison One home">
					<Image src="/comparisonone/logo.png" alt="Comparison One" width={186} height={40} className="h-auto w-[145px] md:w-[174px]" priority />
				</Link>
				<nav className="hidden items-center gap-5 text-sm font-medium xl:flex" aria-label="Primary navigation">
					{mainNav.map((link) => (
						<Link key={link.href} href={link.href} className="whitespace-nowrap text-white/80 no-underline transition-colors hover:text-[#FCB650]">
							{link.label}
						</Link>
					))}
				</nav>
				<Link href="/quiz" className="shrink-0 rounded-full bg-[#FCB650] px-4 py-2 text-xs font-semibold text-[#03211B] no-underline transition-colors hover:bg-[#fcc970] md:px-5 md:text-sm">
					Check Readiness
				</Link>
			</div>
			<nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 pb-3 text-sm font-medium xl:hidden" aria-label="Mobile navigation">
				{mainNav.map((link) => (
					<Link key={link.href} href={link.href} className="shrink-0 whitespace-nowrap text-white/75 no-underline transition-colors hover:text-[#FCB650]">
						{link.label}
					</Link>
				))}
			</nav>
		</header>
	)
}

export function C1Footer() {
	return (
		<footer className="bg-[#03211B] py-14">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
					<div className="xl:col-span-2">
						<div className="mb-4 inline-flex rounded-xl bg-white px-3 py-2">
							<Image src="/comparisonone/logo.png" alt="Comparison One" width={186} height={40} className="h-auto w-[170px]" />
						</div>
						<p className="max-w-md text-sm leading-relaxed text-white/60">
							Helping Australian SMEs avoid applying blind by checking the funding path, document requirements and lender-fit factors before they apply.
						</p>
					</div>
					{footerGroups.map((group) => (
						<div key={group.title}>
							<h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h4>
							<div className="space-y-2 text-sm">
								{group.links.map((link) => (
									<Link key={link.href} href={link.href} className="block text-white/60 no-underline transition-colors hover:text-[#FCB650]">
										{link.label}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
				<div className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45">
					Comparison One provides general information and online enquiry pathways for Australian SME funding. Comparison One is not a lender and does not provide financial, credit, legal, tax or accounting advice. Approval, rates, terms, settlement timing and availability depend on lender criteria and business circumstances. <Link href="/sitemap.xml" className="font-semibold text-white/60 underline underline-offset-4 hover:text-[#FCB650]">XML sitemap</Link>. © {new Date().getFullYear()} Comparison One.
				</div>
			</div>
		</footer>
	)
}
