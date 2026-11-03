# Source QA blockers, 2 November 2026

The first Antigravity draft must be corrected before preview. Prefer deleting unsupported precision over replacing it with new unsourced claims. Update both code and `reports/article-source-notes.md`.

## Payday Super, `src/lib/c1-pages.ts`

- New SGC for qualifying-earnings days from 1 July 2026 is deductible; post-assessment GIC and late-payment penalties are not. Current copy says all SGC is non-deductible. Source: [Parliamentary Bills Digest](https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/bd/bd2526/26bd025), [enacted Act](https://www.legislation.gov.au/C2025A00057/asmade).
- Use qualifying earnings as the calculation base; do not say all salary/wages including overtime universally. The new administrative uplift is not the old flat fee per employee. The seven-business-day fund-receipt rule has exceptions. Source: [ATO Payday Super guidance](https://softwaredevelopers.ato.gov.au/PaydaySuper).
- Remove the apparent real 16-employee contractor case, $32k payroll, $50k float and claimed loan solution unless explicitly marked as a simple hypothetical with assumptions. Never imply invoice finance eliminates statutory exposure. Remove unsupported advance-rate and funding-speed figures.

## Economic Resilience Program, `src/lib/c1-pages.ts`

- Use the [specific NRFC ERP page](https://www.nrf.gov.au/what-we-do/investment-sub-funds/economic-resilience-program) and [business.gov.au eligibility page](https://business.gov.au/grants-and-programs/economic-resilience-program). Do not substitute the NRFC's broad priority-area list for ERP eligibility.
- Bank stream closed 20 October 2026; direct NRFC stream is open for proposals over $5m. Do not invent a $100m maximum. Bank stream targeted manufacturing and logistics, with freight, fuel, fertiliser and plastics examples. Direct stream eligibility is broader and assessed case by case.
- Working-capital facilities can be eligible for qualifying disruption purposes. Remove the categorical exclusion of general working capital/payroll. Source: [NRFC bank-loan customer guidance](https://www.nrf.gov.au/sites/default/files/documents/2026-05/bank-administered-loans-customer-guidance-may-2026.pdf).
- Do not claim every recipient must provide collateral or specific audit covenants. Qualify conditions as lender/program dependent. Do not categorically exclude retail/hospitality/services from the direct stream.

## Lender facts, `src/lib/c1-lender-facts.ts`

- Moula: current [working capital loan page](https://moula.com.au/working-capital-loans) and [FAQ](https://moula.com.au/faq) support loans $10k–$500k, up to five years, APR 15.99%–35.99%, 2% origination; remove invented general LOC, false $250k product cap and “simple interest” characterization.
- Prospa: current [small business lending](https://www.prospa.com/small-business-lending) and [line of credit](https://www.prospa.com/line-of-credit) show SBL up to $500k, LOC up to $500k, SBL up to five years, LOC renewable 24-month term and minimum two years trading. Do not confuse $150k no-upfront-security threshold with product maximum.
- Lumi: [product FAQ](https://www.lumi.com.au/faq/products) does not support the inserted citizenship requirement; remove it. Separate business-loan 3–36-month term from line-of-credit draw term/review; remove overly precise same-day approval promise.
- Bizcap: [FAQ](https://www.bizcap.com.au/faqs) says up to $30k Fast/Small may be available without upfront security, with personal guarantee. Do not say all Fast/Small loans have no physical collateral. Distinguish all-product $7.5m maximum from specific small-loan maximum.
- Banjo: [Excel page](https://banjoloans.com/business-loans/excel/) says funding as little as 24 hours; do not promise 24–48 hours. Check director residency before stating it.
- Remove undated Trustpilot scores/counts from page copy and structured fields until independently source-checked; merely labeling them unverified is not enough for a current review page.

## Market and regulatory claims

- [ScotPac R24 report](https://www.scotpac.com.au/wp-content/uploads/2026/03/ScotPac-SMEGI-Report-24th-Edition-March-2026.pdf) says 39% named access to credit/finance a hurdle; it does not establish that APRA collateral rules caused it. The non-bank/bank percentages are intentions for financing new investment, not all borrowing. Correct the denominator in article and notes.
- Remove universal bank 2–6 week/non-bank 24–72 hour speed claims without a named comparative study. Remove precise ABA/AFIA statutory or code obligations unless exact clauses are cited. Avoid blanket statements about business-purpose credit licensing. Remove arbitrary debtor-concentration thresholds and factor-rate APR calculations without a specified repayment schedule.
