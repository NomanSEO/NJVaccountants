export default function Hero() {
  return (
    <section
      id="home"
      className="bg-navy relative overflow-hidden pt-17.5 text-white"
      aria-label="Introduction"
    >
      <div className="hero-pattern absolute inset-0" aria-hidden="true" />
      <div className="max-w-site relative mx-auto grid items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <p className="text-gold mb-5 text-xs font-semibold tracking-[0.16em] uppercase">
            Specialist support for online sellers in Pakistan
          </p>
          <h1 className="font-display max-w-190 text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.1] font-bold">
            Accounting, Tax &amp; Business Advisory for{" "}
            <span className="text-gold">E-commerce Businesses in Pakistan</span>
          </h1>
          <p className="mt-7 max-w-170 text-lg leading-8 text-white/80">
            We help e-commerce businesses bring clarity to their finances,
            improve financial controls and make informed decisions through
            accounting, business advisory, tax planning and internal audit
            services.
          </p>
          <p className="mt-4 max-w-170 leading-7 text-white/65">
            From accurate books and a clearer view of profitability to tax
            obligations and stronger controls, our work is shaped around the
            needs of online businesses in Pakistan.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="bg-gold text-navy hover:bg-gold-light rounded-sm px-7 py-3.5 text-sm font-semibold no-underline transition-colors"
            >
              Discuss Your Business Needs
            </a>
            <a
              href="#services"
              className="hover:border-gold hover:text-gold rounded-sm border border-white/50 px-7 py-3.5 text-sm font-semibold text-white no-underline transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
        <div
          className="border-gold/25 bg-navy-light/70 rounded-sm border p-6 shadow-lg sm:p-8"
          aria-label="Illustrative e-commerce reconciliation example"
        >
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">
            A clearer view of your finances
          </p>
          <h2 className="font-display mt-3 text-2xl font-semibold">
            Illustrative monthly snapshot
          </h2>
          <p className="mt-2 text-sm text-white/65">
            Orders, courier settlements and bank receipts brought together for
            review.
          </p>
          <dl className="mt-6 space-y-4">
            {[
              ["Recorded sales", "PKR 8,450,000"],
              ["Courier settlements", "PKR 6,120,000"],
              ["Bank receipts reviewed", "PKR 2,100,000"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3"
              >
                <dt className="text-sm text-white/65">{label}</dt>
                <dd className="font-display text-lg font-semibold text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-5 text-white/50">
            Illustrative example for demonstration purposes. Figures do not
            represent actual client results.
          </p>
        </div>
      </div>
    </section>
  );
}
