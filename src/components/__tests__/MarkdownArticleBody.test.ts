import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import MarkdownArticleBody from "@/components/MarkdownArticleBody";

describe("MarkdownArticleBody", () => {
  it("renders GitHub-flavored tables and Markdown images", () => {
    const markup = renderToStaticMarkup(
      createElement(MarkdownArticleBody, {
        markdown: `| Service | Price |
| --- | --- |
| Tax return | $100 |

![Tax documents](https://example.com/tax-documents.jpg)`,
      }),
    );

    expect(markup).toContain("<table>");
    expect(markup).toContain('src="https://example.com/tax-documents.jpg"');
    expect(markup).toContain('alt="Tax documents"');
  });
});
