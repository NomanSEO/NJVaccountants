"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

export default function MobileMenu({ open, onClose, links }: Props) {
  if (!open) return null;
  return (
    <div
      className="bg-navy fixed inset-0 z-999 flex flex-col items-center justify-center gap-8"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <button
        className="absolute top-6 right-6 cursor-pointer border-0 bg-transparent text-3xl text-white"
        aria-label="Close menu"
        onClick={onClose}
      >
        ✕
      </button>
      <Link
        href="/#home"
        onClick={onClose}
        className="font-display hover:text-gold text-[1.75rem] font-bold text-white no-underline transition-colors"
      >
        Home
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="font-display hover:text-gold text-[1.75rem] font-bold text-white no-underline transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
