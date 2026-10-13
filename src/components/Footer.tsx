import BrandLogo from "./BrandLogo";
import Link from "next/link";
import { coreServices } from "@/lib/ecommerceContent";
import { whatsappUrl } from "@/config/site";

export default function Footer() {
  return (
    <footer
      className="bg-navy-dark pt-16 pb-8 text-white"
      aria-label="Site footer"
    >
      <div className="max-w-site mx-auto px-6">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1fr_1.2fr]">
          <div>
            <div className="max-w-65">
              <BrandLogo variant="full" />
            </div>
            <p className="mt-4 max-w-70 text-sm leading-6 text-white/65">
              Accounting, business advisory, tax planning and internal audit for
              e-commerce businesses in Pakistan.
            </p>
          </div>
          <div>
            <h2 className="font-display mb-4 text-sm font-bold uppercase">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              {coreServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="hover:text-gold no-underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display mb-4 text-sm font-bold uppercase">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/about" className="hover:text-gold no-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold no-underline">
                  Insights and resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold no-underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold no-underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-display mb-4 text-sm font-bold uppercase">
              Contact
            </h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a
                  href="tel:+923225401701"
                  className="hover:text-gold no-underline"
                >
                  +92 322 5401701
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold no-underline"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold no-underline">
                  Request a consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="pt-7 text-xs text-white/50">
          © {new Date().getFullYear()} NJV Accountants. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
