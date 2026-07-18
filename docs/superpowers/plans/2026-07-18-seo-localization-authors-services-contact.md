# SEO, Localization, Authors, Services, and Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved NJV Accountants SEO, localized-blog, author-profile, content-page, analytics, WhatsApp, and Mailjet/reCAPTCHA upgrade end to end.

**Architecture:** Shared pure TypeScript utilities own URLs, JSON-LD, sitemap data, article headings, and contact validation so behavior is testable without Next.js. Sanity remains the content source; Next.js App Router templates render localized posts, author and content pages, metadata routes, global integrations, and the contact API with safe code fallbacks.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Sanity 6, Tailwind CSS 4, Vitest 4, Mailjet Send API v3.1, Google reCAPTCHA v2.

## Global Constraints

- Canonical production origin is exactly `https://www.njvaccountants.com`.
- Blog localization only; localized routes are `/blog/{languageCode}/{slug}` and legacy `/blog/{slug}` permanently redirects to English.
- English is the default language and `x-default` target.
- Translation copy is entered manually in Sanity.
- The WhatsApp number is exactly `+923225401701` and the email recipient is exactly `usamaashraf82@live.com`.
- Google Analytics measurement ID is exactly `G-3S4R07WLX1`.
- Contact submission must not crash or prevent builds when Mailjet or reCAPTCHA variables are absent.
- Preserve existing design tokens and standalone page-shell conventions.
- Do not invent awards, memberships, registrations, client counts, history, or performance claims.
- Run tests before implementation for every new pure behavior, then lint, type-check, build, and browser-check before completion.

---

## File Map

### Shared foundations

- Create `src/config/site.ts`: canonical origin, route registry, analytics, WhatsApp, recipient constants.
- Create `src/lib/seo.ts`: language validation, localized URL and alternate generation.
- Create `src/lib/jsonLd.ts`: JSON-LD validation and script-safe serialization.
- Create `src/lib/sitemap.ts`: pure sitemap entry assembly.
- Create `src/lib/articleHeadings.ts`: Markdown heading extraction and stable IDs.
- Create `src/lib/contact.ts`: form normalization, validation, HTML escaping, integration orchestration.

### Sanity

- Create `src/sanity/schemaTypes/language.ts`, `pageSeo.ts`, `contentPage.ts`, and `schemaMarkup.ts`.
- Modify `src/sanity/schemaTypes/post.ts`, `teamMember.ts`, `src/sanity/schema.ts`, `src/sanity/lib/sanity.ts`, and `src/sanity/lib/queries.ts`.
- Modify `src/types/index.ts` with complete query result types.

### Routes and UI

- Create `src/app/sitemap.ts`, `src/app/robots.ts`, localized article route, author route, About route, two Business Advisory routes, and `src/app/api/contact/route.ts`.
- Convert the legacy blog route to a permanent redirect.
- Create reusable `JsonLd`, `AuthorPopover`, `ArticleTableOfContents`, `ContentPageBody`, `ServicePage`, `WhatsAppWidget`, `GoogleAnalytics`, and `RecaptchaCheckbox` components.
- Modify blog listing/home cards, `Navbar`, `MobileMenu`, `Footer`, `Contact`, `layout`, and homepage.

### Tests

- Add focused tests under `src/lib/__tests__` plus static source assertions for required service keyword placement.

---

### Task 1: Site Configuration, SEO URLs, and JSON-LD Safety

**Files:**
- Create: `src/config/site.ts`
- Create: `src/lib/seo.ts`
- Create: `src/lib/jsonLd.ts`
- Test: `src/lib/__tests__/seo.test.ts`
- Test: `src/lib/__tests__/jsonLd.test.ts`

**Interfaces:**
- Produces: `SITE_URL`, `PUBLIC_ROUTES`, `blogPath(language, slug)`, `authorPath(slug)`, `absoluteUrl(path)`.
- Produces: `isLanguageCode(value): boolean` and `buildBlogAlternates(translations, current)` returning `{ canonical, languages }`.
- Produces: `parseJsonLd(value): Record<string, unknown> | null` and `serializeJsonLd(value): string | null`.

- [ ] **Step 1: Write failing URL and hreflang tests**

```ts
expect(blogPath("es", "articulo")).toBe("/blog/es/articulo");
expect(isLanguageCode("es-MX")).toBe(true);
expect(isLanguageCode("../es")).toBe(false);
expect(buildBlogAlternates(translations, spanish).languages["x-default"])
  .toBe("https://www.njvaccountants.com/blog/en/article");
```

- [ ] **Step 2: Run the SEO test and confirm imports fail**

Run: `pnpm test --run src/lib/__tests__/seo.test.ts`
Expected: FAIL because `@/lib/seo` does not exist.

- [ ] **Step 3: Implement the centralized route and alternate helpers**

Use `new URL(path, SITE_URL).toString()`, `Intl.getCanonicalLocales` inside a guarded validator, `encodeURIComponent` for segments, and published translation records shaped as `{ language: string; slug: string }`.

- [ ] **Step 4: Run the SEO tests**

Run: `pnpm test --run src/lib/__tests__/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing JSON-LD validation and escaping tests**

```ts
expect(parseJsonLd('{"@context":"https://schema.org","@type":"Organization"}'))
  .toMatchObject({ "@type": "Organization" });
expect(parseJsonLd("[]")).toBeNull();
expect(parseJsonLd('{"@context":"https://example.com"}')).toBeNull();
expect(serializeJsonLd({ value: "</script>" })).not.toContain("</script>");
```

- [ ] **Step 6: Run the JSON-LD test and confirm imports fail**

Run: `pnpm test --run src/lib/__tests__/jsonLd.test.ts`
Expected: FAIL because `@/lib/jsonLd` does not exist.

- [ ] **Step 7: Implement runtime JSON-LD validation and safe serialization**

Accept only plain objects or `@graph`-containing plain objects whose `@context` is `https://schema.org`, `http://schema.org`, or an array containing one of those values. Serialize through `JSON.stringify` and replace `<`, `>`, `&`, U+2028, and U+2029 with Unicode escapes.

- [ ] **Step 8: Run both test files and commit**

Run: `pnpm test --run src/lib/__tests__/seo.test.ts src/lib/__tests__/jsonLd.test.ts`
Expected: PASS.

Commit: `feat: add SEO URL and JSON-LD foundations`

### Task 2: Sanity Content Models and Typed Queries

**Files:**
- Create: `src/sanity/schemaTypes/schemaMarkup.ts`
- Create: `src/sanity/schemaTypes/language.ts`
- Create: `src/sanity/schemaTypes/pageSeo.ts`
- Create: `src/sanity/schemaTypes/contentPage.ts`
- Modify: `src/sanity/schemaTypes/post.ts`
- Modify: `src/sanity/schemaTypes/teamMember.ts`
- Modify: `src/sanity/schema.ts`
- Modify: `src/sanity/lib/sanity.ts`
- Modify: `src/sanity/lib/queries.ts`
- Modify: `src/types/index.ts`

**Interfaces:**
- Produces schemas named `language`, `pageSeo`, and `contentPage` plus reusable JSON-LD validation.
- Produces `getAllLocalizedPosts`, `getLocalizedPost`, `getPostTranslations`, `getAuthor`, `getAuthorPosts`, `getAllAuthorsForSitemap`, `getPageSeo`, and `getContentPage`.
- Existing posts without language resolve to English in GROQ through `coalesce(language->code, "en")` for backward compatibility.

- [ ] **Step 1: Add reusable Sanity JSON-LD validation**

Reuse the runtime parser in a `Rule.custom` callback and return `true` for an absent value or `Schema markup must be a valid Schema.org JSON object.` for invalid input.

- [ ] **Step 2: Add language, page SEO, and content-page schemas**

Validate language codes, normalized absolute paths, required unique route choices for content pages, and Portable Text arrays with blocks, images, and tables.

- [ ] **Step 3: Extend post and team-member schemas**

Add language/original-translation references, `updatedAt`, and `schemaMarkup` to posts. Add slug, image, email, LinkedIn, short/full biography, expertise, education, experience objects, achievements, years of experience, and `schemaMarkup` to team members.

- [ ] **Step 4: Register schemas and replace unsafe query result `any` types**

Add all schema types to `schemaTypes`; define `PortableTextBlock = Record<string, unknown>` and full `AuthorSummary`, `AuthorProfile`, `PostTranslation`, `LocalizedPost`, `PageSeo`, and `ContentPage` interfaces.

- [ ] **Step 5: Add no-CDN published client and typed GROQ query functions**

Export `publishedClient = client.withConfig({ useCdn: false, perspective: "published" })` for sitemap and request-time publication checks. Projections must explicitly dereference language and author fields rather than returning `...` for route-critical data.

- [ ] **Step 6: Validate schemas, type-check, and commit**

Run: `npx sanity schema validate`
Expected: zero schema errors.

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add localized content and author schemas`

### Task 3: Dynamic Sitemap and Robots

**Files:**
- Create: `src/lib/sitemap.ts`
- Test: `src/lib/__tests__/sitemap.test.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Interfaces:**
- Consumes: `PUBLIC_ROUTES`, localized post summaries, and author summaries.
- Produces: `buildSitemapEntries({ posts, authors })` compatible with `MetadataRoute.Sitemap`.

- [ ] **Step 1: Write failing sitemap assembly tests**

Test inclusion of all registered static routes, localized posts, and authors; test exclusion of missing slugs, invalid language codes, and duplicate URLs; test per-family language alternates.

- [ ] **Step 2: Run the sitemap test and confirm it fails**

Run: `pnpm test --run src/lib/__tests__/sitemap.test.ts`
Expected: FAIL because `buildSitemapEntries` is missing.

- [ ] **Step 3: Implement pure sitemap assembly**

Deduplicate with a `Map<string, MetadataRoute.Sitemap[number]>`, preserve `_updatedAt` values, and sort deterministically by URL.

- [ ] **Step 4: Run the sitemap tests**

Run: `pnpm test --run src/lib/__tests__/sitemap.test.ts`
Expected: PASS.

- [ ] **Step 5: Add request-time sitemap and robots metadata routes**

Set `export const dynamic = "force-dynamic"` in `sitemap.ts`, query through `publishedClient`, and catch Sanity failures by returning static entries. `robots.ts` allows `/`, disallows `/studio/` and `/api/`, and points to the canonical sitemap.

- [ ] **Step 6: Type-check and commit**

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add live sitemap and robots metadata`

### Task 4: Localized Blog Routes and Article Navigation

**Files:**
- Create: `src/app/blog/[language]/[slug]/page.tsx`
- Replace: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/components/Blog.tsx`
- Modify: `src/components/MarkdownArticleBody.tsx`
- Create: `src/lib/articleHeadings.ts`
- Test: `src/lib/__tests__/articleHeadings.test.ts`
- Create: `src/components/ArticleTableOfContents.tsx`
- Create: `src/components/JsonLd.tsx`

**Interfaces:**
- Consumes localized post and translation queries.
- Produces canonical and `alternates.languages` metadata, reciprocal hreflang links, article heading IDs, and a legacy permanent redirect.

- [ ] **Step 1: Write failing Markdown heading extraction tests**

Cover duplicate headings (`fees`, `fees-2`), punctuation, fenced code blocks, and fewer than two usable headings.

- [ ] **Step 2: Run the heading test and confirm it fails**

Run: `pnpm test --run src/lib/__tests__/articleHeadings.test.ts`
Expected: FAIL because the extractor is absent.

- [ ] **Step 3: Implement heading extraction and Markdown heading rendering**

Return `{ depth, text, id }[]`; render matching `h2`/`h3` components with IDs in `MarkdownArticleBody`; show the TOC only when at least two headings exist.

- [ ] **Step 4: Build localized article metadata and route**

Use `notFound()` for invalid language, missing post, or a post whose resolved language differs from the path. Use `generateMetadata` with canonical URL, `languages`, title, description, Open Graph image, and editor JSON-LD rendering in the page.

- [ ] **Step 5: Add article structure and related content**

Render breadcrumbs, linked author, published/updated dates, TOC, body, back to top, author section, related posts, and CTA. Use `Link` for every internal route.

- [ ] **Step 6: Convert the old route to a permanent redirect and update cards**

The legacy handler resolves only an English post and calls `permanentRedirect(blogPath("en", slug))`; blog cards use each post's resolved language path and show a language label.

- [ ] **Step 7: Run tests/type-check and commit**

Run: `pnpm test --run src/lib/__tests__/seo.test.ts src/lib/__tests__/articleHeadings.test.ts`
Expected: PASS.

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add localized blog articles and hreflang`

### Task 5: Author Profiles and Accessible Author Popovers

**Files:**
- Create: `src/app/authors/[slug]/page.tsx`
- Create: `src/components/AuthorPopover.tsx`
- Create: `src/components/AuthorProfileSections.tsx`
- Modify: `src/components/Team.tsx`
- Modify: `src/components/Blog.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: localized blog article route

**Interfaces:**
- Consumes `AuthorSummary` and `AuthorProfile`.
- Produces a focus/hover popover wrapper and full author page.

- [ ] **Step 1: Implement the client popover state machine with accessible controls**

Open on `mouseenter` and `focus`; close on `mouseleave`, focus leaving the wrapper, or Escape. Keep the author name as a real `Link`. Use `aria-describedby`, `role="tooltip"`, and no focus trap.

- [ ] **Step 2: Create the author profile page and metadata**

Render optional sections only when non-empty; use `mailto:` and validated LinkedIn links; render the author's JSON-LD and latest localized articles.

- [ ] **Step 3: Replace plain author labels across blog cards and article UI**

Use `AuthorPopover` when the author has a slug and a plain text fallback otherwise. Team cards link to `/authors/[slug]` when available.

- [ ] **Step 4: Type-check and commit**

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add author profiles and previews`

### Task 6: About and Business Advisory Content Pages

**Files:**
- Create: `src/content/defaultPages.ts`
- Create: `src/components/ContentPageBody.tsx`
- Create: `src/components/MarketingPageShell.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/services/business-advisory/business-valuation/page.tsx`
- Create: `src/app/services/business-advisory/ma-advisory/page.tsx`
- Test: `src/lib/__tests__/serviceSeo.test.ts`

**Interfaces:**
- Produces complete code fallback content and an optional Sanity Portable Text override selected by exact path.
- Service metadata remains application-owned.

- [ ] **Step 1: Write failing service SEO source tests**

Read exported page descriptors and assert the exact keyword appears in title, description, first paragraph, at least one H2, and CTA for each service.

- [ ] **Step 2: Run the source test and confirm it fails**

Run: `pnpm test --run src/lib/__tests__/serviceSeo.test.ts`
Expected: FAIL because default descriptors do not exist.

- [ ] **Step 3: Write complete, supportable default About copy**

Include audiences, capabilities, senior involvement, working principles, process, Faisalabad/Lahore presence, leadership, and CTA. Avoid every unsupported-claim category in Global Constraints.

- [ ] **Step 4: Write complete Business Valuation and M&A default copy**

Each descriptor includes hero, first paragraph, sections, process, deliverables, FAQs, and CTA. Business Valuation covers valuation situations and evidence; M&A covers preparation, assessment, due diligence coordination, deal support, risks, and post-deal planning with a regulated-services disclaimer.

- [ ] **Step 5: Run the keyword tests**

Run: `pnpm test --run src/lib/__tests__/serviceSeo.test.ts`
Expected: PASS.

- [ ] **Step 6: Add page shell and optional content override rendering**

Query `getContentPage(path)`; use the Sanity override only when `body.length > 0`, otherwise render the full descriptor. Add route JSON-LD through `getPageSeo(path)`.

- [ ] **Step 7: Type-check and commit**

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add About and Business Advisory pages`

### Task 7: Services Navigation and Footer Routing

**Files:**
- Create: `src/components/ServicesMenu.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/MobileMenu.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Services.tsx`

**Interfaces:**
- Produces shared `NAV_LINKS`/service children and accessible desktop dropdown/mobile accordion behavior.

- [ ] **Step 1: Extract navigation data with nested Business Advisory links**

Use full paths for About, blog, calculators, contact, and service pages; keep only appropriate homepage section hashes.

- [ ] **Step 2: Implement desktop dropdown behavior**

Support hover, focus-within, button click, outside pointer, and Escape. Apply `aria-expanded`, `aria-controls`, and a real button for the parent trigger.

- [ ] **Step 3: Implement the mobile Services accordion**

The accordion exposes both service children, closes the overall menu after navigation, and preserves visible Home navigation.

- [ ] **Step 4: Replace stale footer/service anchors and commit**

Run: `pnpm lint -- src/components/Navbar.tsx src/components/MobileMenu.tsx src/components/Footer.tsx src/components/Services.tsx`
Expected: zero errors.

Commit: `feat: add Business Advisory navigation`

### Task 8: Global WhatsApp, Analytics, and Static JSON-LD

**Files:**
- Create: `src/components/WhatsAppWidget.tsx`
- Create: `src/components/GoogleAnalytics.tsx`
- Create: `src/components/JsonLd.tsx` if not created in Task 4
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: applicable static route layouts/pages

**Interfaces:**
- Produces a public-route-only WhatsApp link and GA script; consumes `getPageSeo(path)` for route schema markup.

- [ ] **Step 1: Add the accessible WhatsApp widget**

Use `https://wa.me/923225401701?text=${encodeURIComponent("Hello NJV Accountants, I would like to request a consultation.")}`, an inline WhatsApp-style SVG, safe external-link attributes, and responsive positioning above mobile safe areas.

- [ ] **Step 2: Add Google Analytics with Next Script**

Load `https://www.googletagmanager.com/gtag/js?id=G-3S4R07WLX1` using `afterInteractive` and initialize `window.dataLayer`/`gtag` in a uniquely identified inline script.

- [ ] **Step 3: Exclude Studio without forcing all public pages client-side**

Use a route-aware client wrapper that returns `null` when `usePathname().startsWith("/studio")`; render both integrations from the root layout.

- [ ] **Step 4: Add homepage/static JSON-LD rendering and commit**

Homepage loads `getPageSeo("/")`; new About/service pages and calculator/index pages use the shared JSON-LD component with their path-specific query result.

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add analytics WhatsApp and page schema markup`

### Task 9: Contact Validation and Mailjet/reCAPTCHA Server Flow

**Files:**
- Create: `src/lib/contact.ts`
- Test: `src/lib/__tests__/contact.test.ts`
- Create: `src/app/api/contact/route.ts`

**Interfaces:**
- Produces `validateContactPayload(value): ContactValidationResult`.
- Produces `handleContactSubmission(payload, deps): Promise<ContactResult>` with injected `verifyCaptcha` and `sendMail` functions.
- Route maps result codes to 200, 400, 422, 503, or 502 without exposing upstream details.

- [ ] **Step 1: Write failing validation, honeypot, and orchestration tests**

Cover required name/email/message, maximum lengths, email format, filled honeypot short-circuit, missing configuration, CAPTCHA failure before Mailjet, Mailjet success, and Mailjet failure.

- [ ] **Step 2: Run the contact test and confirm it fails**

Run: `pnpm test --run src/lib/__tests__/contact.test.ts`
Expected: FAIL because contact utilities are absent.

- [ ] **Step 3: Implement normalization, validation, and safe email bodies**

Return field-specific errors; HTML-escape `& < > " '`; create matching plain-text content; never include secrets in results or logs.

- [ ] **Step 4: Implement dependency-injected submission flow**

Check configuration before external calls, silently reject the honeypot as a generic accepted result, verify reCAPTCHA, then send Mailjet.

- [ ] **Step 5: Run contact tests**

Run: `pnpm test --run src/lib/__tests__/contact.test.ts`
Expected: PASS.

- [ ] **Step 6: Implement the route adapters**

Reject non-JSON and content length above 32 KiB. Verify CAPTCHA through `https://www.google.com/recaptcha/api/siteverify` with URL-encoded `secret` and `response`. Send Mailjet to `https://api.mailjet.com/v3.1/send` using Basic authentication and `Messages[0]` with `From`, `To`, `ReplyTo`, `Subject`, `TextPart`, and `HTMLPart`.

- [ ] **Step 7: Run tests/type-check and commit**

Run: `pnpm test --run src/lib/__tests__/contact.test.ts`
Expected: PASS.

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: add protected Mailjet contact endpoint`

### Task 10: Visible reCAPTCHA and Real Contact Form UX

**Files:**
- Create: `src/components/RecaptchaCheckbox.tsx`
- Modify: `src/components/Contact.tsx`
- Create: `.env.example`

**Interfaces:**
- `RecaptchaCheckbox` accepts `siteKey`, `onToken`, and `resetSignal`; it renders Google v2 explicitly and cleans up callbacks.
- Contact posts normalized JSON to `/api/contact` and maps server result codes to accessible UI states.

- [ ] **Step 1: Add explicit reCAPTCHA v2 widget rendering**

Load `https://www.google.com/recaptcha/api.js?onload=njvRecaptchaReady&render=explicit`; declare the narrow `window.grecaptcha` interface; call `grecaptcha.render` with the public key and callback/expired-callback.

- [ ] **Step 2: Convert every form field to controlled state and a real form**

Keep all current fields, make message required, add an off-screen `website` honeypot with `tabIndex={-1}` and `autoComplete="off"`, and use `aria-live` for status.

- [ ] **Step 3: Implement submit states and graceful disabled configuration**

When the public site key is absent, disable submission and show WhatsApp/direct contact alternatives. On success clear fields and reset CAPTCHA; on failure keep entered data and show the mapped error.

- [ ] **Step 4: Document environment variables and commit**

`.env.example` contains empty values for the five required variables plus the two existing Sanity variables, with no secrets.

Run: `npx tsc --noEmit`
Expected: PASS.

Commit: `feat: connect consultation form to Mailjet`

### Task 11: Lint Remediation and Full Automated Verification

**Files:**
- Modify: files reported by ESLint, limited to errors/warnings encountered in touched or pre-existing relevant files.

**Interfaces:**
- Produces a repository with zero ESLint errors and warnings, satisfying the approved acceptance criterion.

- [ ] **Step 1: Run full tests**

Run: `pnpm test --run`
Expected: all test files pass with zero failures.

- [ ] **Step 2: Run lint and fix every reported item**

Run: `pnpm lint`
Expected initially: identify remaining exact errors. Replace internal anchors with `Link`, replace explicit `any` with defined portable-text/table/image types, type the Sanity image source, and stabilize the personal-loan memo dependency or remove incorrect memoization.

- [ ] **Step 3: Re-run lint**

Run: `pnpm lint`
Expected: zero errors and zero warnings.

- [ ] **Step 4: Run TypeScript and production build**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `pnpm build`
Expected: exit 0 and all required routes listed or compiled.

- [ ] **Step 5: Commit verification-driven cleanup**

Commit: `chore: complete site upgrade verification`

### Task 12: Browser Acceptance Audit

**Files:**
- Modify only if browser evidence reveals a defect; each defect receives a failing automated test when practical before the fix.

**Interfaces:**
- Produces visual and runtime evidence for all public acceptance criteria.

- [ ] **Step 1: Start the production server with non-secret test-safe configuration**

Run: `pnpm start` after a successful build. When real Mailjet/reCAPTCHA secrets are absent, verify the designed unavailable state rather than sending email.

- [ ] **Step 2: Inspect route and metadata output**

Check `/sitemap.xml`, `/robots.txt`, `/`, `/about`, both service routes, `/blog`, one `/blog/en/[slug]` when CMS content exists, one author page when CMS content exists, and the legacy redirect. Inspect canonical, alternate, analytics, and JSON-LD scripts.

- [ ] **Step 3: Inspect responsive and keyboard interactions**

Check desktop Services dropdown by mouse and keyboard, mobile Services accordion, Escape behavior, author preview focus behavior when data exists, WhatsApp target, form validation, CAPTCHA/configuration message, and no overlap at phone widths.

- [ ] **Step 4: Re-run the final verification suite after any browser fixes**

Run: `pnpm test --run && pnpm lint && npx tsc --noEmit && pnpm build`
Expected: all commands exit 0.

- [ ] **Step 5: Commit browser fixes if any**

Commit: `fix: address site upgrade acceptance findings`

---

## Completion Evidence

Before declaring completion, map each of the specification's 15 acceptance criteria to one or more of:

- A passing named Vitest assertion.
- Generated metadata or route output inspected in the browser.
- Sanity schema and GROQ source that exposes the editor capability.
- Successful full lint, type-check, test, and build output.
- A rendered page or interaction verified at desktop and mobile widths.

Missing CMS content may prevent a live example of a translated post or populated author profile in the local dataset. In that case, route behavior must still be proven through pure tests and successful build output; do not claim actual published content exists when it does not.
