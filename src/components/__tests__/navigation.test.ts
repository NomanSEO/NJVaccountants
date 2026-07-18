import { readFileSync } from "node:fs";
import path from "node:path";
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

  it("does not open Services on focus before the activation click toggles it", () => {
    const navbarSource = readFileSync(
      path.resolve(process.cwd(), "src/components/Navbar.tsx"),
      "utf8",
    );

    expect(navbarSource).not.toContain("onFocusCapture");
    expect(navbarSource).toContain(
      "onClick={() => setServicesOpen((value) => !value)}",
    );
  });

  it("layers the mobile navigation dialog above the fixed navbar", () => {
    const mobileMenuSource = readFileSync(
      path.resolve(process.cwd(), "src/components/MobileMenu.tsx"),
      "utf8",
    );

    expect(mobileMenuSource).toContain("z-1001");
  });
});
