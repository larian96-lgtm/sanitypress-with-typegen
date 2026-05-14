# C1 lender-sheet content audit — 2026-05-12

Source repo: `/root/projects/comparison-one-sanitypress`

## Source data checked

- `src/lib/c1-rate-table.ts`: current fallback lender/rate table, updated `2026-05-10`.
- `src/lib/c1-pages.ts`: base hub, product, blog and older lender pages.
- `src/lib/c1-phase3-pages.ts`: newer lender trust-layer pages and compare pages.
- `docs/c1-rates-methodology.md`: rate freshness and caveat standard.
- `docs/rate-widget-and-seo-upgrade-spec.md`: intended rollout model for rate snapshots, widget, schema and freshness.

Google Drive/Sheets search did not surface a dedicated C1 lender spreadsheet under the connected account. The accessible source of truth in the repo is currently the hardcoded fallback lender table plus the Phase 3 lender pages.

## Current lender/rate source of truth

The fallback rate table currently contains 16 active rows:

| Lender | Product type | Rate from | Rate to | Amount range | Term | Best for |
|---|---:|---:|---:|---:|---:|---|
| BOQ | secured | 7.50% | — | $20k-$250k | 12-84 months | Established SMEs with strong financials |
| Liberty | unsecured | 7.95% | 17.45% | $10k-$350k | 12-84 months | Flexible criteria and sole traders |
| Moneytech | equipment | 7.99% | 9.56% | $25k-$2m | 12-84 months | Higher-ticket equipment and vehicles |
| Prospa | unsecured | 13.90% | — | $5k-$500k | 3-36 months | Fast unsecured working-capital access |
| Moula | working capital | 15.80% | — | $5k-$250k | 3-24 months | Short-term cash-flow funding |
| OnDeck | unsecured | 15.00% | — | $10k-$250k | 6-36 months | Fast online unsecured lending |
| Judo Bank | secured | 8.50% | 13.95% | $100k-$3m | 12-120 months | Larger SME growth and acquisition loans |
| ScotPac | invoice | 2.50% | 5.50% | $20k-$5m | 3-24 months | B2B receivables and invoice-led cash flow |
| Banjo | working capital | 14.20% | — | $20k-$500k | 3-36 months | Growing SMEs needing flexible capital |
| Capify | working capital | 16.50% | — | $5k-$300k | 3-24 months | Short-term revenue-linked funding |
| Lumi | line of credit | 14.55% | — | $10k-$750k | 6-60 months | Reusable credit for ongoing gaps |
| Shift | invoice | 2.70% | 5.90% | $10k-$2m | 3-24 months | Invoice-backed cash-flow acceleration |
| Westpac | vehicle | 7.99% | — | $15k-$1m | 12-84 months | Business vehicles and fleets |
| CommBank | secured | 8.15% | 14.25% | $10k-$500k | 12-84 months | Bank pathway with relationship banking |
| NAB | secured | 8.20% | 14.40% | $10k-$1m | 12-84 months | SMEs wanting bank-backed facilities |
| ANZ | secured | 8.35% | 14.75% | $20k-$1m | 12-84 months | Established SMEs with stronger docs |

## High-level findings

1. The hub page is the only base page carrying explicit rate snapshots. Most product pages and blog pages rely on the new rate widget inference but their written sections still do not contain current lender/rate specifics.
2. Phase 3 lender pages are strong long-form pages, but the compare pages are very thin at 2 sections and 2-3 FAQs.
3. `c1AllPages` dedupes by `page.path`, so Phase 3 lender pages override older base lender pages for `/lenders/prospa`, `/lenders/moula`, `/lenders/ondeck`, `/lenders/judo-bank`, `/lenders/scotpac` and `/lenders`. The older base lender constants remain in `c1-pages.ts`, which creates maintenance noise.
4. Some route aliases in `c1BasePageLookup` still point to old lender/profile pages, e.g. `/prospa`, `/moula`, `/ondeck`, `/scotpac`. These aliases are not overridden by Phase 3 because their paths differ.
5. The rate source uses `updatedAt: 2026-05-10`, while most base product/blog pages still show `lastReviewed: 2026-05-05`. That looks stale beside the new rate table.
6. The content strategy in `rate-widget-and-seo-upgrade-spec.md` expects product-specific rate snapshots, lender-specific rate cards, ItemList/FinancialProduct schema and freshness badges. The data model has the fallback table and inference helpers, but many pages still need copy changes to match that strategy.

## Priority rewrite map

### P0 — Fix stale or contradictory rate narrative

#### `/business-loans`
Status: strong hub, but one mismatch.

Problem:
- The page summary says “current rates from 7.49% p.a. for secured finance”. The fallback rate table starts at 7.50% for BOQ secured and 7.99% for Moneytech equipment/Westpac vehicle.
- The hub has hardcoded rate snapshots and a large static table in copy. This can drift from `c1-rate-table.ts`.

Rewrite direction:
- Replace `7.49%` with the current table floor, or change to “from around 7.5% p.a. where advertised” if the upstream source rounds differently.
- Move hardcoded lender table copy toward category summaries that reference the widget as the source of truth.
- Add a short explanation of why invoice finance rates are not directly comparable with p.a. loan rates.

Suggested replacement angle:
> Current advertised starting rates vary by product type. Secured facilities in the current table start from around 7.5% p.a., unsecured and working-capital products generally price higher, and invoice finance may be shown as a percentage of the invoice amount rather than a standard annual rate. Use the table below to compare product type first, then lender fit.

#### All pages with `lastReviewed: 2026-05-05`
Status: content freshness mismatch.

Problem:
- Rate table and hub were updated 10 May 2026, but most base pages show 5 May 2026.

Rewrite direction:
- After copy updates, bring product and blog page `lastReviewed` values to `2026-05-10` or a new audit date.
- Keep lender pages in Phase 3 as `7 May 2026` unless their rate cards are rewritten from the current table.

### P1 — Product pages that need lender-sheet enrichment

These pages are structurally okay but thin against the current lender table. They should be rewritten to include product-specific rate cards, lender examples and clearer “which lender type may fit” sections.

#### `/business-loans/working-capital`
Current issue:
- No explicit rates in page copy.
- Should surface Moula, Banjo and Capify as working-capital examples from the table, plus Prospa/OnDeck as adjacent unsecured working-capital options.

Rewrite brief:
- Add “Current working capital lender snapshot” after the intro.
- Include Moula from 15.80%, Banjo from 14.20%, Capify from 16.50%, and clarify that fast unsecured working-capital options often price higher than secured facilities.
- Add decision logic: recurring cash gap → line of credit; short lump-sum gap → working-capital loan; invoices causing gap → invoice finance.

#### `/business-loans/invoice-finance`
Current issue:
- No explicit lender/rate copy.
- Should use ScotPac and Shift from the table.

Rewrite brief:
- Add ScotPac Invoice Finance from 2.50%-5.50% of invoice amount and Shift Debtor Finance from 2.70%-5.90%.
- Explain debtor quality, invoice age, concentration risk and B2B eligibility.
- Add caveat: invoice pricing is not equivalent to p.a. interest rate.

#### `/business-loans/equipment-finance`
Current issue:
- No explicit lender/rate copy despite the page being a natural rate-led page.

Rewrite brief:
- Add Moneytech Equipment & Asset Finance from 7.99%-9.56%, Westpac Vehicle & Equipment Finance from 7.99%, and secured bank options where appropriate.
- Add asset-specific checks: ABN/GST, invoice/quote, asset age, deposit/balloon, productive use of asset.
- Add tradie and fleet scenarios since this page can target long-tail commercial intent.

#### `/business-loans/unsecured-business-loans`
Current issue:
- No explicit rate copy.
- The lender table contains several unsecured examples.

Rewrite brief:
- Add Liberty from 7.95%-17.45%, Prospa from 13.90%, OnDeck from 15.00%, plus caveat that some official lender pages use personalised pricing rather than fixed public rate cards.
- Separate “fast online unsecured” from “bank relationship unsecured/secured alternatives”.
- Add warning that speed should not be the only criterion.

#### `/business-loans/line-of-credit`
Current issue:
- No explicit lender/rate copy.

Rewrite brief:
- Add Lumi Line of Credit from 14.55%, plus Prospa line-of-credit mention from the Prospa Phase 3 page if verified against official pages.
- Explain reusable limit vs term loan, drawdown, repayment rhythm and idle limit costs.

#### `/business-loans/vehicle-finance`
Current issue:
- No explicit lender/rate copy.

Rewrite brief:
- Add Westpac Vehicle & Equipment Finance from 7.99%, Moneytech asset finance from 7.99%-9.56%, and secured bank options as alternatives.
- Add scenario split: ute/van, truck, fleet, yellow goods, replacement vs expansion.

#### `/business-loans/tax-debt`
Current issue:
- Generic funding-fit content, weak lender/rate specificity.

Rewrite brief:
- Do not overstate lender appetite for ATO debt. Position working-capital/unsecured routes as “may be considered depending on profile”.
- Use Moula, Banjo, Capify, Prospa/OnDeck as examples of working-capital/unsecured categories, not recommendations.
- Add ATO payment plan vs refinance decision tree.

#### `/business-loans/trade-finance`
Current issue:
- Current rate table has no dedicated trade finance lender rows.

Rewrite brief:
- Acknowledge that the current C1 table does not yet include a dedicated trade finance row.
- Compare adjacent routes: line of credit, invoice finance, working capital.
- Add “data gap”: add specialist trade/import finance lender rows before making rate claims.

#### `/business-loans/commercial-fitout`
Current issue:
- Generic, but can use secured, equipment and working-capital rows.

Rewrite brief:
- Split fitout into equipment/asset-backed spend, unsecured working capital and secured bank-style funding.
- Use Moneytech, Westpac, BOQ/Judo/banks and working-capital lenders as category examples.
- Add build quote, lease term, landlord consent and cash buffer checks.

### P1 — Lender pages needing rate-card alignment

The Phase 3 lender pages are content-rich and should remain the main version for lender profile URLs. They need to be aligned to `c1-rate-table.ts` so the page-level “Snapshot: key facts” and the widget agree.

Priority pages:
- `/lenders/prospa`
- `/lenders/moula`
- `/lenders/ondeck`
- `/lenders/judo-bank`
- `/lenders/scotpac`
- `/lenders/moneytech`
- `/lenders/banjo-loans`
- `/lenders/capify`
- `/lenders/lumi`
- `/lenders/shift-getcapital`
- `/lenders/liberty-business-finance`
- `/lenders/westpac-business-loans`
- `/lenders/commbank-business-loans`
- `/lenders/nab-business-loans`
- `/lenders/anz-business-loans`

Rewrite direction:
- Add a standard “Current C1 table snapshot” section to each lender profile:
  - Product name from `c1-rate-table.ts`
  - Product type
  - Advertised rate from/range if present
  - Amount range
  - Term range
  - Funding speed
  - Security type
  - Updated date
- Keep the “official lender page may differ / verify current terms” caveat.
- If official page says personalised pricing and the C1 table has a third-party advertised rate, state that distinction clearly.

### P2 — Thin compare pages

These pages are the clearest thin-content targets:

| Page | Current issue | Rewrite recommendation |
|---|---|---|
| `/compare/non-bank-business-lenders` | 2 sections, 3 FAQs | Expand into lender category matrix using Prospa, Moula, OnDeck, Banjo, Capify, Lumi, Liberty. Include rates, amounts, terms and use cases. |
| `/compare/prospa-vs-moula` | 2 sections, 2 FAQs | Add side-by-side table: Prospa unsecured from 13.90%, Moula working capital from 15.80%, amount/term/speed differences, use-case split. |
| `/compare/prospa-vs-ondeck` | 2 sections, 2 FAQs | Add side-by-side table: Prospa from 13.90%, OnDeck from 15.00%, speed, amount, term, repayment rhythm. |
| `/compare/moula-vs-lumi` | 2 sections, 2 FAQs | Clarify product mismatch: Moula working-capital term loan vs Lumi line of credit. Add recurring vs one-off cash-gap decision logic. |
| `/compare/judo-bank-vs-non-bank-business-lenders` | 2 sections, 2 FAQs | Expand bank vs non-bank decision frame. Judo secured from 8.50%-13.95% vs non-bank faster but often higher-cost products. |
| `/compare/scotpac-vs-business-loan` | 2 sections, 2 FAQs | Explain invoice finance vs general loan. ScotPac 2.50%-5.50% invoice pricing is not p.a. interest. Add debtor-led decision tree. |

### P2 — Blog pages that need table-backed examples

#### `/blog/business-loan-interest-rates-and-fees`
Add the current source-of-truth rate bands and explain why product type changes rate comparisons. This should become the internal link target for rate methodology.

#### `/blog/secured-vs-unsecured-business-loans`
Use BOQ/Judo/banks for secured examples and Liberty/Prospa/OnDeck for unsecured examples. Make the “security vs speed vs cost” trade-off concrete.

#### `/blog/bank-vs-non-bank-business-lenders`
Refresh with current table examples: banks/secured rows vs Prospa, Moula, OnDeck, Banjo, Capify, Lumi and Liberty.

#### `/blog/business-loan-requirements-australia`
Add lender-specific requirement checks from Phase 3 pages: trading history, turnover, security, guarantees, bank statements, invoice/debtor evidence.

#### `/blog/how-business-lenders-assess-applications`
Add assessment factors by lender/product category: secured bank-style, unsecured online lender, invoice finance, equipment finance.

### P3 — Maintenance cleanup

1. Remove or deprecate old base lender constants once Phase 3 pages are stable.
2. Decide whether alias routes like `/prospa` should redirect to `/lenders/prospa` or inherit the Phase 3 content.
3. Normalize `lastReviewed` format. Current repo mixes `2026-05-07`, `2026-05-10`, and `7 May 2026`.
4. Convert hardcoded page copy rate tables into reusable data-driven snippets where possible.
5. Add source metadata to each rate row when the source sheet exists: source URL, source type, checked date, confidence, notes.

## Suggested rewrite order

1. `/business-loans` rate mismatch and source-of-truth cleanup.
2. Product pages with clear table support: unsecured, equipment, invoice, working capital, line of credit, vehicle.
3. Thin compare pages.
4. Lender profile rate-card alignment.
5. Blog pages using examples from the rate table.
6. Edge pages with weaker source coverage: trade finance, tax debt, commercial fitout.

## Data gaps to resolve before final rewrites

- Dedicated lender spreadsheet was not found in connected Google Sheets/Drive. If one exists under another account, import or link it before rewriting rate claims.
- Trade finance has no dedicated fallback table rows.
- Tax-debt and commercial-fitout pages require careful caveats because lender appetite varies and the table does not specifically classify those products.
- Several Phase 3 profiles mention official pages not publishing simple headline rates, while `c1-rate-table.ts` still has rate-from values. The copy should distinguish “official personalised pricing” from “C1 table / public snapshot”.

## Deployment brief for follow-up worker

- No source code was changed in this audit.
- Primary implementation file for copy changes: `src/lib/c1-pages.ts`.
- Primary implementation file for lender/compare pages: `src/lib/c1-phase3-pages.ts`.
- Primary rate source: `src/lib/c1-rate-table.ts`.
- Recommended next task: implement P0 + P1 product-page rewrites first, then run typecheck/build.
