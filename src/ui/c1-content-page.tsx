'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { C1PageData, C1Section } from '@/lib/c1-pages'
import { C1Header, C1Footer } from '@/ui/c1-brand'
import { C1FundingWidget } from '@/ui/c1-funding-widget'

const pageImages = [
	'/finview/loan_solution.png',
	'/finview/about_us.png',
	'/finview/blog.png',
	'/finview/blog2.png',
	'/finview/blog3.png',
	'/finview/working_process.png',
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

function pageImage(path: string) {
	const idx = Math.abs(path.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % pageImages.length
	return pageImages[idx]
}

function pageJsonLd(page: C1PageData) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://comparison-one-sanitypress.vercel.app'
	const url = `${baseUrl}${page.path}`
	const breadcrumbs = page.path.split('/').filter(Boolean)
	const breadcrumbItems = [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
		...breadcrumbs.map((part, index) => ({
			'@type': 'ListItem',
			position: index + 2,
			name: part.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
			item: `${baseUrl}/${breadcrumbs.slice(0, index + 1).join('/')}`,
		})),
	]

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': page.type === 'lender' ? 'Article' : 'WebPage',
				'@id': `${url}#webpage`,
				url,
				name: page.seoTitle || page.title,
				headline: page.headline,
				description: page.seoDescription || page.summary,
				dateModified: page.lastReviewed,
				isAccessibleForFree: true,
				author: { '@type': 'Organization', name: 'Comparison One SME Finance Editorial Team' },
				publisher: { '@type': 'Organization', name: 'Comparison One' },
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumbs`,
				itemListElement: breadcrumbItems,
			},
			...(page.faqs?.length
				? [{
					'@type': 'FAQPage',
					'@id': `${url}#faq`,
					mainEntity: page.faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: { '@type': 'Answer', text: faq.answer },
					})),
				}]
				: []),
		],
	}
}

export default function C1ContentPage({ page }: { page: C1PageData }) {
	const editorSection = page.sections?.find(isEditorSection)
	const contentSections = page.sections?.filter((section) => !isSourceSection(section) && !isEditorSection(section)) ?? []
	const summary = shortSummary(page.summary)
	const shortHero = heroSummary(page.summary)
	const image = pageImage(page.path)
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(page)) }} />
			<C1Header compact />

			<section className="relative overflow-hidden bg-[#074C3E] py-16 md:py-20">
				<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FCB650] opacity-10" />
				<div className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#E0F300] opacity-10" />
				<div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr]">
					<div>
						<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">{page.eyebrow || 'Business finance comparison'}</p>
						<h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">{page.headline}</h1>
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
				<div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_330px]">
					<article className="min-w-0">
						<div className="mb-10 rounded-2xl bg-white p-8 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)]">
							<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Overview</p>
							<h2 className="mb-4 text-2xl font-bold text-[#222E48]">{page.title}</h2>
							<p className="text-base leading-relaxed text-[#404A60]">{summary}</p>
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
							<C1FundingWidget buttonLabel="Compare now" />
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
