# Federal Tax and Mortgage Calculators Design

## Scope

Build the first two approved financial calculators as standalone routes in the
existing Next.js calculators area:

1. U.S. Federal Taxable Income Tax Calculator (tax year 2026).
2. Mortgage Calculator supporting USD, GBP, and EUR.

The implementation will follow the reference tools functionally while using
the site’s existing visual system. Both calculators include input forms,
summary results, charts, tables, explanatory SEO content, and local actions
for printing, downloading, and sharing results.

## Architecture

Use a shared calculator presentation layer for layout, validation messages,
number/currency formatting, result cards, chart rendering, schedules, and
export controls. Keep all financial calculations in separate pure TypeScript
modules under `src/lib/`, so tax rules and mortgage mathematics are testable
and can be updated independently of React UI.

Each route uses the site shell: `Navbar`, navy hero with back link and accent,
calculator content, the existing CTA pattern, and `Footer`. Interactive forms
are client components; route pages and SEO copy remain server components where
possible.

## Federal Taxable Income Tax Calculator

### Inputs

- Tax year: 2026 for the initial release, designed to accept future rule sets.
- Filing status: single, married filing separately, married filing jointly, or
  head of household.
- Gross income and optional income/adjustment inputs required by the reference
  experience.
- Standard or itemized deduction selection.
- Dependants, retirement contributions, and tax credits.
- Federal withholding and estimated payments for refund/balance calculation.
- Optional state/local tax estimate, clearly separated from federal tax.

### Outputs

- Taxable income, federal income tax, estimated payments, refund or balance
  due, marginal rate, and effective rate.
- Per-bracket tax breakdown table and chart.
- A clear explanation of the calculation and a tax-calculator keyword-focused
  content section beneath the results.

### Rules

Tax brackets use the user-provided 2026 table as the initial source of truth.
Rules are represented as data keyed by year and filing status. Credits and
deductions will be labeled as estimates until approved rule details are supplied;
the calculator will not imply a filed-return result.

## Mortgage Calculator

### Inputs

- Currency: USD, GBP, or EUR.
- Home price, down payment/deposit, annual interest rate, and term.
- Payment display frequency: monthly or yearly, rounded to the nearest whole
  currency unit.
- Loan type: fixed repayment, interest-only, or adjustable rate.
- For adjustable rate: introductory period and subsequent rate.
- Annual property tax, home insurance, HOA/service charge, and mortgage
  insurance.

### Outputs

- Principal-and-interest payment and full housing payment, displayed for the
  selected frequency.
- Total interest, total paid, and total housing cost.
- Amortization schedule with principal, interest, balance, and applicable
  housing-cost fields, plus a balance/composition chart.
- A mortgage-calculator keyword-focused content section beneath the schedule.

### Rules

Fixed repayment loans use standard amortization. Interest-only loans pay
interest during the selected term with the remaining principal called out
clearly. Adjustable loans recalculate the payment at the rate-change point
using the remaining balance and term. Rates are entered manually; no external
market-rate dependency is introduced.

## Shared Experience and Error Handling

- Required inputs match the agreed calculator requirements; optional costs are
  clearly labeled and default to zero.
- Inline validation prevents invalid or impossible calculations (negative
  values, zero/invalid terms, down payment exceeding price, and malformed
  rates).
- Charts are accessible with textual tables and summaries as their equivalent.
- Print uses the browser print flow. Downloads generate a local CSV/PDF-ready
  result export; sharing uses the Web Share API with a copy-link fallback.
- Results remain in browser memory only; no financial inputs are persisted.

## Testing and Verification

- Add a lightweight test runner if none exists, then build pure-module tests
  first for progressive brackets, deduction/payment boundaries, fixed payment,
  zero-rate payment, interest-only balance, adjustable-rate recalculation, and
  amortization totals.
- Add component-level tests only where the project tooling supports them
  cleanly; validate interactive routes manually in the browser.
- Run `pnpm lint`, `npx tsc --noEmit`, and `pnpm build` before handoff.

## Maintenance

Tax rates and tax-year configuration are localized in a single rule data
module. Mortgage calculations do not use live market data. The owner reviews
time-sensitive data monthly and on July 1 and December 30, as specified.
