import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("App Router dynamic segment structure", () => {
  it("uses one parameter name for the first dynamic blog segment", () => {
    const blogRoot = path.resolve(process.cwd(), "src/app/blog");
    expect(existsSync(path.join(blogRoot, "[slug]", "page.tsx"))).toBe(false);
    expect(existsSync(path.join(blogRoot, "[language]", "page.tsx"))).toBe(true);
    expect(
      existsSync(path.join(blogRoot, "[language]", "[slug]", "page.tsx")),
    ).toBe(true);
  });

  it("provides dedicated full-page routes for the core marketing sections", () => {
    const appRoot = path.resolve(process.cwd(), "src/app");

    for (const route of ["services", "case-studies", "team", "contact"]) {
      expect(existsSync(path.join(appRoot, route, "page.tsx"))).toBe(true);
    }
  });

  it("provides dynamic detail routes for services and case studies", () => {
    const appRoot = path.resolve(process.cwd(), "src/app");

    expect(
      existsSync(path.join(appRoot, "services", "[slug]", "page.tsx")),
    ).toBe(true);
    expect(
      existsSync(path.join(appRoot, "case-studies", "[slug]", "page.tsx")),
    ).toBe(true);
  });
});
