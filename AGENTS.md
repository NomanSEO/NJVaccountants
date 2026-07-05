# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `packageManager` in package.json).

- `pnpm dev` — run the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)

There is no test runner configured. Type-check with `npx tsc --noEmit` before considering a change done.

## Environment

Sanity is the CMS. These env vars are required for content to load (and for the build to succeed at runtime):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (required, no fallback)
- `NEXT_PUBLIC_SANITY_DATASET` (defaults to `production`)

## Architecture

Next.js 16 App Router site for "Pinnacle Advisory Group" (an accounting/tax firm), styled with Tailwind CSS v4. React Server Components by default; only files marked `'use client'` run on the client.

**Content flow (Sanity → server components):** All CMS data goes through `src/sanity/lib/sanity.ts` (the `client` + `urlFor` image builder) and `src/sanity/lib/queries.ts` (typed GROQ query functions — the single place queries live). Server components call these query functions directly and `await` them; there is no API/route layer. Schema types are defined in `src/sanity/schemaTypes/*` and aggregated in `src/sanity/schema.ts`. TypeScript shapes for query results live in `src/types/index.ts` and must be kept in sync with the schemas. The Sanity Studio is embedded at the `/studio` route (`sanity.config.ts`, basePath `/studio`).

**Homepage composition:** `src/app/page.tsx` assembles the marketing page from section components in `src/components/`. Each data-driven section is an async server component wrapped in its own `<Suspense>` with a skeleton fallback from `src/components/skeletons/`, so sections stream independently. Sections link to each other via in-page hash anchors (e.g. `#services`, `#contact`); section components set the matching `id`.

**Routes:** `/` (homepage), `/blog` + `/blog/[slug]` (Sanity posts, statically generated via `generateStaticParams`, body rendered with `PortableText`), `/calculators` + `/calculators/salary-tax` (client-side financial tools, no CMS), `/studio` (Sanity Studio). Pages set `export const revalidate = 3600` for ISR.

**Calculators:** Pure-TS calculation logic lives in `src/lib/` (e.g. `salaryTax.ts` holds the tax slabs + `calculateSalaryTax`), kept separate from the `'use client'` UI component in `src/components/`. When rendering rates derived from float math (e.g. `0.29 * 100`), round for display (`+(rate*100).toFixed(2)`) to avoid artifacts like `28.9999…%`.

## Conventions

- The `Navbar` (`'use client'`) holds the shared `NAV_LINKS` array and passes it to `MobileMenu`; add nav entries there once. Use full paths (`/calculators`) for cross-page links and hashes (`#services`) only for homepage sections.
- Design tokens are defined in `src/app/globals.css` under `@theme` (Tailwind v4 inline theme) — colors `navy`, `gold`, `cream`, `slate`, `border`; fonts `font-display` (Playfair) / `font-body` (Inter); `max-w-site` container width. Use these tokens rather than hard-coded hex/px values. Reusable effects (`.service-card`, `.fade-up`, `.hero-pattern`, `.prose`) are plain CSS in the same file for things Tailwind utilities can't express.
- Standalone pages follow a consistent shell: `<Navbar />` + `<main>` (navy hero section with a gold accent bar and back-link, then content) + gold CTA band + `<Footer />`.
