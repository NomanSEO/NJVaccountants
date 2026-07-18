import { describe, expect, it } from "vitest";
import { getBlogContentSource } from "@/lib/blogContent";

describe("getBlogContentSource", () => {
  it("prefers meaningful Markdown over Portable Text", () => {
    expect(
      getBlogContentSource("# A Markdown post", [{ _type: "block" }]),
    ).toBe("markdown");
  });

  it("falls back to Portable Text when Markdown is whitespace", () => {
    expect(getBlogContentSource("  \n", [{ _type: "block" }])).toBe(
      "portableText",
    );
  });

  it("returns empty when neither source has content", () => {
    expect(getBlogContentSource(undefined, [])).toBe("empty");
  });
});
