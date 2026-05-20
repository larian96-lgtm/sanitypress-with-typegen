'use client'

import type { C1PageData } from '@/lib/c1-pages'
import { C1EmbeddedQuoteFrame } from '@/ui/c1-funding-widget'

const trustItems = ['🔒 SSL secure connection', '✅ No credit pull to start', '⏱ 90-second funding-fit check']
const articleTakeaways = ['What the Economic Resilience Program zero interest pathway is.', 'Which businesses may fit the program criteria.', 'How to check your funding fit before applying.']

function cleanBody(text: string) {
  return text.replace(/^>\s*/gm, '').trim()
}

function formatReviewedDate(date: string) {
  if (!date) return ''
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function richParagraph(text: string) {
  const colon = text.indexOf(':')
  const canBoldLead = colon > 8 && colon < 58
  if (!canBoldLead) return text
  return (
    <>
      <strong className="font-extrabold text-[#0F172A]">{text.slice(0, colon + 1)}</strong>
      {text.slice(colon + 1)}
    </>
  )
}

function CtaBox({ title, body, label = 'Check funding fit' }: { title: string; body: string; label?: string }) {
  return (
    <div className="my-8 rounded-[28px] border border-[#CAE7D8] bg-[#EAF7EF] p-5 shadow-[0_14px_40px_rgba(7,76,62,0.10)] md:p-7">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#0A6B55]">Quick check</p>
      <h3 className="mb-3 text-2xl font-black leading-tight tracking-[-0.03em] text-[#03211B]">{title}</h3>
      <p className="mb-5 text-base leading-relaxed text-[#2F3A4A]">{body}</p>
      <a href="#funding-check" className="inline-flex min-h-[54px] w-full items-center justify-center rounded bg-[#0B6B57] px-6 text-center text-base font-black text-white no-underline shadow-[0_8px_22px_rgba(7,76,62,0.22)] sm:w-auto">
        {label}
      </a>
      <div className="mt-4 flex flex-wrap gap-2 text-[0.78rem] font-bold text-[#0A6B55]">
        {trustItems.map(item => <span key={item} className="rounded-full bg-white px-3 py-1 shadow-sm">{item}</span>)}
      </div>
    </div>
  )
}

function PhotoBreak({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-9 overflow-hidden rounded-[30px] bg-[#F5F6F7] shadow-[0_16px_48px_rgba(3,33,27,0.10)]">
      <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" />
      <figcaption className="px-4 py-3 text-xs font-semibold leading-relaxed text-[#5B6473]">{caption}</figcaption>
    </figure>
  )
}

function ArticleSection({ section, index }: { section: C1PageData['sections'][number]; index: number }) {
  const paragraphs = (section.body || '').split('\n').map(cleanBody).filter(Boolean)
  const showFirstCta = section.heading === 'Who may the program suit?'
  const showSecondCta = section.heading === 'If the zero interest loan does not fit'
  const showImage = false

  return (
    <section className={index === 0 ? 'mt-8' : 'mt-10'}>
      <h2 className="mb-4 border-l-[7px] border-[#FCB650] pl-4 text-[1.55rem] font-black leading-tight tracking-[-0.03em] text-[#03211B] md:text-[1.95rem]">
        {section.heading}
      </h2>

      {paragraphs.map((para, j) => (
        <p key={j} className="mb-5 text-[1.06rem] leading-[1.76] text-[#263244] md:text-[1.13rem]">
          {richParagraph(para)}
        </p>
      ))}

      {showImage && (
        <PhotoBreak
          src="/comparisonone/photos/zero-interest-loan-scheme-photo.jpg?v=1"
          alt="Australian small business context for the Economic Resilience Program zero interest loan pathway"
          caption="The Economic Resilience Program opened on 20 April 2026, but the funding path still has to fit the business."
        />
      )}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="mb-6 mt-2 space-y-3 text-[1.03rem] leading-[1.68] text-[#263244]">
          {section.bullets.map((b, j) => (
            <li key={j} className="rounded-2xl bg-[#F6FAF7] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(7,76,62,0.08)]">
              <span className="mr-2 font-black text-[#074C3E]">✓</span>{b.replace(/[.;]$/, '')}
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="my-8 grid gap-3">
          {section.table.rows.map((row, ri) => (
            <div key={ri} className="rounded-[22px] border border-[#D8EBDD] bg-white p-4 shadow-[0_8px_26px_rgba(3,33,27,0.06)]">
              <p className="mb-2 text-lg font-black text-[#074C3E]">{row[0]}</p>
              <p className="text-sm font-bold leading-relaxed text-[#0F172A]">{row[1]}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#526070]">{row[2]}</p>
            </div>
          ))}
        </div>
      )}

      {showFirstCta && (
        <CtaBox
          title="No time to read the article?"
          body="Get a clearer starting point before spending time on the wrong funding path."
          label="Check my funding fit"
        />
      )}

      {showSecondCta && (
        <CtaBox
          title="Start the process below to get a clearer starting point"
          body="The initial check is obligation free and there is no credit pull to start. Comparison One does not decide bank or program approval; it helps you avoid starting with the wrong path."
          label="Start the funding-fit check"
        />
      )}
    </section>
  )
}


const fundingPathTrustItems = ['No credit pull to start', '90-second check', 'Secure partner form', 'No obligation']
const fundingPathAssetBase = '/comparisonone/advertorial/funding-path-check'

const fundingPathImages: Record<string, { src: string; alt: string; caption: string }> = {
  hero: { src: `${fundingPathAssetBase}/sme-owner-documents.svg`, alt: 'Australian small business owner reviewing funding options before applying.', caption: 'Check sector, documents, urgency and repayment source before choosing a funding path.' },
  'The zero-interest loan may be real. But the pathway is narrower than the headline sounds.': { src: `${fundingPathAssetBase}/headline-vs-reality.svg`, alt: 'Graphic comparing the zero-interest business loan headline with the real eligibility and funding-fit questions.', caption: 'A strong headline still needs a practical eligibility and funding-fit check.' },
  'This pathway may be worth checking if…': { src: `${fundingPathAssetBase}/may-fit-card.svg`, alt: 'Comparison card showing when the government-backed business funding pathway may or may not fit.', caption: 'The official pathway may be worth checking for some businesses, but it is not always the right first move.' },
  'The real risk is not missing one loan. It is applying to the wrong funding path first.': { src: `${fundingPathAssetBase}/crossroads.svg`, alt: 'Business owner choosing between different funding paths before applying.', caption: 'Bank, government-backed, low-doc, invoice, equipment and line-of-credit paths solve different problems.' },
  'Comparison One starts one step earlier: with a Funding Fit Check': { src: `${fundingPathAssetBase}/funding-path-filter.svg`, alt: 'Funding Path Filter showing how business purpose, documents, urgency and repayment fit can affect the funding route.', caption: 'The Funding Path Filter starts with the business need before comparing lenders.' },
  'Different funding problems may need different funding paths': { src: `${fundingPathAssetBase}/scenario-icon-cards.svg`, alt: 'Business funding scenarios showing different funding paths for different business needs.', caption: 'Payroll, invoices, equipment, low-doc files, BAS pressure and bank declines point to different checks.' },
  'Do not fit the zero-interest pathway? That does not always mean you are out of options.': { src: `${fundingPathAssetBase}/backup-path.svg`, alt: 'Business owner reviewing backup funding pathways after checking fit.', caption: 'If the official route does not fit, a backup funding path may still be worth checking.' },
  'A safer first step before a full application': { src: `${fundingPathAssetBase}/trust-cards.svg`, alt: 'Trust indicators for Comparison One’s Funding Fit Check.', caption: 'A lower-friction check before a full application.' },
  'How the 90-second Funding Fit Check works': { src: `${fundingPathAssetBase}/how-it-works.svg`, alt: 'Three-step process showing how the Comparison One Funding Fit Check works.', caption: 'Tell us the funding purpose, answer fit questions, then compare the likely path.' },
  'Before you apply anywhere, check which funding path actually fits your business': { src: `${fundingPathAssetBase}/final-cta.svg`, alt: 'Australian business owner ready to check the right funding path before applying.', caption: 'Start with the path before applying blindly.' },
}

const fundingPathCtas: Record<string, { label: string; microcopy?: string }> = {
  hero: { label: 'Check My Funding Path', microcopy: 'No credit pull to start · 90-second check · Secure partner form · No obligation' },
  'Australian business funding update': { label: 'See Which Path May Fit First', microcopy: 'Takes about 90 seconds · No credit pull to start' },
  'This pathway may be worth checking if…': { label: 'Check My Funding Path', microcopy: 'No credit pull to start · Secure partner form · No obligation' },
  'The real risk is not missing one loan. It is applying to the wrong funding path first.': { label: 'Check Before I Apply Blindly' },
  'Comparison One starts one step earlier: with a Funding Fit Check': { label: 'Start the 90-Second Funding Fit Check', microcopy: 'You are not applying yet. You are checking the path.' },
  'Different funding problems may need different funding paths': { label: 'See Which Funding Path May Fit My Business' },
  'Do not fit the zero-interest pathway? That does not always mean you are out of options.': { label: 'Check My Backup Funding Path', microcopy: 'No credit pull to start · No obligation · Secure partner form' },
  'Your business may be stronger than your paperwork makes it look': { label: 'Find My Low-Doc Funding Pathway', microcopy: 'Check the path before choosing a lender.' },
  'A safer first step before a full application': { label: 'Start My Funding Fit Check' },
  'How the 90-second Funding Fit Check works': { label: 'Check My Funding Path Now', microcopy: 'Takes about 90 seconds · No credit pull to start · No obligation' },
  'Before you apply anywhere, check which funding path actually fits your business': { label: 'Start My 90-Second Funding Fit Check', microcopy: 'No credit pull to start · Secure partner form · No obligation · Partner terms may apply' },
}

function FundingPathTrustBadges() {
  return (
    <div className="mt-4 flex flex-wrap gap-2 text-xs font-extrabold text-[#074C3E]">
      {fundingPathTrustItems.map(item => <span key={item} className="rounded-full border border-[#CFE7D8] bg-white px-3 py-1 shadow-sm">{item}</span>)}
    </div>
  )
}

function FundingPathCTA({ cta }: { cta?: { label: string; microcopy?: string } }) {
  if (!cta) return null
  return (
    <div className="my-8 rounded-[26px] border border-[#CFE7D8] bg-[#EAF7EF] p-5 shadow-[0_14px_36px_rgba(7,76,62,0.10)] md:p-6">
      <a href="#funding-check" className="inline-flex min-h-[56px] w-full items-center justify-center rounded bg-[#0B6B57] px-6 text-center text-base font-black text-white no-underline shadow-[0_10px_24px_rgba(7,76,62,0.22)] sm:w-auto">
        {cta.label}
      </a>
      {cta.microcopy && <p className="mt-3 text-sm font-bold leading-relaxed text-[#0A6B55]">{cta.microcopy}</p>}
      <FundingPathTrustBadges />
    </div>
  )
}

function FundingPathImage({ item }: { item?: { src: string; alt: string; caption: string } }) {
  if (!item) return null
  return (
    <figure className="my-8 overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#F8FAF9] shadow-[0_14px_42px_rgba(3,33,27,0.08)]">
      <img src={item.src} alt={item.alt} className="h-auto w-full object-cover" loading="lazy" />
      <figcaption className="px-4 py-3 text-xs font-semibold leading-relaxed text-[#526070]">{item.caption}</figcaption>
    </figure>
  )
}

function FundingPathTable({ section }: { section: C1PageData['sections'][number] }) {
  if (!section.table) return null
  if (section.heading === 'Different funding problems may need different funding paths') {
    return (
      <div className="my-7 grid gap-4 md:grid-cols-2">
        {section.table.rows.map((row) => (
          <div key={row[0]} className="rounded-[22px] border border-[#D8EBDD] bg-white p-5 shadow-[0_10px_28px_rgba(3,33,27,0.06)]">
            <h3 className="mb-2 text-lg font-black text-[#074C3E]">{row[0]}</h3>
            <p className="mb-4 text-sm font-semibold leading-relaxed text-[#334155]">{row[1]}</p>
            <a href="#funding-check" className="text-sm font-black text-[#0B6B57] no-underline">{row[2]}</a>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="my-7 grid gap-4">
      {section.table.rows.map((row, rowIndex) => (
        <div key={`${row[0]}-${rowIndex}`} className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-[0_10px_26px_rgba(3,33,27,0.05)] md:grid md:grid-cols-2 md:gap-5">
          {row.map((cell, cellIndex) => (
            <div key={`${cell}-${cellIndex}`} className={cellIndex > 0 ? 'mt-3 md:mt-0' : ''}>
              <p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#0B6B57]">{section.table?.headers[cellIndex]}</p>
              <p className="text-sm font-semibold leading-relaxed text-[#263244]">{cell}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function FundingPathSection({ section }: { section: C1PageData['sections'][number] }) {
  const paragraphs = (section.body || '').split(/\n\n+/).map(cleanBody).filter(Boolean)
  return (
    <section className="mt-11 border-t border-[#E5E7EB] pt-9 first:mt-8 first:border-t-0 first:pt-0">
      <h2 className="mb-5 text-[1.75rem] font-black leading-tight tracking-[-0.035em] text-[#111827] md:text-[2.25rem]">{section.heading}</h2>
      <div className="space-y-5">
        {paragraphs.map((paragraph, index) => (
          <p key={`${section.heading}-${index}`} className="text-[1.08rem] leading-[1.78] text-[#263244] md:text-[1.16rem]">
            {richParagraph(paragraph)}
          </p>
        ))}
      </div>
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="rounded-[18px] border border-[#DDEBE4] bg-[#F6FAF7] px-4 py-3 text-sm font-bold leading-relaxed text-[#263244]">
              <span className="mr-2 text-[#0B6B57]">•</span>{bullet}
            </li>
          ))}
        </ul>
      )}
      <FundingPathTable section={section} />
      <FundingPathImage item={fundingPathImages[section.heading]} />
      <FundingPathCTA cta={fundingPathCtas[section.heading]} />
    </section>
  )
}

function FundingPathAdvertorial({ page }: { page: C1PageData }) {
  const reviewedDate = formatReviewedDate(page.lastReviewed)
  const heroParagraphs = page.summary.split('\n\n').map(p => p.trim()).filter(Boolean)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: page.headline, description: page.seoDescription, dateModified: page.lastReviewed, author: { '@type': 'Organization', name: 'Comparison One SME Finance Editorial Team' }, publisher: { '@type': 'Organization', name: 'Comparison One' } }) }} />
      <main className="min-h-screen bg-white pb-24 text-[#111827] md:pb-0">
        <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1040px] items-center justify-between gap-4 px-4 py-3">
            <img src="/comparisonone/logo.png?v=7" alt="Comparison One" className="h-10 w-auto md:h-12" />
            <a href="#funding-check" className="hidden rounded bg-[#0B6B57] px-4 py-2 text-sm font-black text-white no-underline sm:inline-flex">Check My Funding Path</a>
          </div>
        </header>
        <article className="mx-auto max-w-[1040px] px-4 pb-14 pt-6 md:pt-10">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5B6473]">
            <span>{page.eyebrow}</span>
            <span>Updated {reviewedDate || 'May 2026'}</span>
            <span className="rounded-full bg-[#FFF7E6] px-3 py-1 text-[#8A5A00]">Funding fit first</span>
          </div>
          <section className="grid items-center gap-8 border-b border-[#E5E7EB] pb-8 md:grid-cols-[1.08fr_0.92fr]">
            <div>
              <h1 className="text-[2.35rem] font-black leading-[1.04] tracking-[-0.045em] text-[#111827] md:text-[4.15rem]">{page.headline}</h1>
              <div className="mt-5 space-y-4">
                {heroParagraphs.map((paragraph) => <p key={paragraph} className="text-[1.12rem] font-medium leading-[1.65] text-[#374151] md:text-[1.25rem]">{paragraph}</p>)}
              </div>
              <FundingPathCTA cta={fundingPathCtas.hero} />
              <p className="mt-4 rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-xs font-semibold leading-relaxed text-[#526070]">Comparison One is not a lender, credit provider, government agency or financial adviser. Funding availability, approval, rates, fees, timing and eligibility depend on lender or partner assessment.</p>
            </div>
            <FundingPathImage item={fundingPathImages.hero} />
          </section>
          {page.sections.map((section) => <FundingPathSection key={section.heading} section={section} />)}
          <section id="funding-check" className="mt-12 scroll-mt-24 rounded-[28px] border border-[#CFE7D8] bg-[#F6FAF7] p-4 md:p-6">
            <h2 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#03211B]">Start My 90-Second Funding Fit Check</h2>
            <p className="mb-5 text-sm font-bold leading-relaxed text-[#0A6B55]">No credit pull to start · Secure partner form · No obligation · Partner terms may apply</p>
            <C1EmbeddedQuoteFrame showDirectLink={false} />
          </section>
          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-10 rounded-[28px] bg-white p-5 shadow-[0_12px_38px_rgba(3,33,27,0.08)] md:p-7">
              <h2 className="mb-4 text-[1.65rem] font-black tracking-[-0.03em] text-[#03211B]">Common questions before you start</h2>
              <div className="divide-y divide-[#E5E7EB]">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="cursor-pointer list-none text-base font-extrabold text-[#111827] [&::-webkit-details-marker]:hidden">{faq.question}</summary>
                    <p className="mt-3 text-base leading-relaxed text-[#4B5563]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#CFE7D8] bg-white p-3 shadow-[0_-8px_24px_rgba(3,33,27,0.12)] md:hidden">
          <a href="#funding-check" className="flex min-h-[52px] items-center justify-center rounded bg-[#0B6B57] px-4 text-center text-base font-black text-white no-underline">Check My Funding Path</a>
          <p className="mt-1 text-center text-xs font-bold text-[#0A6B55]">No credit pull to start</p>
        </div>
        <footer className="px-4 pb-8 text-center text-xs font-semibold leading-relaxed text-[#5B6473]">© {new Date().getFullYear()} Comparison One</footer>
      </main>
    </>
  )
}

export default function C1AdvertorialPage({ page }: { page: C1PageData }) {
  if (page.slug === 'funding-path-check-zero-interest-business-loans') return <FundingPathAdvertorial page={page} />
  const sourceSection = page.sections?.find(s => /source/i.test(s.heading))
  const contentSections = page.sections?.filter(s => s !== sourceSection && !/editorial review|editorial disclaimer|compliance|important disclaimer/i.test(s.heading)) ?? []
  const reviewedDate = formatReviewedDate(page.lastReviewed)
  const heroParagraphs = page.summary.split('\n\n').map(p => p.trim()).filter(Boolean)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: page.headline,
          description: page.summary.replace(/>\s*/g, '').replace(/\s+/g, ' ').trim().slice(0, 160),
          dateModified: page.lastReviewed,
          author: { '@type': 'Organization', name: 'Comparison One SME Finance Editorial Team' },
          publisher: { '@type': 'Organization', name: 'Comparison One' },
        })
      }} />

      <main className="min-h-screen bg-white text-[#111827]">
        <header className="bg-white shadow-[0_3px_18px_rgba(3,33,27,0.07)]">
          <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-4 py-3">
            <img src="/comparisonone/logo.png?v=7" alt="Comparison One" className="h-10 w-auto md:h-12" />
            <span className="hidden text-sm font-semibold text-[#6B7280] sm:inline">Business funding news</span>
          </div>
        </header>

        <article className="mx-auto max-w-[900px] px-4 pb-12 pt-5 md:pb-16 md:pt-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5B6473]">
            <span>Updated {reviewedDate || 'May 2026'}</span>
            <span className="rounded-full bg-white px-3 py-1 text-[#074C3E] shadow-sm">Business funding news</span>
            <span className="rounded-full bg-white px-3 py-1 text-[#074C3E] shadow-sm">Independent comparison service</span>
          </div>

          <section className="border-b border-[#E5E7EB] pb-6">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#074C3E]">Revealed</p>
            <h1 className="max-w-[760px] text-[2.35rem] font-black leading-[1.04] tracking-[-0.045em] text-[#111827] md:text-[4rem]">
              {page.headline}
            </h1>
            <div className="mt-5 max-w-[720px] space-y-4">
              {heroParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-[1.15rem] font-medium leading-[1.6] text-[#374151] md:text-[1.28rem]">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5B6473]">
              <span>🔒 SSL secure connection</span>
              <span>✅ No credit pull to start</span>
              <span>⏱ 90-second funding-fit check</span>
            </div>

          </section>

          <PhotoBreak
            src="/comparisonone/photos/zero-interest-loan-scheme-photo.jpg?v=1"
            alt="Australian small business context for the Economic Resilience Program"
            caption="Australian small business context for the Economic Resilience Program. The program may help eligible businesses, but the funding path still has to fit the business."
          />

          <section className="mt-7 rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-5 md:p-7">
            <h2 className="mb-2 text-[1.6rem] font-black leading-tight tracking-[-0.03em] text-[#111827]">No time to read?</h2>
            <p className="mb-4 text-base leading-relaxed text-[#374151]">The Program comes with strict industry and bank criteria. Click below to match with non-bank lenders that may be more suitable for your business.</p>
            <a href="#funding-check" className="inline-flex min-h-[54px] w-full items-center justify-center rounded bg-[#0B6B57] px-6 text-center text-base font-black text-white no-underline sm:w-auto">
              Start the funding-fit check
            </a>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#0A6B55]">
              {trustItems.map(item => <span key={item} className="rounded-full bg-white px-3 py-1 shadow-sm">{item}</span>)}
            </div>
          </section>

          <section className="mt-7 border-y border-[#E5E7EB] py-5">
            <p className="mb-3 text-[1.08rem] font-bold text-[#263244]">In this article you’ll learn:</p>
            <ul className="grid gap-3 md:grid-cols-3">
              {articleTakeaways.map(item => (
                <li key={item} className="border-l-4 border-[#FCB650] bg-[#FFFBEB] px-4 py-3 text-sm font-black leading-relaxed text-[#111827]">
                  <span className="mr-2 text-[#074C3E]">•</span>{item}
                </li>
              ))}
            </ul>
          </section>

          {contentSections.map((section, i) => (
            <ArticleSection key={`${section.heading}-${i}`} section={section} index={i} />
          ))}

          <section id="funding-check" className="mt-12 scroll-mt-8 border-t border-[#E5E7EB] pt-8">
            <C1EmbeddedQuoteFrame showDirectLink={false} />
          </section>

          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-10 rounded-[28px] bg-white p-5 shadow-[0_12px_38px_rgba(3,33,27,0.08)] md:p-7">
              <h2 className="mb-4 text-[1.55rem] font-black tracking-[-0.03em] text-[#03211B]">Common questions</h2>
              <div className="divide-y divide-[#E5E7EB]">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="cursor-pointer list-none text-base font-extrabold text-[#111827] [&::-webkit-details-marker]:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-base leading-relaxed text-[#4B5563]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        <footer className="px-4 pb-8 text-center text-xs font-semibold leading-relaxed text-[#5B6473]">
          © {new Date().getFullYear()} Comparison One
        </footer>
      </main>
    </>
  )
}
