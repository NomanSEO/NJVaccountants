import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

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
  {
    href: '/calculators/car-loan',
    title: 'Car Loan Calculator',
    tag: 'Vehicle Finance',
    description: 'Estimate your vehicle payment, interest costs, and payoff schedule.',
    symbol: '⌁',
    available: true,
  },
  {
    href: '/calculators/loan',
    title: 'Loan Calculator',
    tag: 'Borrowing Planner',
    description: 'Model loan payments, total interest, and your full repayment schedule.',
    symbol: '↔',
    available: true,
  },
  {
    href: '/calculators/personal-loan',
    title: 'Personal Loan Calculator',
    tag: 'Personal Finance',
    description: 'See what a personal loan could cost and plan affordable repayments.',
    symbol: '♙',
    available: true,
  },
  {
    href: '/calculators/retirement',
    title: 'Retirement Calculator',
    tag: 'Long-Term Planning',
    description: 'Project savings growth and estimate the income you may need in retirement.',
    symbol: '◴',
    available: true,
  },
  {
    href: '/calculators/cd',
    title: 'CD Calculator',
    tag: 'Savings & CDs',
    description: 'Calculate certificate of deposit growth with your rate and term.',
    symbol: '%',
    available: true,
  },
  {
    href: '/calculators/salary-paycheck',
    title: 'Salary Paycheck Calculator',
    tag: 'U.S. Payroll',
    description: 'Estimate federal withholding, FICA taxes, and take-home pay per paycheck.',
    symbol: '≡',
    available: true,
  },
  {
    href: '/calculators/roth-ira',
    title: 'Roth IRA Calculator',
    tag: 'Retirement Savings',
    description: 'Project tax-free Roth IRA growth and review annual contribution limits.',
    symbol: 'R',
    available: true,
  },
  {
    href: '/calculators/investment',
    title: 'Investment Calculator',
    tag: 'Investment Growth',
    description: 'Forecast portfolio growth with contributions, returns, and time.',
    symbol: '↗',
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
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gold/70 text-sm font-semibold mb-8 hover:text-gold transition-colors no-underline"
            >
              ← Back to Home
            </Link>
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
                <Link
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
