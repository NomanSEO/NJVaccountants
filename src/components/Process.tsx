const STEPS = [
  { num: '1', title: 'Discovery Call',      desc: 'We start with a complimentary consultation to understand your goals, challenges, and current financial position — no obligation, no jargon.' },
  { num: '2', title: 'Financial Review',    desc: 'Our team conducts a thorough review of your accounts, tax position, and risk profile to identify opportunities and gaps.' },
  { num: '3', title: 'Bespoke Strategy',    desc: 'We develop a tailored engagement plan with clear deliverables, timelines, and expected outcomes — aligned to your business strategy.' },
  { num: '4', title: 'Ongoing Partnership', desc: 'We work as an extension of your team — proactively advising, adapting, and delivering as your business evolves.' },
]

export default function Process() {
  return (
    <section id="process" className="py-24 bg-cream" aria-label="Our process">
      <div className="max-w-site mx-auto px-6">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            How We Work
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Our <em className="not-italic text-gold">Engagement</em> Process
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7] mx-auto">
            A structured approach that delivers clarity, accountability, and measurable outcomes from day one.
          </p>
        </header>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-px bg-border" />
          {STEPS.map(step => (
            <div key={step.num} className="text-center px-5 relative z-10 group">
              <div className="w-[60px] h-[60px] rounded-full bg-white border-2 border-border flex items-center justify-center font-display text-xl font-bold text-navy mx-auto mb-6 group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all duration-300">
                {step.num}
              </div>
              <h3 className="font-display text-[1.125rem] font-bold text-navy mb-2.5">{step.title}</h3>
              <p className="text-[0.875rem] text-slate leading-[1.65]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
