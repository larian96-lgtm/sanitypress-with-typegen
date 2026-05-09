'use client'

import { C1Header, C1Footer } from '@/ui/c1-brand'

const legalCopy = {
	'/privacy-policy': {
		title: 'Privacy Policy',
		updated: '5 May 2026',
		sections: [
			['What we collect', 'Comparison One may collect contact details, business details, funding needs and enquiry information you submit through our site or partner application forms.'],
			['How information is used', 'Information may be used to respond to enquiries, route applications to relevant third-party lending partners, improve the site and comply with legal obligations.'],
			['Third-party partners', 'Some forms and funding pathways are provided by external application partners. Their own privacy terms may also apply when you continue through their form.'],
			['Security', 'We use reasonable technical and operational controls and work with partners that support secure application handling. No online system can be guaranteed risk-free.'],
			['Contact', 'For privacy questions, contact Comparison One through the details provided on the main site.'],
		],
	},
	'/terms-and-conditions': {
		title: 'Terms & Conditions',
		updated: '5 May 2026',
		sections: [
			['General information', 'Comparison One provides general information and online enquiry pathways for Australian business funding. Content is not financial, legal, tax or accounting advice.'],
			['No lending decision', 'Comparison One is not a lender and does not make credit decisions. Approval, rates, terms, fees and settlement timing depend on third-party lender criteria and your circumstances.'],
			['Third-party links and forms', 'The site may link to or embed external application forms. Use of those services may be subject to separate partner terms.'],
			['Accuracy', 'We aim to keep content current, but lending criteria and product availability can change. Check details before relying on any information.'],
		],
	},
	'/editorial-policy': {
		title: 'Editorial Policy',
		updated: '5 May 2026',
		sections: [
			['Purpose', 'Comparison One publishes finance explainers to help Australian SME owners understand funding pathways before applying.'],
			['Review method', 'Pages are reviewed for clarity, lender-fit logic, source quality, internal links and claims that could imply guaranteed approval.'],
			['Sources', 'We reference public sources such as business.gov.au, ASIC, RBA, lender education pages and industry bodies where relevant.'],
			['Commercial model', 'Comparison One may receive referral or partner compensation if a user proceeds through a partner application pathway. Editorial content should still explain trade-offs clearly.'],
		],
	},
} as const

export default function C1LegalPage({ path }: { path: keyof typeof legalCopy }) {
	const page = legalCopy[path]
	return (
		<>
			<C1Header compact />
			<main className="bg-[#F5F6F7]">
				<section className="relative overflow-hidden bg-[#074C3E] py-16 md:py-20">
					<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FCB650] opacity-10" />
					<div className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#E0F300] opacity-10" />
					<div className="relative mx-auto max-w-4xl px-4">
						<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FCB650]">Comparison One</p>
						<h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">{page.title}</h1>
						<p className="mt-4 text-white/75">Last updated {page.updated}</p>
					</div>
				</section>
				<section className="py-12 md:py-16">
					<div className="mx-auto max-w-4xl space-y-5 px-4">
						{page.sections.map(([heading, body]) => (
							<section key={heading} className="rounded-2xl bg-white p-6 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] md:p-8">
								<h2 className="mb-3 text-xl font-bold text-[#222E48]">{heading}</h2>
								<p className="leading-relaxed text-[#404A60]">{body}</p>
							</section>
						))}
					</div>
				</section>
			</main>
			<C1Footer />
		</>
	)
}
