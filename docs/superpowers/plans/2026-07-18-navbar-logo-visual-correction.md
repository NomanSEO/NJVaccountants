# Navbar and Logo Visual Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the navbar with the exact solid brand navy `#0b1f3a` and display the existing white/gold NJV mark on a transparent background.

**Architecture:** Keep the current navbar and `BrandLogo` component structure. Add one non-destructive transparent PNG derived from the existing dark mark, then make two focused class/reference changes protected by a source-contract test and browser inspection.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest 4, PowerShell/.NET image processing.

## Global Constraints

- Navbar background is exactly `#0b1f3a` through the existing `bg-navy` token.
- Do not alter navbar dimensions, links, dropdown behavior, mobile behavior, border, or scroll shadow.
- Preserve the existing logo artwork, white/gold colors, aspect ratio, and rendered size.
- Save a new transparent asset; do not overwrite any existing logo PNG.
- Do not change the footer full-logo treatment.

---

### Task 1: Solid Navbar and Transparent Compact Logo

**Files:**
- Create: `public/njv-logo-mark-transparent.png`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/BrandLogo.tsx`
- Modify: `src/components/__tests__/navigation.test.ts`

**Interfaces:**
- Consumes: `bg-navy` from `src/app/globals.css` and `public/njv-logo-mark-dark.png` as the immutable source artwork.
- Produces: a compact navbar logo using `/njv-logo-mark-transparent.png` and a navbar whose background is not composited with page content.

- [ ] **Step 1: Add a failing navbar visual-contract test**

Extend `src/components/__tests__/navigation.test.ts` with source reads for `Navbar.tsx` and `BrandLogo.tsx`, then add:

```ts
it("uses a solid navy navbar and a transparent compact logo asset", () => {
  const navbarSource = readFileSync(
    path.resolve(process.cwd(), "src/components/Navbar.tsx"),
    "utf8",
  );
  const brandLogoSource = readFileSync(
    path.resolve(process.cwd(), "src/components/BrandLogo.tsx"),
    "utf8",
  );

  expect(navbarSource).toContain("bg-navy border-gold/15");
  expect(navbarSource).not.toContain("bg-navy/97");
  expect(navbarSource).not.toContain("backdrop-blur");
  expect(brandLogoSource).toContain(
    'src="/njv-logo-mark-transparent.png"',
  );
  expect(brandLogoSource).not.toContain(
    'className="bg-navy flex h-10 w-12',
  );
});
```

- [ ] **Step 2: Run the focused test and confirm the red state**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: FAIL because the navbar still uses `bg-navy/97 backdrop-blur-sm` and `BrandLogo` still references `/njv-logo-mark-dark.png` inside a navy wrapper.

- [ ] **Step 3: Create the transparent logo asset without changing artwork geometry**

Use `public/njv-logo-mark-dark.png` as the input. Run this PowerShell conversion from the repository root:

```powershell
Add-Type -AssemblyName System.Drawing
$sourcePath = (Resolve-Path 'public/njv-logo-mark-dark.png').Path
$outputPath = Join-Path (Split-Path $sourcePath) 'njv-logo-mark-transparent.png'
$source = [System.Drawing.Bitmap]::FromFile($sourcePath)
$output = [System.Drawing.Bitmap]::new(
  $source.Width,
  $source.Height,
  [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
)
$background = [double[]](11, 31, 58)

for ($y = 0; $y -lt $source.Height; $y++) {
  for ($x = 0; $x -lt $source.Width; $x++) {
    $pixel = $source.GetPixel($x, $y)
    $distance = [Math]::Sqrt(
      [Math]::Pow($pixel.R - $background[0], 2) +
      [Math]::Pow($pixel.G - $background[1], 2) +
      [Math]::Pow($pixel.B - $background[2], 2)
    )

    if ($distance -le 4) {
      $output.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      continue
    }

    $alpha = if ($distance -ge 64) {
      255
    } else {
      [Math]::Round((($distance - 4) / 60) * 255)
    }
    $alphaFraction = $alpha / 255
    $red = [Math]::Clamp(
      [Math]::Round(($pixel.R - ((1 - $alphaFraction) * $background[0])) / $alphaFraction),
      0,
      255
    )
    $green = [Math]::Clamp(
      [Math]::Round(($pixel.G - ((1 - $alphaFraction) * $background[1])) / $alphaFraction),
      0,
      255
    )
    $blue = [Math]::Clamp(
      [Math]::Round(($pixel.B - ((1 - $alphaFraction) * $background[2])) / $alphaFraction),
      0,
      255
    )
    $output.SetPixel(
      $x,
      $y,
      [System.Drawing.Color]::FromArgb($alpha, $red, $green, $blue)
    )
  }
}

$output.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$source.Dispose()
$output.Dispose()
```

The conversion must preserve the source width and height (`640 × 455`), leave foreground pixels opaque, and make all four corner pixels fully transparent. Do not overwrite the source file.

- [ ] **Step 4: Update the navbar and compact logo classes**

In `src/components/Navbar.tsx`, replace the complete navigation class expression:

```tsx
className={`bg-navy/97 border-gold/15 fixed top-0 z-1000 w-full border-b backdrop-blur-sm transition-shadow duration-300${scrolled ? " shadow-[0_4px_24px_rgba(0,0,0,0.3)]" : ""}`}
```

with:

```tsx
className={`bg-navy border-gold/15 fixed top-0 z-1000 w-full border-b transition-shadow duration-300${scrolled ? " shadow-[0_4px_24px_rgba(0,0,0,0.3)]" : ""}`}
```

Retain the fixed positioning, border, transition, and conditional scroll shadow.

In the compact branch of `src/components/BrandLogo.tsx`, change the image source to:

```tsx
src="/njv-logo-mark-transparent.png"
```

and change the wrapper from:

```tsx
className="bg-navy flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm sm:h-11 sm:w-14"
```

to:

```tsx
className="flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden sm:h-11 sm:w-14"
```

Do not alter the full-logo branch used by the footer.

- [ ] **Step 5: Verify the green state and asset transparency**

Run:

```powershell
pnpm test --run src/components/__tests__/navigation.test.ts
```

Expected: all navigation tests PASS.

Inspect the PNG with PowerShell/.NET and verify:

```text
Width: 640
Height: 455
PixelFormat includes Alpha
Top-left alpha: 0
Top-right alpha: 0
Bottom-left alpha: 0
Bottom-right alpha: 0
```

- [ ] **Step 6: Run repository verification**

Run:

```powershell
pnpm lint
npx tsc --noEmit
pnpm build
```

Expected: each command exits 0.

- [ ] **Step 7: Browser-check desktop and mobile navbar rendering**

Run the production server and inspect `/` at desktop width and `390 × 844`.

Verify:

- Computed navbar background is `rgb(11, 31, 58)`.
- The compact logo has no rectangular background, navy fringe, clipping, or distortion.
- Desktop Services dropdown still opens and closes.
- Mobile menu still opens and closes.
- Navbar height and surrounding layout are unchanged.

- [ ] **Step 8: Commit the implementation**

```powershell
git add -- public/njv-logo-mark-transparent.png src/components/Navbar.tsx src/components/BrandLogo.tsx src/components/__tests__/navigation.test.ts
git commit -m "fix: correct navbar and logo backgrounds"
```
