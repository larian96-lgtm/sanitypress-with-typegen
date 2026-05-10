# Comparison One — Rate Widget & SEO/AEO Upgrade Spec

## Objective

Bring live, decision-ready rate data onto Comparison One business-loan pages
comparable to money.com.au's lender table, while keeping the fit-first narrative
that differentiates C1 from pure comparison sites.

---

## Architecture

Three layers:

1. **Rate Snapshot** — category-level rate bands at the top of each page
2. **Rate Comparison Widget** — a full lender rate table with filters
3. **Freshness & Schema** — the trust/signals layer that makes #1 and #2 rank

All three are CMS-managed via Sanity so Ian's team can update rates without
touching code.

---

## Phase 1 — Rate Snapshot (category band block)

### Schema

Add a new field `rateSnapshot` to `c1.contentPage`:

```
rateSnapshot: array of objects
  - label: string       (e.g. "Secured finance from")
  - rate: string        (e.g. "7.49%")
  - sublabel: string    (e.g. "Per annum")
  - linkHref: string    (optional, links to the relevant subpage)
  - linkLabel: string   (optional, e.g. "View equipment finance")
```

This mirrors money.com.au's top-of-page rate summary cards.

### Frontend

New component: `C1RateSnapshot`

- Renders horizontal cards in a responsive grid
- Each card: label (small), rate (large), sublabel, optional link
- Finview style: green `#074C3E` text on white cards with soft shadow
- Renders above the first content section if `rateSnapshot` data exists

### Rendering

In `src/ui/c1-content-page.tsx`, after the hero and before `sections.map`:

```
{pageData.rateSnapshot?.length > 0 && <C1RateSnapshot data={pageData.rateSnapshot} />}
```

### Files to create

| File | Purpose |
|------|---------|
| `src/sanity/schemaTypes/objects/rate-snapshot.ts` | Schema object definition |
| `src/ui/c1-rate-snapshot.tsx` | React component |
| — update `src/sanity/schemaTypes/documents/c1.content-page.ts` | Add `rateSnapshot` field |
| — update GROQ query in `src/app/(frontend)/[[...slug]]/page.tsx` | Include `rateSnapshot` in C1_CONTENT_PAGE_QUERY |

---

## Phase 2 — Rate Comparison Widget (live lender table)

### Schema

New document type: `c1.rateEntry`

```
c1.rateEntry
  - lenderRef: reference to c1.lenderProfile (or string if no lender doc exists)
  - lenderName: string
  - lenderLogo: image
  - productName: string        (e.g. "Business Loan", "Line of Credit")
  - productType: string        (options: secured, unsecured, lineOfCredit, equipment, invoice)
  - rateFrom: string           (e.g. "7.50%")
  - rateTo: string             (optional, for ranges)
  - comparisonRate: string     (optional)
  - minAmount: number
  - maxAmount: number
  - minTerm: string            (e.g. "1 year")
  - maxTerm: string            (e.g. "7 years")
  - fundingSpeed: string       (e.g. "24 hours")
  - securityType: string       (secured / unsecured / asset-backed)
  - updatedAt: date
  - isActive: boolean
```

Add a new field `rateComparisonTable` to `c1.contentPage`:

```
rateComparisonTable: object
  - headline: string           (e.g. "Compare business loans and rates in Australia")
  - updatedAt: date
  - showFilters: boolean
  - sortable: boolean
  - methodologyNote: text      (optional, shown as small text below table)
```

The widget component queries ALL active `c1.rateEntry` documents and renders
them in a filterable table.

### Frontend

New component: `C1RateComparisonWidget`

- Filter bar: product type chips, amount range input, secured/unsecured toggle
- Table columns: Lender | Rate from | Rate to | Amount | Term | Speed | Compare CTA
- Sortable columns (rate asc/desc, amount)
- "Rates updated [date]" badge in the table header
- Methodology disclosure link
- "Compare now" button on each row → `/quiz?lender=LENDER_NAME&amount=X`
- Responsive: collapses to cards on mobile
- Empty state: "No lenders match your filters — adjust criteria above"
- Loading skeleton while data fetches

### Data flow

Option A (SSR): Query all active `c1.rateEntry` at build time.
Option B (client fetch): Load via a simple API route or inline hydration.

Recommend Option A for v1 — pre-rendered table that's filterable client-side.
The rate data changes infrequently (weekly) so SSR + ISR is fine.

### Files to create

| File | Purpose |
|------|---------|
| `src/sanity/schemaTypes/documents/c1.rate-entry.ts` | Rate entry document schema |
| `src/ui/c1-rate-comparison-widget.tsx` | Main widget component |
| `src/ui/c1-rate-comparison-table.tsx` | Table sub-component |
| `src/ui/c1-rate-filter-bar.tsx` | Filter controls |
| — update `c1.content-page.ts` | Add `rateComparisonTable` field |
| — update GROQ in page.tsx | Include field in query |
| `scripts/seed-c1-rates.ts` | Seed 15+ lender rate entries |

### Seeded data

Initial seed: 15 lender rate entries matching the 15 lender profiles already
in the sitemap (Prospa, Moula, OnDeck, Judo, ScotPac, Moneytech, Banjo, Capify,
Lumi, Shift/GetCapital, Liberty, Westpac, CommBank, NAB, ANZ).

Rates come from publicly listed data. Methodology note: "Rates shown are
advertised starting rates. Your actual rate depends on lender assessment."

---

## Phase 3 — Structured Data & AEO

### FAQPage schema (already present — verify)

The FAQ section already generates `FAQPage` JSON-LD via the `schemaType` field.
Confirm it's working on all business-loans pages.

### New schema types

Add `FinancialProduct` schema to rate entry pages:

```json
{
  "@type": "FinancialProduct",
  "name": "Prospa Business Loan",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "8.50",
      "priceCurrency": "AUD",
      "unit": "PERCENT"
    }
  },
  "annualPercentageRate": "8.50% - 19.40%",
  "feesAndCommissionsSpecification": "Application fees may apply"
}
```

Add `ItemList` schema to the comparison table:

```json
{
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@type": "FinancialProduct", "name": "BOQ Business Loan", ... } },
    { "@type": "ListItem", "position": 2, ... }
  ]
}
```

### Implementation

Generate these in `src/lib/c1-structured-data.ts` and inject them in the page
layout alongside existing schema. The `targetQuery` field on each content page
already exists for AEO — make sure it's populated on business-loans pages.

### AEO improvements

Every business-loans subpage should have:
- `targetQuery` populated (e.g. "equipment finance australia rates")
- `answerSummary` filled (50-100 word concise answer to the query)
- `schemaType` set to `FinancialService` or `FAQPage` where appropriate

---

## Phase 4 — Freshness System

### "Rates updated" badge

Rendered conditionally on the rate comparison widget. Shows:
- "Rates updated 10 May 2026" when recent
- "Rates being reviewed" if >30 days stale

### Methodology note

Small text below the table:
"Rates shown are advertised starting rates based on lender public information.
Your actual rate depends on lender assessment. Updated [date]."

### Cron job (optional)

A weekly cron that checks if rates have been updated in Sanity and sends a
reminder to update if >14 days stale. Implement via Hermes cronjob system
only if Ian wants automated reminders.

### `lastReviewed` field

Already exists on `c1.contentPage`. Each business-loans page needs this set
to a recent date. The rate widget can reference its own `updatedAt` for
freshness display.

---

## Phase 5 — Page Template Updates

### /business-loans hub page

Add:
- Rate snapshot (top rates by category)
- Rate comparison table (all lenders, full filters)
- Keep existing content sections below the widget

### Subpages (equipment-finance, invoice-finance, etc.)

Add:
- Rate snapshot specific to the product type
- Filtered rate comparison table (pre-filtered by product type)
- Keep existing educational content

### Lender profiles

Add:
- Rate card specific to that lender
- Product-level rate breakdown (secured line, unsecured loan, etc.)
- Comparison to similar lenders

### Compare pages

Add:
- Side-by-side rate callout for the two lenders being compared
- Rate comparison table pre-filtered to those lender types

---

## Rollout Order

```
Week 1: Phase 1 (Rate Snapshot schema + component + seed data)
Week 2: Phase 2 (Rate Entry schema + widget component + seed script)
Week 3: Phase 3 + 4 (Structured data, freshness, methodology)
Week 4: Phase 5 (Template integration across all page types)
```

Each phase is independently deployable. Phase 1 alone adds visible value.

---

## Migration Path

Existing content is unaffected. The new fields (`rateSnapshot`,
`rateComparisonTable`) are optional arrays — pages without them render exactly
as they do now.

Existing tables in the `sections` array can be gradually replaced with the
rate comparison widget, but that's a content choice, not a code requirement.

---

## Success Metrics

- Business-loans pageviews and time-on-page increase from interactive widget
- Topical authority improves for "business loan rates" and 12 related queries
- AEO presence: site appears in AI answers for SME loan rate questions
- User submits more funding-fit checks via widget CTA → /quiz
