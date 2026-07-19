import { describe, expect, it } from "vitest";
import { PUBLIC_ROUTES } from "@/config/site";
import { buildSitemapEntries } from "@/lib/sitemap";

describe("buildSitemapEntries", () => {
  it("includes each dedicated marketing page", () => {
    expect(PUBLIC_ROUTES).toEqual(
      expect.arrayContaining(["/services", "/case-studies", "/team", "/contact"]),
    );
  });

  it("includes every registered public route", () => {
    const entries = buildSitemapEntries({ posts: [], authors: [] });
    const urls = entries.map((entry) => new URL(entry.url).pathname);

    for (const route of PUBLIC_ROUTES) expect(urls).toContain(route);
  });

  it("adds localized posts with family alternates and authors", () => {
    const entries = buildSitemapEntries({
      posts: [
        {
          _id: "post-en",
          _updatedAt: "2026-07-01T00:00:00.000Z",
          slug: { current: "business-value" },
          languageCode: "en",
          translationRootId: "post-en",
        },
        {
          _id: "post-es",
          _updatedAt: "2026-07-02T00:00:00.000Z",
          slug: { current: "valor-del-negocio" },
          languageCode: "es",
          translationRootId: "post-en",
        },
      ],
      authors: [
        {
          _id: "author-1",
          _updatedAt: "2026-06-30T00:00:00.000Z",
          slug: { current: "noman-javed" },
        },
      ],
    });

    const english = entries.find((entry) =>
      entry.url.endsWith("/blog/en/business-value"),
    );
    expect(english?.lastModified).toEqual(
      new Date("2026-07-01T00:00:00.000Z"),
    );
    expect(english?.alternates?.languages).toMatchObject({
      en: "https://www.njvaccountants.com/blog/en/business-value",
      es: "https://www.njvaccountants.com/blog/es/valor-del-negocio",
      "x-default": "https://www.njvaccountants.com/blog/en/business-value",
    });
    expect(entries.some((entry) => entry.url.endsWith("/authors/noman-javed"))).toBe(
      true,
    );
  });

  it("adds individual service and case-study pages", () => {
    const entries = buildSitemapEntries({
      posts: [],
      authors: [],
      services: [
        {
          _id: "service-1",
          _updatedAt: "2026-07-03T00:00:00.000Z",
          title: "Taxation Services",
          slug: { current: "tax-services" },
        },
      ],
      caseStudies: [
        {
          _id: "case-1",
          _updatedAt: "2026-07-04T00:00:00.000Z",
          company: "Acme Industries",
          slug: { current: "acme-industries" },
        },
      ],
    });

    expect(entries.find((entry) => entry.url.endsWith("/services/tax-services")))
      .toMatchObject({
        lastModified: new Date("2026-07-03T00:00:00.000Z"),
      });
    expect(
      entries.find((entry) => entry.url.endsWith("/case-studies/acme-industries")),
    ).toMatchObject({ lastModified: new Date("2026-07-04T00:00:00.000Z") });
  });

  it("excludes malformed dynamic entries and deduplicates URLs", () => {
    const entries = buildSitemapEntries({
      posts: [
        {
          _id: "bad-language",
          slug: { current: "bad" },
          languageCode: "../es",
        },
        { _id: "bad-slug", slug: undefined, languageCode: "en" },
        {
          _id: "duplicate-a",
          slug: { current: "same" },
          languageCode: "en",
        },
        {
          _id: "duplicate-b",
          slug: { current: "same" },
          languageCode: "en",
        },
      ],
      authors: [
        { _id: "missing", slug: undefined },
        { _id: "blank", slug: { current: "" } },
      ],
    });

    expect(entries.filter((entry) => entry.url.endsWith("/blog/en/same"))).toHaveLength(
      1,
    );
    expect(entries.some((entry) => entry.url.includes("bad-language"))).toBe(
      false,
    );
  });
});
