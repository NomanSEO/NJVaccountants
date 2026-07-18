import { describe, expect, it } from "vitest";
import { extractMarkdownHeadings } from "@/lib/articleHeadings";

describe("extractMarkdownHeadings", () => {
  it("extracts H2 and H3 headings with stable duplicate IDs", () => {
    expect(
      extractMarkdownHeadings(`## Fees & Costs
### Advisory fees
## Fees & Costs`),
    ).toEqual([
      { depth: 2, text: "Fees & Costs", id: "fees-costs" },
      { depth: 3, text: "Advisory fees", id: "advisory-fees" },
      { depth: 2, text: "Fees & Costs", id: "fees-costs-2" },
    ]);
  });

  it("removes simple inline Markdown from labels", () => {
    expect(
      extractMarkdownHeadings("## **Business** [valuation](https://example.com) `steps`"),
    ).toEqual([
      {
        depth: 2,
        text: "Business valuation steps",
        id: "business-valuation-steps",
      },
    ]);
  });

  it("ignores headings inside fenced code blocks and H1/H4 headings", () => {
    expect(
      extractMarkdownHeadings(`# Page title
\`\`\`
## Not a heading
\`\`\`
#### Too deep
## Real heading`),
    ).toEqual([{ depth: 2, text: "Real heading", id: "real-heading" }]);
  });

  it("normalizes accented characters", () => {
    expect(extractMarkdownHeadings("## Información financiera")).toEqual([
      {
        depth: 2,
        text: "Información financiera",
        id: "informacion-financiera",
      },
    ]);
  });
});
