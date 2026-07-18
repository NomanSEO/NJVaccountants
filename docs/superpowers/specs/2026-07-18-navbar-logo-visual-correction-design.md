# Navbar and Logo Visual Correction Design

**Date:** 2026-07-18

**Status:** Approved

## Objective

Correct the NJV Accountants navbar so its background renders as the exact brand navy `#0b1f3a`, and remove the baked background from the navbar logo without changing the logo artwork.

## Navbar Treatment

- Use the existing Tailwind `bg-navy` token, which resolves to `#0b1f3a`.
- Remove navbar background opacity and backdrop blur so the displayed color is exact and consistent.
- Preserve the existing border, scroll shadow, dimensions, navigation links, dropdown behavior, and responsive menu behavior.

## Logo Treatment

- Use the existing `njv-logo-mark-dark.png` artwork as the source.
- Convert only the uniform navy background to alpha transparency.
- Preserve the white and gold artwork, proportions, antialiased edges, and current rendered size.
- Save the transparent result as a new project asset rather than overwriting the source image.
- Remove the redundant navy background class from the compact logo wrapper.
- Leave the footer's full-logo treatment unchanged.

## Validation

- Confirm the navbar computed background is solid `rgb(11, 31, 58)` at desktop and mobile widths.
- Confirm the navbar logo asset has an alpha channel and transparent corner pixels.
- Confirm the compact logo has no visible rectangle, halo, clipping, or color shift.
- Run focused tests, ESLint, TypeScript, and a production build.
- Check the homepage navbar at desktop and phone widths in the browser.

## Scope

This change does not redesign the navbar, alter navigation behavior, change the footer logo, or recreate the NJV logo.
