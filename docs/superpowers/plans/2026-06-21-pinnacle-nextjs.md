# Pinnacle Advisory Group — Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `index.html` into a Next.js App Router application with Sanity CMS, Tailwind v4, TypeScript, and Suspense streaming.

**Architecture:** Section-per-file async Server Components each fetch their own Sanity data and stream via React Suspense in `page.tsx`. Tailwind v4 `@theme` tokens replace all inline CSS variables. Sanity Studio is embedded at `/studio`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript 5, Sanity v3, next-sanity, pnpm

## Global Constraints

- Package manager: `pnpm` (pnpm@11)
- No `tailwind.config.js` — Tailwind v4 uses `@theme` in `globals.css` only
- All color/font tokens from `@theme`; no raw hex values in JSX (use Tailwind utilities)
- Sanity dataset name: `production`
- TypeScript strict mode — verify with `pnpm exec tsc --noEmit`
- No test runner — verify each task with `pnpm exec tsc --noEmit` then `pnpm run dev`
- Route-level ISR: `export const revalidate = 3600` in `src/app/page.tsx`
- Source of truth for all content/styles: `index.html` in project root

---

### Task 1: Foundation — globals.css, layout.tsx, next.config.ts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Produces: CSS utilities `bg-navy`, `text-gold`, `bg-cream`, `font-display`, `font-body`, `max-w-site`, `bg-gold-light`, `text-slate`, `text-slate-light`, `border-border`, `bg-navy-light`, `bg-navy-dark`, `text-gold-light`, `text-text`
- Produces: CSS classes `.hero-pattern`, `.service-card` (with `::before` animation), `.fade-up`

- [ ] **Step 1: Replace globals.css**

```css
/* src/app/globals.css */
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

  --font-display: var(--font-playfair), Georgia, serif;
  --font-body:    var(--font-inter), system-ui, sans-serif;

  --max-width-site: 1180px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: #1A2332;
  background: #fff;
  line-height: 1.6;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #F8F6F1; }
::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }

/* Hero SVG pattern overlay */
.hero-pattern {
  position: absolute;
  inset: 0;
}
.hero-pattern::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Service card left-border slide animation (can't do ::before with Tailwind) */
.service-card { position: relative; overflow: hidden; }
.service-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 0;
  background: #C9A84C;
  transition: height 0.3s;
}
.service-card:hover::before { height: 100%; }

/* Fade-up animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up          { animation: fadeUp 0.7s ease both; }
.fade-up-delay-1  { animation-delay: 0.15s; }
.fade-up-delay-2  { animation-delay: 0.3s; }

@media (prefers-reduced-motion: reduce) {
  .fade-up { animation: none; }
}
```

- [ ] **Step 2: Replace layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Pinnacle Advisory Group | Accounting, Tax & Audit Services',
  description: 'Pinnacle Advisory Group — trusted accounting, taxation, advisory, and audit services for businesses and individuals. Decades of expertise, measurable results.',
  keywords: 'accounting firm, taxation services, business advisory, audit services, financial consulting, CPA firm, tax planning, forensic accounting',
  robots: 'index, follow',
  openGraph: {
    title: 'Pinnacle Advisory Group | Accounting, Tax & Audit',
    description: 'Trusted accounting, taxation, advisory, and audit services.',
    type: 'website',
    url: 'https://pinnacleadvisory.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Update next.config.ts to allow Sanity Studio**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allows next-sanity's embedded studio to function
}

export default nextConfig
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx next.config.ts
git commit -m "feat: foundation — tailwind v4 tokens, fonts, layout"
```

---

### Task 2: TypeScript Types

**Files:**
- Create: `src/types/index.ts`

**Interfaces:**
- Produces: `SiteSettings`, `Service`, `TeamMember`, `Testimonial`, `CaseStudy`, `Post`, `CaseResult`, `HeroStat`

- [ ] **Step 1: Create src/types/index.ts**

```ts
// src/types/index.ts

export interface HeroStat {
  num: string
  label: string
}

export interface SiteSettings {
  heroTitle: string
  heroTitleHighlight: string
  heroDesc: string
  heroStats: HeroStat[]
  trustLogos: Array<{ name: string }>
  ctaTitle: string
  ctaSubtitle: string
}

export interface Service {
  _id: string
  title: string
  icon: string
  description: string
  bullets: string[]
  order: number
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  credentials: string
  initials: string
  gradientFrom: string
  gradientTo: string
  order: number
}

export interface Testimonial {
  _id: string
  quote: string
  authorName: string
  authorRole: string
  initials: string
  order: number
}

export interface CaseResult {
  num: string
  label: string
}

export interface CaseStudy {
  _id: string
  company: string
  industry: string
  tag: string
  challenge: string
  results: CaseResult[]
  order: number
}

export interface Post {
  _id: string
  title: string
  excerpt: string
  category: string
  author: { name: string }
  publishedAt: string
  readTime: number
}
```

- [ ] **Step 2: Verify**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: TypeScript types for all Sanity document shapes"
```

---

### Task 3: Sanity Setup — Install, Schemas, Studio Route

**Files:**
- Create: `.env.local`
- Create: `sanity/schemaTypes/siteSettings.ts`
- Create: `sanity/schemaTypes/service.ts`
- Create: `sanity/schemaTypes/teamMember.ts`
- Create: `sanity/schemaTypes/testimonial.ts`
- Create: `sanity/schemaTypes/caseStudy.ts`
- Create: `sanity/schemaTypes/post.ts`
- Create: `sanity/schema.ts`
- Create: `sanity.config.ts`
- Create: `src/app/studio/[[...tool]]/page.tsx`

**Interfaces:**
- Produces: Sanity project with 6 document types, studio accessible at `http://localhost:3000/studio`

- [ ] **Step 1: Install packages**

```bash
pnpm add next-sanity sanity
```

Expected: `next-sanity` and `sanity` added to `dependencies` in package.json.

- [ ] **Step 2: Create a Sanity project**

Go to https://www.sanity.io/manage → "Create new project" → name it `Pinnacle Advisory` → note the **Project ID**.

OR run interactively:
```bash
pnpm exec sanity@latest init --env .env.local
```
Follow prompts: create new project, dataset name `production`, no default schema. This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`.

- [ ] **Step 3: Create .env.local manually if not auto-created**

```
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 4: Create sanity/schemaTypes/siteSettings.ts**

```ts
// sanity/schemaTypes/siteSettings.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroTitleHighlight', title: 'Hero Title Highlight Word', type: 'string' }),
    defineField({ name: 'heroDesc', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'num', type: 'string', title: 'Number' }),
          defineField({ name: 'label', type: 'string', title: 'Label' }),
        ],
      })],
    }),
    defineField({
      name: 'trustLogos',
      title: 'Trust Strip Logos',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [defineField({ name: 'name', type: 'string', title: 'Company Name' })],
      })],
    }),
    defineField({ name: 'ctaTitle', title: 'CTA Banner Title', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Banner Subtitle', type: 'string' }),
  ],
})
```

- [ ] **Step 5: Create sanity/schemaTypes/service.ts**

```ts
// sanity/schemaTypes/service.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'icon', type: 'string', title: 'Icon (emoji)' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'order', type: 'number', title: 'Sort Order' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
```

- [ ] **Step 6: Create sanity/schemaTypes/teamMember.ts**

```ts
// sanity/schemaTypes/teamMember.ts
import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Full Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3 }),
    defineField({ name: 'credentials', type: 'string', title: 'Credentials (e.g. FCA · CTA)' }),
    defineField({ name: 'initials', type: 'string', title: 'Initials (2 chars)' }),
    defineField({ name: 'gradientFrom', type: 'string', title: 'Card Gradient From (hex)' }),
    defineField({ name: 'gradientTo', type: 'string', title: 'Card Gradient To (hex)' }),
    defineField({ name: 'order', type: 'number', title: 'Sort Order' }),
  ],
})
```

- [ ] **Step 7: Create sanity/schemaTypes/testimonial.ts**

```ts
// sanity/schemaTypes/testimonial.ts
import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', title: 'Quote', rows: 4 }),
    defineField({ name: 'authorName', type: 'string', title: 'Author Name' }),
    defineField({ name: 'authorRole', type: 'string', title: 'Author Role / Company' }),
    defineField({ name: 'initials', type: 'string', title: 'Initials (2 chars)' }),
    defineField({ name: 'order', type: 'number', title: 'Sort Order' }),
  ],
})
```

- [ ] **Step 8: Create sanity/schemaTypes/caseStudy.ts**

```ts
// sanity/schemaTypes/caseStudy.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'company', type: 'string', title: 'Company Name' }),
    defineField({ name: 'industry', type: 'string', title: 'Industry & Size' }),
    defineField({ name: 'tag', type: 'string', title: 'Service Tag (e.g. Taxation)' }),
    defineField({ name: 'challenge', type: 'text', title: 'Challenge Description', rows: 3 }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'num', type: 'string', title: 'Number / Value' }),
          defineField({ name: 'label', type: 'string', title: 'Label' }),
        ],
      })],
    }),
    defineField({ name: 'order', type: 'number', title: 'Sort Order' }),
  ],
})
```

- [ ] **Step 9: Create sanity/schemaTypes/post.ts**

```ts
// sanity/schemaTypes/post.ts
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt', rows: 2 }),
    defineField({ name: 'category', type: 'string', title: 'Category' }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{ type: 'teamMember' }],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'readTime', type: 'number', title: 'Read Time (minutes)' }),
  ],
})
```

- [ ] **Step 10: Create sanity/schema.ts**

```ts
// sanity/schema.ts
import { siteSettings } from './schemaTypes/siteSettings'
import { service } from './schemaTypes/service'
import { teamMember } from './schemaTypes/teamMember'
import { testimonial } from './schemaTypes/testimonial'
import { caseStudy } from './schemaTypes/caseStudy'
import { post } from './schemaTypes/post'

export const schemaTypes = [siteSettings, service, teamMember, testimonial, caseStudy, post]
```

- [ ] **Step 11: Create sanity.config.ts**

```ts
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'pinnacle',
  title: 'Pinnacle Advisory',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 12: Create embedded Studio route**

```bash
mkdir -p src/app/studio/"[[...tool]]"
```

```tsx
// src/app/studio/[[...tool]]/page.tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 13: Verify TypeScript and dev server**

```bash
pnpm exec tsc --noEmit
pnpm run dev
```

Open `http://localhost:3000/studio` — should show Sanity Studio with 6 document types.

- [ ] **Step 14: Commit**

```bash
git add sanity/ sanity.config.ts src/app/studio/ .env.local package.json pnpm-lock.yaml
git commit -m "feat: Sanity v3 setup with 6 schemas and embedded studio at /studio"
```

---

### Task 4: Sanity Client + GROQ Queries

**Files:**
- Create: `src/lib/sanity.ts`
- Create: `src/lib/queries.ts`

**Interfaces:**
- Produces: `getSiteSettings()`, `getServices()`, `getTeamMembers()`, `getTestimonials()`, `getCaseStudies()`, `getPosts()` — all return typed data

- [ ] **Step 1: Create src/lib/sanity.ts**

```ts
// src/lib/sanity.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

- [ ] **Step 2: Create src/lib/queries.ts**

```ts
// src/lib/queries.ts
import { client } from './sanity'
import type { SiteSettings, Service, TeamMember, Testimonial, CaseStudy, Post } from '@/types'

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(`*[_type == "service"] | order(order asc)`)
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(order asc)`)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(order asc)`)
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return client.fetch(`*[_type == "caseStudy"] | order(order asc)`)
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ..., author->{ name } }`
  )
}
```

- [ ] **Step 3: Verify**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/
git commit -m "feat: Sanity client and typed GROQ query functions"
```

---

### Task 5: Skeleton Components + page.tsx Shell

**Files:**
- Create: `src/components/skeletons/HeroSkeleton.tsx`
- Create: `src/components/skeletons/SectionSkeleton.tsx`
- Create: `src/components/skeletons/CardGridSkeleton.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: Skeleton components usable as `fallback` props in `<Suspense>`
- Produces: `page.tsx` orchestrator that imports all sections (stubs for now)

- [ ] **Step 1: Create HeroSkeleton**

```tsx
// src/components/skeletons/HeroSkeleton.tsx
export default function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-navy pt-[70px] animate-pulse">
      <div className="max-w-site mx-auto px-6 py-20 grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-4 pt-8">
          <div className="h-3 w-48 bg-white/10 rounded" />
          <div className="h-12 w-full bg-white/10 rounded" />
          <div className="h-12 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded mt-2" />
          <div className="h-4 w-5/6 bg-white/10 rounded" />
          <div className="flex gap-4 mt-4">
            <div className="h-12 w-44 bg-gold/30 rounded-sm" />
            <div className="h-12 w-36 bg-white/10 rounded-sm" />
          </div>
        </div>
        <div className="h-64 bg-white/5 border border-gold/20 rounded-lg" />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create SectionSkeleton**

```tsx
// src/components/skeletons/SectionSkeleton.tsx
export default function SectionSkeleton() {
  return (
    <div className="py-24 animate-pulse">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <div className="h-3 w-24 bg-gold/30 rounded" />
          <div className="h-9 w-96 bg-slate/20 rounded" />
          <div className="h-4 w-[560px] bg-slate/10 rounded" />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create CardGridSkeleton**

```tsx
// src/components/skeletons/CardGridSkeleton.tsx
export default function CardGridSkeleton({ cols = 3 }: { cols?: 2 | 3 | 4 }) {
  const gridClass = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[cols]
  return (
    <div className="py-24 animate-pulse">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <div className="h-3 w-24 bg-slate/20 rounded" />
          <div className="h-9 w-80 bg-slate/20 rounded" />
        </div>
        <div className={`grid ${gridClass} gap-6`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-64 bg-slate/10 rounded border border-border" />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Scaffold page.tsx with Suspense wrappers**

Components don't exist yet — import them anyway so TypeScript will catch missing files as tasks complete.

```tsx
// src/app/page.tsx
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import Services from '@/components/Services'
import About from '@/components/About'
import Process from '@/components/Process'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import Team from '@/components/Team'
import CTABanner from '@/components/CTABanner'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import HeroSkeleton from '@/components/skeletons/HeroSkeleton'
import SectionSkeleton from '@/components/skeletons/SectionSkeleton'
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton'

export const revalidate = 3600

export default function Page() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}><Hero /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><TrustStrip /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={2} />}><Services /></Suspense>
      <About />
      <Process />
      <Suspense fallback={<CardGridSkeleton cols={3} />}><CaseStudies /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={3} />}><Testimonials /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={3} />}><Blog /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={4} />}><Team /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><CTABanner /></Suspense>
      <Contact />
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Commit skeletons (page.tsx will error until all components are created)**

```bash
git add src/components/skeletons/ src/app/page.tsx
git commit -m "feat: skeleton loading components and page.tsx Suspense orchestrator"
```

---

### Task 6: Navbar + MobileMenu

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/MobileMenu.tsx`

- [ ] **Step 1: Create MobileMenu.tsx**

```tsx
// src/components/MobileMenu.tsx
'use client'

interface Props {
  open: boolean
  onClose: () => void
  links: Array<{ href: string; label: string }>
}

export default function MobileMenu({ open, onClose, links }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 bg-navy z-[999] flex flex-col items-center justify-center gap-8"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <button
        className="absolute top-6 right-6 bg-transparent border-0 text-white text-3xl cursor-pointer"
        aria-label="Close menu"
        onClick={onClose}
      >
        ✕
      </button>
      <a href="#home" onClick={onClose} className="text-white font-display text-[1.75rem] font-bold no-underline hover:text-gold transition-colors">Home</a>
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="text-white font-display text-[1.75rem] font-bold no-underline hover:text-gold transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create Navbar.tsx**

```tsx
// src/components/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#team', label: 'Our Team' },
  { href: '#blog', label: 'Insights' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-[1000] bg-navy/[0.97] backdrop-blur-[8px] border-b border-gold/[0.15] transition-shadow duration-300${scrolled ? ' shadow-[0_4px_24px_rgba(0,0,0,0.3)]' : ''}`}
      >
        <div className="max-w-site mx-auto px-6 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a href="#home" aria-label="Pinnacle Advisory Group home" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <path d="M10 2L3 7v10h4v-6h6v6h4V7L10 2z" fill="#0B1F3A" />
              </svg>
            </div>
            <div className="font-display font-bold text-[1.1rem] text-white leading-[1.1]">
              Pinnacle
              <span className="block text-[0.625rem] font-body font-normal tracking-[0.15em] uppercase text-gold mt-px">
                Advisory Group
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/80 no-underline text-[0.8125rem] font-medium tracking-[0.04em] hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline ml-4 hover:bg-gold-light hover:-translate-y-px transition-all"
          >
            Get a Consultation
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  )
}
```

- [ ] **Step 3: Verify**

```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/MobileMenu.tsx
git commit -m "feat: Navbar with scroll shadow and mobile menu overlay"
```

---

### Task 7: Hero + TrustStrip

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/TrustStrip.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
// src/components/Hero.tsx
import { getSiteSettings } from '@/lib/queries'

export default async function Hero() {
  const s = await getSiteSettings()
  const titleParts = s.heroTitleHighlight
    ? s.heroTitle.split(s.heroTitleHighlight)
    : [s.heroTitle, '']

  return (
    <section id="home" className="min-h-screen bg-navy flex items-center relative overflow-hidden pt-[70px]" aria-label="Hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-[#0d2544]" />
      <div className="hero-pattern absolute inset-0" />
      <div className="absolute right-0 top-0 bottom-0 w-[42%] bg-gold/[0.04] border-l border-gold/[0.12]" />

      <div className="max-w-site mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20">

          {/* Left */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-6">
              <span className="block w-6 h-0.5 bg-gold" />
              Est. 1998 · Trusted by 1,200+ Clients
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold text-white leading-[1.1] mb-6">
              {titleParts[0]}
              {s.heroTitleHighlight && (
                <em className="not-italic text-gold">{s.heroTitleHighlight}</em>
              )}
              {titleParts[1]}
            </h1>

            <p className="text-[1.0625rem] text-white/70 leading-[1.75] mb-10 max-w-[480px]">
              {s.heroDesc}
            </p>

            <div className="flex gap-4 flex-wrap">
              <a href="#contact" className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light hover:-translate-y-px transition-all">
                Book a Free Consultation ›
              </a>
              <a href="#services" className="inline-flex items-center gap-2 bg-transparent text-white px-[31px] py-[13px] rounded-sm border border-white/50 font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:border-gold hover:text-gold transition-all">
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-13 pt-10 border-t border-white/10">
              {s.heroStats.map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-[2.25rem] font-bold text-gold">{stat.num}</div>
                  <div className="text-[0.8125rem] text-white/55 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative financial card */}
          <div className="hidden md:flex items-center justify-center fade-up fade-up-delay-2">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute -top-3.5 -right-3.5 w-[90%] h-full bg-gold/[0.08] border border-gold/[0.15] rounded-lg" />
              <div className="relative z-10 bg-white/[0.06] border border-gold/20 rounded-lg p-7 backdrop-blur-[12px]">
                <div className="text-[0.7rem] tracking-[0.1em] uppercase text-gold mb-3">Q3 Financial Overview</div>
                <div className="font-display text-[2rem] font-bold text-white">$2,847,000</div>
                <div className="text-[0.8125rem] text-[#4ade80] mt-1.5">↑ 18.4% vs prior year</div>
                <div className="flex justify-between mt-5 pt-4 border-t border-white/10">
                  {[
                    { label: 'Tax Savings', val: '$384,200' },
                    { label: 'Compliance', val: '100%' },
                    { label: 'Audit Status', val: 'Clean' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-[0.75rem] text-white/50">{item.label}</div>
                      <div className="text-[0.875rem] font-semibold text-white mt-0.5">{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-white/10 rounded mt-5 overflow-hidden">
                  <div className="h-full bg-gold rounded w-[72%]" />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[0.7rem] text-white/40">Budget used</span>
                  <span className="text-[0.7rem] text-gold">72% on track</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create TrustStrip.tsx**

```tsx
// src/components/TrustStrip.tsx
import { getSiteSettings } from '@/lib/queries'

export default async function TrustStrip() {
  const s = await getSiteSettings()

  return (
    <div className="bg-cream border-t border-border border-b py-7" aria-label="Client logos">
      <div className="max-w-site mx-auto px-6">
        <div className="flex items-center gap-10 justify-between flex-wrap">
          <div className="text-[0.75rem] tracking-[0.1em] uppercase text-slate-light whitespace-nowrap">
            Trusted by industry leaders
          </div>
          <div className="flex items-center gap-9 flex-wrap">
            {s.trustLogos.map(logo => (
              <div key={logo.name} className="font-display text-base font-semibold text-[#b0a090] opacity-60 tracking-[0.02em]">
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/TrustStrip.tsx
git commit -m "feat: Hero and TrustStrip with Sanity siteSettings"
```

---

### Task 8: Services

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create Services.tsx**

```tsx
// src/components/Services.tsx
import { getServices } from '@/lib/queries'

export default async function Services() {
  const services = await getServices()

  return (
    <section id="services" className="py-24 bg-white" aria-label="Services">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            What We Do
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Comprehensive Financial <em className="not-italic text-gold">Services</em>
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7]">
            From day-to-day bookkeeping to complex cross-border tax structures — our specialist teams bring deep expertise across every financial discipline.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(svc => (
            <article key={svc._id} className="service-card border border-border rounded-sm p-10 bg-white hover:border-gold hover:shadow-[0_8px_40px_rgba(11,31,58,0.08)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-13 h-13 bg-cream rounded-sm flex items-center justify-center mb-6 text-2xl">
                {svc.icon}
              </div>
              <h3 className="font-display text-[1.375rem] font-bold text-navy mb-3">{svc.title}</h3>
              <p className="text-[0.9375rem] text-slate leading-[1.7] mb-5">{svc.description}</p>
              <ul className="list-none m-0 p-0">
                {svc.bullets.map(bullet => (
                  <li key={bullet} className="text-[0.875rem] text-slate py-1.5 border-b border-border last:border-b-0 flex items-center gap-2.5">
                    <span className="text-gold font-bold text-lg leading-none">›</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-navy text-[0.8125rem] font-semibold no-underline tracking-[0.04em] mt-6 hover:text-gold transition-colors">
                Explore {svc.title} ›
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/Services.tsx
git commit -m "feat: Services section from Sanity"
```

---

### Task 9: About (hardcoded) + AboutBars client sub-component

**Files:**
- Create: `src/components/AboutBars.tsx`
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create AboutBars.tsx (Client Component for IntersectionObserver animation)**

```tsx
// src/components/AboutBars.tsx
'use client'
import { useEffect, useRef } from 'react'

const BARS = [
  { label: 'Corporate Tax Optimisation', value: 94,   display: '94%' },
  { label: 'Audit Success Rate',         value: 99.2, display: '99.2%' },
  { label: 'Advisory ROI Delivery',      value: 87,   display: '87%' },
  { label: 'Client Satisfaction Score',  value: 98,   display: '4.9/5' },
]

export default function AboutBars() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.querySelectorAll<HTMLElement>('[data-width]').forEach(bar => {
          bar.style.width = bar.dataset.width ?? '0%'
        })
        observer.disconnect()
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {BARS.map(bar => (
        <div key={bar.label}>
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>{bar.label}</span>
            <span className="text-gold">{bar.display}</span>
          </div>
          <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-[width] duration-[1200ms] ease-out"
              style={{ width: '0%' }}
              data-width={`${bar.value}%`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create About.tsx**

```tsx
// src/components/About.tsx
import AboutBars from './AboutBars'

const PILLARS = [
  { title: 'Independence', text: 'Privately owned, free from conflicts of interest, solely focused on client outcomes.' },
  { title: 'Expertise',    text: '140+ CPAs, tax lawyers, and industry specialists across 8 service lines.' },
  { title: 'Technology',   text: 'Proprietary analytics platform and integrations with leading finance tools.' },
  { title: 'Relationships', text: '98% client retention. Most of our business comes from referrals.' },
]

const TEAM = [
  { initials: 'JR', name: 'J. Rawlins' },
  { initials: 'SM', name: 'S. Moreau' },
  { initials: 'AK', name: 'A. Khan' },
  { initials: 'LC', name: 'L. Chen' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-navy" aria-label="About Pinnacle">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Who We Are
            </div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-white leading-tight mb-5">
              Built on <em className="not-italic text-gold">Integrity,</em> Driven by Results
            </h2>
            <p className="text-[0.9375rem] text-white/65 leading-[1.75] mb-4">
              Founded in 1998, Pinnacle Advisory Group has grown from a boutique practice into one of the most trusted mid-market accounting and advisory firms in the region. Our independence is our greatest asset — we answer only to our clients.
            </p>
            <p className="text-[0.9375rem] text-white/65 leading-[1.75] mb-9">
              We combine the personal service of a boutique firm with the technical depth and resource of a large practice. Every client relationship is led by a senior partner, ensuring continuity, accountability, and strategic focus at every stage.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {PILLARS.map(p => (
                <div key={p.title} className="border-l-2 border-gold pl-4">
                  <div className="font-display text-base font-semibold text-white mb-1">{p.title}</div>
                  <div className="text-[0.8125rem] text-white/50 leading-[1.5]">{p.text}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap mt-8">
              {['🏆 AICPA Member', '✓ PCAOB Registered', '⭐ ISO 27001', '📋 ICAEW Affiliated'].map(badge => (
                <div key={badge} className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/25 rounded-sm px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right — metrics visual */}
          <div className="bg-white/[0.04] border border-gold/20 rounded-md overflow-hidden">
            <div className="bg-gold/10 px-6 py-4 border-b border-gold/[0.15] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-[0.75rem] text-white/40 ml-2 font-body">Client Portfolio Performance · 2024</span>
            </div>
            <div className="p-7">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="text-[0.75rem] text-white/45 tracking-[0.08em] uppercase">Avg. Tax Saved</div>
                  <div className="font-display text-[1.875rem] font-bold text-white">$127,400</div>
                </div>
                <div className="text-right">
                  <div className="text-[0.75rem] text-white/45 tracking-[0.08em] uppercase">Per Client</div>
                  <div className="text-[0.75rem] text-[#4ade80] font-semibold">↑ 22% YoY</div>
                </div>
              </div>

              <AboutBars />

              <div className="grid grid-cols-4 gap-4 mt-5 pt-5 border-t border-white/[0.08]">
                {TEAM.map(m => (
                  <div key={m.initials} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#a07830] flex items-center justify-center font-display text-base font-bold text-navy mx-auto mb-2">
                      {m.initials}
                    </div>
                    <div className="text-[0.7rem] text-white/60">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/About.tsx src/components/AboutBars.tsx
git commit -m "feat: About section with animated metrics bars"
```

---

### Task 10: Process (hardcoded)

**Files:**
- Create: `src/components/Process.tsx`

- [ ] **Step 1: Create Process.tsx**

```tsx
// src/components/Process.tsx
const STEPS = [
  { num: '1', title: 'Discovery Call',      desc: 'We start with a complimentary consultation to understand your goals, challenges, and current financial position — no obligation, no jargon.' },
  { num: '2', title: 'Financial Review',    desc: 'Our team conducts a thorough review of your accounts, tax position, and risk profile to identify opportunities and gaps.' },
  { num: '3', title: 'Bespoke Strategy',    desc: 'We develop a tailored engagement plan with clear deliverables, timelines, and expected outcomes — aligned to your business strategy.' },
  { num: '4', title: 'Ongoing Partnership', desc: 'We work as an extension of your team — proactively advising, adapting, and delivering as your business evolves.' },
]

export default function Process() {
  return (
    <section id="process" className="py-24 bg-cream" aria-label="Our process">
      <div className="max-w-site mx-auto px-6">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            How We Work
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Our <em className="not-italic text-gold">Engagement</em> Process
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7] mx-auto">
            A structured approach that delivers clarity, accountability, and measurable outcomes from day one.
          </p>
        </header>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-px bg-border" />
          {STEPS.map(step => (
            <div key={step.num} className="text-center px-5 relative z-10 group">
              <div className="w-[60px] h-[60px] rounded-full bg-white border-2 border-border flex items-center justify-center font-display text-xl font-bold text-navy mx-auto mb-6 group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all duration-300">
                {step.num}
              </div>
              <h3 className="font-display text-[1.125rem] font-bold text-navy mb-2.5">{step.title}</h3>
              <p className="text-[0.875rem] text-slate leading-[1.65]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/Process.tsx
git commit -m "feat: Process section with 4-step connector"
```

---

### Task 11: CaseStudies

**Files:**
- Create: `src/components/CaseStudies.tsx`

- [ ] **Step 1: Create CaseStudies.tsx**

```tsx
// src/components/CaseStudies.tsx
import { getCaseStudies } from '@/lib/queries'

export default async function CaseStudies() {
  const cases = await getCaseStudies()

  return (
    <section id="case-studies" className="py-24 bg-white" aria-label="Case studies">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            Client Success
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Results That <em className="not-italic text-gold">Speak</em> for Themselves
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7]">
            Real outcomes for real clients. Every engagement is measured not just in compliance, but in commercial impact.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cases.map(c => (
            <article key={c._id} className="rounded-sm overflow-hidden border border-border hover:shadow-[0_16px_48px_rgba(11,31,58,0.1)] hover:-translate-y-1 transition-all duration-300">
              <div className="p-8 bg-navy relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-gold/[0.08] rounded-full translate-x-10 translate-y-10" />
                <div className="inline-block bg-gold/15 border border-gold/30 rounded-sm px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold mb-3.5">
                  {c.tag}
                </div>
                <h3 className="font-display text-[1.25rem] font-bold text-white mb-2">{c.company}</h3>
                <div className="text-[0.8125rem] text-white/50">{c.industry}</div>
              </div>
              <div className="p-7">
                <div className="text-[0.7rem] tracking-[0.1em] uppercase text-slate-light mb-2">The Challenge</div>
                <p className="text-[0.9rem] text-text leading-[1.6] mb-6">{c.challenge}</p>
                <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
                  {c.results.map(r => (
                    <div key={r.label}>
                      <div className="font-display text-[1.625rem] font-bold text-navy">{r.num}</div>
                      <div className="text-[0.75rem] text-slate-light mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/CaseStudies.tsx
git commit -m "feat: Case Studies section from Sanity"
```

---

### Task 12: Testimonials

**Files:**
- Create: `src/components/Testimonials.tsx`

- [ ] **Step 1: Create Testimonials.tsx**

```tsx
// src/components/Testimonials.tsx
import { getTestimonials } from '@/lib/queries'

export default async function Testimonials() {
  const items = await getTestimonials()

  return (
    <section id="testimonials" className="py-24 bg-cream" aria-label="Client testimonials">
      <div className="max-w-site mx-auto px-6">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            Client Voices
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            What Our <em className="not-italic text-gold">Clients</em> Say
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7] mx-auto">
            We measure success by the relationships we build and the outcomes we deliver.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(t => (
            <article key={t._id} className="bg-white rounded-sm border border-border p-9 relative hover:shadow-[0_12px_40px_rgba(11,31,58,0.07)] transition-shadow">
              <div className="font-display text-[4rem] text-gold leading-none mb-4 opacity-50">"</div>
              <div className="text-[0.875rem] text-gold tracking-[2px] mb-4">★★★★★</div>
              <p className="text-[0.9375rem] text-slate leading-[1.75] mb-7 italic">{t.quote}</p>
              <div className="flex items-center gap-3.5 border-t border-border pt-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-navy flex items-center justify-center font-display text-base font-bold text-white shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[0.9rem] text-navy">{t.authorName}</div>
                  <div className="text-[0.8rem] text-slate-light">{t.authorRole}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/Testimonials.tsx
git commit -m "feat: Testimonials section from Sanity"
```

---

### Task 13: Blog

**Files:**
- Create: `src/components/Blog.tsx`

- [ ] **Step 1: Create Blog.tsx**

```tsx
// src/components/Blog.tsx
import { getPosts } from '@/lib/queries'

const SYMBOLS = ['§', '₤', '↗']

export default async function Blog() {
  const posts = await getPosts()

  return (
    <section id="blog" className="py-24 bg-white" aria-label="Insights and blog">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            Insights & Analysis
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            From Our <em className="not-italic text-gold">Expert</em> Team
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7]">
            Timely, practical perspectives on accounting, tax, regulation, and business strategy.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-7">
          {posts.map((post, i) => (
            <article key={post._id} className="border border-border rounded-sm overflow-hidden hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)] hover:-translate-y-0.5 transition-all duration-300">
              <div className={`bg-navy flex items-center justify-center relative overflow-hidden ${i === 0 ? 'min-h-[260px]' : 'min-h-[200px]'} p-9`}>
                <span className="font-display text-5xl text-white opacity-15 absolute">{SYMBOLS[i] ?? '›'}</span>
                <span className="relative z-10 inline-block bg-gold text-navy px-2.5 py-1 rounded-sm text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="text-[0.75rem] text-slate-light mb-2.5 flex gap-3">
                  <span>{post.author.name}</span>
                  <span>·</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
                </div>
                <h3 className={`font-display font-bold text-navy leading-[1.3] mb-2.5 ${i === 0 ? 'text-[1.375rem]' : 'text-[1.125rem]'}`}>
                  {post.title}
                </h3>
                <p className="text-[0.875rem] text-slate leading-[1.6] mb-4">{post.excerpt}</p>
                <a href="#blog" className="text-[0.8125rem] font-semibold text-navy no-underline tracking-[0.04em] flex items-center gap-1.5 hover:text-gold transition-colors">
                  Read {i === 0 ? 'Full Article' : 'Article'} ›
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#blog" className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light hover:-translate-y-px transition-all">
            View All Insights ›
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/Blog.tsx
git commit -m "feat: Blog/Insights section from Sanity"
```

---

### Task 14: Team

**Files:**
- Create: `src/components/Team.tsx`

- [ ] **Step 1: Create Team.tsx**

```tsx
// src/components/Team.tsx
import { getTeamMembers } from '@/lib/queries'

export default async function Team() {
  const members = await getTeamMembers()

  return (
    <section id="team" className="py-24 bg-cream" aria-label="Our team">
      <div className="max-w-site mx-auto px-6">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            The People
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Meet Our <em className="not-italic text-gold">Leadership</em> Team
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7] mx-auto">
            Seasoned professionals with decades of experience across accounting, tax, audit, and strategic advisory.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map(m => (
            <article key={m._id} className="bg-white rounded-sm overflow-hidden border border-border hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div
                className="h-[220px] flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${m.gradientFrom} 0%, ${m.gradientTo} 100%)` }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="font-display text-5xl font-bold text-white/20">{m.initials}</span>
              </div>
              <div className="p-5">
                <div className="font-display text-[1.0625rem] font-bold text-navy">{m.name}</div>
                <div className="text-[0.8125rem] text-gold font-semibold mt-0.5 mb-2">{m.role}</div>
                <p className="text-[0.8125rem] text-slate leading-[1.6] mb-3">{m.bio}</p>
                <div className="text-[0.7rem] tracking-[0.06em] text-slate-light uppercase">{m.credentials}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/Team.tsx
git commit -m "feat: Team section from Sanity"
```

---

### Task 15: CTABanner + Contact + Footer

**Files:**
- Create: `src/components/CTABanner.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create CTABanner.tsx**

```tsx
// src/components/CTABanner.tsx
import { getSiteSettings } from '@/lib/queries'

export default async function CTABanner() {
  const s = await getSiteSettings()

  return (
    <div className="bg-gold py-[72px]" aria-label="Call to action">
      <div className="max-w-site mx-auto px-6">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <div>
            <div className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-navy max-w-[600px] leading-[1.3]">
              {s.ctaTitle}
            </div>
            <div className="text-[0.9375rem] text-navy/70 mt-2">{s.ctaSubtitle}</div>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-navy-light transition-colors shrink-0">
            Speak to a Partner Today ›
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Contact.tsx**

```tsx
// src/components/Contact.tsx
'use client'
import { useState } from 'react'

const SERVICES = [
  'Accounting & Bookkeeping',
  'Taxation Services',
  'Audit & Assurance',
  'Business Advisory',
  'M&A Due Diligence',
  'Forensic Accounting',
  'Multiple Services',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit() {
    if (!firstName.trim() || !email.trim()) {
      alert('Please fill in at least your name and email address.')
      return
    }
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-white/[0.06] border border-white/[0.12] rounded-sm px-4 py-3 text-white font-body text-[0.9375rem] outline-none focus:border-gold transition-colors placeholder:text-white/30'

  return (
    <section id="contact" className="py-24 bg-navy" aria-label="Contact us">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Get in Touch
            </div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-white leading-tight mb-5">
              Let&apos;s Start a <em className="not-italic text-gold">Conversation</em>
            </h2>
            <p className="text-[1.0625rem] text-white/65 leading-[1.7] max-w-[560px]">
              Whether you&apos;re exploring our services or facing an urgent financial challenge, our team is ready to help. First consultation is always complimentary.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              {[
                { icon: '📍', label: 'Main Office', value: '1200 Financial District Blvd, Suite 4400\nNew York, NY 10004' },
                { icon: '📞', label: 'Telephone', value: '+1 (800) 746-6225\nMon – Fri, 8am – 6pm EST' },
                { icon: '✉️', label: 'Email', value: 'hello@pinnacleadvisory.com\nReplies within 4 business hours' },
                { icon: '🏢', label: 'Other Offices', value: 'London · Chicago · Toronto · Dubai' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center shrink-0 text-base">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[0.75rem] tracking-[0.08em] uppercase text-gold font-semibold mb-1">{item.label}</div>
                    <div className="text-[0.9375rem] text-white/80 whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/[0.04] border border-gold/[0.15] rounded-md p-10">
            <h3 className="font-display text-[1.25rem] font-bold text-white mb-7">Request a Consultation</h3>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-first">First Name</label>
                <input id="f-first" type="text" placeholder="Jonathan" autoComplete="given-name" className={inputCls} value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-last">Last Name</label>
                <input id="f-last" type="text" placeholder="Rawlins" autoComplete="family-name" className={inputCls} />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-email">Email Address</label>
              <input id="f-email" type="email" placeholder="j.rawlins@company.com" autoComplete="email" className={inputCls} value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-company">Company Name</label>
                <input id="f-company" type="text" placeholder="Acme Corp" autoComplete="organization" className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-phone">Phone Number</label>
                <input id="f-phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" className={inputCls} />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-service">Service Area</label>
              <select id="f-service" className={`${inputCls} appearance-none cursor-pointer [&>option]:bg-navy`}>
                <option value="">Select a service…</option>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-message">Tell Us About Your Needs</label>
              <textarea id="f-message" rows={4} placeholder="Briefly describe your situation…" className={`${inputCls} resize-y min-h-[120px]`} />
            </div>

            {submitted ? (
              <div className="w-full py-3.5 bg-navy text-gold text-center text-sm font-semibold rounded-sm border border-gold/30">
                ✓ Enquiry Received — We&apos;ll be in touch within 4 hours
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase cursor-pointer border-0 hover:bg-gold-light transition-colors"
              >
                Submit Enquiry ›
              </button>
            )}
            <p className="text-[0.75rem] text-white/35 mt-4 text-center">
              Your information is handled in accordance with our Privacy Policy. We never share or sell client data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Footer.tsx**

```tsx
// src/components/Footer.tsx
const SERVICES_LINKS = ['Accounting & Bookkeeping','Taxation Services','Audit & Assurance','Business Advisory','M&A Due Diligence','Forensic Accounting','ESG Reporting']
const COMPANY_LINKS  = [['About Us','#about'],['Our Team','#team'],['Case Studies','#case-studies'],['Insights','#blog'],['Testimonials','#testimonials'],['Careers','#contact'],['Press & Media','#contact']]
const OFFICES        = ['New York (HQ)','London','Chicago','Toronto','Dubai']

export default function Footer() {
  return (
    <footer className="bg-navy-dark pt-16 pb-8" aria-label="Site footer">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 no-underline mb-4">
              <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M10 2L3 7v10h4v-6h6v6h4V7L10 2z" fill="#0B1F3A" />
                </svg>
              </div>
              <div className="font-display font-bold text-[1.2rem] text-white leading-[1.1]">
                Pinnacle
                <span className="block text-[0.625rem] font-body font-normal tracking-[0.15em] uppercase text-gold mt-px">Advisory Group</span>
              </div>
            </div>
            <p className="text-[0.875rem] text-white/45 leading-[1.65] max-w-[260px]">
              Independent accounting, tax, and advisory. Partnering with ambitious businesses since 1998.
            </p>
            <div className="flex gap-3 mt-6">
              {[['in','LinkedIn'],['𝕏','Twitter'],['f','Facebook'],['▶','YouTube']].map(([icon, label]) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 bg-white/[0.06] border border-white/10 rounded-sm flex items-center justify-center text-[0.875rem] text-white/50 no-underline hover:border-gold hover:text-gold transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-display text-[0.875rem] font-bold text-white mb-5 uppercase tracking-[0.06em]">Services</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {SERVICES_LINKS.map(s => (
                <li key={s}><a href="#services" className="text-white/45 no-underline text-[0.875rem] hover:text-gold transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-display text-[0.875rem] font-bold text-white mb-5 uppercase tracking-[0.06em]">Company</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={label}><a href={href} className="text-white/45 no-underline text-[0.875rem] hover:text-gold transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Offices + Accreditations */}
          <div>
            <div className="font-display text-[0.875rem] font-bold text-white mb-5 uppercase tracking-[0.06em]">Offices</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {OFFICES.map(o => (
                <li key={o}><a href="#contact" className="text-white/45 no-underline text-[0.875rem] hover:text-gold transition-colors">{o}</a></li>
              ))}
            </ul>
            <div className="mt-7">
              <div className="font-display text-[0.875rem] font-bold text-white mb-3 uppercase tracking-[0.06em]">Accreditations</div>
              <div className="flex flex-col gap-1.5">
                {['🏆 AICPA Member Firm','✓ PCAOB Registered','⭐ ISO 27001 Certified'].map(a => (
                  <span key={a} className="text-[0.8rem] text-white/40">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-7 flex flex-col md:flex-row justify-between items-center gap-3 flex-wrap">
          <div className="text-[0.8125rem] text-white/30">© 2025 Pinnacle Advisory Group. All rights reserved.</div>
          <div className="flex gap-6">
            {['Privacy Policy','Terms of Service','Cookie Policy','Accessibility'].map(l => (
              <a key={l} href="#" className="text-[0.8125rem] text-white/30 no-underline hover:text-gold transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Verify + commit**

```bash
pnpm exec tsc --noEmit
git add src/components/CTABanner.tsx src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: CTABanner, Contact form, and Footer components"
```

---

### Task 16: Final Verification + Sanity Content Seed

**Files:**
- Verify: `src/app/page.tsx` (all imports now resolve)

**Goal:** Run dev server, confirm TypeScript passes, then seed all content into Sanity Studio.

- [ ] **Step 1: TypeScript full check**

```bash
pnpm exec tsc --noEmit
```

Expected: zero errors (all components now exist).

- [ ] **Step 2: Start dev server**

```bash
pnpm run dev
```

Open `http://localhost:3000` — page renders with skeleton placeholders where Sanity data is missing.

- [ ] **Step 3: Open Sanity Studio and seed siteSettings**

Open `http://localhost:3000/studio` → **Site Settings** → Create document:

| Field | Value |
|---|---|
| heroTitle | Financial Clarity for Ambitious Businesses |
| heroTitleHighlight | Ambitious |
| heroDesc | Pinnacle Advisory Group delivers expert accounting, taxation, audit, and strategic advisory services. We don't just balance books — we build financial strategies that drive lasting growth. |
| heroStats | `$4.2B+` / Client assets under advisory · `26 yrs` / Industry experience · `98%` / Client retention rate · `140+` / Certified professionals |
| trustLogos | Meridian Corp · Halcyon Group · Vantage Capital · NorthStar RE · Elara Health · Crestview PLC |
| ctaTitle | Ready to take control of your financial future? |
| ctaSubtitle | Book a free, no-obligation consultation with one of our senior partners today. |

- [ ] **Step 4: Seed Services (create 4 documents in order)**

**Service 1 — order: 1**
- title: Accounting & Bookkeeping · icon: 📊
- description: Accurate, timely financial records are the foundation of every sound business decision.
- bullets: General ledger maintenance & reconciliation · Management accounts & financial reporting · Payroll processing & compliance · Cash flow forecasting & monitoring · IFRS & GAAP compliant reporting · Cloud accounting (Xero, QuickBooks, SAP)

**Service 2 — order: 2**
- title: Taxation Services · icon: 🏛️
- description: Navigate the ever-changing tax landscape with confidence.
- bullets: Corporate & personal tax planning · International & cross-border taxation · VAT / GST registration and returns · Transfer pricing & country-by-country reporting · R&D tax credits and incentives · Tax dispute resolution & HMRC representation

**Service 3 — order: 3**
- title: Audit & Assurance · icon: 🔍
- description: Our audit practice provides independent, rigorous assurance that strengthens stakeholder trust.
- bullets: Statutory & external audits · Internal audit & control reviews · Forensic accounting & fraud investigation · Due diligence for M&A transactions · Sustainability & ESG assurance · IT & systems auditing

**Service 4 — order: 4**
- title: Business Advisory · icon: 🧭
- description: Beyond the numbers, we serve as strategic partners.
- bullets: CFO advisory & financial strategy · Mergers, acquisitions & restructuring · Business valuations & exit planning · Risk management & governance · Financial modelling & scenario analysis · Board-level reporting & presentations

- [ ] **Step 5: Seed Team Members (4 documents)**

**Member 1 — order: 1**
- name: Jonathan Rawlins · role: Managing Partner · initials: JR
- bio: 30+ years in corporate taxation and M&A advisory. Former Big Four partner with deep expertise in cross-border structures.
- credentials: FCA · CTA · Harvard MBA · gradientFrom: #0B1F3A · gradientTo: #1a3a6e

**Member 2 — order: 2**
- name: Sophie Moreau · role: Head of Audit & Assurance · initials: SM
- bio: Specialist in financial services and listed company audits. Led 200+ statutory audits across EMEA over a 22-year career.
- credentials: ACA · PCAOB Certified · gradientFrom: #132A50 · gradientTo: #2a4f85

**Member 3 — order: 3**
- name: Aryan Khan · role: Head of Tax · initials: AK
- bio: International tax specialist with expertise in PE-backed transactions, BEPS compliance, and R&D tax relief claims across 18 jurisdictions.
- credentials: CTA · ADIT · LLM Tax · gradientFrom: #0d2544 · gradientTo: #163a6b

**Member 4 — order: 4**
- name: Lisa Chen · role: Director of Advisory · initials: LC
- bio: Former investment banker turned strategic advisor. Specialises in financial restructuring, valuations, and board-level reporting for growth-stage companies.
- credentials: CFA · CIMA · MBA · gradientFrom: #0B1F3A · gradientTo: #243b62

- [ ] **Step 6: Seed Testimonials (6 documents)**

| order | authorName | authorRole | initials | quote |
|---|---|---|---|---|
| 1 | Marcus Thornton | CFO, Elara Health Systems | MT | Pinnacle didn't just handle our audit — they identified £420,000 in recoverable VAT we had no idea we were owed. That kind of proactive thinking is why we've been with them for nine years. |
| 2 | Sophia Clarke | CEO & Co-founder, Fieldware Technologies | SC | We were preparing for our Series B and needed air-tight financials fast. Pinnacle's team worked alongside ours for six weeks and gave our investors exactly the confidence they needed. We closed the round. |
| 3 | Rajiv Kapoor | Managing Director, NorthStar Real Estate | RK | Our cross-border tax structure had become a liability. Pinnacle redesigned it completely. The savings in the first year alone covered our fees five times over. |
| 4 | Helen Whitmore | Director, Whitmore & Sons Group | HW | As a family business transitioning to the next generation, we needed more than an accountant — we needed a trusted advisor. The succession plan they built was brilliant. |
| 5 | David Laine | Chairman, Crestview Infrastructure PLC | DL | Their forensic team uncovered internal fraud within three weeks that our previous auditors had missed for two years. Decisive, discreet, and devastatingly effective. |
| 6 | James Petrov | Finance Director, Halcyon Retail Group | JP | We've worked with three Big Four firms over the years. Pinnacle gives us better partner access, faster turnaround, and frankly, more creative solutions. |

- [ ] **Step 7: Seed Case Studies (3 documents)**

**Case 1 — order: 1**
- company: Meridian Manufacturing Ltd · industry: Industrial Manufacturing · £120M turnover · tag: Taxation
- challenge: Meridian was paying £2.1M annually in avoidable corporation tax due to an outdated capital allowances strategy and unmapped R&D expenditure.
- results: `£847K` Tax saved in year one · `14 wks` Time to restructure · `£2.3M` 3-yr projected savings · `100%` HMRC compliant

**Case 2 — order: 2**
- company: Halcyon Retail Group · industry: Multi-site Retail · 240 locations · tag: Audit & M&A
- challenge: Halcyon needed urgent due diligence support ahead of a £45M acquisition, with a 6-week window and incomplete target financials.
- results: `6 wks` Full due diligence · `£3.2M` Risk identified & mitigated · `Deal` Successfully closed · `+28%` Post-acquisition EBITDA

**Case 3 — order: 3**
- company: Vantage Capital Partners · industry: Private Equity · $800M AUM · tag: Advisory
- challenge: Vantage's portfolio companies lacked standardised financial reporting, creating blind spots for fund managers.
- results: `8` Portfolio companies unified · `-60%` Reporting time reduction · `4.8★` LP satisfaction score · `$12M` Efficiency gains identified

- [ ] **Step 8: Seed Blog Posts (3 documents)**

**Post 1** — title: Pillar Two is Here: What the Global Minimum Tax Means for Multinational Businesses · category: Tax Strategy · author: Aryan Khan · publishedAt: 2025-06-08T00:00:00Z · readTime: 8 · excerpt: The OECD's 15% global minimum corporate tax is now in force across 140+ countries. We break down what it means for your structure and what to do now.

**Post 2** — title: Five Red Flags Auditors Look For — And How to Address Them Proactively · category: Audit · author: Sophie Moreau · publishedAt: 2025-05-22T00:00:00Z · readTime: 5 · excerpt: Understanding what triggers auditor scrutiny can help you maintain clean books year-round rather than scrambling before fieldwork begins.

**Post 3** — title: Valuation Multiples in 2025: Sector-by-Sector Breakdown for Founders · category: Advisory · author: Lisa Chen · publishedAt: 2025-05-10T00:00:00Z · readTime: 6 · excerpt: If you're considering a sale or fundraise, understanding where valuations sit today — and why — is critical to your negotiating position.

- [ ] **Step 9: Verify full page in browser**

Reload `http://localhost:3000` — all sections should render with real Sanity content matching the original `index.html`.

Check: hero, trust strip, services (4 cards), about, process, case studies (3), testimonials (6), blog (3), team (4), CTA, contact form, footer.

- [ ] **Step 10: Production build check**

```bash
pnpm run build
```

Expected: build completes with no TypeScript or render errors.

- [ ] **Step 11: Final commit**

```bash
git add .
git commit -m "feat: complete Next.js port of Pinnacle Advisory Group with Sanity CMS"
```
