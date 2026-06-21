# Pinnacle Advisory Group — Next.js Conversion Design

**Date:** 2026-06-21
**Status:** Approved

---

## Overview

Convert the existing single-file `index.html` (Pinnacle Advisory Group accounting firm website) into a production-quality Next.js application using the already-configured App Router, Tailwind CSS v4, and TypeScript stack. Content is managed via a fresh Sanity CMS instance.

---

## Stack

| Concern | Decision |
|---|---|
| Framework | Next.js 16 — App Router |
| Styling | Tailwind CSS v4 with `@theme` design tokens |
| Language | TypeScript |
| CMS | Sanity (fresh project, `npm create sanity@latest`) |
| Contact form | Client-side cosmetic only (no backend) |
| Data fetching | Per-section async Server Components + React Suspense streaming |
| Revalidation | ISR — `export const revalidate = 3600` in `page.tsx` (route-level, applies to all fetches in the route) |

---

## Folder Structure

```
src/
  app/
    layout.tsx          ← fonts (next/font/google), metadata, globals
    page.tsx            ← thin orchestrator, Suspense wrappers
    globals.css         ← @theme tokens + base resets
  components/
    Navbar.tsx          ← Server, no data
    MobileMenu.tsx      ← Client, toggle state
    Hero.tsx            ← async Server, fetches siteSettings
    TrustStrip.tsx      ← async Server, fetches siteSettings.trustLogos
    Services.tsx        ← async Server, fetches services[]
    About.tsx           ← Server, hardcoded metrics/visual
    Process.tsx         ← Server, hardcoded 4 steps
    CaseStudies.tsx     ← async Server, fetches caseStudies[]
    Testimonials.tsx    ← async Server, fetches testimonials[]
    Blog.tsx            ← async Server, fetches posts[]
    Team.tsx            ← async Server, fetches teamMembers[]
    CTABanner.tsx       ← Server, fetches siteSettings
    Contact.tsx         ← Client, form state + fake submit
    Footer.tsx          ← Server, static links
    skeletons/
      HeroSkeleton.tsx
      SectionSkeleton.tsx
      CardGridSkeleton.tsx
  lib/
    sanity.ts           ← createClient config + imageUrlBuilder
    queries.ts          ← all GROQ queries as named exports
  types/
    index.ts            ← TypeScript interfaces for all Sanity document types

sanity/
  schemaTypes/
    siteSettings.ts
    service.ts
    teamMember.ts
    testimonial.ts
    caseStudy.ts
    post.ts
  schema.ts             ← exports schemaTypes array
  sanity.config.ts      ← projectId, dataset, plugins
```

---

## Design Tokens (`src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-navy:        #0B1F3A;
  --color-navy-light:  #132A50;
  --color-navy-dark:   #070F1E;
  --color-gold:        #C9A84C;
  --color-gold-light:  #E8C96A;
  --color-cream:       #F8F6F1;
  --color-slate:       #4A5568;
  --color-slate-light: #718096;
  --color-border:      #E2D9C8;
  --color-text:        #1A2332;

  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --max-width-site: 1180px;
}
```

Generates utilities: `bg-navy`, `text-gold`, `bg-cream`, `font-display`, etc.

Fonts loaded via `next/font/google` in `layout.tsx` as CSS variables, then referenced in `@theme`.

---

## Sanity Schemas

### `siteSettings` (singleton)
- `heroTitle` — string
- `heroDesc` — text
- `heroStats` — array of `{ num: string, label: string }`
- `trustLogos` — array of `{ name: string }`
- `ctaTitle` — string
- `ctaSubtitle` — string

### `service`
- `title` — string
- `icon` — string (emoji)
- `description` — text
- `bullets` — array of strings
- `order` — number (for sorting)

### `teamMember`
- `name` — string
- `role` — string
- `bio` — text
- `credentials` — string
- `initials` — string
- `gradientFrom` — string (hex, for card background)
- `gradientTo` — string (hex)
- `order` — number

### `testimonial`
- `quote` — text
- `authorName` — string
- `authorRole` — string
- `initials` — string
- `order` — number

### `caseStudy`
- `company` — string
- `industry` — string
- `tag` — string
- `challenge` — text
- `results` — array of `{ num: string, label: string }`
- `order` — number

### `post`
- `title` — string
- `excerpt` — text
- `category` — string
- `author` — reference → `teamMember`
- `publishedAt` — datetime
- `readTime` — number (minutes)

---

## Data Fetching Pattern

Each async section component fetches its own data internally:

```tsx
// Example: Services.tsx
export default async function Services() {
  const services = await getServices();
  return <section id="services">...</section>;
}
```

`page.tsx` wraps each async section in `<Suspense>` with a skeleton fallback for streaming:

```tsx
export default function Page() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}><Hero /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><TrustStrip /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><Services /></Suspense>
      <About />
      <Process />
      <Suspense fallback={<CardGridSkeleton />}><CaseStudies /></Suspense>
      <Suspense fallback={<CardGridSkeleton />}><Testimonials /></Suspense>
      <Suspense fallback={<CardGridSkeleton />}><Blog /></Suspense>
      <Suspense fallback={<CardGridSkeleton />}><Team /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><CTABanner /></Suspense>
      <Contact />
      <Footer />
    </>
  );
}
```

`Navbar`, `About`, `Process`, `Contact`, and `Footer` render immediately (no async data or client-only).

---

## Contact Form

`Contact.tsx` is a Client Component (`"use client"`). On submit:
1. Validates name + email are non-empty (client-side only)
2. Sets a `submitted` state boolean
3. Renders a success message in place of the submit button

No server action, no API call, no email delivery.

---

## Skeletons

Three reusable skeleton components using `animate-pulse`:

- `HeroSkeleton` — two-column layout with text lines and a card placeholder
- `SectionSkeleton` — section header placeholder (label bar + title bars)
- `CardGridSkeleton` — 2 or 3 column grid of grey rounded cards

---

## What Stays Hardcoded

`About` and `Process` contain structural/visual content (animated bars, metric widgets, step connectors) that isn't meaningful to edit via CMS. They remain hardcoded Server Components.

---

## Out of Scope

- Real email delivery from the contact form
- Blog post detail pages (`/insights/[slug]`)
- Sanity Studio hosting (runs locally via `sanity dev`)
- Authentication / preview mode
- Dark mode
