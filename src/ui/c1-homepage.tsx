'use client'

import Link from 'next/link'
import Image from 'next/image'
import { buildC1HomepageStructuredData } from '@/lib/c1-seo'
import { C1Header, C1Footer } from '@/ui/c1-brand'
import { C1FundingWidget } from '@/ui/c1-funding-widget'

type TextCard = { title?: string; description?: string; href?: string; linkLabel?: string }
type Faq = { question?: string; answer?: string }
type Testimonial = { quote: string; author: string; role?: string }

function cleanHomepageText(value?: string) {
  return (value || '').replace(/\\u2605/g, '★').replace(/\s+—\s+/g, ', ')
}

export type C1HomepageData = {
  title?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroSubtitle?: string
  heroImage?: string
  heroImageAlt?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  trustStrip?: string
  whyEyebrow?: string
  whyHeading?: string
  whyBody?: string
  whyCards?: TextCard[]
  docEyebrow?: string
  docHeading?: string
  docBody?: string
  docCtaLabel?: string
  docCtaHref?: string
  checklist?: string[]
  pathwayEyebrow?: string
  pathwayHeading?: string
  pathwayCards?: TextCard[]
  testimonials?: Testimonial[]
  declineHeading?: string
  declineBody?: string
  declineCtaLabel?: string
  declineCtaHref?: string
  guideHeading?: string
  guideCards?: TextCard[]
  faqHeading?: string
  faqs?: Faq[]
  finalHeading?: string
  finalBody?: string
  finalCtaLabel?: string
  finalCtaHref?: string
  seoTitle?: string
  seoDescription?: string
}

// Icons for pathway cards
const PATHWAY_ICONS: Record<number, string> = {
  0: '↑',    // ↑ working capital
  1: '◇',   // ◇ invoice finance
  2: '⚙',   // ⚙ equipment
  3: '→',   // → bank decline
  4: '◊',   // ◊ tax debt
  5: '↔',   // ↔ line of credit
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Had a clear view of what lenders would ask before I applied. That alone saved me from firing off applications that would have gone nowhere.',
    author: 'Sarah M.',
    role: 'Wholesale distributor, VIC',
  },
  {
    quote: 'Most comparison sites just list rates. This one asks what the money is for and whether you actually have the documents. That is the conversation lenders are having anyway.',
    author: 'James T.',
    role: 'Manufacturing, NSW',
  },
  {
    quote: 'Knocked back by the bank, had no idea why. The guide on what to check after a decline was more useful than three phone calls to the lender.',
    author: 'Priya K.',
    role: 'Hospitality, QLD',
  },
  {
    quote: 'Applied for equipment finance knowing what documents to have ready. The whole thing took days instead of weeks.',
    author: 'Michael R.',
    role: 'Transport, WA',
  },
]

export const c1HomepageFallback: Required<C1HomepageData> = {
  title: 'Comparison One Homepage',
  heroEyebrow: 'Business loan comparison Australia',
  heroHeadline: 'Business loan comparison for Australian SMEs',
  heroSubtitle: 'Comparison One helps Australian business owners compare funding pathways before applying. It is not a lender and does not provide financial advice. Use it to check loan types, lender fit, document readiness, rates and funding needs before sending an enquiry.',
  heroImage: '/comparisonone/photos/au-money-1.png',
  heroImageAlt: 'Australian business finance desk with AUD notes, calculator, and funding documents',
  primaryCtaLabel: 'Check my funding fit',
  secondaryCtaLabel: 'Compare business loan types',
  secondaryCtaHref: '/business-loans',
  trustStrip: 'Documents first • Product fit before lender fit • Bank, non-bank and specialist pathways',
  whyEyebrow: 'Why Comparison One',
  whyHeading: 'Compare the funding path before you compare the lender',
  whyBody: 'Most comparison sites begin with the product name. Comparison One starts with the reason cash is needed, the timing pressure, the documents available and the repayment source.',
  whyCards: [
    { title: 'Know what lenders will check', description: 'Revenue, trading history, bank statements, tax position, existing debt, loan purpose, security and repayment capacity can all shape the outcome.' },
    { title: 'Match the product to the cash-flow problem', description: 'A stock gap, unpaid invoice, equipment purchase, bank decline and job deposit may each need a different funding pathway.' },
    { title: 'Avoid weak applications', description: 'Sending the wrong documents to the wrong lender wastes time and can make a viable business look unprepared.' },
  ],
  docEyebrow: 'Prepare before timing gets tight',
  docHeading: 'Funding delays often start before the lender says anything',
  docBody: 'Owners often lose time because the lender asks for information that is not ready. If the funding is for stock, wages, equipment, supplier deposits or a job already won, every missing document can push the decision further away.',
  docCtaLabel: 'Read the requirements guide',
  docCtaHref: '/blog/business-loan-requirements-australia',
  checklist: [
    'ABN, trading history and business details',
    'Last 3 to 6 months of business bank statements',
    'BAS, GST records or financials for larger requests',
    'ATO position or payment-plan details if relevant',
    'Invoices, purchase orders or contracts tied to the funding need',
    'Asset quotes, supplier invoices or vehicle details',
    'Clear use of funds, amount needed and repayment source',
    'Existing debts, commitments and repayment rhythm',
  ],
  pathwayEyebrow: 'Start with the reason cash is needed',
  pathwayHeading: 'Different funding problems need different pathways',
  pathwayCards: [
    { title: 'A bigger job needs cash upfront', description: 'Materials, labour, mobilisation costs or supplier deposits may be due before the customer pays.', href: '/business-loans/working-capital', linkLabel: 'Read the guide' },
    { title: 'Invoices are out, but cash has not landed', description: 'Invoice finance may fit some B2B businesses with eligible receivables and reliable debtors.', href: '/business-loans/invoice-finance', linkLabel: 'Read the guide' },
    { title: 'Equipment is needed before revenue increases', description: 'Asset finance may match equipment cost to the period it helps the business earn.', href: '/business-loans/equipment-finance', linkLabel: 'Read the guide' },
    { title: 'The bank said no, but the reason matters', description: 'A decline may be about policy, timing, security, documents or affordability. The next move depends on why.', href: '/business-loans/knocked-back-by-bank', linkLabel: 'Read the guide' },
    { title: 'Tax or BAS pressure is tightening cash flow', description: 'Some situations need advice and payment-plan review before taking on more debt.', href: '/business-loans/tax-debt', linkLabel: 'Read the guide' },
    { title: 'Stock or seasonal demand is coming', description: 'The risk is buying too late, buying too much, or using the wrong repayment structure.', href: '/business-loans/line-of-credit', linkLabel: 'Read the guide' },
  ],
  testimonials: DEFAULT_TESTIMONIALS,
  declineHeading: 'A bank decline is information, not the end of the search',
  declineBody: 'The useful next step is not to apply everywhere. First find out whether the issue was security, serviceability, tax position, documents, industry appetite or loan purpose.',
  declineCtaLabel: 'What to do after a bank decline',
  declineCtaHref: '/business-loans/knocked-back-by-bank',
  guideHeading: 'Practical funding guides before you apply',
  guideCards: [
    { title: 'Business loan requirements', description: 'What lenders may ask for before an SME applies: revenue, statements, tax position, use of funds, security and affordability.', href: '/blog/business-loan-requirements-australia', linkLabel: 'Read guide' },
    { title: 'How lenders assess applications', description: 'The checks behind lender decisions, including documents, bank conduct, repayment capacity and product fit.', href: '/blog/how-business-lenders-assess-applications', linkLabel: 'Read guide' },
    { title: 'Secured vs unsecured business loans', description: 'How security, guarantees, speed, pricing and repayment pressure change the funding path.', href: '/blog/secured-vs-unsecured-business-loans', linkLabel: 'Read guide' },
    { title: 'Business loan lender profiles', description: 'Compare lender categories, product fit, documents and watch-outs before choosing where to apply.', href: '/lenders', linkLabel: 'View lender directory' },
    { title: 'Non-bank business lender comparison', description: 'Compare non-bank lender fit variables without treating the page as a ranking or approval shortcut.', href: '/compare/non-bank-business-lenders', linkLabel: 'Compare lender types' },
  ],
  faqHeading: 'Frequently asked questions',
  faqs: [
    { question: 'What does Comparison One do?', answer: 'Comparison One helps Australian business owners compare funding pathways by fit: use of funds, cash-flow timing, documents, security, repayment capacity and lender criteria. It is a comparison and enquiry pathway, not a lender.' },
    { question: 'What does avoid applying blind mean?', answer: 'It means checking the likely product path and document requirements before sending an application to a lender that may not suit the situation.' },
    { question: 'What documents should I prepare first?', answer: 'Start with ABN details, recent business bank statements, use of funds, amount needed, repayment source and any evidence tied to the funding need, such as invoices, contracts or asset quotes.' },
    { question: 'What if my bank already declined me?', answer: 'Ask why before applying again. A decline reason can point to a better next step or show that preparation is needed before more applications.' },
    { question: 'Is this financial advice?', answer: 'No. The information on Comparison One is general only. It does not consider your objectives, financial situation or needs. Speak with qualified advisers before making finance, tax or legal decisions.' },
  ],
  finalHeading: 'Do not wait until the lender asks for documents',
  finalBody: 'If funding may be needed for a job, stock, equipment, invoices or cash-flow timing, start by checking what path fits and what information should be ready.',
  finalCtaLabel: 'Start my funding readiness check',
  finalCtaHref: '/quiz',
  seoTitle: 'Business Loan Comparison Australia | Check Funding Fit Before You Apply',
  seoDescription: 'Compare Australian SME funding pathways before applying. Check business loan types, lender fit, document requirements, rates and funding readiness with Comparison One.',
}

function mergeHomepage(data?: C1HomepageData | null) {
  return {
    ...c1HomepageFallback,
    ...Object.fromEntries(Object.entries(data || {}).filter(([, value]) => value !== undefined && value !== null && value !== '')),
    whyCards: data?.whyCards?.length ? data.whyCards : c1HomepageFallback.whyCards,
    checklist: data?.checklist?.length ? data.checklist : c1HomepageFallback.checklist,
    pathwayCards: data?.pathwayCards?.length ? data.pathwayCards : c1HomepageFallback.pathwayCards,
    guideCards: data?.guideCards?.length ? data.guideCards : c1HomepageFallback.guideCards,
    faqs: data?.faqs?.length ? data.faqs : c1HomepageFallback.faqs,
    testimonials: data?.testimonials?.length ? data.testimonials : c1HomepageFallback.testimonials,
  }
}

// ------------------------------------------------------------------
// Hero section: tagline + widget left, image right, pathway cards below
// Inspired by money.com.au's hero + product category grid
// ------------------------------------------------------------------
function HeroSection({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="relative overflow-hidden bg-[#074C3E]">
      {/* Decorative background circles */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#FCB650]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#E0F300]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 md:pt-24">
        {/* Top area: text + image */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:pb-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#FCB650]">
              {cleanHomepageText(page.heroEyebrow)}
            </p>
            <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              {page.heroHeadline === 'Avoid applying blind for business funding' ? 'Business loan comparison for Australian SMEs' : page.heroHeadline}
            </h1>
            <p className="mb-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              {page.heroSubtitle === 'Comparison One helps Australian SME owners check the funding path before the lender. See what lenders may ask for, what documents to prepare, and which product type may fit the cash-flow problem before you send an application.' ? 'Comparison One helps Australian business owners compare funding pathways before applying. It is not a lender and does not provide financial advice. Use it to check loan types, lender fit, document readiness, rates and funding needs before sending an enquiry.' : page.heroSubtitle}
            </p>
            <div className="mb-7 max-w-xl rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/82 ring-1 ring-white/15">
              <p className="mb-1 font-bold text-[#FCB650]">What is Comparison One?</p>
              <p>Comparison One is an Australian SME finance comparison and funding-readiness site. It helps business owners compare funding paths, documents and lender-fit signals before applying.</p>
            </div>
            <C1FundingWidget className="mb-4 max-w-xl" buttonLabel={page.primaryCtaLabel} />
            <Link
              href={page.secondaryCtaHref}
              className="inline-block rounded-full border-2 border-white/25 px-7 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:text-white"
            >
              {page.secondaryCtaLabel}
            </Link>

            {/* Trust signal inline */}
            <p className="mt-6 text-sm text-white/50">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#FCB650]">★</span>
                <span>SME funding path checked before you apply, not a lender, not a broker</span>
              </span>
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={page.heroImage}
              alt={page.heroImageAlt}
              width={550}
              height={450}
              className="w-full max-w-md rounded-2xl shadow-[0px_12px_40px_rgba(0,0,0,0.25)]"
              priority
            />
          </div>
        </div>

        {/* Pathway cards row — sits on same dark green bg, floats as light cards */}
        <div className="relative -mb-6 mt-8 pb-4 md:mt-4 md:pb-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.pathwayCards.map((card, i) => (
              <Link
                key={`${card.title}-${i}`}
                href={card.href || '/'}
                className="group rounded-2xl bg-white p-5 shadow-[0px_6px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0px_8px_35px_rgba(0,0,0,0.12)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#074C3E]/10 text-lg font-bold text-[#074C3E] transition-colors group-hover:bg-[#074C3E] group-hover:text-white">
                  {PATHWAY_ICONS[i] || i + 1}
                </div>
                <h3 className="mb-1 text-[15px] font-semibold leading-snug text-[#222E48] transition-colors group-hover:text-[#074C3E]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6A7283]">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Trust strip
// ------------------------------------------------------------------
function TrustStrip({ text }: { text: string }) {
  return (
    <section className="border-b border-[#DFE0E4] bg-[#F5F6F7] py-5">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6A7283]">
          {cleanHomepageText(text)}
        </p>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Why Comparison One — 3 numbered feature cards
// ------------------------------------------------------------------
function WhySection({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#FCB650]">
          {page.whyEyebrow}
        </p>
        <h2 className="mb-3 text-center text-3xl font-bold text-[#222E48] md:text-4xl">
          {page.whyHeading}
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[#6A7283]">
          {page.whyBody}
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {page.whyCards.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="rounded-2xl bg-[#F5F6F7] p-8 text-center transition-shadow hover:shadow-[0px_6px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#074C3E]/10">
                <span className="text-2xl font-bold text-[#074C3E]">{i + 1}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#222E48]">{item.title}</h3>
              <p className="leading-relaxed text-[#6A7283]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Document checklist — two column layout
// ------------------------------------------------------------------
function DocumentChecklist({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="bg-[#F5F6F7] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#FCB650]">
            {page.docEyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-[#222E48] md:text-4xl">
            {page.docHeading}
          </h2>
          <p className="mb-5 leading-relaxed text-[#6A7283]">
            {page.docBody}
          </p>
          <Link
            href={page.docCtaHref}
            className="inline-block rounded-full bg-[#074C3E] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#03211B]"
          >
            {page.docCtaLabel}
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {page.checklist.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#DFE0E4] bg-white p-5 text-sm font-medium leading-relaxed text-[#404A60] shadow-sm"
            >
              <span className="mr-2 font-bold text-[#074C3E]">{'✓'}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Testimonials — inspired by money.com.au social proof
// ------------------------------------------------------------------
function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#FCB650]">
          What business owners say
        </h2>
        <p className="mb-14 text-center text-3xl font-bold text-[#222E48] md:text-4xl">
          Real experiences from Australian SME owners
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-[#DFE0E4] bg-white p-6 shadow-sm"
            >
              <div className="mb-3 text-3xl leading-none text-[#074C3E]/20">{'“'}</div>
              <p className="mb-4 flex-1 text-sm leading-relaxed italic text-[#404A60]">
                {t.quote}
              </p>
              <div className="border-t border-[#DFE0E4] pt-3">
                <p className="text-sm font-semibold text-[#222E48]">{t.author}</p>
                {t.role && <p className="text-xs text-[#6A7283]">{t.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Bank decline CTA — dark green full-width block
// ------------------------------------------------------------------
function BankDeclineSection({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="bg-[#074C3E] py-20">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{page.declineHeading}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80">
          {page.declineBody}
        </p>
        <Link
          href={page.declineCtaHref}
          className="inline-block rounded-full bg-[#FCB650] px-8 py-3.5 text-base font-semibold text-[#03211B] transition-colors hover:bg-[#fcc970]"
        >
          {page.declineCtaLabel}
        </Link>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Guides card grid
// ------------------------------------------------------------------
function GuidesSection({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-14 text-center text-3xl font-bold text-[#222E48] md:text-4xl">
          {page.guideHeading}
        </h2>
        <CardGrid cards={page.guideCards} defaultLabel="Read guide" />
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// FAQ accordion
// ------------------------------------------------------------------
function FaqSection({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="bg-[#F5F6F7] py-20" id="faq">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-14 text-center text-3xl font-bold text-[#222E48] md:text-4xl">
          {page.faqHeading}
        </h2>
        <div className="space-y-3">
          {page.faqs.map((item, i) => (
            <details
              key={`${item.question}-${i}`}
              className="group rounded-xl border border-[#DFE0E4] bg-white"
            >
              <summary className="cursor-pointer px-6 py-4 text-lg font-semibold text-[#222E48] transition-colors hover:text-[#074C3E]">
                {item.question}
              </summary>
              <div className="px-6 pb-4 leading-relaxed text-[#6A7283]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Final CTA
// ------------------------------------------------------------------
function FinalCtaSection({ page }: { page: Required<C1HomepageData> }) {
  return (
    <section className="py-20" id="calculator">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#222E48] md:text-4xl">
          {page.finalHeading}
        </h2>
        <p className="mb-8 text-lg text-[#6A7283]">
          {page.finalBody}
        </p>
        <Link
          href={page.finalCtaHref}
          className="inline-block rounded-full bg-[#FCB650] px-10 py-4 text-lg font-semibold text-[#03211B] transition-colors hover:bg-[#fcc970]"
        >
          {page.finalCtaLabel}
        </Link>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// Reusable card grid component
// ------------------------------------------------------------------
function CardGrid({ cards, defaultLabel }: { cards: TextCard[]; defaultLabel: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((item, i) => (
        <Link
          key={`${item.title}-${i}`}
          href={item.href || '/'}
          className="group rounded-xl border border-[#DFE0E4] bg-white p-6 transition-shadow hover:shadow-[0px_6px_30px_rgba(0,0,0,0.08)]"
        >
          <h3 className="mb-2 text-lg font-semibold text-[#222E48] transition-colors group-hover:text-[#074C3E]">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#6A7283]">
            {item.description}
          </p>
          <span className="mt-3 inline-block text-sm font-semibold text-[#074C3E]">
            {item.linkLabel || defaultLabel} {'→'}
          </span>
        </Link>
      ))}
    </div>
  )
}

// ------------------------------------------------------------------
// Main export
// ------------------------------------------------------------------
export default function C1Homepage({ data }: { data?: C1HomepageData | null }) {
  const page = mergeHomepage(data)
  const jsonLd = buildC1HomepageStructuredData(page)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <C1Header />
      <HeroSection page={page} />
      <TrustStrip text={page.trustStrip} />
      <WhySection page={page} />
      <DocumentChecklist page={page} />
      <TestimonialsSection testimonials={page.testimonials} />
      <BankDeclineSection page={page} />
      <GuidesSection page={page} />
      <FaqSection page={page} />
      <FinalCtaSection page={page} />
      <C1Footer />
    </>
  )
}
