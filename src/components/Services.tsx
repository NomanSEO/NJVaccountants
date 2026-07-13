// src/components/Services.tsx
import { getServices } from "@/sanity/lib/queries";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="bg-white py-24" aria-label="Services">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
            What We Do
          </div>
          <h2 className="font-display text-navy mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            Comprehensive Financial{" "}
            <em className="text-gold not-italic">Services</em>
          </h2>
          <p className="text-slate max-w-140 text-[1.0625rem] leading-[1.7]">
            From day-to-day bookkeeping to complex cross-border tax structures —
            our specialist teams bring deep expertise across every financial
            discipline.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((svc) => (
            <article
              key={svc._id}
              className="service-card border-border hover:border-gold rounded-sm border bg-white p-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(11,31,58,0.08)]"
            >
              <div className="bg-cream mb-6 flex h-13 w-13 items-center justify-center rounded-sm text-2xl">
                {svc.icon}
              </div>
              <h3 className="font-display text-navy mb-3 text-[1.375rem] font-bold">
                {svc.title}
              </h3>
              <p className="text-slate mb-5 text-[0.9375rem] leading-[1.7]">
                {svc.description}
              </p>
              <ul className="m-0 list-none p-0">
                {svc.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-slate border-border flex items-center gap-2.5 border-b py-1.5 text-[0.875rem] last:border-b-0"
                  >
                    <span className="text-gold text-lg leading-none font-bold">
                      ›
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="text-navy hover:text-gold mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-[0.04em] no-underline transition-colors"
              >
                Explore {svc.title} ›
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
