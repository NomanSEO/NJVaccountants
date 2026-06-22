// src/components/TrustStrip.tsx
import { getSiteSettings } from '@/sanity/lib/queries'

export default async function TrustStrip() {
  const s = await getSiteSettings()
  if (!s) return null

  return (
    <div className="bg-cream border-t border-border border-b py-7" aria-label="Client logos">
      <div className="max-w-site mx-auto px-6">
        <div className="flex items-center gap-10 justify-between flex-wrap">
          <div className="text-[0.75rem] tracking-[0.1em] uppercase text-slate-light whitespace-nowrap">
            Trusted by industry leaders
          </div>
          <div className="flex items-center gap-9 flex-wrap">
            {s.trustLogos.map(logo => (
              <div key={logo.name} className="font-display text-base font-semibold text-logo opacity-60 tracking-[0.02em]">
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
