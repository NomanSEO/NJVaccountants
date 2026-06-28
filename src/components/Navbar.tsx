'use client'
import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#team', label: 'Our Team' },
  { href: '#blog', label: 'Insights' },
  { href: '/calculators', label: 'Calculators' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-[1000] bg-navy/[0.97] backdrop-blur-[8px] border-b border-gold/[0.15] transition-shadow duration-300${scrolled ? ' shadow-[0_4px_24px_rgba(0,0,0,0.3)]' : ''}`}
      >
        <div className="max-w-site mx-auto px-6 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a href="#home" aria-label="Pinnacle Advisory Group home" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <path d="M10 2L3 7v10h4v-6h6v6h4V7L10 2z" fill="#0B1F3A" />
              </svg>
            </div>
            <div className="font-display font-bold text-[1.1rem] text-white leading-[1.1]">
              Pinnacle
              <span className="block text-[0.625rem] font-body font-normal tracking-[0.15em] uppercase text-gold mt-px">
                Advisory Group
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/80 no-underline text-[0.8125rem] font-medium tracking-[0.04em] hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline ml-4 hover:bg-gold-light hover:-translate-y-px transition-all"
          >
            Get a Consultation
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-1"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  )
}
