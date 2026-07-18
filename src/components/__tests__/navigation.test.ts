import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/components/Navbar";

describe("main navigation", () => {
  it("exposes both Business Advisory routes under Services", () => {
    const services = NAV_LINKS.find((link) => link.label === "Services");
    expect(services?.children).toEqual([
      {
        href: "/services/business-advisory/business-valuation",
        label: "Business Valuation",
      },
      {
        href: "/services/business-advisory/ma-advisory",
        label: "M&A Advisory",
      },
    ]);
  });

  it("uses full paths for standalone About and Insights pages", () => {
    expect(NAV_LINKS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "/about", label: "About" }),
        expect.objectContaining({ href: "/blog", label: "Insights" }),
      ]),
    );
  });
});
