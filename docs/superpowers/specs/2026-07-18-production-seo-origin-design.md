# Production SEO Origin Design

## Goal

Use `https://www.njvaccountants.com` as the sole production origin for generated SEO URLs.

## Confirmed Production Defect

The live endpoint at `https://www.njvaccountants.com/sitemap.xml` returns HTTP 200 with valid XML and an `application/xml` content type, but its 18 `<loc>` entries and blog alternate links use `https://njvaccountants.pk`. The `.pk` host does not resolve. The live `robots.txt` also advertises the `.pk` host and sitemap. All 18 sitemap paths return HTTP 200 when evaluated against `https://www.njvaccountants.com`, so the defect is the shared production origin rather than the route list or XML structure.

The browser console exception from `cosmetic-filtering.js` is unrelated. That file is absent from both the application repository and the deployed HTML and is injected by browser content-filtering software.

## Scope

- Change the centralized `SITE_URL` value to `https://www.njvaccountants.com`.
- Ensure sitemap entries, canonical URLs, blog hreflang alternatives, robots metadata, Open Graph metadata, and JSON-LD URLs derive from that origin.
- Replace the remaining hard-coded production `.pk` URL in the application metadata.
- Update SEO and sitemap tests so they assert the new origin.
- Correct the earlier SEO design and implementation-plan documents where they prescribe the old production origin.

Request URLs used only as neutral contact API test fixtures do not affect generated SEO output and are outside this change unless verification shows they are treated as production metadata.

## Architecture

`src/config/site.ts` remains the single source of truth for the production origin. Existing URL helpers and metadata generators continue importing `SITE_URL`; no new environment variable or parallel configuration mechanism is introduced. Any production metadata URL that currently bypasses the shared constant will be changed to use it.

## Validation

Tests will first be updated to expect `https://www.njvaccountants.com` and run red against the old configuration. After the minimal application change, the focused SEO and sitemap tests must pass. The full test suite, TypeScript check, ESLint, and production build must also pass. Finally, generated sitemap and robots output will be inspected for the new domain and for the absence of production `.pk` URLs.

## Non-goals

- DNS changes, hosting configuration, or redirects from the `.pk` domain.
- Changes to route paths, sitemap priorities, change frequencies, or blog translation grouping.
- Adding environment-dependent canonical origins.
