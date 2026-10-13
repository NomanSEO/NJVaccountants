import Link from "next/link";
import { coreServices } from "@/lib/ecommerceContent";

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white py-20 lg:py-24"
      aria-label="Services"
    >
      <div className="max-w-site mx-auto px-6">
        <header className="mb-11 max-w-175">
          <p className="text-gold mb-3 text-xs font-semibold tracking-widest uppercase">
            What we do
          </p>
          <h2 className="font-display text-navy text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            Our Services for E-commerce Businesses
          </h2>
          <p className="text-slate mt-4 text-lg leading-7">
            Connected financial support for online sellers, from day-to-day
            records to planning, tax matters and controls.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {coreServices.map((service) => (
            <article
              key={service.href}
              className="service-card border-border flex h-full flex-col rounded-sm border bg-white p-7 sm:p-9"
            >
              <span
                className="text-gold font-display text-sm font-bold"
                aria-hidden="true"
              >
                {service.icon}
              </span>
              <h3 className="font-display text-navy mt-3 text-2xl font-bold">
                {service.title}
              </h3>
              <p className="text-slate mt-3 leading-7">{service.description}</p>
              <ul className="text-slate mt-5 grid gap-x-5 gap-y-2 text-sm leading-6 sm:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-gold" aria-hidden="true">
                      ›
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                className="text-navy hover:text-gold mt-auto inline-flex pt-7 text-sm font-semibold no-underline"
              >
                {service.cta} <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
