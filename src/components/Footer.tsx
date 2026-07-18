// src/components/Footer.tsx
import BrandLogo from "./BrandLogo";
import Link from "next/link";

const SERVICES_LINKS = [
  ["Accounting & Bookkeeping", "/#services"],
  ["Taxation Services", "/#services"],
  ["Audit & Assurance", "/#services"],
  [
    "Business Valuation",
    "/services/business-advisory/business-valuation",
  ],
  ["M&A Advisory", "/services/business-advisory/ma-advisory"],
  ["Forensic Accounting", "/#services"],
];
const COMPANY_LINKS = [
  ["About Us", "/about"],
  ["Our Team", "/#team"],
  ["Case Studies", "/#case-studies"],
  ["Insights", "/blog"],
  ["Testimonials", "/#testimonials"],
  ["Contact", "/#contact"],
];
const OFFICES = ["Faisalabad,Lahore"];

export default function Footer() {
  return (
    <footer className="bg-navy-dark pt-16 pb-8" aria-label="Site footer">
      <div className="max-w-site mx-auto px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 max-w-65">
              <BrandLogo variant="full" />
            </div>
            <p className="max-w-65 text-[0.875rem] leading-[1.65] text-white/45">
              Independent accounting, tax, and advisory. Partnering with
              ambitious businesses since 2020.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                ["in", "LinkedIn"],
                ["𝕏", "Twitter"],
                ["f", "Facebook"],
                ["▶", "YouTube"],
              ].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="hover:border-gold hover:text-gold flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-white/6 text-[0.875rem] text-white/50 no-underline transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-display mb-5 text-[0.875rem] font-bold tracking-[0.06em] text-white uppercase">
              Services
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {SERVICES_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-gold text-[0.875rem] text-white/45 no-underline transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-display mb-5 text-[0.875rem] font-bold tracking-[0.06em] text-white uppercase">
              Company
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-gold text-[0.875rem] text-white/45 no-underline transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices + Accreditations */}
          <div>
            <div className="font-display mb-5 text-[0.875rem] font-bold tracking-[0.06em] text-white uppercase">
              Offices
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {OFFICES.map((o) => (
                <li key={o}>
                  <Link
                    href="/#contact"
                    className="hover:text-gold text-[0.875rem] text-white/45 no-underline transition-colors"
                  >
                    {o}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <div className="font-display mb-3 text-[0.875rem] font-bold tracking-[0.06em] text-white uppercase">
                Why Choose Us?
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  "🏆 Qualified CA Team",
                  "✓ Registered Tax Practiciner",
                  "⭐ Experienced Finance Professionals",
                ].map((a) => (
                  <span key={a} className="text-[0.8rem] text-white/40">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-7 md:flex-row">
          <div className="text-[0.8125rem] text-white/30">
            © 2026 NJV Accountants. All rights reserved.
          </div>
          <div className="flex gap-6">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Accessibility",
            ].map((l) => (
              <a
                key={l}
                href="https://www.linkedin.com/company/njv-accountants"
                className="hover:text-gold text-[0.8125rem] text-white/30 no-underline transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
