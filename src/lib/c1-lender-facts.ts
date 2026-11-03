import type { C1Faq, C1Link, C1PageData, C1Section } from '@/lib/c1-pages'

// Facts checked against each lender's official website.
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
	pros: string[]
	cons: string[]
	alternatives: C1Link[]
}

const CHECKED = '2026-11-02'

export const c1LenderFacts: Record<string, C1LenderFacts> = {
	bizcap: {
		slug: 'bizcap',
		name: 'Bizcap',
		checked: CHECKED,
		sourceUrl: 'https://www.bizcap.com.au/faqs',
		lenderType: 'Non-bank business lender (Australia and New Zealand)',
		products: 'Fast business loans, small business loans, secured business loans, bridging finance and a line of credit',
		amount: 'Facilities from $5,000 up to $7.5 million total limit (Fast/Small loans $5,000 to $30,000; line of credit up to $750,000)',
		term: 'Fast and Small Business Loans: 3 to 12 months; secured business loans and bridging finance terms structured individually',
		rate: 'Not published as an APR. Bizcap prices loans with a fixed factor rate over the loan term, set for each applicant',
		fees: 'An establishment fee agreed upfront. Bizcap provides early repayment discounts rather than exit penalties',
		speed: 'Fast digital assessment with conditional offers in as little as 3 hours; funding possible same day',
		eligibility: [
			'An active Australian ABN or ACN',
			'At least 4 months of verified trading',
			'Minimum monthly revenue of $12,000 ($144,000 annualised)',
			'Assessed on cash-flow and bank-statement performance without automatic credit score cut-offs',
		],
		security:
			'Fast and Small loans up to $30,000 may be available without upfront physical asset collateral (director personal guarantee required); facilities over $30,000 or secured products require asset or property security',
		pros: [
			'Low entry bar: 4 months trading and $12,000 monthly turnover',
			'Fast digital assessment with conditional offers in as little as 3 hours',
			'Borrowing capacity up to $7.5 million across secured and bridging facilities',
			'Early repayment is discounted rather than penalised',
		],
		cons: [
			'Fast and Small loan terms are short: 3 to 12 months',
			'No published APR; factor-rate pricing makes cost harder to compare with reducing-balance loans',
			'Daily or weekly repayment debits put more pressure on cash flow than monthly repayments',
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
		sourceUrl: 'https://banjoloans.com/business-loans/excel/',
		lenderType: 'Non-bank business lender',
		products:
			'Business Loan Excel, Business Loan Express, Business Loan Flexi, Business Loan Bridge, and Asset Finance',
		amount: '$20,000 to $2 million (Business Loan Excel and Asset Finance Excel)',
		term: 'Business Loan Excel: 6 to 60 months; Business Loan Flexi: 12 to 16 months (includes up to 4 months interest-only repayments for seasonal cash flow)',
		rate: 'Not published as an APR. Banjo charges an upfront fixed interest expense calculated over the facility term and paid in ongoing instalments',
		fees: 'An origination fee applies to each advance',
		speed: 'Fast digital assessment; funding in as little as 24 hours',
		eligibility: [
			'2+ years of verified trading history',
			'Minimum $500,000 in annual sales/revenue',
			'Active Australian ABN or ACN',
			'Asset Finance Express available as a low-doc option for eligible equipment',
		],
		security:
			'Generally requires some security (such as a general security agreement over business assets) and director personal guarantees; specific asset or property security may be required based on credit assessment',
		pros: [
			'Loans up to $2 million on Excel facilities',
			'Flexible terms from 6 to 60 months (Excel)',
			'Interest-only option (Flexi, 12 to 16 months) for seasonal businesses',
			'Asset finance as well as working capital loans',
		],
		cons: [
			'Higher entry hurdles: requires 2+ years trading and $500k+ annual sales',
			'Upfront fixed interest expense rather than standard transparent APR',
			'Generally requires business asset security and director guarantees',
			'$20,000 minimum loan amount on main products',
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
		sourceUrl: 'https://www.lumi.com.au/faq/products',
		lenderType: 'Non-bank business lender, lending since 2018',
		products: 'Business Loan (3 to 36 months) and Business Line of Credit (up to 5 years)',
		amount: '$5,000 up to $1 million',
		term: 'Business Loans: 3 to 36 months; Business Line of Credit: revolving facility up to 5 years',
		rate: 'Line of Credit: published from 15.5% APR on drawn funds; Business Loans: interest rate quoted on application based on profile',
		fees: 'Line of credit: one-off establishment fee on first draw only, no ongoing maintenance fees, no early repayment fees. Business loans: establishment fee upfront with an optional repayment pause feature',
		speed: 'Online assessment; Lumi says approved business loan funds may be available the same business day',
		eligibility: [
			'At least 6 months of active trading',
			'Minimum $50,000 in annual turnover',
			'Valid Australian ABN or ACN',
		],
		security: 'Unsecured options available up to approved limits; larger facilities or specific risk profiles may require director guarantees or security',
		pros: [
			'Line of credit rates published from 15.5% APR',
			'Up to $1 million on a loan or line of credit',
			'Accessible entry hurdle: 6+ months trading and $50k+ annual revenue',
			'Line of credit: one-off establishment fee on first draw, no ongoing monthly fees',
			'Repayment pause option on business loans',
		],
		cons: [
			'Business loan interest rate not published upfront (quoted on application)',
			'Business loan term differs from line of credit: 3 to 36 months (vs up to 5 years for LOC)',
			'Unsecured borrowing limits are subject to credit criteria',
		],
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
		sourceUrl: 'https://moula.com.au/working-capital-loans',
		lenderType: 'Non-bank business lender (Melbourne)',
		products: 'Working capital business loans',
		amount: '$10,000 to $500,000',
		term: '6 months to 5 years',
		rate: 'From 15.99% to 35.99% APR (risk-based, fixed for loan term)',
		fees: '2% establishment fee. No ongoing monthly fees, no early repayment or exit penalties',
		speed: 'Fast online assessment; conditional decision and funding typically within 24 hours of approval',
		eligibility: [
			'Active Australian ABN or ACN',
			'12+ months in business',
			'Minimum $10,000 in monthly sales ($120k+ annualised)',
			'Registered for GST',
		],
		security:
			'No upfront asset security required up to $150,000; director personal guarantees apply across facilities (meaning personal exposure is possible). Security may be required for facilities over $150,000',
		pros: [
			'Published APR range starting from 15.99% to 35.99%',
			'No upfront asset security required up to $150,000',
			'Loans up to $500,000 with terms up to 5 years',
			'No early repayment penalties',
		],
		cons: [
			'Personal guarantee required across facilities; security exposure possible',
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
		sourceUrl: 'https://www.prospa.com/small-business-lending',
		lenderType: 'Online non-bank small business lender',
		products: 'Small Business Loans, Business Loan Plus and Business Line of Credit',
		amount:
			'Small Business Loan: up to $500,000; Line of Credit: up to $500,000; Business Loan Plus: $500,000 to $1 million',
		term: 'Small Business Loan: up to 5 years; Line of Credit: renewable facility up to 24 months; Business Loan Plus: up to 5 years',
		rate: 'Risk-based pricing assessed per applicant based on trading history, financials and security position',
		fees: 'Origination fee applies to business loans; weekly service fee plus interest on drawn funds for line of credit',
		speed: 'Fast online assessment; conditional decision in hours with funding possible same day upon approval',
		eligibility: [
			'Small Business Loan: 6+ months trading and minimum $6,000 monthly turnover',
			'Business Line of Credit: minimum 2 years trading and $6,000 monthly turnover',
			'Business Loan Plus: 3+ years trading, $2 million+ annual turnover, and Australian property or asset security',
			'Active Australian ABN or ACN',
		],
		security:
			'No upfront asset security required up to $150,000 on Small Business Loan and Line of Credit (director guarantees apply). Facilities over $150,000 require security (PPSR or charge). Business Loan Plus strictly requires Australian property OR substantial asset security',
		pros: [
			'Small Business Loans and Line of Credit available up to $500,000',
			'No upfront asset security required up to $150,000',
			'Terms up to 5 years on business loans',
			'Line of credit provides revolving access for ongoing working capital',
		],
		cons: [
			'Business Loan Plus strictly requires property or asset security and 3+ years trading with $2M+ turnover',
			'Line of credit requires 2+ years trading history',
			'Interest rates assessed individually rather than published as a flat APR',
			'Daily or weekly repayment debits rather than monthly',
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
		term: 'Not published. Repayments are weekly, with loan top-ups available',
		rate: 'Not published as a flat rate; quoted on application',
		fees: 'Fees and charges apply; OnDeck does not publish them on its home page',
		speed: 'Decisions in minutes on loans up to $200,000, in hours on $200,000 to $300,000. Same-day funding',
		eligibility: [
			'1+ year in business',
			'$100,000+ annual revenue',
			'No major credit issues',
			'Up to $200,000: connect 6 months of business bank statements',
			'$200,000 to $300,000: also an income tax return or 12 months of accountant-prepared financials',
		],
		security: 'Unsecured cash-flow lending; personal director guarantee required',
		pros: [
			'Unsecured facility without property collateral',
			'Decisions in minutes and same-day funding',
			'Streamlined documentation up to $200,000',
			'Top-up facility available for ongoing borrowers',
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
		amount: 'Tailored facility limits based on debtor ledger or asset valuation',
		term: 'Structured based on facility type and customer trading cycles',
		rate: 'Not published as a flat rate; quoted based on asset quality and debtor book',
		fees: 'Facility and administration fees apply based on product structure',
		speed: 'Assessment timelines depend on debtor ledger review or asset verification',
		eligibility: [
			'ScotPac assesses eligibility on commercial debtor quality and business turnover',
			'Invoice finance depends mainly on the creditworthiness of your business-to-business debtor ledger',
		],
		security: 'Invoice finance is secured against commercial receivables; asset finance against the acquired equipment or vehicle',
		pros: [
			'More than 35 years in commercial business finance',
			'Specialist in debtor invoice finance and trade facilities',
			'Significant balance-sheet capacity for growing mid-market enterprises',
		],
		cons: ['No published rates or fees upfront', 'Invoice finance only suits businesses that invoice commercial B2B clients'],
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

function factsSummary(f: C1LenderFacts) {
	const rate = f.rate.startsWith('Not published') ? 'rates quoted on application' : `${f.rate.replace(/\.$/, '')}`
	return `${f.name} offers ${f.products.toLowerCase()}: ${f.amount.split(';')[0].replace(/\.$/, '')}, ${rate}. Product terms verified against ${f.name}'s published criteria on ${prettyDate(f.checked)}.`
}

function factsDescription(f: C1LenderFacts) {
	const amount = f.amount.split(/[;(]/)[0].trim()
	const rate = f.rate.startsWith('Not published') ? 'rates on application' : f.rate.replace(/\.$/, '')
	return `${f.name} business loans: ${amount}, ${rate}. See verified product fees, eligibility, and pros and cons.`
}

function factsSections(f: C1LenderFacts, keep: C1Section[]): C1Section[] {
	return [
		{
			heading: `${f.name} at a glance`,
			body: `Product terms verified against ${f.name}'s published website on ${prettyDate(f.checked)}. Terms change, so confirm with ${f.name} before you apply.`,
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
				],
			},
		},
		{
			heading: `${f.name} interest rates and fees`,
			body: `${f.rate}. ${f.fees}.`,
		},
		{
			heading: `${f.name} eligibility: who can apply`,
			body: `What ${f.name} lists on its website:`,
			bullets: f.eligibility,
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
			`Terms verified ${prettyDate(f.checked)}`,
			f.rate.startsWith('Not published') ? 'Rates quoted on application' : f.rate,
			f.amount.split(/[;(]/)[0].trim(),
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
	]
}

function compareSummary(a: C1LenderFacts, b: C1LenderFacts) {
	return `${a.name} offers ${a.amount.split(/[;(]/)[0].trim()} and ${b.name} offers ${b.amount.split(/[;(]/)[0].trim()}. Published lender terms verified on ${prettyDate(a.checked)}. Here is how their rates, fees, eligibility and speed compare side by side.`
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
		seoDescription: `${a.name} vs ${b.name}: loan amounts, rates, fees, eligibility and funding speed compared side by side. Verified against official lender terms on ${prettyDate(a.checked)}.`,
		primaryCtaLabel: 'Compare business loans',
		primaryCtaHref: '/quiz',
		lastReviewed: a.checked,
		proofPoints: [
			`Terms verified ${prettyDate(a.checked)}`,
			`${a.name}: ${a.amount.split(/[;(]/)[0].trim()}`,
			`${b.name}: ${b.amount.split(/[;(]/)[0].trim()}`,
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
