# Services Dropdown Hover Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the desktop Services dropdown open while the pointer crosses the existing 20px visual gap to its links.

**Architecture:** Preserve the current React state and event handlers. Replace the visible menu's top margin with an absolutely positioned wrapper whose top padding creates the same 20px visual separation while remaining inside the hoverable Services list item.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest 4.

## Global Constraints

- The visible dropdown remains exactly 20px below its current anchor.
- Do not add close timers or change state-management behavior.
- Preserve click toggle, outside pointer, Escape, focus departure, and mobile navigation.
- Do not change menu width, colors, border, shadow, typography, or links.

---

### Task 1: Replace the Dead Gap with a Hover Bridge

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/__tests__/navigation.test.ts`

**Interfaces:**
- Consumes: existing `servicesOpen` state and the Services `<li>` mouse/focus handlers.
- Produces: an absolutely positioned hover-bridge wrapper with `pt-5`, containing the existing `role="menu"` element.

- [ ] **Step 1: Add a failing source-contract test**

Extend the `main navigation` suite in `src/components/__tests__/navigation.test.ts`:

```ts
it("bridges the visual gap between Services and its dropdown", () => {
  const navbarSource = readFileSync(
    path.resolve(process.cwd(), "src/components/Navbar.tsx"),
    "utf8",
  );

  expect(navbarSource).toContain(
    'className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5"',
  );
  expect(navbarSource).not.toContain("top-full left-1/2 mt-5");
});
```

- [ ] **Step 2: Run the focused test and confirm the red state**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: FAIL because the current visible menu uses `top-full left-1/2 mt-5` and no padded wrapper exists.

- [ ] **Step 3: Add the padded hover-bridge wrapper**

In `src/components/Navbar.tsx`, replace the open-menu block with this structure while retaining the existing links and their handlers:

```tsx
{servicesOpen ? (
  <div className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5">
    <div
      id="services-dropdown"
      role="menu"
      className="border-gold/15 rounded-sm border bg-navy-dark p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="text-gold px-3 py-2 text-[0.7rem] font-semibold tracking-widest uppercase">
        Business Advisory
      </div>
      {link.children.map((child) => (
        <Link
          key={child.href}
          href={child.href}
          role="menuitem"
          onClick={() => setServicesOpen(false)}
          className="hover:bg-gold/10 hover:text-gold block rounded-sm px-3 py-3 text-sm font-medium text-white/75 no-underline transition-colors"
        >
          {child.label}
        </Link>
      ))}
      <Link
        href={link.href}
        role="menuitem"
        onClick={() => setServicesOpen(false)}
        className="border-gold/10 text-gold mt-2 block border-t px-3 pt-3 text-xs font-semibold no-underline"
      >
        View all services →
      </Link>
    </div>
  </div>
) : null}
```

- [ ] **Step 4: Run focused and full automated verification**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
pnpm test --run
pnpm lint
npx tsc --noEmit
pnpm build
```

Expected: all commands exit 0.

- [ ] **Step 5: Browser-check bridge geometry and interactions**

Run the production server and inspect `/` at desktop width.

Verify:

- Services trigger bottom and visible menu top remain separated by 20px.
- The wrapper starts at the trigger/list-item bottom and its top padding covers the full 20px gap.
- `document.elementFromPoint()` within the gap resolves to the wrapper or its descendant rather than the page behind it.
- Services opens and each Business Advisory link is clickable.
- Escape and outside pointer close the menu.
- Mobile navigation still opens and closes at `390 × 844`.

- [ ] **Step 6: Commit the fix**

```powershell
git add -- src/components/Navbar.tsx src/components/__tests__/navigation.test.ts
git commit -m "fix: keep Services dropdown reachable on hover"
```
