import { describe, expect, it } from "vitest";
import {
  businessValuationPage,
  maAdvisoryPage,
} from "@/content/defaultPages";

function expectKeywordPlacement(
  keyword: string,
  page: typeof businessValuationPage,
) {
  expect(page.metaTitle).toContain(keyword);
  expect(page.metaDescription).toContain(keyword);
  expect(page.intro).toContain(keyword);
  expect(page.sections.some((section) => section.heading.includes(keyword))).toBe(
    true,
  );
  expect(`${page.ctaTitle} ${page.ctaText}`).toContain(keyword);
}

describe("Business Advisory SEO copy", () => {
  it("places Business Valuation Services in every required location", () => {
    expectKeywordPlacement("Business Valuation Services", businessValuationPage);
  });

  it("places M&A Advisory Services in every required location", () => {
    expectKeywordPlacement("M&A Advisory Services", maAdvisoryPage);
  });
});
