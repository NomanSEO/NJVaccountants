'use client'

import Link from 'next/link'

interface Props {
  open: boolean
  onClose: () => void
  links: Array<{ href: string; label: string }>
}

export default function MobileMenu({ open, onClose, links }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 bg-navy z-[999] flex flex-col items-center justify-center gap-8"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <button
        className="absolute top-6 right-6 bg-transparent border-0 text-white text-3xl cursor-pointer"
        aria-label="Close menu"
        onClick={onClose}
      >
        ✕
      </button>
      <Link href="/#home" onClick={onClose} className="text-white font-display text-[1.75rem] font-bold no-underline hover:text-gold transition-colors">Home</Link>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="text-white font-display text-[1.75rem] font-bold no-underline hover:text-gold transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
