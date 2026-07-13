// src/components/Hero.tsx
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function Hero() {
  const s = await getSiteSettings();
  if (!s) return null;
  const titleParts = s.heroTitleHighlight
    ? s.heroTitle.split(s.heroTitleHighlight)
    : [s.heroTitle, ""];

  return (
    <section
      id="home"
      className="bg-navy relative flex min-h-screen items-center overflow-hidden pt-17.5"
      aria-label="Hero"
    >
      {/* Background layers */}
      <div className="from-navy via-navy-light to-navy-deep absolute inset-0 bg-linear-to-br" />
      <div className="hero-pattern absolute inset-0" />
      <div className="bg-gold/4 border-gold/12 absolute top-0 right-0 bottom-0 w-[42%] border-l" />

      <div className="max-w-site relative z-10 mx-auto w-full px-6">
        <div className="grid grid-cols-1 items-center gap-16 py-20 md:grid-cols-2">
          {/* Left */}
          <div className="fade-up">
            <div className="text-gold mb-6 inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-0.5 w-6" />
              Est. 2020 · Trusted by 50+ Clients
            </div>

            <h1 className="font-display mb-6 text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.1] font-bold text-white">
              {titleParts[0]}
              {s.heroTitleHighlight && (
                <em className="text-gold not-italic">{s.heroTitleHighlight}</em>
              )}
              {titleParts[1]}
            </h1>

            <p className="mb-10 max-w-120 text-[1.0625rem] leading-[1.75] text-white/70">
              {s.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-gold text-navy hover:bg-gold-light inline-flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider uppercase no-underline transition-all hover:-translate-y-px"
              >
                Book a Free Consultation ›
              </a>
              <a
                href="#services"
                className="hover:border-gold hover:text-gold inline-flex items-center gap-2 rounded-sm border border-white/50 bg-transparent px-7.75 py-3.25 text-sm font-semibold tracking-wider text-white uppercase no-underline transition-all"
              >
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="mt-13 grid grid-cols-2 gap-6 border-t border-white/10 pt-10">
              {s.heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-gold text-[2.25rem] font-bold">
                    {stat.num}
                  </div>
                  <div className="mt-1 text-[0.8125rem] text-white/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative financial card */}
          <div className="fade-up fade-up-delay-2 hidden items-center justify-center md:flex">
            <div className="relative w-full max-w-95">
              <div className="bg-gold/8 border-gold/15 absolute -top-3.5 -right-3.5 h-full w-[90%] rounded-lg border" />
              <div className="border-gold/20 relative z-10 rounded-lg border bg-white/6 p-7 backdrop-blur-md">
                <div className="text-gold mb-3 text-[0.7rem] tracking-widest uppercase">
                  Q3 Financial Overview
                </div>
                <div className="font-display text-[2rem] font-bold text-white">
                  $2,847,000
                </div>
                <div className="mt-1.5 text-[0.8125rem] text-green-400">
                  ↑ 18.4% vs prior year
                </div>
                <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
                  {[
                    { label: "Tax Savings", val: "$384,200" },
                    { label: "Compliance", val: "100%" },
                    { label: "Audit Status", val: "Clean" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-[0.75rem] text-white/50">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-[0.875rem] font-semibold text-white">
                        {item.val}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-1 overflow-hidden rounded bg-white/10">
                  <div className="bg-gold h-full w-[72%] rounded" />
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span className="text-[0.7rem] text-white/40">
                    Budget used
                  </span>
                  <span className="text-gold text-[0.7rem]">72% on track</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
