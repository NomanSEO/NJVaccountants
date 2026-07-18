import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/components/Navbar";

describe("main navigation", () => {
  it("uses four compact top-level navigation items", () => {
    expect(NAV_LINKS.map(({ label }) => label)).toEqual([
      "Services",
      "About",
      "Calculators",
      "Blogs",
    ]);
  });

  it("groups the approved destinations under each dropdown", () => {
    expect(NAV_LINKS.find(({ label }) => label === "Services")).toMatchObject({
      href: "/#services",
      dropdownLabel: "Professional Services",
      footerLabel: "View All Services",
      children: [
        { href: "/#services", label: "Accounting & Bookkeeping" },
        { href: "/#services", label: "Taxation Services" },
        { href: "/#services", label: "Audit & Assurance" },
        {
          href: "/services/business-advisory/business-valuation",
          label: "Business Valuation",
        },
        {
          href: "/services/business-advisory/ma-advisory",
          label: "M&A Advisory",
        },
      ],
    });

    expect(NAV_LINKS.find(({ label }) => label === "About")).toMatchObject({
      dropdownLabel: "Company",
      children: [
        { href: "/about", label: "About Us" },
        { href: "/#case-studies", label: "Case Studies" },
        { href: "/#team", label: "Our Team" },
        { href: "/#contact", label: "Contact" },
      ],
    });

    expect(
      NAV_LINKS.find(({ label }) => label === "Calculators"),
    ).toMatchObject({
      href: "/calculators",
      dropdownLabel: "Featured Calculators",
      footerLabel: "View All Calculators",
      children: [
        { href: "/calculators/salary-tax", label: "Salary Tax Calculator" },
        { href: "/calculators/mortgage", label: "Mortgage Calculator" },
        { href: "/calculators/investment", label: "Investment Calculator" },
      ],
    });

    expect(NAV_LINKS.find(({ label }) => label === "Blogs")).toEqual({
      href: "/blog",
      label: "Blogs",
    });
  });

  it("uses generic single-open dropdown state", () => {
    const navbarSource = readFileSync(
      path.resolve(process.cwd(), "src/components/Navbar.tsx"),
      "utf8",
    );

    expect(navbarSource).toContain(
      "const [openDropdown, setOpenDropdown] = useState<string | null>(null)",
    );
    expect(navbarSource).not.toContain("servicesOpen");
    expect(navbarSource).not.toContain("onFocusCapture");
    expect(navbarSource).toContain(
      'className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5"',
    );
  });

  it("layers the mobile navigation dialog above the fixed navbar", () => {
    const mobileMenuSource = readFileSync(
      path.resolve(process.cwd(), "src/components/MobileMenu.tsx"),
      "utf8",
    );

    expect(mobileMenuSource).toContain("z-1001");
  });

  it("uses generic single-open mobile accordion state", () => {
    const mobileMenuSource = readFileSync(
      path.resolve(process.cwd(), "src/components/MobileMenu.tsx"),
      "utf8",
    );

    expect(mobileMenuSource).toContain(
      "const [expandedLabel, setExpandedLabel] = useState<string | null>(null)",
    );
    expect(mobileMenuSource).not.toContain("servicesExpanded");
    expect(mobileMenuSource).toContain("expandedLabel === link.label");
  });

  it("uses a solid navy navbar and a transparent compact logo asset", () => {
    const navbarSource = readFileSync(
      path.resolve(process.cwd(), "src/components/Navbar.tsx"),
      "utf8",
    );
    const brandLogoSource = readFileSync(
      path.resolve(process.cwd(), "src/components/BrandLogo.tsx"),
      "utf8",
    );

    expect(navbarSource).toContain("bg-navy border-gold/15");
    expect(navbarSource).not.toContain("bg-navy/97");
    expect(navbarSource).not.toContain("backdrop-blur");
    expect(brandLogoSource).toContain(
      'src="/njv-logo-mark-transparent.png"',
    );
    expect(brandLogoSource).not.toContain(
      'className="bg-navy flex h-10 w-12',
    );
  });

  it("bridges the visual gap between Services and its dropdown", () => {
    const navbarSource = readFileSync(
      path.resolve(process.cwd(), "src/components/Navbar.tsx"),
      "utf8",
    );

    expect(navbarSource).toContain(
      'className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5"',
    );
    expect(navbarSource).not.toContain("top-full left-1/2 mt-5");
  });
});
