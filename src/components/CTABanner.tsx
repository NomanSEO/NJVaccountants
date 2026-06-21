// src/components/CTABanner.tsx
import { getSiteSettings } from '@/lib/queries'

export default async function CTABanner() {
  const s = await getSiteSettings()
  if (!s) return null

  return (
    <div className="bg-gold py-[72px]" aria-label="Call to action">
      <div className="max-w-site mx-auto px-6">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <div>
            <div className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-navy max-w-[600px] leading-[1.3]">
              {s.ctaTitle}
            </div>
            <div className="text-[0.9375rem] text-navy/70 mt-2">{s.ctaSubtitle}</div>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-navy-light transition-colors shrink-0">
            Speak to a Partner Today ›
          </a>
        </div>
      </div>
    </div>
  )
}
