import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageJsonLd from "@/components/PageJsonLd";

export const metadata = {
  title: "Calculators | NJV Accountants",
  description:
    "Free financial calculators from NJV Accountants — estimate salary tax and more for tax year 2026–2027.",
};

const CALCULATORS = [
  {
    href: "/calculators/federal-tax",
    title: "Federal Income Tax Calculator",
    tag: "U.S. Tax Year 2026",
    description:
      "Estimate federal income tax, credits, withholding, and your potential refund or balance due.",
    symbol: "$",
    available: true,
  },
  {
    href: "/calculators/mortgage",
    title: "Mortgage Calculator",
    tag: "USD · GBP · EUR",
    description:
      "Estimate mortgage payments, costs, and a complete amortization schedule.",
    symbol: "⌂",
    available: true,
  },
  {
    href: "/calculators/salary-tax",
    title: "Salary Tax Calculator",
    tag: "Tax Year 2026–2027",
    description:
      "Estimate the income tax payable on your salary, your take-home pay, and a full slab-wise breakdown.",
    symbol: "§",
    available: true,
  },
  {
    href: "/calculators/car-loan",
    title: "Car Loan Calculator",
    tag: "Vehicle Finance",
    description:
      "Estimate your vehicle payment, interest costs, and payoff schedule.",
    symbol: "⌁",
    available: true,
  },
  {
    href: "/calculators/loan",
    title: "Loan Calculator",
    tag: "Borrowing Planner",
    description:
      "Model loan payments, total interest, and your full repayment schedule.",
    symbol: "↔",
    available: true,
  },
  {
    href: "/calculators/personal-loan",
    title: "Personal Loan Calculator",
    tag: "Personal Finance",
    description:
      "See what a personal loan could cost and plan affordable repayments.",
    symbol: "♙",
    available: true,
  },
  {
    href: "/calculators/retirement",
    title: "Retirement Calculator",
    tag: "Long-Term Planning",
    description:
      "Project savings growth and estimate the income you may need in retirement.",
    symbol: "◴",
    available: true,
  },
  {
    href: "/calculators/cd",
    title: "CD Calculator",
    tag: "Savings & CDs",
    description:
      "Calculate certificate of deposit growth with your rate and term.",
    symbol: "%",
    available: true,
  },
  {
    href: "/calculators/salary-paycheck",
    title: "Salary Paycheck Calculator",
    tag: "U.S. Payroll",
    description:
      "Estimate federal withholding, FICA taxes, and take-home pay per paycheck.",
    symbol: "≡",
    available: true,
  },
  {
    href: "/calculators/roth-ira",
    title: "Roth IRA Calculator",
    tag: "Retirement Savings",
    description:
      "Project tax-free Roth IRA growth and review annual contribution limits.",
    symbol: "R",
    available: true,
  },
  {
    href: "/calculators/investment",
    title: "Investment Calculator",
    tag: "Investment Growth",
    description:
      "Forecast portfolio growth with contributions, returns, and time.",
    symbol: "↗",
    available: true,
  },
];

export default function CalculatorsPage() {
  return (
    <>
      <PageJsonLd path="/calculators" />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-20">
            <Link
              href="/"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors"
            >
              ← Back to Home
            </Link>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Tools & Calculators
            </div>
            <h1 className="font-display mb-5 text-[clamp(2.5rem,5vw,3.5rem)] leading-tight font-bold text-white">
              Financial <em className="text-gold not-italic">Calculators</em>
            </h1>
            <p className="max-w-140 text-[1.0625rem] leading-[1.75] text-white/65">
              Quick, practical tools to help you plan ahead — built and
              maintained by our advisory team.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-cream py-20">
          <div className="max-w-site mx-auto px-6">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {CALCULATORS.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="service-card group border-border flex flex-col rounded-sm border bg-white p-7 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)]"
                >
                  <div className="bg-navy mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm">
                    <span className="font-display text-gold text-2xl">
                      {calc.symbol}
                    </span>
                  </div>
                  <div className="text-gold mb-2 text-[0.7rem] font-semibold tracking-widest uppercase">
                    {calc.tag}
                  </div>
                  <h2 className="font-display text-navy group-hover:text-gold mb-2.5 text-[1.25rem] leading-[1.3] font-bold transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-slate mb-5 flex-1 text-[0.875rem] leading-[1.6]">
                    {calc.description}
                  </p>
                  <span className="text-navy group-hover:text-gold mt-auto flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-[0.04em] transition-colors">
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
  );
}
