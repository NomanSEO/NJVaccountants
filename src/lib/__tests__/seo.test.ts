import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  authorPath,
  blogPath,
  buildBlogAlternates,
  caseStudyPath,
  isLanguageCode,
  servicePath,
} from "@/lib/seo";

describe("SEO URL helpers", () => {
  it("declares the intentional smooth-scroll behavior for route transitions", () => {
    const layout = readFileSync(
      path.resolve(process.cwd(), "src/app/layout.tsx"),
      "utf8",
    );

    expect(layout).toContain('data-scroll-behavior="smooth"');
  });

  it("builds canonical localized blog and author paths", () => {
    expect(blogPath("es", "articulo")).toBe("/blog/es/articulo");
    expect(blogPath("es-MX", "impuestos 2026")).toBe(
      "/blog/es-MX/impuestos%202026",
    );
    expect(authorPath("noman-javed")).toBe("/authors/noman-javed");
    expect(servicePath("taxation-services")).toBe("/services/taxation-services");
    expect(caseStudyPath("acme-industries")).toBe(
      "/case-studies/acme-industries",
    );
    expect(absoluteUrl("/about")).toBe("https://www.njvaccountants.com/about");
  });

  it("rejects empty service and case-study slugs", () => {
    expect(() => servicePath(" ")).toThrow("A service slug is required.");
    expect(() => caseStudyPath("")).toThrow(
      "A case study slug is required.",
    );
  });

  it("accepts canonical BCP-47-like language codes and rejects path input", () => {
    expect(isLanguageCode("en")).toBe(true);
    expect(isLanguageCode("es-MX")).toBe(true);
    expect(isLanguageCode("../es")).toBe(false);
    expect(isLanguageCode("en_US")).toBe(false);
    expect(isLanguageCode("")).toBe(false);
  });

  it("builds reciprocal alternates and points x-default to English", () => {
    const translations = [
      { language: "en", slug: "business-value" },
      { language: "es", slug: "valor-del-negocio" },
    ];

    const result = buildBlogAlternates(translations, translations[1]);

    expect(result.canonical).toBe(
      "https://www.njvaccountants.com/blog/es/valor-del-negocio",
    );
    expect(result.languages).toEqual({
      en: "https://www.njvaccountants.com/blog/en/business-value",
      es: "https://www.njvaccountants.com/blog/es/valor-del-negocio",
      "x-default": "https://www.njvaccountants.com/blog/en/business-value",
    });
  });

  it("omits malformed translations and x-default without English", () => {
    const result = buildBlogAlternates(
      [
        { language: "es", slug: "articulo" },
        { language: "../fr", slug: "bad" },
        { language: "de", slug: "" },
      ],
      { language: "es", slug: "articulo" },
    );

    expect(result.languages).toEqual({
      es: "https://www.njvaccountants.com/blog/es/articulo",
    });
  });
});
