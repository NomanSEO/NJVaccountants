// src/components/Testimonials.tsx
import { getTestimonials } from "@/sanity/lib/queries";

export default async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section
      id="testimonials"
      className="bg-navy py-24"
      aria-label="Client testimonials"
    >
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14 text-center">
          <div className="text-gold mb-5 flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
            Client Voices
          </div>
          <h2 className="font-display text-cream mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            What Our <em className="text-gold not-italic">Clients</em> Say
          </h2>
          <p className="text-cream mx-auto max-w-140 text-[1.0625rem] leading-[1.7]">
            We measure success by the relationships we build and the outcomes we
            deliver.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t) => (
            <article
              key={t._id}
              className="bg-navy-light border-border/20 relative rounded-sm border p-9 transition-shadow hover:shadow-[0_12px_40px_rgba(11,31,58,0.07)]"
            >
              <div className="font-display text-gold mb-4 text-[4rem] leading-none opacity-50">
                &ldquo;
              </div>
              <div className="text-gold mb-4 text-[0.875rem] tracking-[2px]">
                ★★★★★
              </div>
              <p className="text-cream mb-7 text-[0.9375rem] leading-[1.75] italic">
                {t.quote}
              </p>
              <div className="border-border/20 flex items-center gap-3.5 border-t pt-5">
                <div className="from-gold to-navy font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-base font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-cream text-[0.9rem] font-semibold">
                    {t.authorName}
                  </div>
                  <div className="text-cream/70 text-[0.8rem]">
                    {t.authorRole}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
