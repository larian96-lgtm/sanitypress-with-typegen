# Comparison One Quiz Layout and Partner-Proof Sections Implementation Plan

> **Status:** Implemented and verified locally on 2026-07-23.

**Goal:** Redesign `/quiz` around the focused application-page structure used by Become, then place three proof sections from the current Money.com.au business-loans page below the quiz, adapted accurately to Comparison One and its exclusive affiliate relationship.

**Source references captured:**

- Become application layout: `https://www.become.co/apply/au/`
- Money.com.au business-loans page: `https://www.money.com.au/business-loans`
- Current Comparison One quiz: `https://www.comparisonone.com/quiz`
- Capture date: 23 July 2026

## Non-negotiable boundaries

- Preserve the existing multi-step quiz logic, branching, validation, consent, session persistence, accessibility, tracking, idempotency, API payloads, Money delivery, Integrately delivery, and `/thanks` redirect.
- Do not change `/thanks` as part of this work.
- Do not hotlink Money.com.au image assets. Download approved partner assets into the Comparison One repository and serve them locally.
- Use Become as a layout reference only. Keep Comparison One colours, logo, typography and wording rather than copying Become's purple brand.
- Keep claims accurate. The 50+ lender network will be described as available through Comparison One's partner pathway, not as a lender panel directly owned by Comparison One.
- Do not rewrite customer reviews to make a review of Money.com.au look like a review of Comparison One. Outside quoted text, the section will use Comparison One branding. The reviews will carry a short, accurate source label such as `Customer reviews of the finance team behind our Money.com.au partner pathway`. Phil's neutral title can be `Commercial Finance Broker`; his employer will not be falsely changed.

## Task 1: Add a regression test for the new page structure

**Files:**

- Create: `src/ui/c1-quote-page.test.tsx`

**Test requirements:**

1. Render `C1QuotePage` to static markup.
2. Assert that the page includes:
   - Comparison One logo and home link.
   - One page-level H1.
   - The existing first quiz question and controls.
   - The lender-network heading and representative lender logos.
   - Phil Collard's heading, portrait, quote and attribution.
   - The testimonial heading and customer-review cards.
   - Comparison One legal wording and links in the route-specific footer.
3. Assert that the old `Funding Options Are Changing in 2026` proof-card section is absent.
4. Assert that the page does not relabel Phil as a Comparison One employee or alter quoted customer wording into a false Comparison One endorsement.
5. Run the test before implementation and confirm it fails for the expected missing sections.

## Task 2: Capture and localise approved Money.com.au partner assets

**Files:**

- Create directory: `public/comparisonone/quiz/lenders/`
- Create: `public/comparisonone/quiz/phil-collard.jpg`
- Create or update: `src/lib/c1-quiz-proof-data.ts`

**Implementation:**

1. Download the lender logo assets currently shown in Money.com's `We work for your business...` section, including Angle, Azora, Banjo, Bizcap, Branded, Business Fuel, Capify, Dynamoney, Earlypay, Finstro, FlexiCommercial, Grenke, Group & General Finance, HomeSec, Invoice Money, Lumi, Prospa, Metro, Moneytech, Moula, Multipli, Octet, Resimac, ScotPac, Selfco, Shift, TruePillars and Westpac.
2. Download the current Phil Collard portrait used in the quoted section.
3. Convert oversized raster assets to appropriately sized WebP or PNG files while preserving transparent logo backgrounds.
4. Store logo metadata, exact alt text, Phil's current quote and all testimonials currently shown in Money.com's favourite-review section in `src/lib/c1-quiz-proof-data.ts` rather than scattering content through JSX.
5. Record the source URL and capture date in code comments for maintainability.
6. Verify every local image opens, has non-zero dimensions and remains legible on a white background.

## Task 3: Rebuild the `/quiz` above-the-fold shell using Become's page rhythm

**Files:**

- Modify: `src/ui/c1-quote-page.tsx`
- Modify only if needed for responsive sizing: `src/ui/matching-engine/c1-matching-engine.module.css`
- Do not alter quiz state or submission logic in `src/ui/matching-engine/c1-matching-engine.tsx`

**Desktop layout:**

1. Keep a compact dark Comparison One header with the light Comparison One wordmark linked to `/`. Do not add a disclosure bar above it.
2. Replace the oversized left-aligned headline treatment with a centred hero:
   - H1: `Get your Business Funding Fit Check in two minutes`
   - One concise support line under the H1.
   - Reduce the six current proof points to a cleaner horizontal line or two compact rows.
3. Keep the Comparison One dark navy and blue palette. Add subtle large arc or ring decoration inspired by Become's background geometry, rendered in low-opacity Comparison One blue.
4. Constrain the quiz card to approximately `900px` on desktop instead of allowing it to span almost the full viewport.
5. Give the quiz card a white background, generous radius, light shadow and enough internal spacing for the nine-option first step without making the page feel empty.
6. Keep the security and no-credit-impact reassurance directly beneath the quiz card.
7. Keep the full first question visible with the hero at common desktop heights where practical, without shrinking tap targets or text.

**Mobile layout:**

1. Stack the compact dark logo header, headline, proof line and quiz card in that order.
2. Reduce headline size and vertical padding so the first question begins early.
3. Keep option controls at least 44px high and retain readable two-column or single-column layouts based on available width.
4. Prevent horizontal overflow from the hero decoration, lender logos or review carousel.

## Task 4: Replace the current proof cards with the Money.com.au lender section

**Files:**

- Create: `src/ui/c1-quiz-proof-sections.tsx`
- Modify: `src/ui/c1-quote-page.tsx`

**Implementation:**

1. Remove the existing `Funding Options Are Changing in 2026` card grid from `/quiz`.
2. Add a white lender-network section immediately after the quiz hero.
3. Use Ian's exact heading:
   - `Our helpful and friendly broker will guide you through your application and help find the right fit from a panel of 50+ lenders including:`
4. Render the locally hosted lender logos in a balanced responsive grid:
   - Desktop: five to seven logos per row depending on width.
   - Tablet: four per row.
   - Mobile: two or three per row.
5. Normalise logo display boxes without distorting each lender's original aspect ratio.
6. Add meaningful alt text and lazy loading below the fold.

## Task 5: Add the Phil Collard quote section

**Files:**

- Modify: `src/ui/c1-quiz-proof-sections.tsx`
- Read content from: `src/lib/c1-quiz-proof-data.ts`

**Implementation:**

1. Place this directly below the lender grid.
2. Preserve the current heading: `We look after clients' short and long-term goals`.
3. Use a two-column desktop layout with Phil's circular portrait on the left and the exact quote on the right.
4. Stack portrait, quote and attribution cleanly on mobile.
5. Use Comparison One navy text and blue accents instead of Money.com's purple.
6. Attribute neutrally as `Phil Collard, Commercial Finance Broker` unless Ian wants the partner company shown explicitly.
7. Preserve the quote as a quotation and do not rewrite it into a Comparison One claim.

## Task 6: Add the testimonial section

**Files:**

- Modify: `src/ui/c1-quiz-proof-sections.tsx`
- Read content from: `src/lib/c1-quiz-proof-data.ts`

**Implementation:**

1. Add the heading `Don't just take our word for it` beneath the Phil section.
2. Reproduce the visual system of the current Money.com.au review cards using Comparison One styling:
   - Soft neutral cards.
   - Five light-blue stars.
   - Quoted review text.
   - Customer name and review age/source line.
3. Use a responsive, accessible horizontal snap row on mobile and a controlled multi-column grid or horizontal row on desktop.
4. Do not auto-rotate the reviews. Users must be able to scroll or use labelled controls, and keyboard focus must remain visible.
5. Include a concise partner-source label so the reviews are not presented as direct reviews of Comparison One.
6. Preserve customer wording verbatim. Do not replace `Money.com.au` inside a customer's quote with `Comparison One`.

## Task 7: Add a Become-style route-specific footer with Comparison One branding

**Files:**

- Add the route-specific footer inside `src/ui/c1-quote-page.tsx`, or as a small local component in `src/ui/c1-quiz-footer.tsx` if the markup becomes unwieldy.
- Do not change the shared `C1Footer` used by editorial and site-navigation pages.

**Implementation:**

1. Use the compact legal-first structure from Become's application footer rather than the large multi-column site footer.
2. Apply Comparison One's dark navy background and light text.
3. Include the Comparison One logo at the bottom, using the light wordmark on dark navy.
4. Reuse and tighten Comparison One's existing accurate wording:
   - General information and online enquiry pathway.
   - Comparison One is not a lender.
   - Approval, rates, terms and timing depend on lender criteria.
   - Commission disclosure for partner referrals.
5. Include links to Privacy Policy, Terms, Editorial Policy, Contact and the disclosure page.
6. Add the current-year Comparison One copyright line.
7. Keep the footer visually quiet and centred, with a narrow reading width and divider lines similar to Become's footer.

## Task 8: Functional, visual and release verification

**Automated checks:**

1. Run the new quote-page render test.
2. Run all TypeScript tests:
   - `node_modules/.bin/tsx --test 'src/**/*.test.ts' 'src/**/*.test.tsx'`
3. Run `npm run typecheck`.
4. Run `npm run build`.
5. Run `git diff --check`.
6. Verify all local lender and portrait assets return `200`, have non-zero dimensions and have no accidental external hotlinks.

**Local browser QA:**

1. Desktop: `1440 × 900`.
2. Laptop: `1280 × 720`.
3. Mobile: `390 × 844`.
4. Check the first step and representative later steps for:
   - No clipping or overflow.
   - Visible progress state.
   - Keyboard operation and focus order.
   - Choice auto-advance.
   - Back navigation.
   - Input errors and consent text.
5. Complete one local test journey to `/thanks` without sending a real production lead.
6. Verify the new sections follow the requested order:
   - Quiz hero.
   - Lender network.
   - Phil Collard quote.
   - Testimonials.
   - Compact Comparison One footer.

**Regression checks:**

1. Confirm no changes to the API payload, Money API call, Integrately webhook, idempotency handling or qualification tracking.
2. Confirm `/thanks` remains unchanged.
3. Confirm GTM and Meta Pixel remain present.
4. Confirm there is only one page-level H1 and no duplicated footer.
5. Confirm internal legal links work.

**Release:**

1. Commit the finished page and local assets on `feat/business-finance-matching-engine`.
2. Push the branch.
3. Deploy to Vercel production.
4. Verify `https://www.comparisonone.com/quiz` on desktop and mobile.
5. Use a malformed API probe rather than generating another real lead unless a full production lead test is explicitly required.
