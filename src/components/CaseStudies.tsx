// src/components/CaseStudies.tsx
import { getCaseStudies } from '@/sanity/lib/queries'

export default async function CaseStudies() {
  const cases = await getCaseStudies()

  return (
    <section id="case-studies" className="py-24 bg-white" aria-label="Case studies">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            Client Success
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Results That <em className="not-italic text-gold">Speak</em> for Themselves
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7]">
            Real outcomes for real clients. Every engagement is measured not just in compliance, but in commercial impact.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cases.map(c => (
            <article key={c._id} className="rounded-sm overflow-hidden border border-border hover:shadow-[0_16px_48px_rgba(11,31,58,0.1)] hover:-translate-y-1 transition-all duration-300">
              <div className="p-8 bg-navy relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-gold/[0.08] rounded-full translate-x-10 translate-y-10" />
                <div className="inline-block bg-gold/15 border border-gold/30 rounded-sm px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold mb-3.5">
                  {c.tag}
                </div>
                <h3 className="font-display text-[1.25rem] font-bold text-white mb-2">{c.company}</h3>
                <div className="text-[0.8125rem] text-white/50">{c.industry}</div>
              </div>
              <div className="p-7">
                <div className="text-[0.7rem] tracking-[0.1em] uppercase text-slate-light mb-2">The Challenge</div>
                <p className="text-[0.9rem] text-text leading-[1.6] mb-6">{c.challenge}</p>
                <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
                  {c.results.map(r => (
                    <div key={r.label}>
                      <div className="font-display text-[1.625rem] font-bold text-navy">{r.num}</div>
                      <div className="text-[0.75rem] text-slate-light mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="inline-block px-8 py-4 bg-gold text-navy font-semibold rounded hover:bg-gold-light transition-colors">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
