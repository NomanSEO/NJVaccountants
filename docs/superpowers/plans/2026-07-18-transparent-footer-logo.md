# Transparent Footer Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an exact transparent-background copy of the existing NJV Accountants full logo and use it in the footer.

**Architecture:** Treat the committed full logo as an immutable source asset and derive a sibling alpha PNG through deterministic background extraction. Keep footer composition unchanged by updating only the full `BrandLogo` variant; the compact navbar variant remains untouched.

**Tech Stack:** PNG alpha processing, the installed imagegen chroma-key removal helper, Next.js Image, React, Vitest, TypeScript, ESLint, Next.js production build.

## Global Constraints

- Preserve `public/njv-logo-dark.png` unchanged.
- Create `public/njv-logo-dark-transparent.png` without redesigning, retyping, resizing, or recoloring the logo artwork.
- Preserve the full logo wording: “NJV Accountants” and “ACCOUNTING | TAX | ADVISORY”.
- Change only the footer's full logo variant; do not change the compact navbar logo.
- Preserve the footer layout and current logo container width.

---

### Task 1: Add the transparent full logo and connect it to the footer

**Files:**
- Create: `public/njv-logo-dark-transparent.png`
- Modify: `src/components/BrandLogo.tsx:14-23`
- Modify: `src/components/__tests__/navigation.test.ts`

**Interfaces:**
- Consumes: `public/njv-logo-dark.png` as the immutable 1040×684 source artwork.
- Produces: `/njv-logo-dark-transparent.png`, consumed by `BrandLogo({ variant: "full" })`.

- [ ] **Step 1: Write the failing footer-logo contract test**

Add this test to `src/components/__tests__/navigation.test.ts`:

```ts
it("uses a transparent full logo asset without a painted footer background", () => {
  const brandLogoSource = readFileSync(
    path.resolve(process.cwd(), "src/components/BrandLogo.tsx"),
    "utf8",
  );
  const transparentLogoPath = path.resolve(
    process.cwd(),
    "public/njv-logo-dark-transparent.png",
  );

  expect(existsSync(transparentLogoPath)).toBe(true);
  expect(brandLogoSource).toContain(
    'src="/njv-logo-dark-transparent.png"',
  );
  expect(brandLogoSource).not.toContain(
    'className={`bg-navy block h-auto w-full rounded-sm object-contain',
  );
});
```

Update the Node import at the top of the test file:

```ts
import { existsSync, readFileSync } from "node:fs";
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run:

```bash
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: FAIL because `public/njv-logo-dark-transparent.png` does not exist and the full logo still references `/njv-logo-dark.png`.

- [ ] **Step 3: Create the transparent logo asset from the existing source**

Run from the repository root:

```powershell
python "C:\Users\usama\.codex\skills\.system\imagegen\scripts\remove_chroma_key.py" `
  --input "public\njv-logo-dark.png" `
  --out "public\njv-logo-dark-transparent.png" `
  --auto-key border `
  --soft-matte `
  --transparent-threshold 12 `
  --opaque-threshold 220 `
  --despill
```

If visual inspection reveals a navy fringe, rerun once with `--edge-contract 1`. Do not regenerate or redraw the logo.

- [ ] **Step 4: Validate the alpha channel and preserved dimensions**

Run:

```powershell
@'
from PIL import Image
from pathlib import Path

source = Image.open(Path("public/njv-logo-dark.png"))
output = Image.open(Path("public/njv-logo-dark-transparent.png"))
alpha = output.getchannel("A")

assert output.mode == "RGBA", output.mode
assert output.size == source.size, (source.size, output.size)
assert alpha.getextrema()[0] == 0, alpha.getextrema()
assert alpha.getextrema()[1] == 255, alpha.getextrema()
assert alpha.getpixel((0, 0)) == 0, alpha.getpixel((0, 0))
print({"mode": output.mode, "size": output.size, "alpha": alpha.getextrema()})
'@ | python -
```

Expected: `mode` is `RGBA`, `size` is `(1040, 684)`, alpha extrema are `(0, 255)`, and the top-left pixel is transparent.

- [ ] **Step 5: Update the full BrandLogo variant**

Replace the full-variant image in `src/components/BrandLogo.tsx` with:

```tsx
<Image
  src="/njv-logo-dark-transparent.png"
  alt="NJV Accountants"
  width={1040}
  height={684}
  className={`block h-auto w-full object-contain ${className}`}
  priority={priority}
/>
```

Do not modify the compact variant.

- [ ] **Step 6: Run the focused test and type-check**

Run:

```bash
pnpm test --run src/components/__tests__/navigation.test.ts
npx tsc --noEmit
```

Expected: the navigation test file passes and TypeScript exits with code 0.

- [ ] **Step 7: Inspect both logo assets**

Open `public/njv-logo-dark.png` and `public/njv-logo-dark-transparent.png` at original resolution. Confirm the original is unchanged and the new file preserves the NJV mark, both text lines, white/gold colors, separators, and sharp edges without a navy rectangle or halo.

- [ ] **Step 8: Commit the tested asset and integration**

```bash
git add public/njv-logo-dark-transparent.png src/components/BrandLogo.tsx src/components/__tests__/navigation.test.ts
git commit -m "feat: add transparent footer logo"
```

---

### Task 2: Verify the footer in production layouts

**Files:**
- Verify: `src/components/Footer.tsx`
- Verify: `public/njv-logo-dark-transparent.png`

**Interfaces:**
- Consumes: `BrandLogo({ variant: "full" })` in `Footer`.
- Produces: a visually verified footer at desktop and mobile breakpoints.

- [ ] **Step 1: Run the full automated verification suite**

Run:

```bash
pnpm test --run
pnpm lint
npx tsc --noEmit
pnpm build
```

Expected: all tests pass, ESLint and TypeScript exit with code 0, and Next.js completes the production build.

- [ ] **Step 2: Start the production server for browser verification**

Run Next.js production mode on an unused local port, then open the homepage in the in-app browser.

Expected: the homepage loads without asset or hydration errors.

- [ ] **Step 3: Verify the desktop footer**

At a 1280px-wide viewport, scroll to the footer and confirm:

- the full NJV logo is visible on the footer's navy background;
- no rectangular image background or rounded image panel is visible;
- the artwork is not clipped, stretched, blurred, or recolored;
- the footer columns and logo container width remain unchanged.

- [ ] **Step 4: Verify the mobile footer**

At a 390×844 viewport, scroll to the footer and confirm the same logo integrity and absence of horizontal overflow.

- [ ] **Step 5: Stop the audit server and confirm repository state**

Stop only the production server process started for this audit. Run:

```bash
git status --short
git log -2 --oneline
```

Expected: no uncommitted changes and `feat: add transparent footer logo` is the latest implementation commit.
