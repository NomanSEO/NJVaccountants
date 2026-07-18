import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("article typography", () => {
  it("allows long inline code such as URLs to wrap on narrow screens", () => {
    const globalStyles = readFileSync(
      path.resolve(process.cwd(), "src/app/globals.css"),
      "utf8",
    );
    const inlineCodeRule = globalStyles.match(/\.prose code\s*\{([^}]*)\}/)?.[1];

    expect(inlineCodeRule).toContain("overflow-wrap: anywhere");
  });
});
