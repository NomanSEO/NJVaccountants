# Compact Navbar Dropdowns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the crowded seven-link desktop navbar with four top-level items and reusable dropdowns for Services, About, and Calculators.

**Architecture:** Keep `NAV_LINKS` as the shared information-architecture source, enrich dropdown items with headings and optional footer links, and replace Services-specific state with a generic single-open menu key. Render the same data as single-open accordions in the mobile dialog.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Vitest 4.

## Global Constraints

- Top-level order is exactly Services, About, Calculators, Blogs.
- Navbar background, transparent logo, 71px height, border, shadow, and consultation CTA remain unchanged.
- All desktop dropdowns retain the 20px padded hover bridge.
- Only one desktop dropdown or mobile accordion may be open at a time.
- Preserve click, hover, outside-pointer, Escape, blur-departure, and mobile menu closure behavior.
- Do not change destination pages or footer navigation.

---

### Task 1: Shared Navigation Data and Generic Desktop Dropdowns

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/__tests__/navigation.test.ts`

**Interfaces:**
- Produces `NavLinkItem` with optional `children`, `dropdownLabel`, and `footerLabel`.
- Produces the exported `NAV_LINKS` array consumed by desktop and mobile navigation.
- Produces `openDropdown: string | null`, where the value is a top-level link label.

- [ ] **Step 1: Replace the existing navigation-data tests with the exact compact hierarchy**

In `src/components/__tests__/navigation.test.ts`, assert:

```ts
it("uses four compact top-level navigation items", () => {
  expect(NAV_LINKS.map(({ label }) => label)).toEqual([
    "Services",
    "About",
    "Calculators",
    "Blogs",
  ]);
});

it("groups the approved destinations under each dropdown", () => {
  expect(NAV_LINKS.find(({ label }) => label === "Services")).toMatchObject({
    href: "/#services",
    dropdownLabel: "Professional Services",
    footerLabel: "View All Services",
    children: [
      { href: "/#services", label: "Accounting & Bookkeeping" },
      { href: "/#services", label: "Taxation Services" },
      { href: "/#services", label: "Audit & Assurance" },
      {
        href: "/services/business-advisory/business-valuation",
        label: "Business Valuation",
      },
      {
        href: "/services/business-advisory/ma-advisory",
        label: "M&A Advisory",
      },
    ],
  });

  expect(NAV_LINKS.find(({ label }) => label === "About")).toMatchObject({
    dropdownLabel: "Company",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/#case-studies", label: "Case Studies" },
      { href: "/#team", label: "Our Team" },
      { href: "/#contact", label: "Contact" },
    ],
  });

  expect(NAV_LINKS.find(({ label }) => label === "Calculators")).toMatchObject({
    href: "/calculators",
    dropdownLabel: "Featured Calculators",
    footerLabel: "View All Calculators",
    children: [
      { href: "/calculators/salary-tax", label: "Salary Tax Calculator" },
      { href: "/calculators/mortgage", label: "Mortgage Calculator" },
      { href: "/calculators/investment", label: "Investment Calculator" },
    ],
  });

  expect(NAV_LINKS.find(({ label }) => label === "Blogs")).toEqual({
    href: "/blog",
    label: "Blogs",
  });
});
```

Add a source contract:

```ts
it("uses generic single-open dropdown state", () => {
  const navbarSource = readFileSync(
    path.resolve(process.cwd(), "src/components/Navbar.tsx"),
    "utf8",
  );

  expect(navbarSource).toContain(
    'const [openDropdown, setOpenDropdown] = useState<string | null>(null)',
  );
  expect(navbarSource).not.toContain("servicesOpen");
  expect(navbarSource).toContain(
    'className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5"',
  );
});
```

- [ ] **Step 2: Run the focused tests and confirm the red state**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: FAIL because the current array has seven top-level items and the component uses `servicesOpen`.

- [ ] **Step 3: Extend `NavLinkItem` and replace `NAV_LINKS`**

Use:

```ts
export interface NavLinkItem {
  href: string;
  label: string;
  dropdownLabel?: string;
  footerLabel?: string;
  children?: Array<{ href: string; label: string }>;
}

export const NAV_LINKS: NavLinkItem[] = [
  {
    href: "/#services",
    label: "Services",
    dropdownLabel: "Professional Services",
    footerLabel: "View All Services",
    children: [
      { href: "/#services", label: "Accounting & Bookkeeping" },
      { href: "/#services", label: "Taxation Services" },
      { href: "/#services", label: "Audit & Assurance" },
      {
        href: "/services/business-advisory/business-valuation",
        label: "Business Valuation",
      },
      {
        href: "/services/business-advisory/ma-advisory",
        label: "M&A Advisory",
      },
    ],
  },
  {
    href: "/about",
    label: "About",
    dropdownLabel: "Company",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/#case-studies", label: "Case Studies" },
      { href: "/#team", label: "Our Team" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    href: "/calculators",
    label: "Calculators",
    dropdownLabel: "Featured Calculators",
    footerLabel: "View All Calculators",
    children: [
      { href: "/calculators/salary-tax", label: "Salary Tax Calculator" },
      { href: "/calculators/mortgage", label: "Mortgage Calculator" },
      { href: "/calculators/investment", label: "Investment Calculator" },
    ],
  },
  { href: "/blog", label: "Blogs" },
];
```

- [ ] **Step 4: Replace Services-specific state and document listeners**

Use these refs and state:

```ts
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const navListRef = useRef<HTMLUListElement>(null);
const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
```

Replace the Services-specific effect with:

```ts
useEffect(() => {
  if (!openDropdown) return;
  const onPointerDown = (event: PointerEvent) => {
    if (!navListRef.current?.contains(event.target as Node)) {
      setOpenDropdown(null);
    }
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      const activeLabel = openDropdown;
      setOpenDropdown(null);
      triggerRefs.current.get(activeLabel)?.focus();
    }
  };
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeyDown);
  return () => {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeyDown);
  };
}, [openDropdown]);
```

- [ ] **Step 5: Render every desktop dropdown through the shared branch**

Attach `ref={navListRef}` to the desktop `<ul>`. For each item with children:

```tsx
<li
  key={link.label}
  className="relative"
  onMouseEnter={() => setOpenDropdown(link.label)}
  onMouseLeave={() => setOpenDropdown(null)}
  onBlurCapture={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenDropdown(null);
    }
  }}
>
  <button
    ref={(node) => {
      if (node) triggerRefs.current.set(link.label, node);
      else triggerRefs.current.delete(link.label);
    }}
    type="button"
    aria-haspopup="menu"
    aria-expanded={openDropdown === link.label}
    aria-controls={`nav-${link.label.toLowerCase()}-dropdown`}
    onClick={() =>
      setOpenDropdown((current) =>
        current === link.label ? null : link.label,
      )
    }
    className="hover:text-gold flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap text-white/80 transition-colors"
  >
    {link.label}
    <span aria-hidden="true" className="text-[0.65rem]">▾</span>
  </button>
  {openDropdown === link.label ? (
    <div className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5">
      <div
        id={`nav-${link.label.toLowerCase()}-dropdown`}
        role="menu"
        className="border-gold/15 rounded-sm border bg-navy-dark p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      >
        <div className="text-gold px-3 py-2 text-[0.7rem] font-semibold tracking-widest uppercase">
          {link.dropdownLabel}
        </div>
        {link.children.map((child) => (
          <Link
            key={`${child.href}-${child.label}`}
            href={child.href}
            role="menuitem"
            onClick={() => setOpenDropdown(null)}
            className="hover:bg-gold/10 hover:text-gold block rounded-sm px-3 py-3 text-sm font-medium text-white/75 no-underline transition-colors"
          >
            {child.label}
          </Link>
        ))}
        {link.footerLabel ? (
          <Link
            href={link.href}
            role="menuitem"
            onClick={() => setOpenDropdown(null)}
            className="border-gold/10 text-gold mt-2 block border-t px-3 pt-3 text-xs font-semibold no-underline"
          >
            {link.footerLabel} →
          </Link>
        ) : null}
      </div>
    </div>
  ) : null}
</li>
```

Keep the direct-link branch for Blogs. Set the desktop list spacing to `gap-6 xl:gap-8`.

- [ ] **Step 6: Run the desktop navigation tests**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: hierarchy and generic-state tests PASS.

- [ ] **Step 7: Commit Task 1**

```powershell
git add -- src/components/Navbar.tsx src/components/__tests__/navigation.test.ts
git commit -m "feat: add compact desktop navigation dropdowns"
```

---

### Task 2: Generic Mobile Accordions and Acceptance Verification

**Files:**
- Modify: `src/components/MobileMenu.tsx`
- Modify: `src/components/__tests__/navigation.test.ts`

**Interfaces:**
- Consumes `NAV_LINKS`, including optional children, headings, and footer labels.
- Produces `expandedLabel: string | null` so only one mobile accordion is open.

- [ ] **Step 1: Add a failing mobile source-contract test**

```ts
it("uses generic single-open mobile accordion state", () => {
  const mobileMenuSource = readFileSync(
    path.resolve(process.cwd(), "src/components/MobileMenu.tsx"),
    "utf8",
  );

  expect(mobileMenuSource).toContain(
    'const [expandedLabel, setExpandedLabel] = useState<string | null>(null)',
  );
  expect(mobileMenuSource).not.toContain("servicesExpanded");
  expect(mobileMenuSource).toContain("expandedLabel === link.label");
});
```

- [ ] **Step 2: Run the focused test and confirm the red state**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: FAIL because `MobileMenu` still uses `servicesExpanded`.

- [ ] **Step 3: Replace Services-specific mobile state**

Use:

```ts
const [expandedLabel, setExpandedLabel] = useState<string | null>(null);
const handleClose = () => {
  setExpandedLabel(null);
  onClose();
};
```

For each `link.children` branch, use:

```tsx
<button
  type="button"
  aria-expanded={expandedLabel === link.label}
  aria-controls={`mobile-${link.label.toLowerCase()}`}
  onClick={() =>
    setExpandedLabel((current) =>
      current === link.label ? null : link.label,
    )
  }
  className="font-display flex w-full cursor-pointer items-center justify-between border-0 bg-transparent text-left text-2xl font-bold text-white"
>
  {link.label}
  <span aria-hidden="true" className="text-gold text-base">
    {expandedLabel === link.label ? "−" : "+"}
  </span>
</button>
```

Render the accordion body only when `expandedLabel === link.label`, use `id={`mobile-${link.label.toLowerCase()}`}`, render `link.dropdownLabel`, all child links, and the optional `link.footerLabel` link. Every destination calls `handleClose`.

- [ ] **Step 4: Run all automated verification**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
pnpm test --run
pnpm lint
npx tsc --noEmit
pnpm build
```

Expected: all commands exit 0.

- [ ] **Step 5: Browser-check desktop and mobile navigation**

Run the production server and verify:

- Desktop top-level order is Services, About, Calculators, Blogs.
- Hovering each dropdown trigger opens its matching menu and closes the previous one.
- Every visible menu remains 20px below its trigger with a hit-testable padded bridge.
- Business Valuation, About Us, and Salary Tax Calculator navigate to their exact routes.
- Blogs navigates directly to `/blog`.
- Escape restores focus to the active dropdown trigger; outside pointer closes it.
- At `390 × 844`, Services, About, and Calculators operate as single-open accordions.
- Selecting any mobile destination closes the dialog.
- Navbar remains 71px high with no horizontal overflow.

- [ ] **Step 6: Commit Task 2**

```powershell
git add -- src/components/MobileMenu.tsx src/components/__tests__/navigation.test.ts
git commit -m "feat: add compact mobile navigation accordions"
```
