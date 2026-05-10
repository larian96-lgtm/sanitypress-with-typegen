# C1 Paid Ads Launch Intake — Government SME Funding Access Gap

Date: 2026-05-10
Campaign type: First Meta campaign
Canonical repo: `/root/projects/comparison-one-sanitypress`

## Minimum Brief

- Campaign/product: Government SME funding access gap / Economic Resilience Program awareness angle leading to Comparison One funding-fit check.
- Destination preference: Advertorial first.
- Destination URL: `/advertorial/zero-interest-loan-access-gap`
- Target customer situation: Australian SME owners who see government-backed zero-interest loan news, but may be outside the eligible sectors, delayed by bank-administered assessment, unsure about evidence requirements, or needing a more suitable funding path such as working capital, invoice finance, equipment finance, vehicle finance, trade finance, or unsecured business loans.
- Geography: Australia.
- Platform: Meta Ads.
- Primary conversion: Quiz start / quote form via `/quiz` using CTA `Start my funding-fit check`.
- Budget or test size: Not provided yet. Assume small first learning test with angle/creative testing rather than scale.
- Existing source data:
  - Comparison One long-form source of truth: smart broker layer, wrong-start risk, clarity under pressure, one enquiry + lender matching + specialist support.
  - Existing advertorial: `/advertorial/zero-interest-loan-access-gap`.
  - Existing rate table and lender comparison widget on `/business-loans` and subpages.
  - Existing related pathways: working capital, invoice finance, equipment finance, unsecured loans, bank vs non-bank guide.
- Assets available:
  - Comparison One logo/site assets.
  - Existing advertorial copy.
  - Existing site rate data and comparison widgets.
  - Lender spec sheets may be available later, but do not use broker-only/internal details in public ads.
- Compliance constraints:
  - Comparison One is not a lender.
  - Comparison One is not a government agency.
  - General information only.
  - No approval guarantees.
  - No implied official affiliation with the Economic Resilience Program.
  - No “guaranteed”, “bad credit accepted”, “lowest rates”, “funded today”, or exploitative hardship framing.
  - Avoid calling out personal financial hardship directly in Meta ad copy.

## Campaign Thesis

A zero-interest government loan sounds like the obvious first move, but the real decision for many SME owners is whether the program fits their sector, timing, evidence, repayment obligations, and bank-administered pathway.

This campaign should not attack the government program. It should say: check the program if you may be eligible, but do not rely on one funding pathway without understanding realistic alternatives.

Comparison One’s role: the smart broker layer between an SME owner and a fragmented lending market. The promise is clarity before blind applications.

## Core Audience

Primary avatar from the source of truth:

- Trade, service, logistics-adjacent, manufacturing-adjacent, retail, cafe, clinic, or local operator.
- 3–10 staff or established sole trader/team operator.
- Real revenue and real operational pressure.
- Skeptical of banks, comparison sites, lead traps, and polished finance copy.
- Wants to know what may realistically fit without doing the bank-by-bank comparison job alone.

Campaign-specific audience states:

1. Heard about the government zero-interest program and wants to know if it helps.
2. Is outside obvious manufacturing/logistics/fuel/freight/fertiliser/plastics eligibility.
3. Is eligible-ish but worried bank assessment or timing may be too slow.
4. Needs cash-flow, invoice, asset, stock, supplier, or job-mobilisation funding and does not know which facility fits.
5. Has already been delayed or declined by a bank and needs a safer second path.

## Primary Conversion Path

Meta cold traffic → advertorial `/advertorial/zero-interest-loan-access-gap` → inline CTA / sticky CTA → `/quiz` → funding-fit enquiry.

Retargeting path:

Advertorial visitors or business-loans page visitors → direct comparison/quiz ads → `/quiz` or `/business-loans`.

## First Test Angles

### Angle 1 — Zero-interest does not mean zero decision

Safe hook territory:

- “A zero-interest business loan still has to fit the business.”
- “Government-backed funding may help some SMEs. Others still need a Plan B.”
- “Before relying on one funding pathway, compare what actually fits.”

Rationale: Most direct match to the advertorial. Education-led, low policy risk.

### Angle 2 — The access gap

Safe hook territory:

- “Not every SME fits every government funding program.”
- “If the program does not fit your sector or timing, compare the next realistic step.”
- “Some businesses need a different funding structure, not just a different lender.”

Rationale: Names the core problem without implying personal exclusion or guaranteed alternatives.

### Angle 3 — Bank-administered bottleneck

Safe hook territory:

- “A government-backed loan can still involve bank assessment.”
- “If timing matters, understand the pathway before applying blind.”
- “Compare lender fit before making another finance enquiry.”

Rationale: Connects the government scheme to C1’s stronger bank-vs-non-bank positioning.

### Angle 4 — Wrong-start risk

Safe hook territory:

- “The costly mistake may be starting with the wrong funding path.”
- “Before comparing rates, compare the funding structure.”
- “Working capital, invoice finance, equipment finance, or unsecured loan? Start with fit.”

Rationale: Strongest evergreen C1 mechanism from the source of truth.

## Angles to Avoid in Campaign 1

- “Can’t qualify for the government loan?”
- “Rejected by the government scheme?”
- “Need money by Friday?”
- “Struggling with debt?”
- “Bad credit? Get approved.”
- “Zero-interest loophole.”
- “Banks don’t want you to know this.”
- Any ad that makes Comparison One look affiliated with the government or participating banks.

## Landing Page Notes

Existing advertorial route is suitable as the first destination:

- Title: “Zero-interest loans are open - but who gets shut out?”
- URL: `/advertorial/zero-interest-loan-access-gap`
- CTA: `Start my funding-fit check`
- Compliance posture is already strong: not a lender, not a government agency, general information only.

Recommended pre-launch edits:

1. Add a top-of-page campaign-specific CTA block after the first explanation section.
2. Add a short “Check official program info first if you may qualify” line to reduce implied substitution risk.
3. Add UTM-ready links to `/quiz` from CTA buttons.
4. Add a small “Compare alternatives by funding need” section with cards linking to working capital, invoice finance, equipment finance, unsecured loans.
5. Verify no broken summary text. Current source summary ends with `the real question becomes: >`, which should be cleaned before scaling traffic.

## Proposed UTM Structure

Base destination:

`https://comparison-one-sanitypress.vercel.app/advertorial/zero-interest-loan-access-gap`

UTM pattern:

`?utm_source=meta&utm_medium=paid_social&utm_campaign=gov_sme_access_gap&utm_content={angle}_{format}_{variant}`

Examples:

- `utm_content=zero_decision_static_v1`
- `utm_content=access_gap_static_v1`
- `utm_content=bank_bottleneck_video_v1`
- `utm_content=wrong_start_carousel_v1`

## Launch Asset Scope

First campaign pack should produce:

- 1 refined advertorial page based on existing route.
- 8 Meta primary text variants.
- 4 headline variants.
- 4 descriptions.
- 6 static image concepts.
- 2 carousel concepts.
- 4 short video scripts.
- 1 retargeting mini-set.
- Compliance review before implementation.

## Tracking and Measurement

Primary event:

- Quiz start / quote form start from advertorial CTA.

Secondary events:

- Advertorial page view.
- CTA click from advertorial.
- Business-loans page click.
- Time on page / scroll depth if available.

Early read indicators:

- CTR by angle.
- Advertorial bounce/engagement.
- CTA click rate from advertorial.
- Quiz-start conversion rate.
- Lead quality after form submission.

## Open Inputs From Ian

These are useful but not blockers for the first creative pack:

- Daily/weekly test budget.
- Whether the first campaign should optimise for quiz start or lead/form completion.
- Whether there are brand visuals or founder/broker video clips to use.
- Which CRM/event tracking is live on the quiz.
- Whether any broker/lender spec-sheet data can be used internally for better product-fit copy.

## Next Action

Run the `c1-ads-team` launch-pack workflow using this intake. The first launch pack should be based on:

- Source of truth: `/root/wiki/concepts/comparisonone-long-form-copy-strategy.md`
- Advertorial: `/root/projects/comparison-one-sanitypress/src/lib/c1-pages.ts` route `/advertorial/zero-interest-loan-access-gap`
- Destination: advertorial first → `/quiz`

