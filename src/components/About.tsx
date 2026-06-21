import AboutBars from './AboutBars'

const PILLARS = [
  { title: 'Independence', text: 'Privately owned, free from conflicts of interest, solely focused on client outcomes.' },
  { title: 'Expertise',    text: '140+ CPAs, tax lawyers, and industry specialists across 8 service lines.' },
  { title: 'Technology',   text: 'Proprietary analytics platform and integrations with leading finance tools.' },
  { title: 'Relationships', text: '98% client retention. Most of our business comes from referrals.' },
]

const TEAM = [
  { initials: 'JR', name: 'J. Rawlins' },
  { initials: 'SM', name: 'S. Moreau' },
  { initials: 'AK', name: 'A. Khan' },
  { initials: 'LC', name: 'L. Chen' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-navy" aria-label="About Pinnacle">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Who We Are
            </div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-white leading-tight mb-5">
              Built on <em className="not-italic text-gold">Integrity,</em> Driven by Results
            </h2>
            <p className="text-[0.9375rem] text-white/65 leading-[1.75] mb-4">
              Founded in 1998, Pinnacle Advisory Group has grown from a boutique practice into one of the most trusted mid-market accounting and advisory firms in the region. Our independence is our greatest asset — we answer only to our clients.
            </p>
            <p className="text-[0.9375rem] text-white/65 leading-[1.75] mb-9">
              We combine the personal service of a boutique firm with the technical depth and resource of a large practice. Every client relationship is led by a senior partner, ensuring continuity, accountability, and strategic focus at every stage.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {PILLARS.map(p => (
                <div key={p.title} className="border-l-2 border-gold pl-4">
                  <div className="font-display text-base font-semibold text-white mb-1">{p.title}</div>
                  <div className="text-[0.8125rem] text-white/50 leading-[1.5]">{p.text}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap mt-8">
              {['🏆 AICPA Member', '✓ PCAOB Registered', '⭐ ISO 27001', '📋 ICAEW Affiliated'].map(badge => (
                <div key={badge} className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/25 rounded-sm px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right — metrics visual */}
          <div className="bg-white/[0.04] border border-gold/20 rounded-md overflow-hidden">
            <div className="bg-gold/10 px-6 py-4 border-b border-gold/[0.15] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-[0.75rem] text-white/40 ml-2 font-body">Client Portfolio Performance · 2024</span>
            </div>
            <div className="p-7">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="text-[0.75rem] text-white/45 tracking-[0.08em] uppercase">Avg. Tax Saved</div>
                  <div className="font-display text-[1.875rem] font-bold text-white">$127,400</div>
                </div>
                <div className="text-right">
                  <div className="text-[0.75rem] text-white/45 tracking-[0.08em] uppercase">Per Client</div>
                  <div className="text-[0.75rem] text-green-400 font-semibold">↑ 22% YoY</div>
                </div>
              </div>

              <AboutBars />

              <div className="grid grid-cols-4 gap-4 mt-5 pt-5 border-t border-white/[0.08]">
                {TEAM.map(m => (
                  <div key={m.initials} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#a07830] flex items-center justify-center font-display text-base font-bold text-navy mx-auto mb-2">
                      {m.initials}
                    </div>
                    <div className="text-[0.7rem] text-white/60">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
