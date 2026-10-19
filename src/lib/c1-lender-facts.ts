import type { C1Faq, C1Link, C1PageData, C1Section } from '@/lib/c1-pages'

// Facts checked against each lender's own website (and Trustpilot for review scores).
// Update `checked` whenever a lender is re-verified; pages show it as the review date.
export interface C1LenderFacts {
	slug: string
	name: string
	checked: string
	sourceUrl: string
	lenderType: string
	products: string
	amount: string
	term: string
	rate: string
	fees: string
	speed: string
	eligibility: string[]
	security: string
	trustpilot: { rating: number; count: number }
	extraReviewNote?: string
	pros: string[]
	cons: string[]
	alternatives: C1Link[]
}

const CHECKED = '2026-10-20'

export const c1LenderFacts: Record<string, C1LenderFacts> = {
	bizcap: {
		slug: 'bizcap',
		name: 'Bizcap',
		checked: CHECKED,
		sourceUrl: 'https://www.bizcap.com.au',
		lenderType: 'Non-bank business lender (Australia and New Zealand)',
		products: 'Fast business loans, small business loans, secured business loans, bridging finance and a line of credit',
		amount: '$5,000 to $7.5 million (line of credit up to $750,000)',
		term: 'Not published. Bizcap offers daily or weekly repayment plans and terms vary by loan.',
		rate: 'Not published. Bizcap prices loans with a fixed factor rate over the loan term, set for each applicant.',
		fees: 'An establishment fee agreed upfront. Bizcap says early repayment is discounted rather than penalised.',
		speed: 'Fast and small business loans: approval within 3 hours and funding the same day. Other loans: as little as 24 hours.',
		eligibility: [
			'An active ABN or ACN',
			'At least 4 months of trading',
			'Minimum monthly revenue of $12,000',
			'No credit check for the initial conditional offer; a hard credit enquiry is made before an unconditional offer',
			'Bad credit and existing loans are not automatically disqualifying, according to Bizcap',
		],
		security: 'Fast and small business loans are pitched for speed; secured business loans and bridging finance are available for larger amounts.',
		trustpilot: { rating: 4.7, count: 2093 },
		pros: [
			'Low entry bar: 4 months trading and $12,000 monthly revenue',
			'Same-day funding on fast and small business loans',
			'Wide range, from $5,000 up to $7.5 million',
			'Early repayment is discounted rather than penalised',
		],
		cons: [
			'No published interest rate; factor-rate pricing makes cost harder to compare with an APR',
			'Daily or weekly repayments put more pressure on cash flow than monthly repayments',
			'Loan terms are not published',
		],
		alternatives: [
			{ label: 'Prospa business loans', href: '/lenders/prospa' },
			{ label: 'OnDeck business loans', href: '/lenders/ondeck' },
			{ label: 'Moula business loans', href: '/lenders/moula' },
		],
	},
	'banjo-loans': {
		slug: 'banjo-loans',
		name: 'Banjo',
		checked: CHECKED,
		sourceUrl: 'https://www.banjoloans.com',
		lenderType: 'Non-bank business lender',
		products:
			'Business Loan Excel, Business Loan Express, Business Loan Flexi, Business Loan Bridge, Asset Finance Excel and Asset Finance Express',
		amount: '$20,000 to $2 million (Business Loan Excel and Asset Finance Excel)',
		term: 'Not published. Business Loan Flexi offers up to 4 months of interest-only repayments for seasonal cash flow.',
		rate: 'Not published. Banjo says a fixed fee (or interest expense) accrues upfront and is paid in instalments.',
		fees: 'An origination fee applies to each advance.',
		speed: 'Banjo promises fast decisions but does not publish a timeframe.',
		eligibility: [
			'Banjo does not publish minimum trading time or revenue',
			'All loans are subject to Banjo eligibility criteria and approval',
			'Asset Finance Express is a low-documentation option',
		],
		security:
			'Banjo does not generally take security over assets, but director guarantees may be required. Larger loans or some loan types may need a general security deed or other security.',
		trustpilot: { rating: 4.8, count: 880 },
		pros: [
			'Loans up to $2 million, higher than many online lenders',
			'Usually no security over assets',
			'Interest-only option (Flexi) for seasonal businesses',
			'Asset finance as well as working capital loans',
		],
		cons: [
			'No published rates or eligibility criteria',
			'$20,000 minimum on its main products',
			'Director guarantees may be required',
		],
		alternatives: [
			{ label: 'Moula business loans', href: '/lenders/moula' },
			{ label: 'Lumi business loans', href: '/lenders/lumi' },
			{ label: 'Prospa business loans', href: '/lenders/prospa' },
		],
	},
	lumi: {
		slug: 'lumi',
		name: 'Lumi',
		checked: CHECKED,
		sourceUrl: 'https://www.lumi.com.au',
		lenderType: 'Non-bank business lender, lending since 2018',
		products: 'Business loan and business line of credit',
		amount: 'Up to $1 million (minimum not published)',
		term: 'Business loans up to 5 years. The line of credit is ongoing.',
		rate: 'Not published. Lumi quotes each business individually.',
		fees: 'No ongoing or early repayment fees on the line of credit. Business loans include an interest-free repayment pause feature.',
		speed: 'Same-day approval on the line of credit and same-day funding on business loans.',
		eligibility: [
			'Lumi does not publish minimum trading time or revenue',
			'Unsecured options are available, with limits',
			'Lumi says it has funded more than 15,000 businesses',
		],
		security: 'Unsecured options are available up to set limits.',
		trustpilot: { rating: 4.8, count: 709 },
		pros: [
			'Up to $1 million on a loan or line of credit',
			'Terms up to 5 years, longer than many online lenders',
			'No ongoing or early repayment fees on the line of credit',
			'Repayment pause option on business loans',
		],
		cons: ['No published rates', 'No published eligibility criteria', 'Unsecured limits are not disclosed'],
		alternatives: [
			{ label: 'Prospa vs Lumi', href: '/compare/prospa-vs-lumi' },
			{ label: 'Moula vs Lumi', href: '/compare/moula-vs-lumi' },
			{ label: 'Banjo business loans', href: '/lenders/banjo-loans' },
		],
	},
	moula: {
		slug: 'moula',
		name: 'Moula',
		checked: CHECKED,
		sourceUrl: 'https://www.moula.com.au',
		lenderType: 'Non-bank lender specialising in unsecured business loans (Melbourne)',
		products: 'Unsecured business loans',
		amount: '$10,000 to $500,000',
		term: 'Up to 5 years',
		rate: '15.99% to 35.99% p.a.',
		fees: '2% establishment fee. No transaction fees.',
		speed: 'Credit decision within 24 hours; funds within 24 hours of approval.',
		eligibility: [
			'An active ABN or ACN',
			'12+ months in business',
			'$10,000+ in monthly sales',
			'Registered for GST',
			'Starting an application does not affect your credit score; Moula runs a credit check with your permission',
		],
		security: 'Unsecured: no collateral required.',
		trustpilot: { rating: 4.6, count: 1812 },
		pros: [
			'Publishes its rate range (15.99% to 35.99% p.a.) and fees',
			'Unsecured, so no property or asset needed',
			'Terms up to 5 years',
			'Decision and funding within 24 hours',
		],
		cons: [
			'Top of the rate range (35.99% p.a.) is expensive',
			'Needs 12 months trading and $10,000 monthly sales',
			'Must be registered for GST',
		],
		alternatives: [
			{ label: 'Moula vs Lumi', href: '/compare/moula-vs-lumi' },
			{ label: 'Prospa vs Moula', href: '/compare/prospa-vs-moula' },
			{ label: 'OnDeck business loans', href: '/lenders/ondeck' },
		],
	},
	prospa: {
		slug: 'prospa',
		name: 'Prospa',
		checked: CHECKED,
		sourceUrl: 'https://www.prospa.com/business-loans',
		lenderType: 'Online non-bank small business lender',
		products: 'Small Business Loan, Business Loan Plus and Business Line of Credit',
		amount: 'Small Business Loan $5,000 to $500,000; Business Loan Plus $500,000 to $1 million; line of credit up to $500,000',
		term: 'Business loans up to 5 years. The line of credit is a renewable facility.',
		rate: 'Not published. Prospa sets rates per business based on industry, time trading, credit history and cash flow.',
		fees: 'Origination fee of 2% to 3.5% on business loans. Line of credit: weekly service fee of 0.046% plus interest on the amount drawn.',
		speed: 'Decisions within one business day, often within hours. Funds can arrive within an hour of signing.',
		eligibility: [
			'Small Business Loan: 6+ months trading and $6,000+ monthly turnover',
			'Business Loan Plus: 3+ years trading and $2 million+ annual turnover',
			'Line of credit: 2+ years trading and $6,000+ monthly turnover',
		],
		security:
			'No upfront security up to $150,000 on the Small Business Loan and line of credit. Business Loan Plus needs property security.',
		trustpilot: { rating: 4.6, count: 7910 },
		pros: [
			'Low entry bar: 6 months trading and $6,000 monthly turnover',
			'No upfront security up to $150,000',
			'Fast: funding can land the same day',
			'Large review base: 7,910 Trustpilot reviews',
		],
		cons: [
			'No published interest rate',
			'Origination fee of 2% to 3.5%',
			'Weekly repayments',
		],
		alternatives: [
			{ label: 'Prospa vs Moula', href: '/compare/prospa-vs-moula' },
			{ label: 'Prospa vs OnDeck', href: '/compare/prospa-vs-ondeck' },
			{ label: 'Prospa vs Lumi', href: '/compare/prospa-vs-lumi' },
		],
	},
	ondeck: {
		slug: 'ondeck',
		name: 'OnDeck',
		checked: CHECKED,
		sourceUrl: 'https://www.ondeck.com.au',
		lenderType: 'Online non-bank small business lender',
		products: 'Lightning Loans: unsecured small business loans',
		amount: '$10,000 to $300,000',
		term: 'Not published. Repayments are weekly, with loan top-ups available.',
		rate: 'Not published.',
		fees: 'Fees and charges apply; OnDeck does not publish them on its home page.',
		speed: 'Decisions in minutes on loans up to $200,000, in hours on $200,000 to $300,000. Same-day funding.',
		eligibility: [
			'1+ year in business',
			'$100,000+ annual revenue',
			'No major credit issues',
			'Up to $200,000: connect 6 months of business bank statements',
			'$200,000 to $300,000: also an income tax return or 12 months of accountant-prepared financials',
		],
		security: 'Fully unsecured.',
		trustpilot: { rating: 4.8, count: 1702 },
		pros: [
			'Fully unsecured',
			'Decisions in minutes and same-day funding',
			'Little paperwork up to $200,000',
			'Strong reviews: 4.8 on Trustpilot',
		],
		cons: ['No published rates or fees', 'Needs 12 months trading and $100,000 annual revenue', 'Weekly repayments'],
		alternatives: [
			{ label: 'Prospa vs OnDeck', href: '/compare/prospa-vs-ondeck' },
			{ label: 'Moula business loans', href: '/lenders/moula' },
			{ label: 'Bizcap business loans', href: '/lenders/bizcap' },
		],
	},
	scotpac: {
		slug: 'scotpac',
		name: 'ScotPac',
		checked: CHECKED,
		sourceUrl: 'https://www.scotpac.com.au',
		lenderType: 'Non-bank business lender; describes itself as the largest in Australia and New Zealand',
		products: 'Invoice finance, trade finance, asset finance, business loans and a line of credit',
		amount: 'Not published on its home page',
		term: 'Not published on its home page',
		rate: 'Not published.',
		fees: 'Not published on its home page.',
		speed: 'Not published on its home page.',
		eligibility: [
			'ScotPac does not publish minimum trading time or revenue on its home page',
			'Invoice finance depends mainly on the quality of your business-to-business invoices',
		],
		security: 'Invoice finance is secured against your receivables; asset finance against the asset.',
		trustpilot: { rating: 4.8, count: 801 },
		extraReviewNote: 'ScotPac also shows a 4.6-star Google rating from 192 reviews.',
		pros: [
			'More than 35 years in business finance',
			'Specialist in invoice and trade finance',
			'Lends more than $2.25 billion to SMEs, by its own figures',
		],
		cons: ['No published rates or fees', 'Invoice finance only suits businesses that invoice other businesses'],
		alternatives: [
			{ label: 'ScotPac vs business loan', href: '/compare/scotpac-vs-business-loan' },
			{ label: 'Invoice finance guide', href: '/business-loans/invoice-finance' },
			{ label: 'Shift (GetCapital)', href: '/lenders/shift-getcapital' },
		],
	},
}

function prettyDate(iso: string) {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-AU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	})
}

function reviewLine(f: C1LenderFacts) {
	return `${f.trustpilot.rating}/5 on Trustpilot from ${f.trustpilot.count.toLocaleString('en-AU')} reviews`
}

function factsSummary(f: C1LenderFacts) {
	const rate = f.rate.startsWith('Not published') ? 'rates quoted on application' : `${f.rate.replace(/\.$/, '')}`
	return `${f.name} offers ${f.products.toLowerCase()}: ${f.amount.split(';')[0].replace(/\.$/, '')}, ${rate}. Rated ${reviewLine(f)}. Checked against ${f.name}'s website on ${prettyDate(f.checked)}.`
}

function factsDescription(f: C1LenderFacts) {
	const amount = f.amount.split(/[;(]/)[0].trim()
	const rate = f.rate.startsWith('Not published') ? 'rates on application' : f.rate.replace(/\.$/, '')
	return `${f.name} business loans: ${amount}, ${rate}. See fees, eligibility, pros and cons and ${f.trustpilot.count.toLocaleString('en-AU')} Trustpilot reviews (${f.trustpilot.rating}★).`
}

function factsSections(f: C1LenderFacts, keep: C1Section[]): C1Section[] {
	return [
		{
			heading: `${f.name} at a glance`,
			body: `Checked against ${f.name}'s website on ${prettyDate(f.checked)}. Terms change, so confirm with ${f.name} before you apply.`,
			table: {
				headers: ['Feature', f.name],
				rows: [
					['Lender type', f.lenderType],
					['Products', f.products],
					['Loan amount', f.amount],
					['Term', f.term],
					['Interest rate', f.rate],
					['Fees', f.fees],
					['Funding speed', f.speed],
					['Security', f.security],
					['Trustpilot rating', reviewLine(f)],
				],
			},
		},
		{
			heading: `${f.name} interest rates and fees`,
			body: `${f.rate} ${f.fees}`,
		},
		{
			heading: `${f.name} eligibility: who can apply`,
			body: `What ${f.name} lists on its website:`,
			bullets: f.eligibility,
		},
		{
			heading: `${f.name} reviews`,
			body: `${f.name} is rated ${reviewLine(f)} (checked ${prettyDate(f.checked)}).${f.extraReviewNote ? ` ${f.extraReviewNote}` : ''} Reviews mostly describe the application and customer service experience, so check the total cost of your own quote as well.`,
		},
		{ heading: `${f.name} pros`, body: '', bullets: f.pros },
		{ heading: `${f.name} cons`, body: '', bullets: f.cons },
		...keep,
		{
			heading: `Alternatives to ${f.name}`,
			body: `If ${f.name} does not suit your business, compare these next:`,
			bullets: f.alternatives.map((link) => link.label),
		},
	]
}

function factsFaqs(f: C1LenderFacts): C1Faq[] {
	return [
		{ question: `What interest rate does ${f.name} charge?`, answer: `${f.rate} ${f.fees}` },
		{ question: `How much can I borrow from ${f.name}?`, answer: `${f.amount}. Term: ${f.term}` },
		{ question: `What do I need to qualify for a ${f.name} loan?`, answer: f.eligibility.join('. ') + '.' },
		{ question: `How fast does ${f.name} fund loans?`, answer: f.speed },
		{
			question: `Is ${f.name} legit? What do reviews say?`,
			answer: `${f.name} is an established Australian business lender rated ${reviewLine(f)}.${f.extraReviewNote ? ` ${f.extraReviewNote}` : ''}`,
		},
		{
			question: 'Is Comparison One a lender?',
			answer: 'No. Comparison One compares business lenders and does not make credit decisions.',
		},
	]
}

// Sections from the original profile worth keeping after the verified facts.
const KEEP_HEADINGS = ['Possible fit scenarios', 'Possible mismatch scenarios', 'What to check before applying']

export function withVerifiedLenderFacts(page: C1PageData): C1PageData {
	const slug = page.path.replace('/lenders/', '')
	const f = page.type === 'lender' ? c1LenderFacts[slug] : undefined
	if (!f) return page
	const keep = page.sections
		.filter((section) => KEEP_HEADINGS.includes(section.heading))
		.map((section) => ({
			...section,
			heading:
				section.heading === 'Possible fit scenarios'
					? `Who ${f.name} suits`
					: section.heading === 'Possible mismatch scenarios'
						? `Who should look elsewhere`
						: section.heading,
		}))
	return {
		...page,
		summary: factsSummary(f),
		seoDescription: factsDescription(f),
		lastReviewed: f.checked,
		proofPoints: [
			`${f.trustpilot.rating}★ from ${f.trustpilot.count.toLocaleString('en-AU')} Trustpilot reviews`,
			f.rate.startsWith('Not published') ? 'Rates quoted on application' : f.rate,
			f.amount.split(/[;(]/)[0].trim(),
			`Checked ${prettyDate(f.checked)}`,
		],
		sections: factsSections(f, keep),
		faqs: factsFaqs(f),
		relatedLinks: [...f.alternatives, { label: 'All business lenders', href: '/lenders' }],
	}
}

// Head-to-head comparison pages built from the verified facts above, so each
// /compare/{a}-vs-{b} page carries its own data instead of shared template copy.
function compareRows(a: C1LenderFacts, b: C1LenderFacts): string[][] {
	const row = (label: string, pick: (f: C1LenderFacts) => string) => [label, pick(a), pick(b)]
	return [
		row('Loan amount', (f) => f.amount),
		row('Term', (f) => f.term),
		row('Interest rate', (f) => f.rate),
		row('Fees', (f) => f.fees),
		row('Funding speed', (f) => f.speed),
		row('Security', (f) => f.security),
		row('Trustpilot', (f) => reviewLine(f)),
	]
}

function compareSummary(a: C1LenderFacts, b: C1LenderFacts) {
	return `${a.name} lends ${a.amount.split(/[;(]/)[0].trim()} and ${b.name} lends ${b.amount.split(/[;(]/)[0].trim()}. ${a.name} is rated ${a.trustpilot.rating}/5 and ${b.name} ${b.trustpilot.rating}/5 on Trustpilot. Here is how their rates, fees, eligibility and speed compare.`
}

function buildCompare(a: C1LenderFacts, b: C1LenderFacts, base?: C1PageData): C1PageData {
	const path = `/compare/${a.slug}-vs-${b.slug}`
	const title = `${a.name} vs ${b.name}: business loans compared`
	const keep = (base?.sections ?? []).filter((section) => section.heading === 'What to check before applying')
	return {
		type: 'compare',
		slug: `${a.slug}-vs-${b.slug}`,
		path,
		eyebrow: 'Lender comparison',
		title,
		headline: title,
		summary: compareSummary(a, b),
		seoTitle: `${a.name} vs ${b.name} Business Loans (2026) | Comparison One`,
		seoDescription: `${a.name} vs ${b.name}: loan amounts, rates, fees, eligibility, funding speed and Trustpilot ratings side by side. Checked ${prettyDate(a.checked)}.`,
		primaryCtaLabel: 'Compare business loans',
		primaryCtaHref: '/quiz',
		lastReviewed: a.checked,
		proofPoints: [
			`${a.name}: ${a.trustpilot.rating}★ (${a.trustpilot.count.toLocaleString('en-AU')} reviews)`,
			`${b.name}: ${b.trustpilot.rating}★ (${b.trustpilot.count.toLocaleString('en-AU')} reviews)`,
			`Checked ${prettyDate(a.checked)}`,
		],
		sections: [
			{
				heading: `${a.name} vs ${b.name} at a glance`,
				body: `Checked against both lenders' websites on ${prettyDate(a.checked)}.`,
				table: { headers: ['Feature', a.name, b.name], rows: compareRows(a, b) },
			},
			{
				heading: 'Eligibility compared',
				body: '',
				table: {
					headers: [a.name, b.name],
					rows: Array.from({ length: Math.max(a.eligibility.length, b.eligibility.length) }, (_, i) => [
						a.eligibility[i] ?? '',
						b.eligibility[i] ?? '',
					]),
				},
			},
			{ heading: `Choose ${a.name} if`, body: '', bullets: a.pros },
			{ heading: `Choose ${b.name} if`, body: '', bullets: b.pros },
			{
				heading: 'Watch-outs',
				body: '',
				bullets: [...a.cons.map((con) => `${a.name}: ${con}`), ...b.cons.map((con) => `${b.name}: ${con}`)],
			},
			...keep,
		],
		faqs: [
			{
				question: `Is ${a.name} or ${b.name} cheaper?`,
				answer: `${a.name}: ${a.rate} ${a.fees} ${b.name}: ${b.rate} ${b.fees} Compare the total repayable on each quote, not only the rate.`,
			},
			{
				question: `Which is faster, ${a.name} or ${b.name}?`,
				answer: `${a.name}: ${a.speed} ${b.name}: ${b.speed}`,
			},
			{
				question: `Which has better reviews?`,
				answer: `${a.name} is rated ${reviewLine(a)}. ${b.name} is rated ${reviewLine(b)}.`,
			},
		],
		relatedLinks: [
			{ label: `${a.name} review`, href: `/lenders/${a.slug}` },
			{ label: `${b.name} review`, href: `/lenders/${b.slug}` },
			{ label: 'All lender comparisons', href: '/compare' },
		],
	}
}

export function withVerifiedComparison(page: C1PageData): C1PageData {
	const match = page.path.match(/^\/compare\/([a-z-]+)-vs-([a-z-]+)$/)
	const a = match ? c1LenderFacts[match[1]] : undefined
	const b = match ? c1LenderFacts[match[2]] : undefined
	if (!a || !b) return page
	return buildCompare(a, b, page)
}

// New comparison pages with search demand that did not exist before.
export const c1GeneratedComparePages: C1PageData[] = [buildCompare(c1LenderFacts.prospa, c1LenderFacts.lumi)]
