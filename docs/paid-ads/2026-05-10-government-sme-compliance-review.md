# C1 Ads Compliance Review — Government SME Funding Access Gap

**Date:** 2026-05-10  
**Reviewer:** c1-ads-compliance-editor  
**Campaign:** Government SME Funding Access Gap (Economic Resilience Program)  
**Destination URL:** `/advertorial/zero-interest-loan-access-gap` → `/quiz`  
**Assets reviewed:** Intake, Strategy Brief, Advertorial Draft, Meta Copy Pack, Image Ad Concepts, Video Scripts

---

## Status

**Approved with edits** — Minor to moderate issues found. 3 critical fixes, 5 medium-risk items, 1 pre-production execution risk. All are resolvable before launch.

---

## Critical Fixes

### C1 — Meta Copy Variant 3: CTA "See if you qualify"

- **Asset:** Meta Copy Pack — Variant 3 (The access gap), Alternate CTAs list
- **Risk:** 🔴 High — Meta policy + compliance boundary violation
- **Current wording:** `CTA: See if you qualify` (Variant 3) and `"See if you qualify"` listed as an alternate CTA (line 9)
- **Required rewrite:** `CTA: Compare options` (Variant 3) — remove `"See if you qualify"` from Alternate CTAs entirely
- **Reason:** "See if you qualify" implies Comparison One can determine program or loan eligibility. Comparison One is explicitly not a lender or government agency and cannot determine eligibility for any program. Meta's financial products policy flags CTAs that imply qualification determination. Use "Compare options" or "Check my options" instead.

### C2 — Image Concept 1: On-image headline "Does your sector qualify?"

- **Asset:** Image Ad Concepts — Concept 1 (Program Eligibility Card)
- **Risk:** 🟠 Medium-High — Implies C1 determines sector eligibility
- **Current wording:** On-image headline: `Does your sector qualify?` (supporting line)
- **Required rewrite:** `Which sectors qualify?` or `Check your sector fit`
- **Reason:** "Does YOUR sector qualify" implies a personal determination that Comparison One cannot make. Changing to "Which sectors qualify?" keeps it factual/informational. "Check your sector fit" aligns with the C1 funding-fit positioning. The checklist visual already shows sector options — the text should invite checking, not imply judgment.

### C3 — Carousel 2 Card 3: "Outside the eligible sectors?"

- **Asset:** Image Ad Concepts — Carousel 2, Card 3
- **Risk:** 🟠 Medium-High — Triggers the "Can't qualify for the government loan?" exclusion framing
- **Current wording:** Headline: `Outside the eligible sectors?`
- **Required rewrite:** `Your sector may not be listed — what's next?` or `Sector not covered? Compare alternatives.`
- **Reason:** "Outside the eligible sectors?" is functionally identical to "Can't qualify for the government loan?" which was explicitly rejected in the strategy brief (Critical Compliance Boundaries ❌ list). Both presume the reader is already excluded. The safe alternative uses "may not" framing or the neutral "Sector not covered?" which is factual rather than exclusionary.

---

## Medium-Risk Items

### M1 — Meta Alternate CTAs list includes "See if you qualify"

- **Asset:** Meta Copy Pack, line 9 (`Alternate CTAs: Learn More, Compare options, See if you qualify`)
- **Risk:** 🟠 Medium — Copy-paste risk if someone uses this CTA in Meta Ads Manager
- **Action:** Remove `"See if you qualify"` from Alternate CTAs. Keep only: `Learn More`, `Compare options`, `Start my funding-fit check`, `Check my options`
- **Reason:** Same as Critical Fix C1. Even as an "alternate" it creates risk of accidental use.

### M2 — Video Script 3: "Taps calendar impatiently" visual direction

- **Asset:** Video Scripts — Script 3 (Timing Bottleneck), 15s version, 0:03–0:06
- **Risk:** 🟠 Medium — Could drift into frustration/hardship framing if executed poorly
- **Current direction:** "Hand taps calendar impatiently. Clock animation speeds up."
- **Action:** Replace with: "Hand rests on calendar date. Clock overlay accelerates gently." — Remove the "impatient" body language. Keep the timing-awareness educational framing.
- **Reason:** The campaign explicitly avoids "personal financial hardship targeting." A hand impatiently tapping reads as frustration with cash-flow pressure. A resting hand + gentle clock acceleration reads as "timing awareness" which is the intended emotion.

### M3 — Video Script 4 (30s): Blindfolded dart thrower metaphor

- **Asset:** Video Scripts — Script 4 (Wrong-Start Risk), 30s version
- **Risk:** 🟠 Medium — Metaphor could be misinterpreted as implying C1 can fix any wrong start
- **Current framing:** "The problem may not be your business. It may be that you're starting in the wrong place." + blindfolded dart thrower hitting wrong targets → blindfold off → now they can see → "FIT" arrows
- **Action:** Add explicit narration/closing line: "There is no guarantee that any specific product will fit. But starting with a structure check may help before you apply."
- **Reason:** The cumulative metaphor is strong but the landing note is missing a "no guarantee" qualifier in the body. The CTA frame has the disclaimer, but the narrative arc implies C1 can solve the wrong-start problem. One line of moderation inside the script body closes the gap.

### M4 — Video Script 2 (30s): Greyed-out sector map

- **Asset:** Video Scripts — Script 2 (Access Gap), 30s version, 0:04–0:08
- **Risk:** 🟠 Medium — Visual execution risk of appearing to label sectors as "rejected"
- **Current direction:** "Map of Australia with industry sector markers — some highlighted (manufacturing, logistics), others greyed out (hospitality, retail, trades, health)"
- **Action:** Change visual treatment: use a "faded/different colour" scheme (e.g. warm gold for target sectors, cool sage for others) instead of "greyed out". Grey = disabled/rejected. Sage = different eligibility, not excluded.
- **Reason:** Already flagged in video script compliance notes (Script 2, ⚠️). The greyed-out visual reads as "rejected/disabled." Sage/muted-green signals "different category, still active." This is a pre-production execution note.

### M5 — Pre-production: Missing campaign-specific CTA block, advisory line, product cards, and sticky CTA in production code

- **Asset:** Production code — `src/lib/c1-pages.ts` lines 630–675
- **Risk:** 🟠 Medium — The advertorial is not launch-ready. The existing page lacks the campaign-specific inline CTA, "Check official program info first" advisory, product cards section, and sticky CTA that the draft specifies.
- **Action:** These are implementation edits to be performed by `comparison-one-site-ops`. They are documented in the advertorial draft (Implementation Brief section) and are required before traffic reaches the page.
- **Note:** This is not a compliance rejection — the draft is correct. The production code needs updating per the implementation brief.

---

## Claim Source Check

All factual claims about the Economic Resilience Program map to the claims register in the strategy brief (lines 203–214). Specific verification:

| Claim | Source provided | Status | Safe phrasing |
|-------|---------------|--------|--------------|
| "Economic Resilience Program provides access to zero-interest loans" | business.gov.au / NRFC | ✅ Verified | Used throughout with attribution |
| "Program targets manufacturing/logistics" | business.gov.au / NRFC | ✅ Verified | Used with "according to official information" |
| "Bank-administered assessment applies" | business.gov.au delivery details | ✅ Verified | Used as "bank-administered applications" |
| "Principal must be repaid" | program T&Cs | ✅ Verified | Used in advertorial and FAQs |
| "Standard bank fees may apply" | program T&Cs | ✅ Verified | Used with "may apply" |
| "Working capital / invoice finance / equipment finance are alternative options" | C1 product pages | ⚠️ Valid but caveated | All references use "may suit", "may help", "may be worth comparing" |
| "SMEs may need alternatives" | C1 own analysis | ⚠️ Reasonable basis | Used in all angles — reasonable given program is sector-targeted |

**No unsupported claims found.** All program-specific claims have attribution to official sources. Product category references are correctly caveated.

---

## Meta Policy Check

### Personal attribute risk
- **Assessment:** ✅ Low
- All copy avoids referencing debt status, creditworthiness, financial hardship, or rejection history.
- No personal financial hardship targeting in Meta ad copy.
- Segment 3 (delayed/declined) is addressed via the advertorial, not in cold ad copy.
- **Exception:** Video Script 4 30s opens with "You applied for a loan. It didn't work out." — The "didn't work out" framing is safe (product mismatch, not personal failure). Avoid "You were rejected" framing.

### Financial product risk
- **Assessment:** ✅ Low
- No interest rate claims, no "lowest rates", no "guaranteed approval".
- All lending references use "may", "could", "subject to lender criteria".
- Comparison One is clearly stated as not a lender in every asset.
- **Exception:** See Critical Fix C1 regarding "See if you qualify" CTA.

### Landing-page consistency
- **Assessment:** ⚠️ Needs implementation before launch
- The advertorial draft is consistent with ad copy claims. However, the production code (lines 630–675 of `c1-pages.ts`) has NOT been updated with:
  - ✅ Campaign-specific inline CTA block (mid-page)
  - ✅ "Check official program info first" advisory callout
  - ✅ Product cards section (working capital, invoice, equipment, unsecured)
  - ✅ Sticky bottom CTA with UTM parameters
  - ✅ Fixed summary text (still ends with `"> "` on line 637)
- **Without these updates, the landing page experience is incomplete.** Users arriving from Meta ads will see a general advertorial without the campaign-specific CTA structure, without the official program advisory, and without the product comparison cards the ads reference.

### Recommended audience notes
- Interest-based + broad (Australia-wide, SME owner/operator signals) — ✅ Correct
- No credit/income/debt attribute targeting — ✅ Correct
- No retargeting from finance audiences — ✅ Correct
- **Recommended exclusion:** Finance/budgeting interest segments that might include "debt management" or "credit repair" interests — these could trigger personal hardship association. Add to exclusion list in Meta Ads Manager.

---

## Brand/Quality Check

### Repetition
- ✅ Good across all angles. The 8 Meta copy variants have distinct hooks while sharing the compliance backbone.
- ⚠️ Minor: "General information only. Not a lender. Not a government agency." appears in every variant — this is necessary for compliance, not a quality issue.
- Carousel 2 shares visual language with static Concept 2 (diverging paths) — acceptable for campaign cohesion.

### Tone
- ✅ Strong across all assets. Educational, neutral, decision-support framing.
- ✅ No aggressive selling language, no urgency tactics, no fear-based hooks.
- ✅ Video scripting notes correctly specify warm acoustic music, calm VO, no countdowns.
- ⚠️ See M2 above — Video Script 3 "taps calendar impatiently" needs softening to avoid frustration drift.

### Specificity
- ✅ Good. Product categories are named (working capital, invoice finance, equipment finance, unsecured loans) rather than vague "business funding" language.
- ✅ Program sectors are named with specificity — manufacturing, logistics, freight, fuel, fertiliser, plastics — increasing credibility.
- ⚠️ Minor: Some Meta copy variants use "business funding" as shorthand when describing the quiz — acceptable given character limits but watch for drift in future iterations.

### Trust signals
- ✅ Disclaimers are present and prominent in all assets.
- ✅ "Check official program info first" advisory line in advertorial draft builds trust and reduces substitution risk.
- ✅ Claims register maps every factual statement to a source.
- ✅ Last reviewed date (10 May 2026) on editorial review.
- ✅ FAQ includes "No. Comparison One is not a lender or government agency" explicit Q&A.

---

## Final Launch Checklist

- [ ] **Destination URL matches ad promise.** — ✅ Yes. All ads point to `/advertorial/zero-interest-loan-access-gap` → `/quiz`. The advertorial covers the zero-interest access gap topic as promised.
- [ ] **UTMs present.** — ✅ Yes. Consistent pattern across all assets: `?utm_source=meta&utm_medium=paid_social&utm_campaign=gov_sme_access_gap&utm_content={identifier}`. UTM content labels defined in copy pack (lines 276–298).
- [ ] **Rates/amounts sourced or caveated.** — ✅ Yes. No rate claims made. Program amounts ($5M threshold for bank-administered) are sourced to official info.
- [ ] **No guaranteed approval language.** — ✅ Pass. All references use "may", "could", "subject to lender criteria", "not guaranteed". No "guaranteed", "approved now", "funded today".
- [ ] **No unsupported best/lowest claims.** — ✅ Pass. No comparative superiority claims.
- [ ] **Disclaimer present where needed.** — ⚠️ **Verify in production.** All drafts include disclaimers. Review produced images and videos to ensure 6pt disclaimer band is present per Image Ad Concepts spec.
- [ ] **Image/video text readable on mobile.** — ⚠️ **Verify in production.** Image concepts specify text sizing floor of 20pt on 1:1, 16pt minimum body, 6pt disclaimer. Video scripts specify 24px minimum for disclaimer text. Verify in final renders.
- [ ] **"See if you qualify" CTA removed.** — ❌ **Must fix before launch.** See Critical Fix C1.
- [ ] **Concept 1 headline updated per C2.** — ❌ **Must fix before launch.**
- [ ] **Carousel 2 Card 3 headline updated per C3.** — ❌ **Must fix before launch.**
- [ ] **Pre-launch advertorial edits implemented in production code.** — ❌ **Must implement before launch.** 6 edits listed in advertorial draft Implementation Brief: (1) fix summary text, (2) add official program advisory, (3) add campaign CTA block, (4) add product cards section, (5) UTM-ready CTA links, (6) sticky CTA.
- [ ] **Video Script 3 "impatient tap" removed per M2.** — ⚠️ **Fix in production brief.**
- [ ] **Video Script 4 (30s) adds "no guarantee" qualifier in script body per M3.** — ⚠️ **Fix in script before production.**
- [ ] **Video Script 2 sector map uses sage/muted-green (not grey) for non-target sectors per M4.** — ⚠️ **Fix in animation brief.**

---

## Summary of Required Edits Before Launch

### Edit Priority Matrix

| Priority | Asset | Issue | Fix | Complexity |
|----------|-------|-------|-----|-----------|
| 🔴 P0 | Meta Copy Pack | CTA "See if you qualify" implies eligibility determination | Replace with "Compare options" | 1 line change |
| 🔴 P0 | Image Concept 1 | "Does your sector qualify?" implies C1 determines eligibility | Change to "Which sectors qualify?" or "Check your sector fit" | 1 line change |
| 🔴 P0 | Carousel 2 Card 3 | "Outside the eligible sectors?" triggers exclusion framing | Change to "Your sector may not be listed — what's next?" | 1 line change |
| 🟠 P1 | Production code | 6 pre-launch edits not implemented | comparison-one-site-ops implementation | Multiple file changes |
| 🟠 P1 | Video Script 3 | "Taps calendar impatiently" → frustration drift | Change to "Hand rests on calendar date" | 1 line change |
| 🟠 P1 | Video Script 4 (30s) | Missing "no guarantee" qualifier in body | Add closing line | 1 line change |
| 🟠 P1 | Video Script 2 (30s) | Greyed-out sectors = rejected visual | Use sage/muted-green for non-target sectors | Design brief change |
| 🟢 P2 | Meta Copy Pack | Remove "See if you qualify" from Alternate CTAs | Clean up line 9 | 1 line change |
| 🟢 P2 | Audience setup | Add exclusion for finance/debt management interests | Meta Ads Manager audience setup | Platform setup |

### Launch-worthiness Verdict

**Not launch-ready in current state** — but close. All issues are fixable within a single editing pass.

The 3 critical fixes (CTA language across copy pack + image + carousel) take minutes. The production code edits are well-documented in the advertorial draft Implementation Brief and follow established patterns in `c1-pages.ts`. The video script adjustments are production-brief changes before filming.

**Estimated re-review: 30 minutes** after edits are applied, then:
1. Re-check the 3 critical fixes in copy assets
2. Verify production code updates for the advertorial
3. Verify video production briefs incorporate the tone adjustments
4. Confirm produced image/video assets have legible disclaimers at mobile sizes

---

## Assets That Require No Changes

These assets pass compliance as-is and can proceed to production:

- **✓ Advertorial Draft** — Draft content is compliant. Needs implementation in code only.
- **✓ Meta Variants 1, 2, 4, 5, 6, 7, 8** — Clean. All seven pass without edits.
- **✓ Meta Shared Headlines (H1–H4)** — Clean.
- **✓ Meta Shared Descriptions (D1–D4)** — Clean.
- **✓ Image Concepts 2, 3, 4, 5, 6** — Clean.
- **✓ Carousel 1** — Clean.
- **✓ Retargeting Variants 1 & 2** — Clean.
- **✓ Video Script 1 (both durations)** — Clean.
- **✓ Video cutdowns (bumpers A–D, retargeting A–B)** — Clean.

---

---END-OF-REPORT---
