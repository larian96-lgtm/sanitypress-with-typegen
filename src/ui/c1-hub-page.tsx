import Link from 'next/link'
import { c1AllPages } from '@/lib/c1-pages'
import { C1Header, C1Footer } from '@/ui/c1-brand'

export const c1Hubs = {
	'/blog': {
		eyebrow: 'Guides',
		title: 'Business finance guides for Australian SMEs',
		intro: 'Plain-English guides on business loan requirements, rates and fees, how lenders assess applications, and the policy changes affecting SME cash flow.',
		seoTitle: 'Business Finance Guides for Australian SMEs | Comparison One',
		seoDescription: 'Guides on business loan requirements, interest rates and fees, secured vs unsecured loans, bank vs non-bank lenders and SME policy changes in Australia.',
		prefix: '/blog/',
	},
	'/compare': {
		eyebrow: 'Comparisons',
		title: 'Compare Australian business lenders side by side',
		intro: 'Head-to-head comparisons of Australian business lenders and funding options, covering products, loan amounts, speed, security and who each option tends to suit.',
		seoTitle: 'Compare Business Lenders Australia | Comparison One',
		seoDescription: 'Side-by-side comparisons of Australian business lenders, including Prospa, Moula, OnDeck, Lumi, Judo Bank and ScotPac, plus bank vs non-bank options.',
		prefix: '/compare/',
	},
} as const

export type C1HubPath = keyof typeof c1Hubs

export function isC1HubPath(path: string): path is C1HubPath {
	return path in c1Hubs
}

export default function C1HubPage({ path }: { path: C1HubPath }) {
	const hub = c1Hubs[path]
	const pages = c1AllPages.filter((page) => page.path.startsWith(hub.prefix) && page.type !== 'advertorial')
	return (
		<>
			<C1Header compact />
			<main className='bg-[#F5F6F7]'>
				<section className='relative overflow-hidden bg-[#074C3E] py-16 md:py-20'>
					<div className='relative mx-auto max-w-5xl px-4'>
						<p className='mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]'>{hub.eyebrow}</p>
						<h1 className='text-4xl font-extrabold leading-tight text-white md:text-5xl'>{hub.title}</h1>
						<p className='mt-4 max-w-3xl text-lg text-white/80'>{hub.intro}</p>
					</div>
				</section>
				<section className='py-12 md:py-16'>
					<ul className='mx-auto grid max-w-5xl gap-5 px-4 md:grid-cols-2'>
						{pages.map((page) => (
							<li key={page.path} className='rounded-2xl bg-white p-6 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] md:p-8'>
								<h2 className='mb-3 text-xl font-bold text-[#222E48]'>
									<Link href={page.path} className='no-underline hover:text-[#074C3E]'>
										{page.headline || page.title}
									</Link>
								</h2>
								<p className='leading-relaxed text-[#404A60]'>{page.seoDescription}</p>
							</li>
						))}
					</ul>
				</section>
			</main>
			<C1Footer />
		</>
	)
}
