const STEPS = [
  {
    num: "1",
    title: "Understand Your Business",
    desc: "We discuss your business model, current processes, challenges and objectives.",
  },
  {
    num: "2",
    title: "Define the Right Scope",
    desc: "We agree on the services, information, deliverables and timelines for the engagement.",
  },
  {
    num: "3",
    title: "Review and Analyse",
    desc: "We organize information, perform the agreed work and identify relevant issues or opportunities.",
  },
  {
    num: "4",
    title: "Explain the Findings",
    desc: "We communicate results, important observations and practical next steps.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-24" aria-label="Our process">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14 text-center">
          <div className="text-gold mb-5 flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
            How We Work
          </div>
          <h2 className="font-display text-navy mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            A Practical Approach to Better Financial Management
          </h2>
          <p className="text-slate mx-auto max-w-140 text-[1.0625rem] leading-[1.7]">
            Clear scope, careful review and useful explanations at each stage.
          </p>
        </header>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
          {/* Connector line */}
          <div className="bg-border absolute top-7.5 right-[10%] left-[10%] hidden h-px md:block" />
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="group relative z-10 px-5 text-center"
            >
              <div className="border-border font-display text-navy group-hover:bg-gold group-hover:border-gold mx-auto mb-6 flex h-15 w-15 items-center justify-center rounded-full border-2 bg-white text-xl font-bold transition-all duration-300 group-hover:text-white">
                {step.num}
              </div>
              <h3 className="font-display text-navy mb-2.5 text-[1.125rem] font-bold">
                {step.title}
              </h3>
              <p className="text-slate text-[0.875rem] leading-[1.65]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
