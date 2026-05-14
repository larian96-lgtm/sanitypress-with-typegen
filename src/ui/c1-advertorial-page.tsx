'use client'

import type { C1PageData } from '@/lib/c1-pages'
import { C1EmbeddedQuoteFrame } from '@/ui/c1-funding-widget'

const trustItems = ['🔒 SSL secure connection', '✅ No credit pull to start', '⏱ 90-second funding-fit check']
const articleTakeaways = ['what the government backed zero interest loan program is', 'if your business may be eligible to benefit from the scheme', 'how to check your funding fit before applying']

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

function CtaBox({ title, body, label = 'Check eligibility' }: { title: string; body: string; label?: string }) {
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
  const showFirstCta = section.heading === 'Who is eligible for the scheme?'
  const showSecondCta = section.heading === 'If the zero interest loan does not fit'
  const showImage = section.heading === 'What is the government backed zero interest loan program?'

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
          src="/comparisonone/photos/au-money-4.png"
          alt="Australian small business funding documents and currency"
          caption="The zero interest pathway may help eligible businesses, but the fit still has to be checked."
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
          body="Find out if your business may fit the zero interest loan program and what information you may need next."
          label="Check my funding fit"
        />
      )}

      {showSecondCta && (
        <CtaBox
          title="Start the process below to find out more"
          body="The initial check is obligation free and there is no credit pull to start."
          label="Start the check"
        />
      )}
    </section>
  )
}

export default function C1AdvertorialPage({ page }: { page: C1PageData }) {
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
            <img src="/comparisonone/logo.png?v=uploaded" alt="Comparison One" className="h-10 w-auto md:h-12" />
            <span className="hidden text-sm font-semibold text-[#6B7280] sm:inline">Business funding news</span>
          </div>
        </header>

        <article className="mx-auto max-w-[900px] px-4 pb-12 pt-5 md:pb-16 md:pt-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5B6473]">
            <span>Updated {reviewedDate || 'May 2026'}</span>
            <span className="rounded-full bg-white px-3 py-1 text-[#074C3E] shadow-sm">Business funding update</span>
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

          <section className="mt-7 rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-5 md:p-7">
            <h2 className="mb-2 text-[1.6rem] font-black leading-tight tracking-[-0.03em] text-[#111827]">No time to read?</h2>
            <p className="mb-4 text-base leading-relaxed text-[#374151]">Find out if your business may fit the zero interest loan program and get a clearer starting point before applying.</p>
            <a href="#funding-check" className="inline-flex min-h-[54px] w-full items-center justify-center rounded bg-[#0B6B57] px-6 text-center text-base font-black text-white no-underline sm:w-auto">
              Start the check
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
                  <span className="mr-2 text-[#074C3E]">✓</span>{item}
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
