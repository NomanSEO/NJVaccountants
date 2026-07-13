# Calculator Mobile Responsiveness Design

## Goal

Make every financial calculator usable at 320–480px wide while preserving the existing tablet and desktop layouts.

## Approach

Use responsive refinement rather than separate mobile components. Existing large-screen grid breakpoints remain unchanged. Below the `sm` breakpoint, calculator cards use tighter padding, paired result metrics stack into one column, and controls/actions occupy the available width for reliable touch use.

## Components

- Calculator form and result panels: retain the current desktop two-column layouts at `lg`; reduce padding on phones and keep form fields single-column until `sm`.
- Result summaries: switch fixed two-column metric grids to one column on narrow screens, restoring two columns at `sm`.
- Calculator actions: stack Print, Download CSV, and Share buttons at phone widths, with full-width buttons and the existing inline layout at `sm` and above.
- Tables and schedules: retain semantic tables and horizontal scrolling. Add a concise mobile-only swipe hint and ensure each scroll wrapper remains bounded by its card.
- Calculator pages: use smaller horizontal page padding on phones while retaining current desktop container spacing and hero composition.

## Accessibility and Validation

Controls remain at least the current padded touch size. No calculation logic or data structures change. Verify at 320px, 375px, 768px, and desktop widths; run type-checking, linting for changed files, and the calculator test suite.
