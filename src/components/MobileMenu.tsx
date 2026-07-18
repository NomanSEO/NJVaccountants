"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavLinkItem } from "./Navbar";

interface Props {
  open: boolean;
  onClose: () => void;
  links: NavLinkItem[];
}

export default function MobileMenu({ open, onClose, links }: Props) {
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);
  const handleClose = () => {
    setExpandedLabel(null);
    onClose();
  };

  if (!open) return null;
  return (
    <div
      className="bg-navy fixed inset-0 z-1001 overflow-y-auto px-6 py-24"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        className="absolute top-6 right-6 cursor-pointer border-0 bg-transparent text-3xl text-white"
        aria-label="Close menu"
        onClick={handleClose}
      >
        ✕
      </button>
      <div className="mx-auto flex max-w-md flex-col gap-5">
        <Link
          href="/#home"
          onClick={handleClose}
          className="font-display hover:text-gold text-2xl font-bold text-white no-underline transition-colors"
        >
          Home
        </Link>
        {links.map((link) =>
          link.children ? (
            <div key={link.label} className="border-gold/15 border-b pb-5">
              <button
                type="button"
                aria-expanded={expandedLabel === link.label}
                aria-controls={`mobile-${link.label.toLowerCase()}`}
                onClick={() =>
                  setExpandedLabel((current) =>
                    current === link.label ? null : link.label,
                  )
                }
                className="font-display flex w-full cursor-pointer items-center justify-between border-0 bg-transparent text-left text-2xl font-bold text-white"
              >
                {link.label}
                <span aria-hidden="true" className="text-gold text-base">
                  {expandedLabel === link.label ? "−" : "+"}
                </span>
              </button>
              {expandedLabel === link.label ? (
                <div
                  id={`mobile-${link.label.toLowerCase()}`}
                  className="mt-5 space-y-4 pl-4"
                >
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase">
                    {link.dropdownLabel}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={`${child.href}-${child.label}`}
                      href={child.href}
                      onClick={handleClose}
                      className="block text-lg font-semibold text-white/75 no-underline"
                    >
                      {child.label}
                    </Link>
                  ))}
                  {link.footerLabel ? (
                    <Link
                      href={link.href}
                      onClick={handleClose}
                      className="text-gold block text-sm font-semibold no-underline"
                    >
                      {link.footerLabel} →
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className="font-display hover:text-gold text-2xl font-bold text-white no-underline transition-colors"
            >
              {link.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
