import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  authorPath,
  blogPath,
  buildBlogAlternates,
  isLanguageCode,
} from "@/lib/seo";

describe("SEO URL helpers", () => {
  it("builds canonical localized blog and author paths", () => {
    expect(blogPath("es", "articulo")).toBe("/blog/es/articulo");
    expect(blogPath("es-MX", "impuestos 2026")).toBe(
      "/blog/es-MX/impuestos%202026",
    );
    expect(authorPath("noman-javed")).toBe("/authors/noman-javed");
    expect(absoluteUrl("/about")).toBe("https://njvaccountants.pk/about");
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
      "https://njvaccountants.pk/blog/es/valor-del-negocio",
    );
    expect(result.languages).toEqual({
      en: "https://njvaccountants.pk/blog/en/business-value",
      es: "https://njvaccountants.pk/blog/es/valor-del-negocio",
      "x-default": "https://njvaccountants.pk/blog/en/business-value",
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
      es: "https://njvaccountants.pk/blog/es/articulo",
    });
  });
});
