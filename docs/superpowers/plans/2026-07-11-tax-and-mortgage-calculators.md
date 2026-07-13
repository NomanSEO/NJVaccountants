# Federal Tax and Mortgage Calculators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reference-aligned U.S. federal tax and multi-currency mortgage calculators with auditable calculations, schedules, charts, exports, and search-oriented explanatory content.

**Architecture:** Keep tax and mortgage mathematics in independent pure TypeScript modules, each covered by Vitest tests. Client components own editable form state and render results by composing small shared presentational utilities; App Router pages retain metadata, the shared shell, static reference content, and CTA bands.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict mode, Tailwind CSS v4, Vitest.

## Global Constraints

- Use site theme tokens and the existing calculator page shell (`Navbar`, hero, content, gold CTA, `Footer`).
- Use the supplied 2026 federal bracket table as the tax-rate source of truth; keep it in a year-keyed data module.
- Do not persist financial input values or load market rates.
- Use `Intl.NumberFormat` with USD, GBP, and EUR, rounding displayed payment figures to whole currency units.
- Charts must have an equivalent table/text summary; exports must be local CSV downloads; sharing uses Web Share with a clipboard fallback.
- Treat credits as non-refundable, show state/local tax as a separate optional estimate, and label both calculators as estimates.
- Run `pnpm lint`, `npx tsc --noEmit`, `pnpm test --run`, and `pnpm build` before completion.

---

## File Structure

- `package.json` — add the test script and Vitest dev dependency.
- `vitest.config.ts` — resolve the `@/` alias during tests.
- `src/lib/federalTax.ts` — 2026 brackets/deductions, input/result types, and the pure calculation.
- `src/lib/mortgage.ts` — loan input/result types, payment functions, and amortization generator.
- `src/lib/formatters.ts` — currency/percent formatting and CSV creation shared by calculator UIs.
- `src/components/CalculatorActions.tsx` — client-side print, CSV download, and share/copy controls.
- `src/components/ResultBarChart.tsx` — accessible CSS bar chart with supplied labels and values.
- `src/components/FederalTaxCalculator.tsx` — tax form, validation, results, table, chart, and actions.
- `src/components/MortgageCalculator.tsx` — mortgage form, validation, results, schedule, chart, and actions.
- `src/app/calculators/federal-tax/page.tsx` — federal-tax route, metadata, bracket reference, SEO guide, CTA.
- `src/app/calculators/mortgage/page.tsx` — mortgage route, metadata, SEO guide, CTA.
- `src/app/calculators/page.tsx` — add the two available route cards.
- `src/lib/__tests__/federalTax.test.ts` and `src/lib/__tests__/mortgage.test.ts` — calculator regression tests.

## Task 1: Establish the Test Harness and Shared Presentation Utilities

**Files:**

- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/lib/formatters.ts`
- Create: `src/components/CalculatorActions.tsx`
- Create: `src/components/ResultBarChart.tsx`

**Interfaces:**

- Produces `formatCurrency(value: number, currency: CurrencyCode): string`, `formatPercent(value: number): string`, and `csvEscape(value: string | number): string`.
- Produces `<CalculatorActions filename rows shareTitle />` and `<ResultBarChart title items />` for both calculator client components.

- [ ] **Step 1: Add Vitest and its script.**

  Update `package.json` with:

  ```json
  {
    "scripts": { "test": "vitest" },
    "devDependencies": { "vitest": "^4.1.0" }
  }
  ```

  Create `vitest.config.ts`:

  ```ts
  import path from "node:path";
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    test: { environment: "node", include: ["src/**/*.test.ts"] },
  });
  ```

- [ ] **Step 2: Install the declared dependency and confirm the empty runner works.**

  Run: `pnpm install && pnpm test --run`

  Expected: Vitest exits successfully with no tests found only if configured with `passWithNoTests: true`; otherwise add that property and rerun.

- [ ] **Step 3: Implement the shared formatting and action components.**

  ```ts
  export type CurrencyCode = "USD" | "GBP" | "EUR";
  export const formatCurrency = (value: number, currency: CurrencyCode) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  export const formatPercent = (value: number) =>
    `${(value * 100).toFixed(2)}%`;
  export const csvEscape = (value: string | number) =>
    `"${String(value).replaceAll('"', '""')}"`;
  ```

  `CalculatorActions` must call `window.print()`, make a `Blob` from a header-plus-row CSV string and click a temporary download link, then call `navigator.share({ title: shareTitle, url: location.href })` when available or `navigator.clipboard.writeText(location.href)` otherwise. `ResultBarChart` must render an ordered list where each item has its visible name, formatted value, and a `role="img"` bar with `aria-label`.

- [ ] **Step 4: Commit the harness and shared utilities.**

  ```bash
  git add package.json pnpm-lock.yaml vitest.config.ts src/lib/formatters.ts src/components/CalculatorActions.tsx src/components/ResultBarChart.tsx
  git commit -m "chore: add calculator test and presentation utilities"
  ```

## Task 2: Implement and Test Federal Tax Calculation Rules

**Files:**

- Create: `src/lib/federalTax.ts`
- Create: `src/lib/__tests__/federalTax.test.ts`

**Interfaces:**

- Consumes: none.
- Produces `calculateFederalTax(input: FederalTaxInput): FederalTaxResult`.

- [ ] **Step 1: Write failing tax tests.**

  ```ts
  import { describe, expect, it } from "vitest";
  import { calculateFederalTax } from "@/lib/federalTax";

  describe("calculateFederalTax", () => {
    it("applies the 2026 single progressive brackets after the standard deduction", () => {
      const result = calculateFederalTax({
        filingStatus: "single",
        grossIncome: 60_000,
        age: 40,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirementContributions: 0,
        otherAdjustments: 0,
        credits: 0,
        withholding: 0,
        estimatedPayments: 0,
        stateLocalRate: 0,
      });
      expect(result.taxableIncome).toBe(43_900);
      expect(result.federalTax).toBe(5_018);
      expect(result.marginalRate).toBe(0.12);
    });

    it("never lets non-refundable credits reduce federal tax below zero", () => {
      const result = calculateFederalTax({
        filingStatus: "marriedJoint",
        grossIncome: 30_000,
        age: 40,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirementContributions: 0,
        otherAdjustments: 0,
        credits: 9_999,
        withholding: 0,
        estimatedPayments: 0,
        stateLocalRate: 0,
      });
      expect(result.federalTax).toBe(0);
    });

    it("calculates a refund from withholding and estimated payments", () => {
      const result = calculateFederalTax({
        filingStatus: "single",
        grossIncome: 30_000,
        age: 40,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirementContributions: 0,
        otherAdjustments: 0,
        credits: 0,
        withholding: 3_000,
        estimatedPayments: 500,
        stateLocalRate: 0,
      });
      expect(result.refundOrBalance).toBe(2_120);
    });
  });
  ```

- [ ] **Step 2: Run the tests to verify the missing module fails.**

  Run: `pnpm test --run src/lib/__tests__/federalTax.test.ts`

  Expected: FAIL because `@/lib/federalTax` does not exist.

- [ ] **Step 3: Write the minimal federal tax module.**

  ```ts
  export type FilingStatus =
    "single" | "marriedSeparate" | "marriedJoint" | "headOfHousehold";
  export type FederalTaxInput = {
    filingStatus: FilingStatus;
    grossIncome: number;
    age: number;
    deductionType: "standard" | "itemized";
    itemizedDeductions: number;
    retirementContributions: number;
    otherAdjustments: number;
    credits: number;
    withholding: number;
    estimatedPayments: number;
    stateLocalRate: number;
  };
  export type FederalTaxResult = {
    adjustedIncome: number;
    deduction: number;
    taxableIncome: number;
    federalTaxBeforeCredits: number;
    federalTax: number;
    stateLocalEstimate: number;
    totalTax: number;
    refundOrBalance: number;
    effectiveRate: number;
    marginalRate: number;
    bracketBreakdown: { rate: number; taxableAmount: number; tax: number }[];
  };
  ```

  Define a `FEDERAL_TAX_RULES_2026` record that exactly contains the supplied boundaries for all four statuses and their 2026 standard deductions. Calculate adjusted income as `max(0, grossIncome - retirementContributions - otherAdjustments)`, choose `max(itemizedDeductions, standardDeduction)` only when the itemized option is selected, apply every bracket progressively, subtract credits with `max(0, taxBeforeCredits - credits)`, then calculate the optional state/local estimate separately.

- [ ] **Step 4: Run the tax tests until all pass.**

  Run: `pnpm test --run src/lib/__tests__/federalTax.test.ts`

  Expected: PASS, 3 tests.

- [ ] **Step 5: Add boundary coverage and commit.**

  Add tests for zero income, a bracket threshold, itemized deductions, and each filing status. Run the same command and commit:

  ```bash
  git add src/lib/federalTax.ts src/lib/__tests__/federalTax.test.ts
  git commit -m "feat: add federal tax calculation engine"
  ```

## Task 3: Implement and Test Mortgage Calculation Rules

**Files:**

- Create: `src/lib/mortgage.ts`
- Create: `src/lib/__tests__/mortgage.test.ts`

**Interfaces:**

- Consumes: `CurrencyCode` from `src/lib/formatters.ts`.
- Produces `calculateMortgage(input: MortgageInput): MortgageResult`.

- [ ] **Step 1: Write failing mortgage tests.**

  ```ts
  import { describe, expect, it } from "vitest";
  import { calculateMortgage } from "@/lib/mortgage";

  const base = {
    currency: "USD" as const,
    homePrice: 400_000,
    downPayment: 80_000,
    annualRate: 0.06,
    termYears: 30,
    loanType: "fixed" as const,
    adjustmentMonth: 60,
    adjustedAnnualRate: 0.07,
    annualPropertyTax: 4_800,
    annualInsurance: 1_200,
    annualHoa: 0,
    annualMortgageInsurance: 0,
  };

  describe("calculateMortgage", () => {
    it("calculates a fixed principal-and-interest payment and amortizes to zero", () => {
      const result = calculateMortgage(base);
      expect(result.loanAmount).toBe(320_000);
      expect(result.monthlyPrincipalAndInterest).toBeCloseTo(1918.56, 2);
      expect(result.schedule.at(-1)?.endingBalance).toBeCloseTo(0, 2);
    });

    it("handles a zero interest rate without division by zero", () => {
      const result = calculateMortgage({ ...base, annualRate: 0 });
      expect(result.monthlyPrincipalAndInterest).toBeCloseTo(888.89, 2);
    });

    it("keeps the balance outstanding for interest-only loans", () => {
      const result = calculateMortgage({ ...base, loanType: "interestOnly" });
      expect(result.schedule[0].principal).toBe(0);
      expect(result.schedule.at(-1)?.endingBalance).toBe(320_000);
    });
  });
  ```

- [ ] **Step 2: Run the tests to verify the missing module fails.**

  Run: `pnpm test --run src/lib/__tests__/mortgage.test.ts`

  Expected: FAIL because `@/lib/mortgage` does not exist.

- [ ] **Step 3: Write the minimal amortization module.**

  ```ts
  export type MortgageInput = {
    currency: CurrencyCode;
    homePrice: number;
    downPayment: number;
    annualRate: number;
    termYears: number;
    loanType: "fixed" | "adjustable" | "interestOnly";
    adjustmentMonth: number;
    adjustedAnnualRate: number;
    annualPropertyTax: number;
    annualInsurance: number;
    annualHoa: number;
    annualMortgageInsurance: number;
  };
  export type MortgageScheduleRow = {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    endingBalance: number;
    escrow: number;
  };
  export type MortgageResult = {
    loanAmount: number;
    monthlyPrincipalAndInterest: number;
    monthlyHousingCost: number;
    yearlyHousingCost: number;
    totalInterest: number;
    totalPaid: number;
    schedule: MortgageScheduleRow[];
  };
  ```

  Use `payment = principal * monthlyRate / (1 - (1 + monthlyRate) ** -remainingMonths)` and `principal / remainingMonths` when the monthly rate is zero. For adjustable loans, recalculate payment after `adjustmentMonth` with the remaining balance/months and `adjustedAnnualRate`. Add annual property tax, insurance, HOA, and mortgage insurance divided by 12 as `escrow`; do not add it to `totalInterest`.

- [ ] **Step 4: Run the mortgage tests to confirm green.**

  Run: `pnpm test --run src/lib/__tests__/mortgage.test.ts`

  Expected: PASS, 3 tests.

- [ ] **Step 5: Add ARM and input-boundary tests, then commit.**

  Add a test that an adjustable-rate payment changes in month 61, a test for a down payment equal to price, and a test for annual cost including escrow. Run all tests and commit:

  ```bash
  pnpm test --run
  git add src/lib/mortgage.ts src/lib/__tests__/mortgage.test.ts
  git commit -m "feat: add mortgage calculation engine"
  ```

## Task 4: Build the Federal Tax Calculator Route and UI

**Files:**

- Create: `src/components/FederalTaxCalculator.tsx`
- Create: `src/app/calculators/federal-tax/page.tsx`

**Interfaces:**

- Consumes: `calculateFederalTax`, `CalculatorActions`, `ResultBarChart`, and `formatCurrency`.
- Produces: the `/calculators/federal-tax` page.

- [ ] **Step 1: Build a client form that initializes these values.**

  ```ts
  const initialInput: FederalTaxInput = {
    filingStatus: "single",
    grossIncome: 75_000,
    age: 40,
    deductionType: "standard",
    itemizedDeductions: 0,
    retirementContributions: 0,
    otherAdjustments: 0,
    credits: 0,
    withholding: 0,
    estimatedPayments: 0,
    stateLocalRate: 0,
  };
  ```

  Render labeled inputs for the complete interface, a filing-status `<select>`, standard/itemized radio controls, and a details `<details>` section for retirement contributions, adjustments, credits, payments, and state/local rate. Convert all numeric changes with `Number(event.target.value) || 0`. Show inline errors for negative fields and state/local rates outside 0–100; disable result actions while errors exist.

- [ ] **Step 2: Render calculation results and accessible data.**

  Display taxable income, federal tax, separate state/local estimate, total estimate, effective/marginal rates, and a clearly named refund/balance. Pass bracket tax rows to `ResultBarChart`, render the full bracket table, and pass a CSV matrix containing the summary and breakdown to `CalculatorActions` using filename `federal-tax-estimate.csv`.

- [ ] **Step 3: Add the server page and content.**

  Set metadata title to `Federal Income Tax Calculator 2026 | NJV Accountants`. Use the existing navy hero shell, then `FederalTaxCalculator`, a 2026 four-column bracket reference table, original keyword-focused explanatory content headed “Federal Income Tax Calculator”, and the standard gold contact CTA. Include only estimate wording, not a legal disclaimer supplied by the user.

- [ ] **Step 4: Manually validate the route.**

  Run: `pnpm dev`

  Expected: `/calculators/federal-tax` loads; changing filing status changes brackets, a valid payment creates a refund/balance, and print/download/share controls work locally.

- [ ] **Step 5: Commit the route.**

  ```bash
  git add src/components/FederalTaxCalculator.tsx src/app/calculators/federal-tax/page.tsx
  git commit -m "feat: add federal tax calculator page"
  ```

## Task 5: Build the Mortgage Calculator Route and UI

**Files:**

- Create: `src/components/MortgageCalculator.tsx`
- Create: `src/app/calculators/mortgage/page.tsx`

**Interfaces:**

- Consumes: `calculateMortgage`, `CalculatorActions`, `ResultBarChart`, and shared formatting.
- Produces: the `/calculators/mortgage` page.

- [ ] **Step 1: Build the client form and validation.**

  Start with:

  ```ts
  const initialInput: MortgageInput = {
    currency: "USD",
    homePrice: 400_000,
    downPayment: 80_000,
    annualRate: 0.06,
    termYears: 30,
    loanType: "fixed",
    adjustmentMonth: 60,
    adjustedAnnualRate: 0.07,
    annualPropertyTax: 4_800,
    annualInsurance: 1_200,
    annualHoa: 0,
    annualMortgageInsurance: 0,
  };
  ```

  Include currency, home price, deposit/down payment, rate, term, and monthly/yearly display frequency controls. Reveal adjustment period/rate only for adjustable loans. Include tax, insurance, HOA/service charge, and mortgage insurance in an optional costs `<details>` section. Reject negative values, non-positive term, and down payment above home price before rendering results.

- [ ] **Step 2: Render summary, chart, schedule, and actions.**

  Display principal-and-interest and full housing payment at the selected frequency, total interest, total paid, and loan amount. Use `ResultBarChart` for principal versus interest totals. Render a horizontally scrollable schedule table with month, payment, principal, interest, escrow, and balance; initially show 12 rows with a “Show all payments” button. Export every schedule row as `mortgage-amortization.csv`.

- [ ] **Step 3: Add the server page and content.**

  Set metadata title to `Mortgage Calculator | NJV Accountants`. Use the existing page shell, original mortgage-calculator SEO content covering repayment, interest-only, adjustable-rate mortgages, down payments, and amortization; finish with the existing gold CTA.

- [ ] **Step 4: Manually validate every supported calculation mode.**

  Run: `pnpm dev`

  Expected: `/calculators/mortgage` supports USD/GBP/EUR display, fixed payment, interest-only payment, ARM adjustment, monthly/yearly display toggle, schedule expansion, and local print/download/share actions.

- [ ] **Step 5: Commit the route.**

  ```bash
  git add src/components/MortgageCalculator.tsx src/app/calculators/mortgage/page.tsx
  git commit -m "feat: add mortgage calculator page"
  ```

## Task 6: Publish the Calculator Entries and Verify the Integrated Feature

**Files:**

- Modify: `src/app/calculators/page.tsx`

**Interfaces:**

- Produces cards linking to `/calculators/federal-tax` and `/calculators/mortgage`.

- [ ] **Step 1: Add the two cards to `CALCULATORS`.**

  ```ts
  { href: '/calculators/federal-tax', title: 'Federal Income Tax Calculator', tag: 'U.S. Tax Year 2026', description: 'Estimate federal income tax, credits, withholding, and your potential refund or balance due.', symbol: '$', available: true },
  { href: '/calculators/mortgage', title: 'Mortgage Calculator', tag: 'USD · GBP · EUR', description: 'Estimate mortgage payments, costs, and a complete amortization schedule.', symbol: '⌂', available: true },
  ```

- [ ] **Step 2: Run all automated validation.**

  ```bash
  pnpm lint
  npx tsc --noEmit
  pnpm test --run
  pnpm build
  ```

  Expected: every command exits 0. Resolve any lint, type, test, or production-build failure before committing.

- [ ] **Step 3: Inspect the final diff and commit.**

  ```bash
  git diff --check
  git add src/app/calculators/page.tsx
  git commit -m "feat: list tax and mortgage calculators"
  ```

## Plan Self-Review

- Spec coverage: Tasks 2 and 4 cover all federal inputs/results/rules; Tasks 3 and 5 cover mortgage modes, costs, schedule, currency, and rounding; Task 1 covers shared access/actions; Task 6 covers discovery and full verification.
- Placeholder scan: no unfinished requirements or generic implementation steps remain.
- Type consistency: `FederalTaxInput`, `FederalTaxResult`, `MortgageInput`, `MortgageResult`, `CurrencyCode`, and shared component props are introduced before a task consumes them.
