# Markdown-first blog rendering

## Goal

Let authors store a blog post as a Markdown string in Sanity while keeping the
existing Portable Text `body` available for posts that have not yet been
migrated.

## Content model

Add an optional multiline `markdown` string field to the `post` schema. The
field accepts GitHub-flavored Markdown (GFM) and is independent of the existing
Portable Text `body` field. Existing posts remain valid and require no content
migration.

`PostFull` gains an optional `markdown?: string` property so the Sanity query
result is typed correctly. Existing spread-based GROQ projections already
return both fields, so no query contract changes are needed.

## Rendering behavior

The blog post page chooses its body source in this order:

1. If `post.markdown?.trim()` is non-empty, render Markdown.
2. Otherwise, if `post.body` contains blocks, render the current Portable Text
   body with its existing custom Sanity image and table renderers.
3. Otherwise, show the current empty-article message.

Markdown rendering uses `react-markdown` plus `remark-gfm`. It supports
headings, emphasis, links, lists, blockquotes, fenced and inline code,
horizontal rules, GFM tables, task lists, and standard Markdown images. Raw
HTML is not enabled, so author-provided HTML is escaped rather than executed.

Markdown images use their authored URL and alt text. They will not be converted
to Sanity image references; authors needing Sanity hotspot/caption behavior can
continue using Portable Text until the post is migrated to externally hosted
Markdown images.

## Components and styling

Create a focused server-rendered Markdown article-body component. It maps the
Markdown elements to semantic HTML and reuses the existing `prose` class. Extend
the shared prose CSS only for Markdown-specific elements: tables, images,
preformatted code blocks, inline code, task lists, and horizontal rules. The
current Portable Text component mapping stays in the post page and is unchanged.

## Dependencies and tests

Add `react-markdown` and `remark-gfm` as production dependencies. Extract the
source-selection rule into a small pure helper, then write Vitest tests first
for: meaningful Markdown taking precedence, whitespace-only Markdown falling
back to Portable Text, and empty content selecting the empty state. Tests do
not assert third-party renderer internals.

Verification will run the focused Vitest test, the full test suite, TypeScript
checking, linting, and a production build.

## Scope boundaries

This change does not backfill existing Sanity documents, alter blog listings or
SEO metadata, enable embedded HTML in Markdown, or add a Markdown editor
preview to Sanity Studio.
