# C1 Ads Launch Pack Summary V2 — Government SME Awareness-First Campaign

**Date:** 2026-05-10 (V2 revision)
**Canonical repo:** `/root/projects/comparison-one-sanitypress`
**Campaign:** Government SME Awareness-First (V2 — per Ian's correction)
**Platform:** Meta Ads
**Destination:** `/advertorial/zero-interest-business-loans-australia` → `/quiz`
**Primary CTA:** `Check what funding may fit`

---

## What Changed From V1

Ian identified the V1 campaign assumed people already knew about the no-interest backed loan. V2 flips the entire campaign flow:

**V1:** "There's an access gap — not every SME fits every program" (assumed prior knowledge)
**V2:** "Did you know the Australian Government backs zero-interest SME loans? Here's what to know — and what to do if it doesn't fit you." (educates first)

### Specific shifts:
| V1 approach | V2 approach |
|---|---|
| Hooked on "access gap" / problem | Hooks on "did you know?" awareness |
| Jumped to limitations immediately | Makes the program seem amazing first |
| Manufacturing = "target sector, may still be excluded" | "Even manufacturing doesn't auto-qualify — normal reality" |
| C1 = "compare alternatives" | C1 = "check what funding may fit your business" |
| CTAs included risky "See if you qualify" | CTAs are safely "Check what funding may fit" / "Compare options" |

---

## Files Produced (V2 docs only)

All files under `docs/paid-ads/`:

| # | File | What it covers |
|---|---|---|
| 1 | `2026-05-10-government-sme-v2-awareness-first-strategy.md` | Full campaign thesis, 4 audience segments, 4 test angles, funnel map, claims register, compliance boundaries |
| 2 | `2026-05-10-government-sme-v2-advertorial-draft.md` | New advertorial at route `/advertorial/zero-interest-business-loans-australia` — awareness-first structure: announce, educate, reality-check, pivot |
| 3 | `2026-05-10-government-sme-v2-meta-copy-pack.md` | 8 cold prospecting variants, 2 retargeting variants, headlines, descriptions, test matrix, UTM labels |
| 4 | `2026-05-10-government-sme-v2-creative-brief.md` | 6 static image concepts, 1 awareness carousel, 2 video scripts, production specs, image prompts |
| 5 | `2026-05-10-government-sme-v2-compliance-check.md` | Full compliance review — **Approved to launch** with no critical fixes |
| 6 | `2026-05-10-government-sme-v2-launch-summary.md` | This file |

V1 files remain untouched under `docs/paid-ads/2026-05-10-government-sme-*.md`.

---

## Campaign Strategy (TL;DR)

**Core flow:** News/awareness → Education → Reality check → Practical next step

1. Announce the zero-interest loan program as genuinely attractive
2. Explain what it is, who it targets, why it matters
3. Reality check: not every business can access it; even target sectors face bank assessment
4. Pivot: if the program doesn't fit, C1's funding-fit check can match your business with lenders/products that may suit

**4 angles being tested:**
- **Angle 1 — Awareness hook:** "Did you know about zero-interest business loans?" (35% budget)
- **Angle 2 — Amazing + reality:** "Sounds incredible. Here's what to check." (25% budget)
- **Angle 3 — Manufacturing reality:** "Manufacturing doesn't mean auto-qualify." (20% budget)
- **Angle 4 — C1 match pivot:** "Check what funding may fit your business." (20% budget)

---

## Advertorial Structure (V2)

**Title:** Zero-interest business loans are real. Here's what to know before you apply.
**Route:** `/advertorial/zero-interest-business-loans-australia`

1. Hero — announces the program (positive, exciting)
2. "Did you know?" — explains what the program is
3. "Why zero-interest loans are exciting" — makes it seem amazing
4. "Reality check" — when it may not fit (sector, bank assessment, timing, structure)
5. "So what should you do?" — check official info first
6. "How Comparison One can help" — funding-fit check/lender match
7. "What to compare if it doesn't fit" — product categories overview
8. FAQ + CTA to `/quiz`

---

## Meta Ad Variants (Summary)

| Variant | Angle | Hook | CTA |
|---|---|---|---|
| V1 — Did you know? | 1 — Awareness | "Did you know the Australian Government backs zero-interest loans?" | Learn More |
| V2 — Sounds amazing | 2 — Reality | "Zero-interest. Government-backed. Not every business can access." | Check what funding may fit |
| V3 — Manufacturing | 3 — Reality | "Manufacturing doesn't mean auto-qualify." | Compare options |
| V4 — Check options | 4 — Match | "One funding program does not fit every business." | Check what funding may fit |
| V5 — What they don't tell you | 2 — Reality | "The zero-interest loan is real. Here's what else to know." | Learn More |
| V6 — Need funding? | 4 — Match | "Check what you may qualify for." | Check what funding may fit |
| V7 — Smart start | 4 — Match | "Don't pin everything on one program." | Compare options |
| V8 — Direct fit check | 4 — Match | "One quick check. One clearer path." | Check what funding may fit |

---

## Compliance Status

**✅ Approved to launch** — No critical fixes required.

The V2 reframe structurally eliminates all V1 compliance risks:
- Safe CTAs: "Check what funding may fit" / "Compare options" (never "See if you qualify")
- Safe qualification: "check what funding you may qualify for" used sparingly and naturally
- Compliance/legal wording kept out of public-facing ad and LP copy unless genuinely needed
- No personal attribute targeting
- No implied approval or eligibility determination

---

## Recommended First Test

**Round 1 — Cold prospecting:**
- Prioritise 4 static concepts: News Card (Angle 1), Amazing/Reality split (Angle 2), Manufacturing Reality (Angle 3), Match Pivot (Angle 4)
- 1 ad set per angle, same audience, small daily budget
- Winner judged on quiz-start conversion rate after 2000 impressions

**Round 2 — Winner expansion:**
- Add second copy variant from winning angle
- Add 15s video if CTR is acceptable but scroll depth is weak
- Activate retargeting after 500+ advertorial visitors in 7 days

**UTM pattern:**
```
?utm_source=meta&utm_medium=paid_social&utm_campaign=gov_sme_awareness_v2&utm_content={angle}_{format}_{variant}
```

---

## Next Steps

1. **Ian to review V2 pack** — confirm the awareness-first approach matches his intent
2. **Implement new advertorial route** — via `comparison-one-site-ops` (new route `/advertorial/zero-interest-business-loans-australia`)
3. **Produce image assets** — per V2 creative brief (6 static concepts + 1 carousel)
4. **Load Meta ads** — use V2 copy pack variants
5. **Launch test** — small budget, learn, iterate

Production code has **not** been modified or deployed. The advertorial route `/advertorial/zero-interest-business-loans-australia` is new and has not been created in the codebase yet.

---END-OF-REPORT---
