import type { ArticleHeading } from "@/lib/articleHeadings";

export default function ArticleTableOfContents({
  headings,
}: {
  headings: ArticleHeading[];
}) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="border-border bg-cream mb-12 rounded-sm border p-6"
    >
      <h2 className="font-display text-navy mb-4 text-lg font-bold">
        On this page
      </h2>
      <ol className="m-0 list-none space-y-2 p-0">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.depth === 3 ? "pl-5" : ""}>
            <a
              href={`#${heading.id}`}
              className="text-slate hover:text-gold text-sm no-underline transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
