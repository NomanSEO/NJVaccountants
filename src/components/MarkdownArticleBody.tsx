import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownArticleBodyProps {
  markdown: string;
}

export default function MarkdownArticleBody({
  markdown,
}: MarkdownArticleBodyProps) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
