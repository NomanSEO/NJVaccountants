import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Calculators | NJV Accountants',
  description:
    'Free financial calculators from NJV Accountants — estimate salary tax and more for tax year 2026–2027.',
}

const CALCULATORS = [
  {
    href: '/calculators/federal-tax',
    title: 'Federal Income Tax Calculator',
    tag: 'U.S. Tax Year 2026',
    description: 'Estimate federal income tax, credits, withholding, and your potential refund or balance due.',
    symbol: '$',
    available: true,
  },
  {
    href: '/calculators/mortgage',
    title: 'Mortgage Calculator',
    tag: 'USD · GBP · EUR',
    description: 'Estimate mortgage payments, costs, and a complete amortization schedule.',
    symbol: '⌂',
    available: true,
  },
  {
    href: '/calculators/salary-tax',
    title: 'Salary Tax Calculator',
    tag: 'Tax Year 2026–2027',
    description:
      'Estimate the income tax payable on your salary, your take-home pay, and a full slab-wise breakdown.',
    symbol: '§',
    available: true,
  },
]

export default function CalculatorsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-[70px] bg-navy">
          <div className="max-w-site mx-auto px-6 py-20">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-gold/70 text-sm font-semibold mb-8 hover:text-gold transition-colors no-underline"
            >
              ← Back to Home
            </a>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Tools & Calculators
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-tight mb-5">
              Financial <em className="not-italic text-gold">Calculators</em>
            </h1>
            <p className="text-[1.0625rem] text-white/65 leading-[1.75] max-w-[560px]">
              Quick, practical tools to help you plan ahead — built and maintained
              by our advisory team.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20 bg-cream">
          <div className="max-w-site mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {CALCULATORS.map((calc) => (
                <a
                  key={calc.href}
                  href={calc.href}
                  className="service-card group border border-border rounded-sm bg-white p-7 hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)] hover:-translate-y-0.5 transition-all duration-300 no-underline flex flex-col"
                >
                  <div className="w-12 h-12 bg-navy rounded-sm flex items-center justify-center mb-5 shrink-0">
                    <span className="font-display text-2xl text-gold">{calc.symbol}</span>
                  </div>
                  <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-gold mb-2">
                    {calc.tag}
                  </div>
                  <h2 className="font-display text-[1.25rem] font-bold text-navy leading-[1.3] mb-2.5 group-hover:text-gold transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-[0.875rem] text-slate leading-[1.6] mb-5 flex-1">
                    {calc.description}
                  </p>
                  <span className="text-[0.8125rem] font-semibold text-navy tracking-[0.04em] flex items-center gap-1.5 group-hover:text-gold transition-colors mt-auto">
                    Open Calculator &rsaquo;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
