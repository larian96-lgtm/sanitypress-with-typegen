import Link from 'next/link'
import type { Metadata } from 'next'
import { c1AllPages } from '@/lib/c1-pages'
import { buildC1Metadata } from '@/lib/c1-seo'
import { C1Header, C1Footer } from '@/ui/c1-brand'

type Props = {
	searchParams?: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
	const params = await searchParams
	const query = params?.q?.trim()
	return buildC1Metadata({
		path: query ? `/search?q=${encodeURIComponent(query)}` : '/search',
		title: query ? `Search results for ${query} | Comparison One` : 'Search Comparison One',
		description: 'Search Comparison One business finance guides, lender profiles and comparison pages.',
		noIndex: true,
	})
}

export default async function SearchPage({ searchParams }: Props) {
	const params = await searchParams
	const query = (params?.q || '').trim().toLowerCase()
	const results = query
		? c1AllPages.filter((page) =>
				[page.title, page.headline, page.summary, page.seoDescription, page.path]
					.join(' ')
					.toLowerCase()
					.includes(query),
			)
		: c1AllPages.slice(0, 12)

	return (
		<>
			<C1Header compact />
			<section className="bg-[#074C3E] py-16 text-white">
				<div className="mx-auto max-w-5xl px-4">
					<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Comparison One search</p>
					<h1 className="mb-5 text-4xl font-extrabold md:text-5xl">Search business finance guides</h1>
					<form action="/search" className="flex max-w-2xl gap-3">
						<input
							name="q"
							defaultValue={params?.q || ''}
							placeholder="Try equipment finance, non-bank lenders or bank decline"
							className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 py-3 text-[#222E48] outline-none"
						/>
						<button className="rounded-full bg-[#FCB650] px-6 py-3 font-semibold text-[#03211B]">Search</button>
					</form>
				</div>
			</section>
			<section className="bg-[#F5F6F7] py-14">
				<div className="mx-auto max-w-5xl px-4">
					<h2 className="mb-6 text-2xl font-bold text-[#222E48]">{query ? `${results.length} result${results.length === 1 ? '' : 's'} for “${params?.q}”` : 'Popular pages'}</h2>
					<div className="grid gap-4">
						{results.map((page) => (
							<Link key={page.path} href={page.path} className="rounded-2xl bg-white p-6 no-underline shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-lg">
								<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#074C3E]">{page.eyebrow}</p>
								<h3 className="mb-2 text-xl font-bold text-[#222E48]">{page.title}</h3>
								<p className="text-sm leading-relaxed text-[#6A7283]">{page.seoDescription || page.summary}</p>
							</Link>
						))}
						{results.length === 0 && <p className="rounded-2xl bg-white p-6 text-[#404A60]">No matching guides found. Try a broader term such as business loans, equipment, invoice finance or lender.</p>}
					</div>
				</div>
			</section>
			<C1Footer />
		</>
	)
}
