# Markdown-first blog implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prefer a Sanity post's Markdown string while preserving Portable Text as fallback.

**Architecture:** Add an optional `markdown` field to the Sanity post. A pure selector chooses Markdown, Portable Text, or the existing empty state; a small server component renders Markdown with GFM.

**Tech Stack:** Next.js 16, React 19, Sanity 6, TypeScript, Vitest, react-markdown, remark-gfm.

## Global Constraints

- Do not migrate existing Sanity documents.
- A non-whitespace `markdown` value wins; otherwise retain `body`.
- Support GFM tables, task lists, code, links, blockquotes, and Markdown image URLs.
- Do not enable raw HTML rendering.
- Keep current Portable Text image/table mappings unchanged.
- Use pnpm; verify with Vitest, TypeScript, lint, and production build.

---

### Task 1: Test and implement content-source selection

**Files:**
- Create: `src/lib/blogContent.ts`
- Create: `src/lib/__tests__/blogContent.test.ts`

**Interfaces:**
- Produces `type BlogContentSource = "markdown" | "portableText" | "empty"`.
- Produces `getBlogContentSource(markdown: string | null | undefined, body: unknown[] | null | undefined): BlogContentSource`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getBlogContentSource } from "@/lib/blogContent";

describe("getBlogContentSource", () => {
  it("prefers meaningful Markdown over Portable Text", () => {
    expect(getBlogContentSource("# Article", [{ _type: "block" }])).toBe("markdown");
  });

  it("falls back when Markdown is whitespace", () => {
    expect(getBlogContentSource(" \n", [{ _type: "block" }])).toBe("portableText");
  });

  it("returns empty when neither source exists", () => {
    expect(getBlogContentSource(undefined, [])).toBe("empty");
  });
});
```

- [ ] **Step 2: Verify it fails**

Run: `pnpm test src/lib/__tests__/blogContent.test.ts`

Expected: FAIL because `@/lib/blogContent` does not exist.

- [ ] **Step 3: Implement the helper**

```ts
export type BlogContentSource = "markdown" | "portableText" | "empty";

export function getBlogContentSource(
  markdown: string | null | undefined,
  body: unknown[] | null | undefined,
): BlogContentSource {
  if (markdown?.trim()) return "markdown";
  if (body && body.length > 0) return "portableText";
  return "empty";
}
```

- [ ] **Step 4: Verify it passes**

Run: `pnpm test src/lib/__tests__/blogContent.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/blogContent.ts src/lib/__tests__/blogContent.test.ts
git commit -m "test: cover blog body source selection"
```

### Task 2: Extend the Sanity post contract

**Files:**
- Modify: `src/sanity/schemaTypes/post.ts`
- Modify: `src/types/index.ts`

**Interfaces:**
- Produces an optional Sanity `markdown` text field.
- Produces `PostFull.markdown?: string`.

- [ ] **Step 1: Add the field before `body`**

```ts
defineField({
  name: "markdown",
  title: "Markdown Content",
  description:
    "GitHub-flavored Markdown. When populated, this takes precedence over Body Content on the site.",
  type: "text",
  rows: 20,
}),
```

- [ ] **Step 2: Add the result type property**

```ts
export interface PostFull extends Post {
  markdown?: string;
  body: any[];
}
```

- [ ] **Step 3: Verify types and commit**

Run: `npx tsc --noEmit`

Expected: exit code 0.

```bash
git add src/sanity/schemaTypes/post.ts src/types/index.ts
git commit -m "feat: add markdown blog content field"
```

### Task 3: Render GFM Markdown first

**Files:**
- Create: `src/components/MarkdownArticleBody.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Consumes `getBlogContentSource(post.markdown, post.body)`.
- Produces `MarkdownArticleBody({ markdown: string })`, rendered without raw HTML.

- [ ] **Step 1: Install dependencies**

Run: `pnpm add react-markdown remark-gfm`

Expected: both packages appear in dependencies and the lockfile updates.

- [ ] **Step 2: Create the Markdown component**

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
```

- [ ] **Step 3: Wire the article body**

```tsx
const contentSource = getBlogContentSource(post.markdown, post.body);

{contentSource === "markdown" ? (
  <MarkdownArticleBody markdown={post.markdown!} />
) : contentSource === "portableText" ? (
  <div className="prose">
    <PortableText value={post.body} components={portableTextComponents} />
  </div>
) : (
  <p className="text-slate text-[1.0625rem] italic">
    Full article content coming soon.
  </p>
)}
```

- [ ] **Step 4: Add Markdown-specific `.prose` rules**

```css
.prose table {
  width: 100%;
  margin: 2.5rem 0;
  border-collapse: collapse;
  font-size: 0.9375rem;
}
.prose th,
.prose td {
  border: 1px solid #e2d9c8;
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: top;
}
.prose th { background: #0b1f3a; color: #fff; font-weight: 600; }
.prose tr:nth-child(even) { background: #f8f6f1; }
.prose img { display: block; width: 100%; height: auto; margin: 2.5rem 0; border-radius: 0.125rem; }
.prose code { border-radius: 0.125rem; background: #f8f6f1; padding: 0.125rem 0.35rem; font-size: 0.9em; }
.prose pre { overflow-x: auto; margin: 2rem 0; padding: 1rem; background: #0b1f3a; color: #fff; }
.prose pre code { padding: 0; background: transparent; color: inherit; }
.prose input[type="checkbox"] { margin-right: 0.5rem; }
.prose hr { margin: 2.5rem 0; border: 0; border-top: 1px solid #e2d9c8; }
```

- [ ] **Step 5: Verify and commit**

Run: `pnpm test src/lib/__tests__/blogContent.test.ts && npx tsc --noEmit`

Expected: source-selection tests pass and TypeScript exits 0.

```bash
git add src/components/MarkdownArticleBody.tsx src/app/blog/[slug]/page.tsx src/app/globals.css package.json pnpm-lock.yaml
git commit -m "feat: render markdown blog content first"
```

### Task 4: Verify the application

**Files:** No source changes expected.

- [ ] **Step 1: Run tests**

Run: `pnpm test --run`

Expected: all Vitest suites pass.

- [ ] **Step 2: Run static checks**

Run: `npx tsc --noEmit && pnpm lint`

Expected: both commands exit 0.

- [ ] **Step 3: Run production build**

Run: `pnpm build`

Expected: Next.js build exits 0.

- [ ] **Step 4: Inspect the working tree**

Run: `git diff --check HEAD~3..HEAD && git status --short`

Expected: no whitespace errors; the existing unrelated `src/app/calculators/salary-paycheck/page.tsx` modification remains untouched.
