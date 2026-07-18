# SEO, Localization, Authors, Services, and Contact Design

**Date:** 2026-07-18

**Status:** Approved

## Objective

Upgrade the NJV Accountants website with real-time sitemap discovery, localized blog URLs and hreflang metadata, editor-managed JSON-LD, complete author profiles, improved article structure, an About page, Business Advisory service pages, Google Analytics, a WhatsApp contact widget, and a working Mailjet contact form protected by visible Google reCAPTCHA v2.

The implementation must fit the existing Next.js 16 App Router and Sanity architecture, preserve current design tokens and page-shell conventions, and avoid unsupported claims in newly written marketing content.

## Architectural Approach

Use a hybrid architecture:

- Sanity manages languages, blog translations, author details, dynamic-page schema markup, and optional content overrides.
- Next.js owns route templates, static fallback content, metadata generation, sitemap and robots routes, analytics, contact delivery, global navigation, and the WhatsApp widget.
- About and service pages ship with complete default copy so they work immediately. Sanity can replace their main content later without making a deployment a prerequisite for launch.
- Shared utilities centralize URL construction, hreflang generation, sitemap assembly, JSON-LD validation and serialization, and contact validation.

## Canonical Site URL

Use `https://www.njvaccountants.com` as the canonical production origin. Centralize it in a site configuration module so sitemap, canonical metadata, hreflang alternatives, Open Graph URLs, and JSON-LD all use the same origin.

## Blog Localization

Localization applies only to blog posts for this release.

### Language documents

Add a Sanity `language` document with:

- Display name, such as `English` or `Spanish`.
- Valid BCP-47 language code, such as `en`, `es`, or `es-MX`.
- Optional native name.
- Sort order.
- A flag identifying the default language. English is the required default for this release.

Editors can create additional language documents and select them from blog posts, so the language list is not hard-coded in the application.

### Blog translation fields

Each post has:

- A required language reference.
- An optional reference to the original English post. English originals leave this empty; translated posts point to their English source.
- A localized slug.
- Optional `updatedAt`.
- Optional custom JSON-LD.

The application treats an English original and every post that references it as one translation family. It queries the family to generate alternate URLs. Editors provide all translated titles, excerpts, and article content manually; the application does not perform automatic translation.

### Routes and redirects

- Canonical article route: `/blog/{languageCode}/{slug}`.
- English example: `/blog/en/example-article`.
- Spanish example: `/blog/es/articulo-ejemplo`.
- Existing `/blog/{slug}` requests permanently redirect to `/blog/en/{slug}`.
- The legacy route is excluded from the sitemap and is never canonical.

The blog index remains `/blog` and can list all published posts with a visible language label or filter while preferring English entries in its default view.

### Hreflang behavior

Each localized article emits:

- A canonical URL for its own localized route.
- One `hreflang` alternate per published translation in its family.
- An `x-default` alternate pointing to the published English version.

No hreflang alternate is emitted for an unpublished, incomplete, or missing translation. Invalid or unsupported language codes do not create routes.

## Programmatic Sitemap and Robots

Create a programmatic sitemap that queries published Sanity data directly with CDN caching disabled. It includes:

- Homepage.
- About page.
- Blog index.
- Every published localized blog URL.
- Calculator index and every calculator route.
- Business Valuation and M&A Advisory service pages.
- Every published author profile with a valid slug.
- Any additional public static route registered in the central route list.

The sitemap excludes:

- Sanity drafts.
- Documents without required slugs or language codes.
- `/studio`.
- `/api` endpoints.
- Legacy redirect-only blog URLs.
- 404 or internal utility routes.

The sitemap is dynamically generated on request from the published perspective so a newly published Sanity page is visible on the next sitemap request without a production rebuild. Individual sitemap entries use Sanity update dates when available and conservative change-frequency and priority hints.

Create a programmatic `robots.txt` that permits public crawling, blocks Studio and API paths, and references `https://www.njvaccountants.com/sitemap.xml`.

## Schema Markup Authoring

### Static routes

Add a Sanity `pageSeo` document keyed by normalized public path. It contains:

- Route path.
- Optional label for editors.
- JSON-LD text.

This model supports `/`, `/about`, calculator routes, service routes, and future static routes without code changes.

### Dynamic routes

Blog posts and team members receive their own JSON-LD text fields because their route identity is already part of the document.

### Validation and rendering

- Sanity validation rejects empty-but-present values, invalid JSON, non-object roots, and non-Schema.org contexts.
- Application parsing treats the field as untrusted data.
- JSON-LD is serialized with characters that could terminate a script element escaped before insertion.
- Missing or invalid schema never crashes a public page and never produces a partially valid script.
- Each route renders at most the page-specific schema associated with that route, alongside any safe application-generated defaults that do not duplicate an editor-provided entity.

## Author and Partner Profiles

Extend `teamMember` with:

- Required slug.
- Profile image and alt text.
- Email address.
- LinkedIn URL.
- Short biography for cards and popovers.
- Full biography.
- Expertise list.
- Education list.
- Professional experience entries.
- Achievements list.
- Credentials.
- Optional years-of-experience value.
- Optional custom JSON-LD.

### Dedicated profile route

Create `/authors/[slug]` with:

- Profile image, name, title, and credentials.
- Email and LinkedIn actions when supplied.
- Expertise and experience summary.
- Full biography.
- Education, professional experience, and achievements sections when populated.
- Latest articles written by that person.
- Consultation call to action.

Missing optional fields hide their corresponding UI instead of producing empty headings. Missing or unpublished authors return 404.

### Author preview popover

Author names on article pages and blog cards link to the profile route. On devices with hover, mouse hover opens a compact card with portrait, role, credentials, short biography, and profile link. Keyboard focus exposes the same content. Escape or focus departure closes it. Touch activation follows the author link, ensuring no essential content depends on hover.

The popover uses accessible relationships and does not trap focus or cover the active control on small screens.

## Blog Article Structure

Localized article pages adopt the information hierarchy of the supplied NerdWallet reference without copying its branding or content:

- Breadcrumbs.
- Category, title, and concise summary.
- Linked author identity with image.
- Published date, optional updated date, and read time.
- Optional header image.
- Automatically generated table of contents from article headings.
- Long-form Markdown or Portable Text body.
- Back-to-top affordance for long articles.
- About-the-author section.
- Related articles from the same category or author.
- Consultation CTA.

The table of contents uses stable heading IDs and omits itself when there are too few headings to be useful.

## About Page

Create `/about` using the standard NJV page shell. The copy explains:

- Who NJV Accountants serves.
- The firm's practical accounting, tax, audit, and advisory approach.
- How senior professional involvement supports clients.
- Service capabilities and business lifecycle coverage.
- Working principles: clarity, responsiveness, commercial awareness, and confidentiality.
- The engagement process from initial conversation through ongoing support.
- Faisalabad and Lahore presence.
- Leadership profiles and consultation CTA.

The page must build trust through specificity and clarity while using only claims supported by the existing site or user-provided facts. It must not invent awards, memberships, regulatory registrations, client counts, years of history, or performance statistics.

### Editable content override

Add a Sanity `contentPage` document for the About and Business Advisory routes with:

- A unique normalized path selected from the supported content-page routes.
- Page title and eyebrow.
- Introductory text.
- Portable Text body with headings, lists, links, images, and tables.
- Optional CTA title and CTA text.

Each route always has complete default copy in code. When a published `contentPage` document exists for that exact path and contains a non-empty body, the route uses the Sanity title, introduction, body, and CTA instead. A missing, draft, malformed, or empty override falls back to the complete code copy. Metadata keyword requirements for the two service pages remain enforced by application-owned metadata even when body copy is overridden.

## Business Advisory Service Pages

Add an accessible Services dropdown to desktop navigation and a Services accordion to the mobile menu. Under Business Advisory, link:

- `/services/business-advisory/business-valuation`
- `/services/business-advisory/ma-advisory`

Dropdown interactions support hover, keyboard focus, click, Escape, and outside-click closure.

### Business Valuation

The page targets the exact keyword `Business Valuation Services` in:

- Metadata title.
- Meta description.
- First paragraph.
- At least one H2.
- Natural body copy.
- Closing CTA where appropriate.

Content covers valuation situations, NJV's evidence-led approach, information requirements, engagement stages, deliverables, decision support, FAQs, and consultation next steps. Keyword placement must read naturally and avoid repetitive stuffing.

### M&A Advisory

The page targets the exact keyword `M&A Advisory Services` in:

- Metadata title.
- Meta description.
- First paragraph.
- At least one H2.
- Natural body copy.
- Closing CTA where appropriate.

Content covers transaction preparation, target or buyer assessment, financial analysis, due diligence coordination, deal support, risk identification, post-deal planning, FAQs, and consultation next steps. The copy must distinguish advisory support from regulated legal or investment services and avoid guarantees about deal outcomes.

## WhatsApp Widget

Add a global floating WhatsApp contact button for `+923225401701` using the canonical `wa.me/923225401701` URL and a concise prefilled consultation message.

Requirements:

- Visible on all public routes.
- Hidden inside Sanity Studio.
- Accessible label and focus state.
- Does not obscure form controls, mobile navigation, or important content.
- Opens WhatsApp in a new tab with safe external-link attributes.

## Google Analytics

Load Google Analytics on public pages using measurement ID `G-3S4R07WLX1`. Use Next.js script loading to reproduce the supplied `gtag.js` initialization after the page becomes interactive without blocking the document. Do not load analytics inside Sanity Studio.

## Contact Form and Mailjet

Replace the current simulated contact form with a real server endpoint.

### Configuration

Use these environment variables:

- `MAILJET_API_KEY`
- `MAILJET_SECRET_KEY`
- `MAILJET_SENDER_EMAIL`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

The recipient is fixed server-side as `usamaashraf82@live.com`. The customer email is used as `Reply-To`; it is never used as the sender address.

If any required Mailjet or reCAPTCHA variable is absent, the public site and production build continue normally. Contact submission is disabled gracefully, the endpoint returns a controlled service-unavailable response, and the form directs visitors to WhatsApp or the displayed contact details.

### Submission fields

- First name, required.
- Last name, optional.
- Email, required.
- Company, optional.
- Phone, optional.
- Service area, optional.
- Message, required.
- Honeypot field, which must remain empty.
- Google reCAPTCHA v2 response token, required.

### Server flow

1. Accept JSON only with a request-size limit.
2. Normalize and validate every field, including email format and maximum lengths.
3. Reject a filled honeypot without contacting Google or Mailjet.
4. Verify the visible Google reCAPTCHA v2 token with Google's server API.
5. Escape all customer-controlled data before constructing the HTML email and include a plain-text alternative.
6. Send through the Mailjet HTTPS API.
7. Return structured success, validation, CAPTCHA, service-unavailable, or delivery-failure responses without exposing credentials or upstream response bodies.

The client form displays loading, field validation, CAPTCHA failure, temporary-unavailable, delivery-error, and confirmed-success states. It only reports success after Mailjet accepts the message.

## Failure Handling

- Sanity content queries return safe empty states where the current architecture already supports them.
- Unknown blog language codes, missing translations, unpublished articles, and invalid author slugs return 404.
- Sitemap generation ignores malformed documents rather than publishing invalid URLs.
- Invalid JSON-LD is omitted and logged server-side without exposing its contents.
- Missing optional CMS data hides optional UI sections.
- Missing Mailjet or reCAPTCHA configuration disables contact submission without failing builds or unrelated pages.
- External Mailjet, Google, and Sanity errors produce generic user-facing messages and detailed server-side diagnostics that exclude secrets and personal message content where possible.

## Testing Strategy

Use Vitest for focused utilities and server-handler behavior. Add component tests only where the existing environment can exercise meaningful interaction without brittle implementation coupling.

Required automated coverage:

- Localized blog URL construction and language-code validation.
- Translation-family alternate generation, canonical URL, and English `x-default`.
- Sitemap assembly, published-only behavior, and exclusion rules.
- JSON-LD validation, non-object rejection, and script-safe serialization.
- Contact field validation and length limits.
- Honeypot rejection before external calls.
- Missing configuration returns a controlled unavailable result.
- reCAPTCHA rejection blocks Mailjet.
- Mailjet success and failure mapping.
- Author query shapes and optional-section behavior.
- Exact service-page keyword placement in title, description, first paragraph, and H2.

Required final verification:

- `pnpm test --run`
- `pnpm lint`
- `npx tsc --noEmit`
- `pnpm build`
- Browser checks for homepage, sitemap, robots, About, both service pages, blog index, localized article, author profile, navigation keyboard behavior, responsive mobile navigation, WhatsApp link, contact success/error states, canonical metadata, hreflang tags, and JSON-LD scripts.

## Acceptance Criteria

The upgrade is complete when:

1. A newly published localized post appears on the next sitemap request without a rebuild.
2. English and Spanish blog translations use `/blog/en/...` and `/blog/es/...` and expose reciprocal hreflang links plus English `x-default`.
3. Editors can add languages through Sanity and select them on blog posts.
4. Editors can add validated JSON-LD to homepage, static routes, blog posts, and author pages.
5. Every author can have a portrait, email, LinkedIn URL, detailed credentials, and a dedicated profile page.
6. Author hover and keyboard previews work without making content inaccessible on touch devices.
7. The blog layout includes the approved authority and navigation structure.
8. `/about` contains substantial, credibility-focused, supportable NJV content.
9. Both Business Advisory pages exist and satisfy their exact keyword placements naturally.
10. The Services dropdown and mobile accordion expose both advisory routes accessibly.
11. The WhatsApp widget opens a conversation with `+923225401701` from every public page.
12. Google Analytics loads with `G-3S4R07WLX1` on public routes.
13. Valid reCAPTCHA-protected contact submissions reach `usamaashraf82@live.com` through Mailjet.
14. Missing Mailjet or reCAPTCHA configuration never crashes the site or build and clearly disables form submission.
15. Tests, lint, TypeScript, production build, and browser verification all pass.
