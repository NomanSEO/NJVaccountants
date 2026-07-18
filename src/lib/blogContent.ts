export type BlogContentSource = "markdown" | "portableText" | "empty";

export function getBlogContentSource(
  markdown: string | null | undefined,
  body: unknown[] | null | undefined,
): BlogContentSource {
  if (markdown?.trim()) return "markdown";
  if (body && body.length > 0) return "portableText";
  return "empty";
}
