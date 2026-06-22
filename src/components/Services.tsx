// src/components/Services.tsx
import { getServices } from '@/sanity/lib/queries'

export default async function Services() {
  const services = await getServices()

  return (
    <section id="services" className="py-24 bg-white" aria-label="Services">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            What We Do
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Comprehensive Financial <em className="not-italic text-gold">Services</em>
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7]">
            From day-to-day bookkeeping to complex cross-border tax structures — our specialist teams bring deep expertise across every financial discipline.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(svc => (
            <article key={svc._id} className="service-card border border-border rounded-sm p-10 bg-white hover:border-gold hover:shadow-[0_8px_40px_rgba(11,31,58,0.08)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-13 h-13 bg-cream rounded-sm flex items-center justify-center mb-6 text-2xl">
                {svc.icon}
              </div>
              <h3 className="font-display text-[1.375rem] font-bold text-navy mb-3">{svc.title}</h3>
              <p className="text-[0.9375rem] text-slate leading-[1.7] mb-5">{svc.description}</p>
              <ul className="list-none m-0 p-0">
                {svc.bullets.map(bullet => (
                  <li key={bullet} className="text-[0.875rem] text-slate py-1.5 border-b border-border last:border-b-0 flex items-center gap-2.5">
                    <span className="text-gold font-bold text-lg leading-none">›</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-navy text-[0.8125rem] font-semibold no-underline tracking-[0.04em] mt-6 hover:text-gold transition-colors">
                Explore {svc.title} ›
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
