# Calculators 3–10 Design

## Scope

Implement eight standalone calculator routes: Car Loan, Loan, Personal Loan,
Retirement, CD, Salary Paycheck, Roth IRA, and Investment. Every page uses the
existing calculator shell and includes a form, result summary, accessible chart,
table/schedule, local print/share/CSV actions, original SEO copy, and CTA.

## Shared Architecture

Pure TypeScript modules under `src/lib` own all formulas and rate data. Client
components own form state and validation. Reuse `formatters`, `CalculatorActions`,
and `ResultBarChart`; add narrowly focused helpers only when at least two
calculators share a real calculation.

## Loan Group

Car Loan extends amortization with taxes/fees, down payment, trade-in value and
balance, and optional balloon value. Loan supports repayment, interest-only,
deferred, and balloon modes with monthly/yearly display. Personal Loan adds an
optional origination fee to the financed balance and compares two offers.

## Savings and Retirement Group

CD models one deposit using APY and monthly/yearly compounding. Investment
models lump sums and recurring contributions at all specified frequencies with
best/base/worst scenarios. Retirement projects expected, conservative, and
optimistic balances, target nest egg, and sustainable income using the supplied
defaults. Roth IRA enforces the supplied 2026 filing-status phase-out limits,
catch-up amount, annual/monthly contribution timing, and Roth/traditional
comparison.

## Salary Paycheck

Use 2026 federal withholding plus FICA/Medicare and configurable pre/post-tax
deductions. Provide a state selector but clearly identify state/local tax as an
estimate until an approved complete state/local rate dataset is supplied.

## Verification

Write pure-module tests before every formula. Verify every page with scoped
lint, the full Vitest suite, TypeScript, and a production build.
