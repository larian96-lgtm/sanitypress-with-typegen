'use client'

import Image from 'next/image'
import Link from 'next/link'

type NavItem = { label: string; href: string }
type NavGroup = { label: string; href?: string; items?: NavItem[] }

const navGroups: NavGroup[] = [
	{ label: 'Home', href: '/' },
	{
		label: 'Business Loans',
		items: [
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
		label: 'Lenders',
		items: [
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
		label: 'Compare',
		items: [
			{ label: 'Non-bank Business Lenders', href: '/compare/non-bank-business-lenders' },
			{ label: 'Prospa vs Moula', href: '/compare/prospa-vs-moula' },
			{ label: 'Prospa vs OnDeck', href: '/compare/prospa-vs-ondeck' },
			{ label: 'Moula vs Lumi', href: '/compare/moula-vs-lumi' },
			{ label: 'ScotPac vs Business Loan', href: '/compare/scotpac-vs-business-loan' },
		],
	},
	{
		label: 'Industries',
		items: [
			{ label: 'Finance for Tradies', href: '/business-loans/industry/tradies' },
			{ label: 'Transport & Logistics', href: '/business-loans/industry/transport-logistics' },
			{ label: 'Construction Subcontractors', href: '/business-loans/industry/construction-subcontractors' },
			{ label: 'Hospitality', href: '/business-loans/industry/hospitality' },
			{ label: 'Retail & Ecommerce', href: '/business-loans/industry/retail-ecommerce' },
			{ label: 'Medical & Allied Health', href: '/business-loans/industry/medical-allied-health' },
			{ label: 'Manufacturing', href: '/business-loans/industry/manufacturing' },
			{ label: 'Professional Services', href: '/business-loans/industry/professional-services' },
		],
	},
	{
		label: 'Guides',
		items: [
			{ label: 'Business Loan Requirements', href: '/blog/business-loan-requirements-australia' },
			{ label: 'Business Loan Calculator', href: '/business-loan-calculator' },
			{ label: 'Business Loan FAQs', href: '/business-loan-faq' },
			{ label: 'How Lenders Assess Applications', href: '/blog/how-business-lenders-assess-applications' },
			{ label: 'Interest Rates and Fees', href: '/blog/business-loan-interest-rates-and-fees' },
			{ label: 'Secured vs Unsecured', href: '/blog/secured-vs-unsecured-business-loans' },
			{ label: 'Bank vs Non-bank Guide', href: '/blog/bank-vs-non-bank-business-lenders' },
			{ label: 'Zero-interest Loan Access Gap', href: '/advertorial/zero-interest-loan-access-gap' },
		],
	},
	{ label: 'Calculator', href: '/#calculator' },
	{ label: 'FAQs', href: '/#faq' }
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
			{ label: 'Bizcap', href: '/lenders/bizcap' },
			{ label: 'Boost Business Loans', href: '/lenders/boost-business-loans' },
			{ label: 'Fifo Capital', href: '/lenders/fifo-capital' },
			{ label: 'Pepper Money Commercial', href: '/lenders/pepper-money-commercial' },
			{ label: 'Plenti Commercial', href: '/lenders/plenti-commercial' },
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
		title: 'Industries',
		links: [
			{ label: 'Finance for Tradies', href: '/business-loans/industry/tradies' },
			{ label: 'Transport & Logistics', href: '/business-loans/industry/transport-logistics' },
			{ label: 'Construction Subcontractors', href: '/business-loans/industry/construction-subcontractors' },
			{ label: 'Hospitality', href: '/business-loans/industry/hospitality' },
			{ label: 'Retail & Ecommerce', href: '/business-loans/industry/retail-ecommerce' },
			{ label: 'Medical & Allied Health', href: '/business-loans/industry/medical-allied-health' },
			{ label: 'Manufacturing', href: '/business-loans/industry/manufacturing' },
			{ label: 'Professional Services', href: '/business-loans/industry/professional-services' },
		],
	},
	{
		title: 'Guides',
		links: [
			{ label: 'Business Loan Requirements', href: '/blog/business-loan-requirements-australia' },
			{ label: 'Business Loan Calculator', href: '/business-loan-calculator' },
			{ label: 'Business Loan FAQs', href: '/business-loan-faq' },
			{ label: 'How Lenders Assess Applications', href: '/blog/how-business-lenders-assess-applications' },
			{ label: 'Interest Rates and Fees', href: '/blog/business-loan-interest-rates-and-fees' },
			{ label: 'Secured vs Unsecured', href: '/blog/secured-vs-unsecured-business-loans' },
			{ label: 'Bank vs Non-bank Guide', href: '/blog/bank-vs-non-bank-business-lenders' },
			{ label: 'Zero-interest Loan Access Gap', href: '/advertorial/zero-interest-loan-access-gap' },
		],
	},
]
function NavMenuItem({ group }: { group: NavGroup }) {
	if (group.href) {
		return (
			<Link href={group.href} className="whitespace-nowrap text-white/80 no-underline transition-colors hover:text-[#FCB650]">
				{group.label}
			</Link>
		)
	}

	return (
		<details className="group relative" name="c1-desktop-nav">
			<summary className="list-none cursor-pointer whitespace-nowrap text-white/80 transition-colors hover:text-[#FCB650] [&::-webkit-details-marker]:hidden">
				{group.label}
			</summary>
			<div className="absolute left-1/2 top-full z-50 mt-3 hidden w-[min(92vw,24rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#022019] p-3 shadow-2xl group-open:block">
				<div className="grid gap-1">
					{group.items?.map((item) => (
						<Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-white/80 no-underline transition-colors hover:bg-white/8 hover:text-[#FCB650]">
							{item.label}
						</Link>
					))}
				</div>
			</div>
		</details>
	)
}

function MobileMenuGroup({ group }: { group: NavGroup }) {
	if (group.href) {
		return (
			<Link href={group.href} className="block rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 no-underline">
				{group.label}
			</Link>
		)
	}

	return (
		<details className="rounded-2xl bg-white/5 px-4 py-3 text-white/85" name="c1-mobile-nav">
			<summary className="cursor-pointer list-none text-sm font-semibold [&::-webkit-details-marker]:hidden">{group.label}</summary>
			<div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
				{group.items?.map((item) => (
					<Link key={item.href} href={item.href} className="rounded-xl px-2 py-1.5 text-sm text-white/75 no-underline">
						{item.label}
					</Link>
				))}
			</div>
		</details>
	)
}

export function C1Header({ compact = false }: { compact?: boolean }) {
	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-[#03211B] shadow-[0px_6px_30px_0px_rgba(0,0,0,0.10)] backdrop-blur">
			<div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 ${compact ? 'py-2.5' : 'py-3'}`}>
				<Link href="/" className="flex shrink-0 items-center no-underline" aria-label="Comparison One home">
					<Image src="/comparisonone/logo.png?v=4" alt="Comparison One" width={186} height={40} className="h-auto w-[145px] md:w-[174px]" priority />
				</Link>

				<nav className="hidden items-center gap-4 text-sm font-medium xl:flex" aria-label="Primary navigation">
					{navGroups.map((group) => (
						<NavMenuItem key={group.label} group={group} />
					))}
				</nav>

				<div className="flex items-center gap-2">
					<details className="group relative xl:hidden">
						<summary className="cursor-pointer list-none rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/85 [&::-webkit-details-marker]:hidden">
							Menu
						</summary>
						<div className="absolute right-0 top-full z-50 mt-3 w-[min(92vw,24rem)] rounded-3xl border border-white/10 bg-[#03211B] p-3 shadow-2xl">
							<div className="grid gap-3 rounded-3xl bg-white/5 p-3 text-sm font-medium text-white/85">
								{navGroups.map((group) => (
									<MobileMenuGroup key={group.label} group={group} />
								))}
							</div>
						</div>
					</details>
					<Link href="/quiz" className="hidden shrink-0 rounded-full bg-[#FCB650] px-4 py-2 text-xs font-semibold text-[#03211B] no-underline transition-colors hover:bg-[#fcc970] md:inline-flex md:px-5 md:text-sm">
						Compare now
					</Link>
				</div>
			</div>
		</header>
	)
}

export function C1Footer() {
	return (
		<footer className="bg-[#03211B] py-14">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
					<div className="xl:col-span-2">
						<div className="mb-4 inline-flex">
							<Image src="/comparisonone/logo.png?v=4" alt="Comparison One" width={186} height={40} className="h-auto w-[170px]" />
						</div>
						<p className="max-w-md text-sm leading-relaxed text-white/60">
							Helping Australian SMEs move from a vague loan search to the right funding path, the right documents and the right lender type.
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
					Comparison One provides general information and online enquiry pathways for Australian SME funding. Comparison One is not a lender and does not provide financial, credit, legal, tax or accounting advice. Approval, rates, terms, settlement timing and availability depend on lender criteria and business circumstances. <Link href="/about" className="text-white/60 underline underline-offset-4 hover:text-[#FCB650]">About</Link> | <Link href="/contact" className="text-white/60 underline underline-offset-4 hover:text-[#FCB650]">Contact</Link> | <Link href="/privacy-policy" className="text-white/60 underline underline-offset-4 hover:text-[#FCB650]">Privacy Policy</Link> | <Link href="/terms-and-conditions" className="text-white/60 underline underline-offset-4 hover:text-[#FCB650]">Terms</Link> | <Link href="/editorial-policy" className="text-white/60 underline underline-offset-4 hover:text-[#FCB650]">Editorial Policy</Link> | <Link href="/sitemap.xml" className="font-semibold text-white/60 underline underline-offset-4 hover:text-[#FCB650]">XML sitemap</Link>. &copy; {new Date().getFullYear()} Comparison One.
				</div>
			</div>
		</footer>
	)
}
