# Transparent Footer Logo Design

**Date:** 2026-07-18

**Status:** Approved

## Objective

Create a new transparent-background version of the existing NJV Accountants full logo and use it in the website footer without changing the logo artwork, typography, wording, proportions, or colors.

## Asset Strategy

- Preserve `public/njv-logo-dark.png` unchanged as the original source asset.
- Create `public/njv-logo-dark-transparent.png` as a new PNG with an alpha channel.
- Remove only the solid navy background and its antialiased edge contamination.
- Preserve the complete white and gold logo artwork, including the NJV mark, “NJV Accountants” text, separators, and “ACCOUNTING | TAX | ADVISORY” tagline.
- Keep the source dimensions and aspect ratio unless transparent-edge trimming is required to remove empty canvas; do not distort or redraw the artwork.

## Footer Integration

- Update the full `BrandLogo` variant used by `Footer` to reference the new transparent asset.
- Remove the full logo image's CSS background and rounded rectangle treatment so transparency is visible against the footer's existing navy background.
- Keep the compact navbar logo and all other brand assets unchanged.
- Preserve the footer layout and current logo container width.

## Validation

- Confirm the new file has an alpha channel and transparent corners.
- Inspect the extracted logo for missing artwork, navy halos, or damaged text.
- Verify the footer visually at desktop and mobile viewport sizes.
- Run the relevant component tests, ESLint, TypeScript, and a production build.

## Scope

This change does not redesign the NJV logo, alter footer content or navigation, change navbar branding, or overwrite the original logo asset.
