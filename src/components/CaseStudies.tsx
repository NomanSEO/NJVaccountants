// src/components/CaseStudies.tsx
import { getCaseStudies } from "@/sanity/lib/queries";

export default async function CaseStudies() {
  const cases = await getCaseStudies();

  return (
    <section
      id="case-studies"
      className="bg-white py-24"
      aria-label="Case studies"
    >
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
            Client Success
          </div>
          <h2 className="font-display text-navy mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            Results That <em className="text-gold not-italic">Speak</em> for
            Themselves
          </h2>
          <p className="text-slate max-w-140 text-[1.0625rem] leading-[1.7]">
            Real outcomes for real clients. Every engagement is measured not
            just in compliance, but in commercial impact.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c._id}
              className="border-border overflow-hidden rounded-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(11,31,58,0.1)]"
            >
              <div className="bg-navy relative overflow-hidden p-8">
                <div className="bg-gold/8 absolute right-0 bottom-0 h-30 w-30 translate-x-10 translate-y-10 rounded-full" />
                <div className="bg-gold/15 border-gold/30 text-gold mb-3.5 inline-block rounded-sm border px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase">
                  {c.tag}
                </div>
                <h3 className="font-display mb-2 text-[1.25rem] font-bold text-white">
                  {c.company}
                </h3>
                <div className="text-[0.8125rem] text-white/50">
                  {c.industry}
                </div>
              </div>
              <div className="p-7">
                <div className="text-slate-light mb-2 text-[0.7rem] tracking-widest uppercase">
                  The Challenge
                </div>
                <p className="text-text mb-6 text-[0.9rem] leading-[1.6]">
                  {c.challenge}
                </p>
                <div className="border-border grid grid-cols-2 gap-4 border-t pt-5">
                  {c.results.map((r) => (
                    <div key={r.label}>
                      <div className="font-display text-navy text-[1.625rem] font-bold">
                        {r.num}
                      </div>
                      <div className="text-slate-light mt-0.5 text-[0.75rem]">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="bg-gold text-navy hover:bg-gold-light inline-block rounded px-8 py-4 font-semibold transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
