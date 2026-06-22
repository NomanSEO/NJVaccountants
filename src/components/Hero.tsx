// src/components/Hero.tsx
import { getSiteSettings } from '@/sanity/lib/queries'

export default async function Hero() {
  const s = await getSiteSettings()
  if (!s) return null
  const titleParts = s.heroTitleHighlight
    ? s.heroTitle.split(s.heroTitleHighlight)
    : [s.heroTitle, '']

  return (
    <section id="home" className="min-h-screen bg-navy flex items-center relative overflow-hidden pt-[70px]" aria-label="Hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-deep" />
      <div className="hero-pattern absolute inset-0" />
      <div className="absolute right-0 top-0 bottom-0 w-[42%] bg-gold/[0.04] border-l border-gold/[0.12]" />

      <div className="max-w-site mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20">

          {/* Left */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-6">
              <span className="block w-6 h-0.5 bg-gold" />
              Est. 1998 · Trusted by 1,200+ Clients
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold text-white leading-[1.1] mb-6">
              {titleParts[0]}
              {s.heroTitleHighlight && (
                <em className="not-italic text-gold">{s.heroTitleHighlight}</em>
              )}
              {titleParts[1]}
            </h1>

            <p className="text-[1.0625rem] text-white/70 leading-[1.75] mb-10 max-w-[480px]">
              {s.heroDesc}
            </p>

            <div className="flex gap-4 flex-wrap">
              <a href="#contact" className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light hover:-translate-y-px transition-all">
                Book a Free Consultation ›
              </a>
              <a href="#services" className="inline-flex items-center gap-2 bg-transparent text-white px-[31px] py-[13px] rounded-sm border border-white/50 font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:border-gold hover:text-gold transition-all">
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-13 pt-10 border-t border-white/10">
              {s.heroStats.map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-[2.25rem] font-bold text-gold">{stat.num}</div>
                  <div className="text-[0.8125rem] text-white/55 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative financial card */}
          <div className="hidden md:flex items-center justify-center fade-up fade-up-delay-2">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute -top-3.5 -right-3.5 w-[90%] h-full bg-gold/[0.08] border border-gold/[0.15] rounded-lg" />
              <div className="relative z-10 bg-white/[0.06] border border-gold/20 rounded-lg p-7 backdrop-blur-[12px]">
                <div className="text-[0.7rem] tracking-[0.1em] uppercase text-gold mb-3">Q3 Financial Overview</div>
                <div className="font-display text-[2rem] font-bold text-white">$2,847,000</div>
                <div className="text-[0.8125rem] text-green-400 mt-1.5">↑ 18.4% vs prior year</div>
                <div className="flex justify-between mt-5 pt-4 border-t border-white/10">
                  {[
                    { label: 'Tax Savings', val: '$384,200' },
                    { label: 'Compliance', val: '100%' },
                    { label: 'Audit Status', val: 'Clean' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-[0.75rem] text-white/50">{item.label}</div>
                      <div className="text-[0.875rem] font-semibold text-white mt-0.5">{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-white/10 rounded mt-5 overflow-hidden">
                  <div className="h-full bg-gold rounded w-[72%]" />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[0.7rem] text-white/40">Budget used</span>
                  <span className="text-[0.7rem] text-gold">72% on track</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
