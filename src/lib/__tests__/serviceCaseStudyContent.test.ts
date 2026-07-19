import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function source(relativePath: string) {
  return readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

describe("service and case-study Portable Text content", () => {
  it("provides the same rich-content field options as blog posts", () => {
    for (const file of [
      "src/sanity/schemaTypes/service.ts",
      "src/sanity/schemaTypes/caseStudy.ts",
    ]) {
      const schema = source(file);
      expect(schema).toContain('name: "body"');
      expect(schema).toContain('type: "block"');
      expect(schema).toContain('type: "image"');
      expect(schema).toContain('type: "table"');
    }
  });

  it("renders rich content on both detail pages when the editor provides it", () => {
    for (const file of [
      "src/app/services/[slug]/page.tsx",
      "src/app/case-studies/[slug]/page.tsx",
    ]) {
      const page = source(file);
      expect(page).toContain("ContentPageBody");
      expect(page).toContain("body?.length");
    }
  });
});
