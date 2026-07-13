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
        className={`bg-navy/97 border-gold/15 fixed top-0 z-1000 w-full border-b backdrop-blur-sm transition-shadow duration-300${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.3)]" : ""}`}
      >
        <div className="max-w-site mx-auto flex h-17.5 items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/#home"
            aria-label="NJV Accountants home"
            className="flex shrink-0 items-center no-underline"
          >
            <BrandLogo priority />
          </Link>

          {/* Desktop links */}
          <ul
            className="m-0 hidden list-none items-center gap-4 p-0 lg:flex xl:gap-7"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-gold text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap text-white/80 no-underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="bg-gold text-navy hover:bg-gold-light hidden shrink-0 items-center gap-2 rounded-sm px-7 py-3.5 text-sm font-semibold tracking-wider whitespace-nowrap uppercase no-underline transition-all hover:-translate-y-px xl:inline-flex"
          >
            Get a Consultation
          </Link>

          {/* Hamburger */}
          <button
            className="flex cursor-pointer flex-col gap-1.25 border-0 bg-transparent p-1 lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
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
