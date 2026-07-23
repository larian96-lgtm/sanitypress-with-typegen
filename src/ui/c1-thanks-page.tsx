import { c1PageLookup } from '@/lib/c1-pages'
import C1ContentPage from '@/ui/c1-content-page'

const GUIDE_PATH = '/blog/how-business-lenders-assess-applications'
const guide = c1PageLookup[GUIDE_PATH]

function ApplicationReceivedNotice() {
	return (
		<section role="status" className="bg-[#061B2B] px-4 py-10 text-white md:py-12">
			<div className="mx-auto max-w-7xl">
				<p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9F3FF]">Application received</p>
				<h1 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-5xl">Thanks for your application</h1>
				<p className="mt-4 max-w-2xl text-lg leading-8 text-[#E6F9FF] md:text-xl">
					One of our brokers will be in touch very soon.
				</p>
				<p className="mt-2 max-w-2xl text-base leading-7 text-white/70">
					In the meantime, you can read the guide below or use the navigation to keep browsing Comparison One.
				</p>
			</div>
		</section>
	)
}

export default function C1ThanksPage() {
	if (!guide) return null
	return <C1ContentPage page={guide} notice={<ApplicationReceivedNotice />} hideHero />
}
