// src/components/Testimonials.tsx
import { getTestimonials } from '@/lib/queries'

export default async function Testimonials() {
  const items = await getTestimonials()

  return (
    <section id="testimonials" className="py-24 bg-cream" aria-label="Client testimonials">
      <div className="max-w-site mx-auto px-6">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            Client Voices
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            What Our <em className="not-italic text-gold">Clients</em> Say
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7] mx-auto">
            We measure success by the relationships we build and the outcomes we deliver.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(t => (
            <article key={t._id} className="bg-white rounded-sm border border-border p-9 relative hover:shadow-[0_12px_40px_rgba(11,31,58,0.07)] transition-shadow">
              <div className="font-display text-[4rem] text-gold leading-none mb-4 opacity-50">&ldquo;</div>
              <div className="text-[0.875rem] text-gold tracking-[2px] mb-4">★★★★★</div>
              <p className="text-[0.9375rem] text-slate leading-[1.75] mb-7 italic">{t.quote}</p>
              <div className="flex items-center gap-3.5 border-t border-border pt-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-navy flex items-center justify-center font-display text-base font-bold text-white shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[0.9rem] text-navy">{t.authorName}</div>
                  <div className="text-[0.8rem] text-slate-light">{t.authorRole}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
