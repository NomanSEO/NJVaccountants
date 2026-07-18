# Production SEO Origin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every generated production SEO URL use `https://www.njvaccountants.com`, fixing the live sitemap and robots origin defect.

**Architecture:** Keep `src/config/site.ts` as the sole production-origin source. Existing sitemap, canonical, hreflang, robots, and JSON-LD helpers continue consuming `SITE_URL`; root Open Graph metadata will stop bypassing it.

**Tech Stack:** Next.js 16 Metadata API, TypeScript, Vitest, pnpm

## Global Constraints

- The production origin is exactly `https://www.njvaccountants.com`.
- Blog route paths remain `/blog/{languageCode}/{slug}`.
- Do not change sitemap routes, priorities, change frequencies, or translation grouping.
- Do not add an environment-dependent canonical origin.
- DNS, hosting, and `.pk` redirects are outside repository scope.

---

### Task 1: Centralize the corrected production SEO origin

**Files:**
- Create: `src/lib/__tests__/siteOrigin.test.ts`
- Modify: `src/lib/__tests__/seo.test.ts`
- Modify: `src/lib/__tests__/sitemap.test.ts`
- Modify: `src/config/site.ts`
- Modify: `src/app/layout.tsx`
- Modify: `docs/superpowers/specs/2026-07-18-seo-localization-authors-services-contact-design.md`
- Modify: `docs/superpowers/plans/2026-07-18-seo-localization-authors-services-contact.md`

**Interfaces:**
- Consumes: `SITE_URL: string`, `robots(): MetadataRoute.Robots`, `absoluteUrl(path: string): string`, and `buildSitemapEntries(input): MetadataRoute.Sitemap`.
- Produces: a single production origin used by sitemap `<loc>` values, hreflang URLs, canonical metadata, robots metadata, Open Graph metadata, and JSON-LD URLs.

- [ ] **Step 1: Write failing origin and metadata tests**

Create `src/lib/__tests__/siteOrigin.test.ts`:

```ts
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { SITE_URL } from "@/config/site";

describe("production SEO origin", () => {
  it("uses the canonical www domain in shared site configuration", () => {
    expect(SITE_URL).toBe("https://www.njvaccountants.com");
  });

  it("publishes the canonical host and sitemap in robots metadata", () => {
    expect(robots()).toMatchObject({
      host: "https://www.njvaccountants.com",
      sitemap: "https://www.njvaccountants.com/sitemap.xml",
    });
  });

  it("derives root Open Graph metadata from SITE_URL", () => {
    const layoutSource = readFileSync(
      path.join(process.cwd(), "src", "app", "layout.tsx"),
      "utf8",
    );

    expect(layoutSource).toContain("url: SITE_URL");
    expect(layoutSource).not.toContain("njvaccountants.pk");
  });
});
```

In `src/lib/__tests__/seo.test.ts` and `src/lib/__tests__/sitemap.test.ts`, replace every expected production URL beginning with `https://njvaccountants.pk` with the equivalent URL beginning with `https://www.njvaccountants.com`.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```powershell
pnpm test --run src/lib/__tests__/siteOrigin.test.ts src/lib/__tests__/seo.test.ts src/lib/__tests__/sitemap.test.ts
```

Expected: FAIL because `SITE_URL`, generated sitemap/hreflang URLs, robots metadata, and root Open Graph metadata still use `https://njvaccountants.pk`.

- [ ] **Step 3: Make the minimal origin implementation change**

Change `src/config/site.ts` to:

```ts
export const SITE_URL = "https://www.njvaccountants.com";
```

In `src/app/layout.tsx`, replace the hard-coded Open Graph origin with:

```ts
openGraph: {
  title: "NJV Accountants | Accounting, Tax & Audit",
  description: "Trusted accounting, taxation, advisory, and audit services.",
  images: ["/njv-logo-dark.png"],
  type: "website",
  url: SITE_URL,
},
```

- [ ] **Step 4: Correct historical SEO documentation**

In both earlier SEO documents, replace each production-origin occurrence of `https://njvaccountants.pk` with `https://www.njvaccountants.com`:

```text
docs/superpowers/specs/2026-07-18-seo-localization-authors-services-contact-design.md
docs/superpowers/plans/2026-07-18-seo-localization-authors-services-contact.md
```

Do not replace the contact API test fixture URLs in `src/lib/__tests__/contact.test.ts`; they are request-construction inputs and do not publish SEO metadata.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```powershell
pnpm test --run src/lib/__tests__/siteOrigin.test.ts src/lib/__tests__/seo.test.ts src/lib/__tests__/sitemap.test.ts
```

Expected: all tests PASS with no warnings or errors.

- [ ] **Step 6: Verify repository references and generated values**

Run:

```powershell
rg -n "njvaccountants\.pk|njvaccountants\.com" src docs/superpowers
```

Expected: production application code and SEO documentation use `https://www.njvaccountants.com`; only the three neutral request URLs in `src/lib/__tests__/contact.test.ts` may retain `.pk`.

Run:

```powershell
pnpm test --run
npx tsc --noEmit
pnpm lint
pnpm build
```

Expected: the complete test suite, TypeScript, ESLint, and production build all exit successfully.

- [ ] **Step 7: Inspect the local sitemap and robots outputs**

With the repository's development server running on port 3000, run:

```powershell
$sitemap = (Invoke-WebRequest -Uri 'http://localhost:3000/sitemap.xml').Content
$robots = (Invoke-WebRequest -Uri 'http://localhost:3000/robots.txt').Content
if ($sitemap -notmatch 'https://www\.njvaccountants\.com/' -or $sitemap -match 'njvaccountants\.pk') { throw 'Sitemap origin verification failed.' }
if ($robots -notmatch 'Sitemap: https://www\.njvaccountants\.com/sitemap\.xml' -or $robots -match 'njvaccountants\.pk') { throw 'Robots origin verification failed.' }
Write-Output 'Local sitemap and robots use the canonical .com origin.'
```

Expected: `Local sitemap and robots use the canonical .com origin.`

- [ ] **Step 8: Commit the implementation**

```powershell
git add -- src/config/site.ts src/app/layout.tsx src/lib/__tests__/siteOrigin.test.ts src/lib/__tests__/seo.test.ts src/lib/__tests__/sitemap.test.ts docs/superpowers/specs/2026-07-18-seo-localization-authors-services-contact-design.md docs/superpowers/plans/2026-07-18-seo-localization-authors-services-contact.md
git commit -m "fix: use canonical domain in SEO metadata"
```

Expected: one implementation commit containing only the origin correction, regression tests, and related documentation updates.
