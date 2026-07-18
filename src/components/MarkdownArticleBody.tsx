import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import type { ArticleHeading } from "@/lib/articleHeadings";

interface MarkdownArticleBodyProps {
  markdown: string;
  headings?: ArticleHeading[];
}

export default function MarkdownArticleBody({
  markdown,
  headings = [],
}: MarkdownArticleBodyProps) {
  const h2Ids = headings.filter((heading) => heading.depth === 2);
  const h3Ids = headings.filter((heading) => heading.depth === 3);
  let h2Index = 0;
  let h3Index = 0;

  const headingText = (children: ReactNode) => children;

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 id={h2Ids[h2Index++]?.id}>{headingText(children)}</h2>
          ),
          h3: ({ children }) => (
            <h3 id={h3Ids[h3Index++]?.id}>{headingText(children)}</h3>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
