# C1 Ads Launch Pack Summary — Government SME Funding Access Gap

Date: 2026-05-10
Canonical repo: `/root/projects/comparison-one-sanitypress`
Campaign: Government SME Funding Access Gap / Economic Resilience Program awareness
Platform: Meta Ads
Destination: `/advertorial/zero-interest-loan-access-gap` → `/quiz`
Primary CTA: `Start my funding-fit check`

## Status

Launch pack produced. Compliance review returned **Approved with edits**; the copy/creative-document edits have been applied.

Production code has **not** been changed or deployed yet. The advertorial implementation edits are ready for site-ops if Ian approves the page update.

## Files Produced

- Intake: `docs/paid-ads/2026-05-10-government-sme-advertorial-meta-intake.md`
- Strategy brief: `docs/paid-ads/2026-05-10-government-sme-strategy-brief.md`
- Refined advertorial draft: `docs/paid-ads/2026-05-10-government-sme-advertorial-draft.md`
- Meta copy pack: `docs/paid-ads/2026-05-10-government-sme-meta-copy-pack.md`
- Static image/carousel concepts: `docs/paid-ads/2026-05-10-government-sme-image-ad-concepts.md`
- Video scripts: `docs/paid-ads/2026-05-10-government-sme-video-scripts.md`
- Compliance review: `docs/paid-ads/2026-05-10-government-sme-compliance-review.md`
- This summary: `docs/paid-ads/2026-05-10-government-sme-launch-pack-summary.md`

## Campaign Strategy

### Objective

Use the government zero-interest business-loan news as an education-led entry point, without implying Comparison One is government-affiliated or can determine eligibility.

The campaign frames the real decision as funding fit:

- Does the government program fit the sector?
- Does the bank-administered path fit the timeline?
- Does a term loan fit the business need?
- Should the owner compare working capital, invoice finance, equipment finance, unsecured funding, or bank/non-bank pathways before applying?

### Funnel

Cold Meta traffic → advertorial `/advertorial/zero-interest-loan-access-gap` → CTA to `/quiz` → funding-fit enquiry.

Retargeting traffic → quiz or business-loans comparison page, depending on engagement.

### Audience Segments

1. Program-curious but unsure — heard about zero-interest loans and wants to understand fit.
2. Eligible-ish but timing-pressured — may fit the program but needs to understand bank-assessment timelines.
3. Already delayed or declined by a bank — needs a safer second path without making another blind application.
4. Needs another funding structure — working capital, invoice finance, equipment finance, vehicle finance, trade finance, or unsecured funding may fit better than a term loan.

## Test Angles

### Angle 1 — Zero-interest does not mean zero decision

Safe hook territory:

- A zero-interest business loan still has to fit the business.
- Government-backed funding may help some SMEs. Others still need a Plan B.
- Before relying on one funding pathway, compare what actually fits.

Best creative:

- Program Eligibility Card
- Zero-interest decision video
- Variant 1 and 2 in the Meta copy pack

### Angle 2 — The access gap

Safe hook territory:

- Not every SME fits every government funding program.
- If the program does not fit your sector or timing, compare the next realistic step.
- Some businesses need a different funding structure, not just a different lender.

Best creative:

- Access Gap Paths static
- Government program → alternative pathway carousel
- Variant 3 and 4 in the Meta copy pack

### Angle 3 — Bank-administered bottleneck

Safe hook territory:

- A government-backed loan can still involve bank assessment.
- If timing matters, understand the pathway before applying blind.
- Compare lender fit before making another finance enquiry.

Best creative:

- Timing Bottleneck static
- Timing Bottleneck 15s/30s video
- Variant 5 and 6 in the Meta copy pack

### Angle 4 — Wrong-start risk

Safe hook territory:

- The costly mistake may be starting with the wrong funding path.
- Before comparing rates, compare the funding structure.
- Working capital, invoice finance, equipment finance, or unsecured loan? Start with fit.

Best creative:

- Wrong-Start Fork static
- Product Category Grid
- Wrong-Start Risk 15s/30s video
- Variant 7 and 8 in the Meta copy pack

## Recommended First Test Matrix

### Round 1 — Cold prospecting angle test

Use 4 ad sets or 1 broad ad set with clean creative labels, depending on account size.

- Angle 1: Variant 1 + Program Eligibility Card
- Angle 2: Variant 3 + Access Gap Paths
- Angle 3: Variant 5 + Timing Bottleneck
- Angle 4: Variant 7 + Wrong-Start Fork

Destination for all:

`/advertorial/zero-interest-loan-access-gap?utm_source=meta&utm_medium=paid_social&utm_campaign=gov_sme_access_gap&utm_content={angle}_{format}_{variant}`

Primary success metric:

- Quiz-start conversion rate from advertorial visitors.

Secondary metrics:

- CTR by angle.
- Advertorial engagement / scroll depth.
- CTA click rate.
- Cost per quiz start.
- Lead quality after form submission.

### Round 2 — Winning angle expansion

After early signal, expand winner with:

- Second copy variant from same angle.
- Carousel version if angle needs explanation.
- 15s video version if static CTR is acceptable but landing engagement is weak.

### Retargeting

Retarget advertorial visitors with:

- Retargeting Variant 1 — Compare alternatives by need.
- Retargeting Variant 2 — Compare next steps.
- Creative: Product Category Grid or Quiz CTA Compass.

## Compliance Fixes Applied After Review

The compliance review flagged three critical copy/creative issues and five medium issues. These document-level fixes have been applied:

- Meta Variant 3 CTA changed from `See if you qualify` to `Compare options`.
- Alternate CTAs changed to `Learn More`, `Compare options`, `Start my funding-fit check`, `Check my options`.
- Image Concept 1 supporting line changed from `Does your sector qualify?` to `Which sectors qualify?`.
- Carousel 2 Card 3 headline changed from `Outside the eligible sectors?` to `Your sector may not be listed — what's next?`.
- Video Script 3 visual direction changed from impatient tapping to a calm calendar/clock treatment.
- Video Script 2 sector-map note changed to sage-green non-highlighted sectors instead of greyed-out rejection treatment.
- Video Script 4 30s CTA/captions now include `Subject to lender criteria`.

Verification check confirmed these risky strings no longer appear in the production asset docs:

- `See if you qualify`
- `Does your sector qualify`
- `Outside the eligible sectors?`
- `Hand taps calendar impatiently`
- `Sector greyed-out visual`

They still appear inside the compliance review itself as historical findings.

## Landing Page Implementation Edits Needed

The refined advertorial draft is ready, but production code still needs the pre-launch page changes:

1. Fix broken summary ending in the existing advertorial source.
2. Add a short advisory after the first explanation section: check official program information first if the business may qualify.
3. Add campaign-specific CTA block after the bank bottleneck section.
4. Add `Compare alternatives by funding need` card section with links to:
   - `/business-loans/working-capital`
   - `/business-loans/invoice-finance`
   - `/business-loans/equipment-finance`
   - `/business-loans/unsecured-business-loans`
5. Add UTM-ready CTA links to `/quiz`.
6. Add/stage sticky or repeated CTA block near the end of the advertorial.

## Meta Setup Notes

Recommended UTM pattern:

`?utm_source=meta&utm_medium=paid_social&utm_campaign=gov_sme_access_gap&utm_content={angle}_{format}_{variant}`

Example UTM labels:

- `zero_decision_static_v1`
- `access_gap_static_v1`
- `bank_bottleneck_video_v1`
- `wrong_start_carousel_v1`
- `retarget_need_static_v1`

Audience notes:

- Australia-wide.
- Use SME owner/operator, business admin, small business, accounting/bookkeeping, trade/business service signals if available.
- Avoid financial distress, debt-management, credit repair, hardship, or insolvency targeting.
- Avoid ad copy that directly calls out the viewer’s financial status or creditworthiness.

## Creative Production Priority

Start with 4 statics before video production:

1. Program Eligibility Card
2. Access Gap Paths
3. Timing Bottleneck
4. Wrong-Start Fork

Then produce:

5. Product Category Grid for retargeting.
6. Quiz CTA Compass as the control card.
7. 15s videos for the two winning statics.
8. Carousel if the access-gap explanation wins but needs more education.

## Next Implementation Step

If Ian approves code changes, use `comparison-one-site-ops` to implement the refined advertorial route in `src/lib/c1-pages.ts`, then run:

```bash
cd /root/projects/comparison-one-sanitypress
npm run typecheck
npm run build
vercel deploy --prod --token "$VERCEL_TOKEN" --yes
```

Verify:

- `/advertorial/zero-interest-loan-access-gap`
- CTA links to `/quiz`
- No broken summary text
- No implied government affiliation
- JSON-LD still renders

---END-OF-REPORT---
