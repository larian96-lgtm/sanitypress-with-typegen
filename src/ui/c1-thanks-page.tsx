import { c1PageLookup, type C1Section } from '@/lib/c1-pages'

const GUIDE_PATH = '/blog/how-business-lenders-assess-applications'
const guide = c1PageLookup[GUIDE_PATH]

function renderBody(body: string) {
	return body
		.split(/\n\n+/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean)
		.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
}

function GuideSection({ section }: { section: C1Section }) {
	return (
		<section className="border-t border-[#D6E3EA] pt-7">
			<h2 className="text-2xl font-black tracking-[-0.03em] text-[#061B2B] md:text-3xl">{section.heading}</h2>
			<div className="mt-4 grid gap-4 text-[15px] leading-7 text-[#5F7480]">{renderBody(section.body)}</div>
			{section.bullets?.length ? (
				<ul className="mt-5 grid gap-3 pl-5 text-[15px] leading-7 text-[#102633] marker:text-[#389BDD]">
					{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
				</ul>
			) : null}
		</section>
	)
}

export default function C1ThanksPage() {
	const sections = guide?.sections ?? []

	return (
		<main className="min-h-screen bg-[#F3F9FC] text-[#102633]">
			<section className="bg-[#061B2B] px-5 py-16 text-white md:py-24">
				<div className="mx-auto max-w-4xl">
					<p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9F3FF]">Application received</p>
					<h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-6xl">
						Thanks for your application
					</h1>
					<p className="mt-6 max-w-2xl text-xl leading-8 text-[#E6F9FF] md:text-2xl">
						One of our brokers will be in touch very soon.
					</p>
				</div>
			</section>

			<article className="px-5 py-12 md:py-16">
				<div className="mx-auto max-w-4xl">
					<p className="mb-10 text-lg leading-8 text-[#5F7480]">
						In the meantime, feel free to read the guide below.
					</p>
					<header className="mb-10">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-[#236F9E]">SME funding guide</p>
						<h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#061B2B] md:text-5xl">
							{guide?.headline ?? 'How business lenders assess applications'}
						</h2>
						<p className="mt-5 max-w-3xl text-lg leading-8 text-[#5F7480]">{guide?.summary}</p>
					</header>
					<div className="grid gap-10">
						{sections.map((section) => <GuideSection key={section.heading} section={section} />)}
					</div>
				</div>
			</article>
		</main>
	)
}
