# Calculator Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every calculator comfortable at 320–480px while keeping the established desktop layouts unchanged.

**Architecture:** Use Tailwind responsive utilities in existing calculator components. Do not add duplicate mobile renderers or change calculation logic. Centralize action buttons and table scrolling, then apply consistent phone-first spacing and summary grids.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Vitest.

## Global Constraints

- Preserve two-column calculator grids at `lg` and form grids at `sm`.
- Test 320px, 375px, 768px, and desktop viewports.
- Keep semantic schedule tables; do not substitute card-based tables.
- Do not modify calculator inputs, calculations, routes, or CSV output.

---

### Task 1: Shared responsive controls

**Files:**

- Create: `src/components/ResponsiveTable.tsx`
- Modify: `src/components/CalculatorActions.tsx`
- Modify: calculator components with schedule/result tables.

**Interfaces:** Produces `ResponsiveTable({ children, minWidth? })`, which bounds table scrolling and shows “Swipe to view all columns” only below `sm`.

- [ ] **Step 1: Create the responsive table wrapper**

```tsx
export default function ResponsiveTable({ children, minWidth }: Props) {
  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-xs text-slate sm:hidden">
        Swipe to view all columns
      </p>
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Replace each calculator table scroll wrapper**

```tsx
<ResponsiveTable minWidth="620px">
  <table className="w-full text-left text-sm">...</table>
</ResponsiveTable>
```

- [ ] **Step 3: Stack calculator actions on phones**

```tsx
<div
  className="flex flex-col gap-3 sm:flex-row"
  aria-label="Calculator actions"
>
  <button className="w-full sm:w-auto">Print</button>
</div>
```

- [ ] **Step 4: Verify shared changes**

Run: `npx tsc --noEmit && pnpm exec eslint src/components/CalculatorActions.tsx src/components/ResponsiveTable.tsx`

Expected: exit code 0.

- [ ] **Step 5: Commit with message `feat: improve mobile calculator controls`**

### Task 2: Phone-first calculator panels

**Files:**

- Modify: all `src/components/*Calculator.tsx` files.

**Interfaces:** Consumes existing calculation result objects and shared controls without API changes.

- [ ] **Step 1: Apply mobile card padding and summary-grid breakpoints**

```tsx
<section className="rounded-sm border border-border bg-white p-4 shadow-sm sm:p-6 md:p-8">
  <div className="mt-7 grid gap-4 sm:grid-cols-2">...</div>
</section>
```

- [ ] **Step 2: Preserve single-column form fields on phone widths**

```tsx
<div className="mt-6 grid gap-4 sm:grid-cols-2">...</div>
```

- [ ] **Step 3: Make dense metric text wrap safely**

```tsx
<div className="min-w-0">
  <p className="break-words text-xs text-white/60">Label</p>
</div>
```

- [ ] **Step 4: Verify calculation behavior**

Run: `pnpm test --run && npx tsc --noEmit`

Expected: all tests pass and exit code 0.

- [ ] **Step 5: Commit with message `feat: refine calculator layouts for phones`**

### Task 3: Calculator route shells and responsive QA

**Files:**

- Modify: `src/app/calculators/page.tsx` and `src/app/calculators/*/page.tsx`.

**Interfaces:** Produces calculator pages with `px-4 sm:px-6`, reduced phone-only vertical spacing, and existing desktop `max-w-site` containers.

- [ ] **Step 1: Tighten phone gutters and section spacing**

```tsx
<div className="mx-auto max-w-site px-4 sm:px-6">
  <section className="py-12 sm:py-16 md:py-20">...</section>
</div>
```

- [ ] **Step 2: Verify every calculator at 320px and 375px**

Confirm no horizontal page overflow; forms, results, and full-width actions are readable; tables scroll only within their wrappers.

- [ ] **Step 3: Verify 768px and 1280px layouts**

Confirm form fields resume two columns at `sm` and calculator panels remain side-by-side at `lg`.

- [ ] **Step 4: Run final validation**

Run: `pnpm lint && pnpm test --run && npx tsc --noEmit && pnpm build`

Expected: exit code 0 for each command.

- [ ] **Step 5: Commit with message `feat: make calculator pages mobile responsive`**
