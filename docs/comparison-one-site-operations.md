# Comparison One site operations

This repo is the active Comparison One SanityPress / Next.js build.

## Active production shape

- Repo path: `/root/projects/comparison-one-sanitypress`
- Public brand: `Comparison One`
- Canonical Vercel alias: `https://comparison-one-sanitypress.vercel.app`
- Sanity project: `s65yvn7c`
- Dataset: `production`
- Main app router: `src/app/(frontend)/[[...slug]]/page.tsx`
- Embedded Studio: `/studio`
- Admin host rewrite: `admin.*` → `/admin/:path*`

The homepage is now served by the React/Sanity route, not by the old static `public/finview-home/index.html` rewrite. The old static template assets remain useful as design reference, but `/` should render `src/ui/c1-homepage.tsx` with Sanity data from the `c1.homepage` document and coded fallback content when Sanity is unavailable.

## Design source of truth

Use the Finview/Finwise visual system, not generic finance-site styling:

- Font: Jost
- Main green: `#074C3E`
- Deep green: `#03211B`
- Gold CTA: `#FCB650`
- Neutral card backgrounds: white / `#F5F6F7`
- Card shadow: `0px 6px 30px` style, not heavy borders
- Tables: plain large text headers, light green zebra rows, dashed cell borders, no dark table headers

Reference assets live under `public/finview`, `public/finview-home`, and `public/comparisonone`. Do not introduce Electric Trust, blue comparison-site palettes, or copied competitor branding.

## Route resolution order

`src/app/(frontend)/[[...slug]]/page.tsx` resolves public pages in this order:

1. Convert slug to path, with `index` becoming `/`.
2. `/quiz` renders `C1QuotePage`.
3. Legal paths render `C1LegalPage`.
4. Sanity `c1.contentPage` with matching `path` overrides the coded fallback page.
5. Coded C1 fallback pages from `src/lib/c1-pages.ts` and `src/lib/c1-phase3-pages.ts` render via `C1ContentPage`.
6. Legacy SanityPress `page` documents render via `ModulesResolver`.
7. `/` falls back to `C1Homepage`.
8. Unknown paths return `notFound()`.

This means Sanity can take over individual C1 pages without deleting the hardcoded safety net.

## Content sources

### Homepage

- Schema: `src/sanity/schemaTypes/documents/c1.homepage.ts`
- Frontend: `src/ui/c1-homepage.tsx`
- Query: `C1_HOMEPAGE_QUERY` in `src/app/(frontend)/[[...slug]]/page.tsx`
- Fallback: `c1HomepageFallback` in `src/ui/c1-homepage.tsx`

The homepage supports editable hero, trust strip, why cards, document checklist, pathway cards, decline CTA, guide cards, FAQs, final CTA, and SEO fields.

### Content / lender / guide pages

- Schemas: `src/sanity/schemaTypes/documents/c1.content-page.ts`
- Frontend shell: `src/ui/c1-content-page.tsx`
- Base fallback content: `src/lib/c1-pages.ts`
- Lender / phase 3 fallback content: `src/lib/c1-phase3-pages.ts`
- Query: `C1_CONTENT_PAGE_QUERY` in `src/app/(frontend)/[[...slug]]/page.tsx`

`C1PageData.sections` supports:

- `heading`
- `body`
- `bullets`
- `table.headers`
- `table.rows`

In Sanity Studio, table rows are stored as objects with `cells: string[]`; the GROQ query maps them back to `string[][]` for the React renderer.

## Sanity seeding

The reusable seed script is:

```bash
npx -y tsx scripts/seed-c1-sanity.ts
```

It reads:

- `.env.local` for `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and read config
- `~/.hermes/.env` for `SANITY_AUTH_TOKEN` when no repo write token exists
- `SANITY_API_WRITE_TOKEN` if provided

It creates or replaces:

- 39 `c1.contentPage` documents from `c1AllPages`
- 1 `c1.homepage` document from `c1HomepageFallback`

Current blocker found on 2026-05-09: the available `SANITY_AUTH_TOKEN` belongs to a user that is not a member of project `s65yvn7c`, so mutations fail with `projectUserNotFoundError`. Do not keep retrying that token. Use a Sanity token from a member of project `s65yvn7c` with create/update permissions, then rerun the script.

## Vercel and Git

`.vercel/project.json` links this folder to:

- projectId: `prj_pX0pdFESDIIfORPlXkIas9rVhlpA`
- orgId: `team_SvAHTlbIIqFUe5iE1rMcaxAV`

Git remote:

```bash
git remote -v
# origin https://github.com/larian96-lgtm/sanitypress-with-typegen.git
```

GitHub CLI is authenticated as `larian96-lgtm` with repo/workflow scopes, so pushes should go to Ian's fork unless permissions change.

For production deploys:

```bash
set -a; . ~/.hermes/.env; set +a
vercel deploy --prod --token "$VERCEL_TOKEN" --yes
```

Always verify the canonical alias after deploy, not only the generated preview URL.

## Verification commands

Use these before reporting success:

```bash
npm run typecheck
npm run build
python scripts/check-c1-phase2-seo.py
```

`npm run lint` is currently stale because the project uses Next 16 and the script still calls removed `next lint`. Treat typecheck + build as blocking checks unless the lint script is updated.

After `next start`, check representative routes:

- `/`
- `/business-loans`
- `/business-loans/equipment-finance`
- `/lenders/prospa`
- `/compare/non-bank-business-lenders`
- `/privacy-policy`
- `/quiz`
- `/studio`

Homepage checks should confirm that `/` is React-rendered and contains `Avoid applying blind for business funding`, not the static Finview HTML homepage copy.

## Common pitfalls

1. Do not restore the root rewrite to `/finview-home/index.html` unless Ian explicitly asks for the static homepage again.
2. Do not remove hardcoded fallback content after seeding Sanity. It keeps the public site alive during token, CORS, or dataset issues.
3. Do not use the read-only token as a write token. Failed mutations are a permission issue, not a script issue, if the response is `projectUserNotFoundError` or `permission create required`.
4. Do not invent table styling. Keep Finview table rules: light rows, dashed borders, no dark headers.
5. Do not report a Vercel preview as live until the canonical alias responds with the new content.
