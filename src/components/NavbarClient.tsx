"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import type { NavLinkItem } from "./navigation";

export default function NavbarClient({ links }: { links: NavLinkItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navListRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeLabel = openDropdown;
        setOpenDropdown(null);
        triggerRefs.current.get(activeLabel)?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`bg-navy border-gold/15 fixed top-0 z-1000 w-full border-b transition-shadow duration-300${scrolled ? " shadow-[0_4px_24px_rgba(0,0,0,0.3)]" : ""}`}
      >
        <div className="max-w-site mx-auto flex h-17.5 items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/#home"
            aria-label="NJV Accountants home"
            className="flex shrink-0 items-center no-underline"
          >
            <BrandLogo priority />
          </Link>

          <ul
            ref={navListRef}
            className="m-0 hidden list-none items-center gap-6 p-0 lg:flex xl:gap-8"
            role="list"
          >
            {links.map((link) =>
              link.children ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onBlurCapture={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <button
                    ref={(element) => {
                      if (element) triggerRefs.current.set(link.label, element);
                      else triggerRefs.current.delete(link.label);
                    }}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === link.label}
                    aria-controls={`nav-${link.label.toLowerCase()}-dropdown`}
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === link.label ? null : link.label,
                      )
                    }
                    className="hover:text-gold flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap text-white/80 transition-colors"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-[0.65rem]">▾</span>
                  </button>
                  {openDropdown === link.label ? (
                    <div className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5">
                      <div
                        id={`nav-${link.label.toLowerCase()}-dropdown`}
                        role="menu"
                        className="border-gold/15 rounded-sm border bg-navy-dark p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                      >
                        <div className="text-gold px-3 py-2 text-[0.7rem] font-semibold tracking-widest uppercase">
                          {link.dropdownLabel}
                        </div>
                        {link.children.map((child) => (
                          <Link
                            key={`${child.href}-${child.label}`}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className="hover:bg-gold/10 hover:text-gold block rounded-sm px-3 py-3 text-sm font-medium text-white/75 no-underline transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                        {link.footerLabel ? (
                          <Link
                            href={link.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className="border-gold/10 text-gold mt-2 block border-t px-3 pt-3 text-xs font-semibold no-underline"
                          >
                            {link.footerLabel} →
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap text-white/80 no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <Link
            href="/contact"
            className="bg-gold text-navy hover:bg-gold-light hidden shrink-0 items-center gap-2 rounded-sm px-7 py-3.5 text-sm font-semibold tracking-wider whitespace-nowrap uppercase no-underline transition-all hover:-translate-y-px xl:inline-flex"
          >
            Get a Consultation
          </Link>
          <button
            className="flex cursor-pointer flex-col gap-1.25 border-0 bg-transparent p-1 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
