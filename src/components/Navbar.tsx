"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#team", label: "Our Team" },
  { href: "/#blog", label: "Insights" },
  { href: "/calculators", label: "Calculators" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-[1000] bg-navy/[0.97] backdrop-blur-[8px] border-b border-gold/[0.15] transition-shadow duration-300${scrolled ? " shadow-[0_4px_24px_rgba(0,0,0,0.3)]" : ""}`}
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-[70px]">
          <Link
            href="/#home"
            aria-label="NJV Accountants home"
            className="flex shrink-0 items-center no-underline"
          >
            <BrandLogo priority />
          </Link>

          {/* Desktop links */}
          <ul
            className="hidden lg:flex items-center gap-4 xl:gap-7 list-none m-0 p-0"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-white/80 no-underline text-[0.8125rem] font-medium tracking-[0.04em] hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="hidden xl:inline-flex shrink-0 items-center gap-2 whitespace-nowrap bg-gold text-navy px-7 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light hover:-translate-y-px transition-all"
          >
            Get a Consultation
          </Link>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
