import { coreServices } from "@/lib/ecommerceContent";

export interface NavLinkItem {
  href: string;
  label: string;
  dropdownLabel?: string;
  footerLabel?: string;
  children?: Array<{ href: string; label: string }>;
}

export const NAV_LINKS: NavLinkItem[] = [
  {
    href: "/services",
    label: "Services",
    dropdownLabel: "E-commerce Services",
    footerLabel: "View All Services",
    children: coreServices.map(({ href, title }) => ({ href, label: title })),
  },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
];
