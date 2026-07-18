# Compact Navbar Dropdowns Design

**Date:** 2026-07-18

**Status:** Approved

## Objective

Reduce desktop navbar clutter by grouping related destinations into consistent dropdown menus while preserving the existing brand treatment, navbar height, consultation CTA, and accessible interaction behavior.

## Desktop Information Architecture

The navbar exposes four top-level navigation items:

1. **Services** — dropdown.
2. **About** — dropdown.
3. **Calculators** — dropdown.
4. **Blogs** — direct link to `/blog`.

The existing **Get a Consultation** CTA remains separate.

### Services Dropdown

- Accounting & Bookkeeping → `/#services`
- Taxation Services → `/#services`
- Audit & Assurance → `/#services`
- Business Valuation → `/services/business-advisory/business-valuation`
- M&A Advisory → `/services/business-advisory/ma-advisory`
- View All Services → `/#services`

### About Dropdown

- About Us → `/about`
- Case Studies → `/#case-studies`
- Our Team → `/#team`
- Contact → `/#contact`

### Calculators Dropdown

- Salary Tax Calculator → `/calculators/salary-tax`
- Mortgage Calculator → `/calculators/mortgage`
- Investment Calculator → `/calculators/investment`
- View All Calculators → `/calculators`

## Component Design

- Keep `NAV_LINKS` as the single shared navigation data source.
- Extend each navigation item with optional children and optional dropdown heading/footer metadata.
- Replace the Services-specific boolean with `openDropdown: string | null`, keyed by top-level label.
- Render every desktop dropdown through one shared JSX path.
- Reuse the existing `absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5` hover bridge so each visible menu remains 20px below its trigger while the pointer path stays interactive.
- Only one desktop dropdown can be open at a time.
- Preserve hover opening, click toggle, outside-pointer closure, Escape closure with trigger focus restoration, blur departure, and real links for destinations.

## Mobile Navigation

- Keep Home as a direct link.
- Render Services, About, and Calculators as accordions from the same `NAV_LINKS` data.
- Render Blogs as a direct link.
- Track one expanded accordion label so opening one section collapses the previous section.
- Close the full-screen mobile menu after any destination link is selected.

## Visual Treatment

- Preserve the solid `#0b1f3a` navbar background.
- Preserve the transparent NJV logo, 71px navbar height, border, and scroll shadow.
- Preserve existing menu colors, width, typography, border, and shadow.
- Use the reduced number of top-level items to create breathing room; do not shrink text or click targets.
- Keep the consultation CTA unchanged.

## Validation

- Source-contract tests assert the exact top-level hierarchy and child routes.
- Tests assert the generic open-dropdown state and reusable hover bridge exist without Services-only state.
- Desktop browser checks cover all three dropdowns, 20px hover geometry, link navigation, outside-click, and Escape.
- Mobile browser checks cover all three accordions, single-expanded behavior, direct Blogs navigation, and menu closure.
- Tests, ESLint, TypeScript, and the production build pass.

## Scope

This change does not add new pages, change calculator functionality, modify service content, alter the footer navigation, or redesign the logo/navbar brand treatment.
