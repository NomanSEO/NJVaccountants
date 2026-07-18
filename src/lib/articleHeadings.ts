import type { PortableTextBlock } from "@/types";

export interface ArticleHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

function plainMarkdownText(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, "$1")
    .trim();
}

function baseSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function withStableIds(
  headings: Array<Omit<ArticleHeading, "id">>,
): ArticleHeading[] {
  const counts = new Map<string, number>();
  return headings.map((heading) => {
    const base = baseSlug(heading.text);
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    return { ...heading, id: count === 1 ? base : `${base}-${count}` };
  });
}

export function extractMarkdownHeadings(markdown: string): ArticleHeading[] {
  const headings: Array<Omit<ArticleHeading, "id">> = [];
  let fence: "```" | "~~~" | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      const marker = trimmed.startsWith("```") ? "```" : "~~~";
      fence = fence === marker ? null : fence ?? marker;
      continue;
    }
    if (fence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(trimmed);
    if (!match) continue;
    const text = plainMarkdownText(match[2]);
    if (!text) continue;
    headings.push({ depth: match[1].length as 2 | 3, text });
  }

  return withStableIds(headings);
}

export function extractPortableTextHeadings(
  body: PortableTextBlock[] | null | undefined,
): ArticleHeading[] {
  if (!body) return [];
  const headings: Array<Omit<ArticleHeading, "id">> = [];
  for (const block of body) {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) {
      continue;
    }
    const children = Array.isArray(block.children) ? block.children : [];
    const text = children
      .map((child) =>
        typeof child === "object" && child && "text" in child
          ? String(child.text)
          : "",
      )
      .join("")
      .trim();
    if (text) headings.push({ depth: block.style === "h2" ? 2 : 3, text });
  }
  return withStableIds(headings);
}
