'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { C1PageData, C1Section } from '@/lib/c1-pages'
import type { C1RateTableData } from '@/lib/c1-rate-table'
import { buildC1StructuredData } from '@/lib/c1-structured-data'
import {
	c1FallbackRateTable,
	inferDefaultProductTypes,
	inferPreferredLenderSlug,
	shouldShowCalculator,
	shouldShowRateWidget,
} from '@/lib/c1-rate-table'
import { C1Header, C1Footer } from '@/ui/c1-brand'
import { C1FundingWidget } from '@/ui/c1-funding-widget'
import { C1RateSnapshot } from '@/ui/c1-rate-snapshot'
import { C1RateComparisonWidget } from '@/ui/c1-rate-comparison-widget'
import { C1RepaymentCalculator } from '@/ui/c1-repayment-calculator'

const pageImages = [
	'/comparisonone/photos/au-money-2.png',
	'/comparisonone/photos/au-money-3.png',
	'/comparisonone/photos/au-money-4.png',
	'/comparisonone/photos/au-money-5.png',
	'/comparisonone/photos/au-money-6.png',
	'/comparisonone/photos/au-money-7.png',
]

function shortSummary(text: string) {
	const clean = text.replace(/>\s*/g, '').replace(/\s+/g, ' ').trim()
	return clean
}

function heroSummary(text: string) {
	const clean = shortSummary(text)
	const sentences = clean.match(/[^.!?]+[.!?]+/g)
	const short = sentences?.slice(0, 2).join(' ').trim() || clean
	return short.length > 310 ? `${short.slice(0, 307).trim()}...` : short
}

function FinviewTable({
	title,
	headers,
	rows,
}: {
	title?: string
	headers: string[]
	rows: string[][]
}) {
	return (
		<div className="overflow-hidden rounded-2xl bg-white p-6 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] md:p-8">
			{title && <h2 className="mb-8 text-xl font-medium text-[#222E48]">{title}</h2>}
			<div className="overflow-x-auto [&::-webkit-scrollbar]:h-[0.7vw] [&::-webkit-scrollbar-track]:bg-[rgba(7,76,62,0.06)] [&::-webkit-scrollbar-thumb]:bg-[#074C3E]">
				<table className="w-full min-w-[720px] border-collapse text-left">
					<thead>
						<tr>
							{headers.map((header) => (
								<th key={header} className="border-r border-dashed border-[#C1C4CC] px-5 py-3 text-xl font-medium text-[#222E48] last:border-r-0">
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, rowIndex) => (
							<tr key={`${row[0]}-${rowIndex}`} className="odd:bg-[rgba(7,76,62,0.05)]">
								{row.map((cell, cellIndex) => (
									<td key={`${cellIndex}-${cell}`} className={`border-r border-dashed border-[#C1C4CC] px-5 py-3 font-medium leading-relaxed last:border-r-0 ${cellIndex === 0 ? 'text-[#074C3E]' : 'text-[#404A60]'}`}>
										{cell}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function isSourceSection(section: C1Section) {
	const heading = section.heading.toLowerCase()
	return heading.includes('source') || heading.includes('review notes')
}

function isEditorSection(section: C1Section) {
	const heading = section.heading.toLowerCase()
	return heading.includes('editorial review') || heading.includes('editorial disclaimer') || heading.includes('compliance') || heading.includes('important disclaimer') || heading.includes('suggested native-ad')
}

function isComparisonSection(section: C1Section) {
	if (!section.bullets?.length) return false
	const heading = section.heading.toLowerCase()
	const comparisonHeadings = ['compares with other lender types', 'how ', 'compares with']
	const hasComparisonHeading = comparisonHeadings.some(h => heading.includes(h))
	if (!hasComparisonHeading) return false
	// Check bullets use pipe-separated format: "Category | Description | Watch-outs"
	const pipeCount = section.bullets.filter(b => (b.match(/\|/g) || []).length >= 2).length
	return pipeCount >= 2 && pipeCount >= section.bullets.length * 0.6
}

function parseComparisonTable(bullets: string[]): { headers: string[]; rows: string[][] } {
	const headers = ['Lender type', 'May suit', 'What to check']
	const rows = bullets
		.map(b => {
			const parts = b.split('|').map(s => s.trim())
			if (parts.length >= 3) return parts.slice(0, 3)
			return null
		})
		.filter((r): r is string[] => r !== null)
	return { headers, rows }
}

function comparisonRows(path: string) {
	if (path.includes('invoice-finance')) {
		return [
			['Invoice finance', 'B2B invoices are already issued', 'Can track receivables closely', 'Invoice quality and debtor payment risk matter'],
			['Working capital loan', 'General operating cash-flow gap', 'Need a lump sum or fixed repayment plan', 'May not scale with invoices'],
			['Line of credit', 'Repeated timing gaps', 'Need redraw flexibility', 'Limit fees and discipline matter'],
		]
	}
	if (path.includes('equipment-finance')) {
		return [
			['Equipment finance', 'Asset is the main use of funds', 'Repayments can match asset use', 'Asset, supplier and structure need checking'],
			['Unsecured loan', 'Need equipment plus setup cash', 'Speed or flexibility matters', 'Often higher cost than asset-backed funding'],
			['Cash purchase', 'Strong cash buffer remains after buying', 'Avoids debt repayments', 'Can weaken working capital'],
		]
	}
	if (path.includes('knocked-back')) {
		return [
			['Reapply to bank', 'Decline reason is fixable', 'Lower-cost path may still exist', 'Can be slow and document-heavy'],
			['Non-bank lender', 'Timing or criteria mismatch caused decline', 'More flexible assessment may help', 'Pricing and repayment rhythm need care'],
			['Pause and prepare', 'Affordability or tax issues are unclear', 'Protects the business from worse debt', 'May delay funding'],
		]
	}
	if (path.startsWith('/lenders/')) {
		const lenderName = path.replace('/lenders/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
		return [
			[lenderName, 'Specific lender profile and public product signals', 'Compare product fit, repayment rhythm and total cost', 'Check current eligibility, fees and guarantees directly'],
			['Online non-bank lender', 'Speed, unsecured or working-capital needs', 'Can be more flexible for some SMEs', 'Pricing and repayment frequency need close review'],
			['Specialist finance provider', 'Invoice, asset, trade or industry-specific need', 'Matches funding to the specific business problem', 'Eligibility depends on asset or receivable quality'],
		]
	}
	if (path.includes('/compare/')) {
		return [
			['Non-bank lender', 'Speed, bank decline, unsecured need', 'Faster assessment for some SMEs', 'Cost and repayment frequency need review'],
			['Bank lender', 'Strong docs, security, relationship', 'Lower pricing and broader services', 'Slower criteria, more paperwork'],
			['Specialist facility', 'Invoice, equipment, trade or seasonal need', 'Matches funding to specific use case', 'Eligibility tied to asset or receivable'],
		]
	}
	return [
		['Bank loan', 'Strong docs, time, security', 'Potentially lower pricing', 'Slower criteria and more paperwork'],
		['Non-bank loan', 'Speed, flexible criteria, bank decline', 'Faster pathways for some SMEs', 'Cost can be higher'],
		['Specialist facility', 'Invoices, equipment, trade or seasonal need', 'Matches funding to the specific problem', 'Eligibility depends on asset or receivable quality'],
	]
}


function directAnswer(page: C1PageData) {
	const title = page.title.replace(/\s+\|\s+Comparison One$/i, '')
	if (page.type === 'lender') {
		return `${title} is profiled as an Australian business finance option. It may be relevant when its product type, amount range, documents, repayment rhythm and security settings match the business need. It may not suit businesses that need a different product structure, cannot evidence repayment capacity, or need terms the lender does not currently offer.`
	}
	if (page.type === 'compare') {
		return `${title} is a funding-fit comparison, not a single recommendation. The better starting point depends on product type, funding amount, repayment rhythm, eligibility signals, speed, documents and total cost. Compare the situation first, then check current lender terms before applying.`
	}
	if (page.path.includes('/industry/')) {
		return `${title} helps Australian business owners compare finance options around the cash-flow cycle, documents and lender questions common to this industry. It may suit specific timing gaps or asset needs. It may not suit ongoing losses, disputed revenue or unclear repayment sources.`
	}
	if (page.type === 'blog') {
		return `${title} explains the practical checks Australian SMEs should understand before applying for finance. The right next step depends on loan purpose, business evidence, repayment capacity, security, documents and current lender criteria.`
	}
	if (page.path === '/business-loans') {
		return 'Business loans in Australia can fund working capital, equipment, vehicles, invoices, tax timing or growth. The right option depends on use of funds, security, documents, repayment capacity, speed and total cost. Comparison One helps compare the funding path before the lender.'
	}
	return `${title} is a business funding pathway for Australian SMEs. It may suit businesses with a clear use of funds, current trading evidence and a realistic repayment source. It may not suit businesses using debt to cover unresolved losses or applying without documents.`
}

function keyFacts(page: C1PageData) {
	if (page.type === 'lender') {
		return [
			['Page type', 'Lender profile'],
			['Common use', 'Checking product fit, documents, rates and alternatives before applying'],
			['Main checks', 'Amount, term, fees, repayment rhythm, security, guarantees and eligibility'],
			['Main risk', 'Relying on brand name before checking current lender criteria'],
			['Commercial note', 'Comparison One may receive referral or partner compensation where users proceed through partner pathways'],
		]
	}
	if (page.type === 'compare') {
		return [
			['Page type', 'Lender or product comparison'],
			['Best use', 'Shortlisting the better starting point by situation'],
			['Compare first', 'Product type, amount, rates, fees, speed, documents and repayment structure'],
			['Main risk', 'Choosing a lender before checking whether the structure fits the business problem'],
			['Decision rule', 'No lender is automatically better for every business'],
		]
	}
	if (page.path.includes('/industry/')) {
		return [
			['Page type', 'Industry finance guide'],
			['Common use', 'Matching funding type to industry cash-flow timing'],
			['Typical documents', 'ABN, bank statements, invoices, quotes, contracts and industry-specific evidence'],
			['Main risk', 'Borrowing against revenue that is delayed, disputed or uncertain'],
			['Alternatives', 'Working capital, line of credit, invoice finance, equipment finance or bank funding depending on fit'],
		]
	}
	return [
		['Page type', page.type === 'blog' ? 'Editorial guide' : 'Funding guide'],
		['Common use', 'Comparing funding fit before applying'],
		['Typical documents', 'ABN, bank statements, revenue evidence, tax position, loan purpose and identity details'],
		['Main risk', 'Applying without matching product type, repayment source and lender criteria'],
		['Commercial note', 'General information only; approval, rates and terms depend on lender assessment'],
	]
}

function decisionRows(page: C1PageData) {
	if (page.path.includes('invoice-finance')) return [
		['Unpaid B2B invoices', 'Invoice finance', 'Uses eligible receivables as the funding base'],
		['Repeat seasonal stock gaps', 'Line of credit', 'Reusable access may fit repeated drawdowns'],
		['General cash-flow gap without invoices', 'Working capital loan', 'May be simpler when invoices are not eligible'],
	]
	if (page.path.includes('equipment') || page.path.includes('vehicle')) return [
		['Machinery, ute, truck or productive asset', 'Equipment or vehicle finance', 'Asset-backed structure may match asset life'],
		['Short-term wages or supplier gap', 'Working capital finance', 'The need is operational rather than asset-backed'],
		['Unpaid B2B invoices', 'Invoice finance', 'Receivables may be the cleaner funding base'],
	]
	if (page.path.includes('tax') || page.path.includes('bas')) return [
		['Tax or BAS debt with viable cash flow', 'ATO payment plan or tax funding comparison', 'Check accountant and ATO options before borrowing'],
		['Tax debt caused by structural losses', 'Professional advice first', 'Debt may worsen the problem without a recovery plan'],
		['Short timing gap before receivables arrive', 'Invoice finance or line of credit', 'May match the repayment source more closely'],
	]
	return [
		['Clear one-off purchase', 'Asset or term finance', 'Match repayments to the use of funds'],
		['Repeat cash-flow timing gaps', 'Line of credit or working capital finance', 'Compare reusable access against fixed repayments'],
		['Bank declined or documents are incomplete', 'Check funding fit before applying again', 'Avoid repeated applications without fixing the reason'],
	]
}

function displayHeadline(page: C1PageData) {
	if (page.path === '/business-loans') return 'Compare business loans in Australia'
	return page.headline
}

function sourcesRows(page: C1PageData) {
	return [
		['Last reviewed', page.lastReviewed || 'Scheduled review pending'],
		['Sources checked', 'Public lender pages, product pages, government or regulatory sources where relevant, and Comparison One rate-table inputs'],
		['How data is ordered', page.type === 'lender' ? 'By lender-specific relevance and related alternatives' : 'By funding-fit relevance, product type and editorial grouping'],
		['Limits', 'Rates, limits, terms, fees and eligibility can change without notice and depend on lender assessment'],
		['Commercial disclosure', 'Comparison One may receive referral or partner compensation, but this does not guarantee approval or mean a product is suitable'],
	]
}

function pageImage(path: string) {
	const idx = Math.abs(path.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % pageImages.length
	return pageImages[idx]
}


export default function C1ContentPage({
	page,
	rateTable,
}: {
	page: C1PageData
	rateTable?: C1RateTableData
}) {
	const activeRateTable = rateTable ?? c1FallbackRateTable
	const editorSection = page.sections?.find(isEditorSection)
	const contentSections = page.sections?.filter((section) => !isSourceSection(section) && !isEditorSection(section)) ?? []
	const summary = shortSummary(page.summary)
	const shortHero = heroSummary(page.summary)
	const image = pageImage(page.path)
	const showRates = shouldShowRateWidget(page.path)
	const inferredProductTypes = inferDefaultProductTypes(page.path)
	const configuredProductTypes = (page.rateComparisonTable?.defaultProductTypes as typeof inferredProductTypes | undefined)
	const defaultProductTypes = configuredProductTypes && configuredProductTypes.length > 0 ? configuredProductTypes : inferredProductTypes
	const defaultLenderSlug = page.rateComparisonTable?.defaultLenderSlug || inferPreferredLenderSlug(page.path)
	const structuredRateRows = activeRateTable.rows.filter((row) => {
		const productMatch = defaultProductTypes.includes(row.productType)
		const lenderMatch = defaultLenderSlug ? row.lenderSlug === defaultLenderSlug : true
		return productMatch && lenderMatch
	})
	const jsonLd = buildC1StructuredData(page, structuredRateRows)
	const ratesAboveOverview = page.path === '/business-loans'
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<C1Header compact />

			<section className="relative overflow-hidden bg-[#074C3E] py-16 md:py-20">
				<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FCB650] opacity-10" />
				<div className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#E0F300] opacity-10" />
				<div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr]">
					<div>
						<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">{page.eyebrow || 'Business finance comparison'}</p>
						<h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">{displayHeadline(page)}</h1>
						<p className="max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">{shortHero}</p>
						<C1FundingWidget className="mt-6 max-w-xl" buttonLabel={page.primaryCtaLabel || 'Compare now'} />
					</div>
					<div className="hidden lg:block">
						<div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.12)]">
							<Image src={image} alt={`${page.title} guide`} width={620} height={420} className="h-auto w-full rounded-[1.5rem] object-cover" priority />
						</div>
					</div>
				</div>
			</section>

			<section className="bg-[#F5F6F7] py-12">
				{page.rateSnapshot && page.rateSnapshot.length > 0 && (
					<div className="mx-auto mb-10 max-w-7xl px-4">
						<C1RateSnapshot items={page.rateSnapshot} updatedAt={page.lastReviewed} />
					</div>
				)}
				{showRates && ratesAboveOverview && (
					<div className="mx-auto mb-10 max-w-7xl px-4">
						<C1RateComparisonWidget
							title={page.rateComparisonTable?.headline || activeRateTable.title}
							updatedAt={page.rateComparisonTable?.updatedAt || activeRateTable.updatedAt}
							methodologyNote={page.rateComparisonTable?.methodologyNote || activeRateTable.methodologyNote}
							showFilters={page.rateComparisonTable?.showFilters ?? true}
							sortable={page.rateComparisonTable?.sortable ?? true}
							defaultProductTypes={defaultProductTypes}
							defaultLenderSlug={defaultLenderSlug}
							rows={activeRateTable.rows}
						/>
					</div>
				)}
				{shouldShowCalculator(page.path) && (
					<div className="mx-auto mb-10 max-w-7xl px-4">
						<C1RepaymentCalculator defaultRate={11.5} />
					</div>
				)}
				<div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_330px]">
					<article className="min-w-0">
						<div className="mb-10 rounded-2xl bg-white p-8 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
							<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Direct answer</p>
							<h2 className="mb-4 text-2xl font-bold text-[#222E48]">{page.title}</h2>
							<p className="text-base leading-relaxed text-[#404A60]">{directAnswer(page)}</p>
						</div>
						<div className="mb-10">
							<FinviewTable title="Key facts" headers={['Field', 'What to know']} rows={keyFacts(page)} />
						</div>
						<div className="mb-10 rounded-2xl bg-white p-8 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
							<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Overview</p>
							<p className="text-base leading-relaxed text-[#404A60]">{summary}</p>
						</div>
						{showRates && !ratesAboveOverview && (
							<div className="mb-10">
								<C1RateComparisonWidget
									title={page.rateComparisonTable?.headline || activeRateTable.title}
									updatedAt={page.rateComparisonTable?.updatedAt || activeRateTable.updatedAt}
									methodologyNote={page.rateComparisonTable?.methodologyNote || activeRateTable.methodologyNote}
									showFilters={page.rateComparisonTable?.showFilters ?? true}
									sortable={page.rateComparisonTable?.sortable ?? true}
									defaultProductTypes={defaultProductTypes}
									defaultLenderSlug={defaultLenderSlug}
									rows={activeRateTable.rows}
								/>
							</div>
						)}
						<div className="mb-10">
							<FinviewTable title="Decision guide" headers={['Situation', 'Better starting point', 'Why']} rows={decisionRows(page)} />
						</div>
						<div className="mb-10">
							<FinviewTable title="How this page is reviewed" headers={['Field', 'Method']} rows={sourcesRows(page)} />
						</div>
						<div className="mb-10">
							<FinviewTable title="Compare the main funding paths" headers={['Funding path', 'May suit', 'Why compare it', 'Watch-outs']} rows={comparisonRows(page.path)} />
						</div>

						{contentSections.map((section, i) => (
							<section key={i} className="mb-10 rounded-2xl bg-white p-6 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] md:p-8">
								<h2 className="mb-4 text-2xl font-bold text-[#222E48]">{section.heading}</h2>
								{(section.body || '').split('\n').filter(Boolean).map((para, j) => (
									<p key={j} className="mb-3 leading-relaxed text-[#404A60]">{para.replace(/^>\s*/, '')}</p>
								))}
								{section.table && (
									<div className="mt-6">
										<FinviewTable headers={section.table.headers} rows={section.table.rows} />
									</div>
								)}
{section.bullets && !isComparisonSection(section) && (
									<div className="mt-5 grid gap-3 sm:grid-cols-2">
										{section.bullets.map((b) => (
											<div key={b} className="rounded-xl bg-[rgba(7,76,62,0.05)] p-4 text-sm font-medium leading-relaxed text-[#404A60]">
												<span className="mr-2 font-bold text-[#074C3E]">✓</span>{b.replace(/[.;]$/, '')}
											</div>
										))}
									</div>
								)}
				{section.bullets && isComparisonSection(section) && (() => {
					const table = parseComparisonTable(section.bullets)
					return (
						<div className="mt-6">
							<FinviewTable headers={table.headers} rows={table.rows} />
						</div>
					)
				})()}
							</section>
						))}
					</article>

					<aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
						<div className="rounded-2xl bg-[#074C3E] p-5 text-white shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)]">
							<h2 className="mb-3 text-xl font-bold">Compare before you apply</h2>
							<C1FundingWidget buttonLabel="Compare now" compact />
						</div>
						<div className="rounded-2xl bg-white p-5 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
							<h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#6A7283]">Author</h2>
							<p className="font-semibold text-[#222E48]">Comparison One SME Finance Editorial Team</p>
							<p className="mt-2 text-sm leading-relaxed text-[#6A7283]">Finance editors reviewing Australian SME funding pathways, lender criteria and cash-flow use cases.</p>
							<p className="mt-3 text-xs text-[#6A7283]">Last reviewed {page.lastReviewed}</p>
						</div>
						{editorSection && null}
						{page.relatedLinks?.length > 0 && (
							<div className="rounded-2xl bg-white p-5 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
								<h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6A7283]">Related pages</h2>
								<div className="space-y-2">
									{page.relatedLinks.map((link) => (
										<Link key={link.href} href={link.href} className="block rounded-xl bg-[rgba(7,76,62,0.05)] px-4 py-3 text-sm font-semibold text-[#222E48] no-underline transition-colors hover:bg-[#074C3E] hover:text-white">
											{link.label} →
										</Link>
									))}
								</div>
							</div>
						)}
					</aside>
				</div>
			</section>

			{page.faqs?.length > 0 && (
				<section className="bg-white py-16">
					<div className="mx-auto max-w-4xl px-4">
						<h2 className="mb-8 text-3xl font-bold text-[#222E48]">Frequently asked questions</h2>
						<div className="space-y-3">
							{page.faqs.map((faq) => (
								<details key={faq.question} className="group rounded-2xl bg-white shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
									<summary className="cursor-pointer px-6 py-4 text-base font-semibold text-[#222E48] transition-colors hover:text-[#074C3E]">
										{faq.question}
									</summary>
									<div className="px-6 pb-4 text-sm leading-relaxed text-[#6A7283]">{faq.answer}</div>
								</details>
							))}
						</div>
					</div>
				</section>
			)}

			<C1Footer />
		</>
	)
}
