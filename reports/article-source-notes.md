# ComparisonOne Content & Fact-Checking Audit Notes

**Audit Date:** 2 November 2026  
**Auditor / Editor:** Comparison One SME Finance Editorial Team  
**Git Branch:** `seo/review-2026-11-02`  
**Modified Files:**
- `src/lib/c1-pages.ts` (8 coded `/blog/` articles rewritten; `/business-loans` rate sanitization; QA blocker resolution)
- `src/lib/c1-phase4-pages.ts` (8 Phase 4 industry finance guides sanitized; hospitality rewrite)
- `src/lib/c1-lender-facts.ts` (5 priority lenders updated with primary verified facts; Trustpilot scores/fields completely removed)

---

## 1. Statutory & Policy Source Notes (Blog Articles)

### 1.1 Payday Superannuation Changes
- **Article:** `c1_payday_super_changes_sme_funding` (`/blog/payday-super-changes-sme-funding`)
- **Primary Statutory Authorities:**
  - *Treasury Laws Amendment (Payday Superannuation) Act 2025* (Cth) (`https://www.legislation.gov.au/C2025A00057/asmade`)
  - Parliament of Australia: Bills Digest No. 25, 2025-26 (`https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/bd/bd2526/26bd025`)
  - Australian Taxation Office (ATO): Payday Super employer implementation guidance (`https://softwaredevelopers.ato.gov.au/PaydaySuper`)
- **Key Verified Facts & Blocker Resolutions:**
  - **Commencement Date:** 1 July 2026.
  - **Payment Timing & Fund Receipt:** Superannuation Guarantee (SG) contributions must be received by the employee's nominated complying superannuation fund within **seven business days** of payday.
  - **Statutory Exceptions:** The ATO describes extended timeframes in some circumstances, including new employees; the article does not claim other specific exceptions.
  - **Calculation Base:** Superannuation is calculated on **Qualifying Earnings (QE)** at the statutory 12.0% rate, replacing Ordinary Time Earnings (OTE) for payday timing. It does not apply universally to all gross wages including overtime.
  - **Reformed SGC & Tax Deductibility:** Under the *Treasury Laws Amendment (Payday Superannuation) Act 2025*, the reformed SGC has different tax treatment from the previous regime. The article avoids component-by-component tax advice pending a current ATO check.
  - **Administrative Uplift:** Replaces the historical flat $20 fee per employee per quarter with a reformed statutory administrative uplift formula.
  - **Hypothetical Scenario:** Any civil contractor example is explicitly designated as a simplified hypothetical with stated payroll assumptions for illustrative purposes only.
  - **Legal Responsibility:** Commercial finance (e.g. invoice finance or lines of credit) can provide working capital liquidity to meet pay runs, but it does **not** eliminate statutory employer obligations or shield company directors from personal liabilities. Unsupported precision figures (advance rates of "80% to 85%" and funding speeds of "within 24 hours") have been removed.

### 1.2 Economic Resilience Program (ERP) & NRFC Loans
- **Article:** `c1_economic_resilience_plan_sme_funding` (`/blog/economic-resilience-plan-sme-funding`)
- **Primary Statutory & Program Authorities:**
  - National Reconstruction Fund Corporation (NRFC): Economic Resilience Program (`https://www.nrf.gov.au/what-we-do/investment-sub-funds/economic-resilience-program`)
  - business.gov.au: Economic Resilience Program Guidelines (`https://business.gov.au/grants-and-programs/economic-resilience-program`)
  - NRFC: Bank-Administered Loans Customer Guidance (May 2026) (`https://www.nrf.gov.au/sites/default/files/documents/2026-05/bank-administered-loans-customer-guidance-may-2026.pdf`)
- **Key Verified Facts & Blocker Resolutions:**
  - **Target Scope:** The closed bank-administered stream targeted specific industrial supply chains. Direct NRFC proposals above $5M are assessed case by case against economic resilience criteria; sector labels alone do not determine eligibility.
  - **Bank-Administered Stream ($500k to $5M):** Delivered through participating commercial banks for targeted mid-tier manufacturing and logistics supply chains (e.g. freight, fuel, fertiliser, and plastics). **Closed to new applications on 20 October 2026.**
  - **Direct NRFC Stream (Proposals >$5M):** Directly assessed by the NRFC for large strategic capability projects. Remains open; assessed case by case against national economic resilience criteria without a published artificial cap (removed invented $100M maximum).
  - **Working Capital Eligibility:** Under NRFC customer guidance, working capital facilities **can be eligible** where directly required to manage qualifying supply-chain disruptions. Categorical exclusions of working capital were removed.
  - **Terms & Security:** These are commercial debt facilities requiring full principal repayment—not non-repayable grants. Security requirements and covenants are lender/program dependent rather than universally mandated physical collateral or specific audit covenants.
  - **Precision Figures:** Removed unsupported advance-rate ("up to 85%") and speed ("within 24 hours") claims from commercial alternative tables.

### 1.3 Bank vs. Non-Bank Business Lenders
- **Article:** `c1_bank_vs_non_bank_business_lenders` (`/blog/bank-vs-non-bank-business-lenders`)
- **Primary Authorities:**
  - Australian Prudential Regulation Authority (APRA): Authorised Deposit-taking Institutions (ADIs) Register (`https://www.apra.gov.au`)
  - Australian Banking Association (ABA): 2025 Banking Code of Practice (`https://www.ausbanking.org.au`)
  - Australian Finance Industry Association (AFIA): Code of Lending Practice for Online Small Business Lenders & SMART Box (`https://afia.net.au`)
  - Australian Securities and Investments Commission (ASIC): Unfair Contract Terms (UCT) Protections under the ASIC Act (`https://asic.gov.au`)
- **Key Verified Principles & Blocker Resolutions:**
  - Removed universal turnaround speed claims ("2 to 6 weeks vs 24 to 72 hours") in the absence of a cited comparative empirical study.
  - Removed sweeping statutory licensing claims; credit provided wholly or predominantly for business purposes generally falls outside consumer credit rules in the *National Consumer Credit Protection Act 2009*, while governed by corporate law, misleading conduct provisions, and ASIC Act unfair contract term protections.
  - Qualified ABA Code and AFIA Code as subscribing member and voluntary codes.
  - Removed unsupported invoice finance advance-rate and speed promises.

### 1.4 ScotPac SME Growth Index & Market Trends
- **Article:** `c1_rise_of_non_bank_lending` (`/blog/rise-of-non-bank-lending-australia`)
- **Primary Authority:** ScotPac SME Growth Index Round 24 (March 2026) (`https://www.scotpac.com.au/wp-content/uploads/2026/03/ScotPac-SMEGI-Report-24th-Edition-March-2026.pdf`)
- **Key Verified Statistics & Blocker Resolutions:**
  - **Growth Hurdle:** Exactly **39%** of surveyed Australian SMEs named access to credit/finance as a key hurdle to growth (corrected from 40%).
  - **APRA Attribution Removed:** Removed unverified assertion that APRA collateral rules caused this hurdle; delays and frictions are attributed to individual bank documentation and credit underwriting criteria.
  - **Borrowing Intentions Denominator:** The 55% to 57% non-bank preference and 28% to 30% bank preference specifically measure intentions for **financing new growth and investment**, not all business borrowing. Denominators corrected in copy and summary.
  - **Asset-Based Lending:** 49% of surveyed SMEs report utilizing asset-based lending facilities.
  - **Speed & Advance Rates:** Removed universal "4 to 8 weeks vs 24 to 72 hours" claims, "often 24 to 72 hours" FAQ speed claims, and "80% to 85%" advance-rate assertions.

### 1.5 Underwriting, Requirements, Rates & Security Guides
- **Articles:**
  - `c1_business_loan_requirements` (`/blog/business-loan-requirements-australia`)
  - `c1_lender_assessment` (`/blog/how-business-lenders-assess-applications`)
  - `c1_interest_rates_fees` (`/blog/business-loan-interest-rates-and-fees`)
  - `c1_secured_vs_unsecured` (`/blog/secured-vs-unsecured-business-loans`)
- **Key Blocker Resolutions:**
  - **Debtor Concentration:** Removed arbitrary "typically 30% or more" threshold from FAQ and copy; debtor concentration is explained conceptually as reliance on a single primary customer or small group of accounts.
  - **Factor Rate APR Calculation:** Removed factor-rate APR claims that lacked a specified repayment schedule; qualified that effective annual borrowing costs depend directly on repayment frequency (daily, weekly, monthly) and loan term.
  - **Universal Turnaround Claims:** Removed unsupported speed claims ("within 24 to 48 hours", "settles in 24 to 72 hours", "within 48 hours", "rapid 24-hour approval") across scenarios, comparison bullets, and FAQs.

---

## 2. Priority Lender Facts Register (`src/lib/c1-lender-facts.ts`)

Verified against first-party lender websites and FAQs on **2 November 2026**.

| Lender | Source URL | Verified Amounts & Terms | Verified Eligibility Criteria | Pricing & Fee Structure | Security & Collateral Requirements | Trustpilot Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bizcap** | `https://www.bizcap.com.au/faqs` | **Total Limit:** $5,000 to $7.5M.<br>**Fast/Small Loans:** $5,000 to $30,000 (terms 3 to 12 months).<br>**Line of Credit:** Up to $750,000. | • Active Australian ABN/ACN<br>• 4+ months verified trading<br>• $12,000+ monthly revenue ($144k p.a.)<br>• Evaluated on real-time bank cash flow without automatic credit score cut-offs | Factor-rate pricing agreed upfront based on cash flow. Daily or weekly repayments. Early repayment discounts available. | Fast/Small loans up to $30k may be available without upfront physical asset collateral (director personal guarantee required); facilities >$30k or secured products require asset or property security. | **Removed entirely** from structured fields, copy, tables and metas. |
| **Banjo Loans** | `https://banjoloans.com/business-loans/excel/`<br>`https://banjoloans.com/business-loans/flexi/` | **Excel:** $20k to $2M (terms 6 to 60 months).<br>**Flexi:** 12 to 16 months (up to 4 months interest-only). | • 2+ years verified trading<br>• $500,000+ annual sales/revenue<br>• Active Australian ABN/ACN<br>• Asset Finance Express available as low-doc | Upfront fixed interest expense calculated over facility term and repaid in instalments. Origination fee applies. Funding in as little as 24 hours. | Generally requires security (e.g. general security agreement over business assets) and director personal guarantees; specific asset or property security may be required based on credit assessment. | **Removed entirely** from structured fields, copy, tables and metas. |
| **Lumi** | `https://www.lumi.com.au/faq/products`<br>`https://www.lumi.com.au/business-line-of-credit` | **Line of Credit:** Up to $1M (terms up to 5 years).<br>**Business Loans:** $5,000 to $1M (terms 3 to 36 months). | • 6+ months active trading<br>• $50,000+ annual turnover<br>• Valid Australian ABN/ACN<br>*(Removed citizenship requirement)* | **Line of Credit:** Published from 15.5% APR on drawn funds. One-off establishment fee on first draw; no ongoing monthly fees.<br>**Business Loans:** Quoted on application; repayment pause available. Funding same business day after approval for its business loan, according to Lumi. | Unsecured options available up to approved limits; larger facilities or specific risk profiles may require director guarantees or security. | **Removed entirely** from structured fields, copy, tables and metas. |
| **Moula** | `https://moula.com.au/working-capital-loans`<br>`https://moula.com.au/faq` | **Working Capital Business Loans:** $10,000 to $500,000 (terms 6 months to 5 years). *(Removed invented general LOC)* | • Active Australian ABN/ACN<br>• 12+ months in business<br>• $10,000+ monthly sales ($120k p.a.)<br>• Registered for GST | Published starting APR from 15.99% to 35.99% p.a. (risk-based APR, fixed for loan term; removed "simple interest" phrasing). 2% establishment fee; no ongoing monthly fees, no early payout penalties. | **No upfront asset security required up to $150,000.** Facilities over $150,000 or specific risk profiles may require PPSR registration. Director personal guarantees apply across facilities (personal liability exposure possible). | **Removed entirely** from structured fields, copy, tables and metas. |
| **Prospa** | `https://www.prospa.com/small-business-lending`<br>`https://www.prospa.com/line-of-credit` | **Small Business Loan:** Up to $500,000 (terms up to 5 years).<br>**Line of Credit:** Up to $500,000 (renewable 24 months).<br>**Business Loan Plus:** $500k to $1M (terms up to 5 years). | • **Small Business Loan:** 6+ months trading, $6k+ monthly turnover.<br>• **Line of Credit:** 2+ years trading, $6k+ monthly turnover.<br>• **Business Loan Plus:** 3+ years trading, $2M+ annual turnover, Australian property OR asset security. | Risk-based pricing assessed per applicant based on trading history, financials and security. Origination fee applies. Line of Credit incurs weekly service fee plus interest on drawn funds. | **Small Business Loans & Line of Credit:** No upfront asset security required up to $150,000 (director guarantees apply). Facilities >$150k require PPSR/charge. **Business Loan Plus strictly requires Australian property OR substantial asset security.** | **Removed entirely** from structured fields, copy, tables and metas. |
| **OnDeck** | `https://www.ondeck.com.au` | **Lightning Loans:** $10,000 to $300,000 (unsecured). | • 1+ year in business<br>• $100,000+ annual revenue<br>• Clean commercial credit conduct | Rates quoted on application. Weekly repayments. | Unsecured cash-flow lending; personal director guarantee required. | **Removed entirely** from structured fields, copy, tables and metas. |
| **ScotPac** | `https://www.scotpac.com.au` | **Specialist Facilities:** Tailored limits based on debtor ledger or asset valuation. | • Evaluated on commercial B2B debtor quality and trading turnover. | Quoted on application based on receivables quality and asset structure. | Invoice finance secured against receivables; asset finance against underlying equipment/vehicles. | **Removed entirely** from structured fields, copy, tables and metas. |

---

## 3. Trustpilot & User Review Compliance

- **QA Blocker Requirement:** Remove undated Trustpilot scores and review counts from page copy, structured data fields, metadata descriptions, and head-to-head comparison pages until independently verified. Merely labeling them unverified is insufficient for a published commercial comparison service.
- **Implemented Actions:**
  1. Removed `trustpilot` interface definition and `extraReviewNote` from `C1LenderFacts`.
  2. Removed `trustpilot` objects and values from all 7 lender definitions in `c1LenderFacts`.
  3. Removed Trustpilot rating row from `at a glance` comparison tables.
  4. Removed the standalone `${f.name} reviews` section block from lender profile pages.
  5. Removed Trustpilot review FAQ (`Is ${f.name} legit? What do reviews say?`) from lender profile FAQs.
  6. Removed Trustpilot star rating from `proofPoints` in `withVerifiedLenderFacts()`.
  7. Removed Trustpilot comparison row from `compareRows()` and the `Which has better reviews?` FAQ from `buildCompare()`.
  8. Verified 0 remaining matches for `trustpilot` across `src/lib/c1-lender-facts.ts`, `src/lib/c1-pages.ts`, and `src/lib/c1-phase4-pages.ts`.

---

## 4. Phase 4 Industry Guides & Main Hub Sanitization Summary

- **Hospitality Rewrite (`c1_industry_hospitality`):** Removed all stale rates (`7.49%`, `14.45%`, `14.55%`, `7.99%`), unverified CreditorWatch "one in ten closures" quote, outdated RBA cash rate reference (3.85%), and precision approval promises ("Approval in 24, 72 hours"). Preserved venue equipment finance, fitout guidance, and seasonal working capital buffers.
- **Phase 4 Industry Guides Scan:** Completely sanitized `tradies`, `transport-logistics`, `construction-subcontractors`, `retail-ecommerce`, `medical-allied-health`, `manufacturing`, and `professional-services` of stale rate strings and unsupported precision claims.
- **Core Hub Sanitization (`src/lib/c1-pages.ts`):** Sanitized `/business-loans` page summary, SEO description, `rateSnapshot`, and rate table of stale rates (7.49%, 14.45%, 14.55%) and the 10 May 2026 update date.
