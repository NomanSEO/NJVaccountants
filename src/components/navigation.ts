import { serviceSlug } from "@/lib/contentSlugs";
import { servicePath } from "@/lib/seo";
import type { Service } from "@/types";

export interface NavLinkItem {
  href: string;
  label: string;
  dropdownLabel?: string;
  footerLabel?: string;
  children?: Array<{ href: string; label: string }>;
}

export const NAV_LINKS: NavLinkItem[] = [
  {
    href: "/services", label: "Services", dropdownLabel: "Professional Services", footerLabel: "View All Services",
    children: [
      { href: "/services", label: "Accounting & Bookkeeping" },
      { href: "/services", label: "Taxation Services" },
      { href: "/services", label: "Audit & Assurance" },
      { href: "/services/business-advisory/business-valuation", label: "Business Valuation" },
      { href: "/services/business-advisory/ma-advisory", label: "M&A Advisory" },
    ],
  },
  {
    href: "/about", label: "About", dropdownLabel: "Company",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/team", label: "Our Team" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    href: "/calculators", label: "Calculators", dropdownLabel: "Featured Calculators", footerLabel: "View All Calculators",
    children: [
      { href: "/calculators/salary-tax", label: "Salary Tax Calculator" },
      { href: "/calculators/mortgage", label: "Mortgage Calculator" },
      { href: "/calculators/investment", label: "Investment Calculator" },
    ],
  },
  { href: "/blog", label: "Blogs" },
];

export function navLinksWithServices(services: Service[]): NavLinkItem[] {
  return NAV_LINKS.map((link) =>
    link.label === "Services"
      ? {
          ...link,
          children: services.map((service) => ({
            href: servicePath(serviceSlug(service)),
            label: service.title,
          })),
        }
      : link,
  );
}
