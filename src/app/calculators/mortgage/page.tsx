import Footer from "@/components/Footer";
import MortgageCalculator from "@/components/MortgageCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Mortgage Calculator | NJV Accountants",
  description:
    "Estimate mortgage repayments, interest, and housing costs with NJV Accountants’ mortgage calculator.",
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-16">
            <Link
              href="/calculators"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors"
            >
              ← All Calculators
            </Link>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Home finance tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Mortgage <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate your mortgage payment, total interest, and the full
              monthly cost of owning a home. Adjust the loan, rate, and property
              costs to plan with confidence.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <MortgageCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
                A practical guide
              </p>
              <h2 className="font-display text-navy mt-4 text-3xl font-bold">
                Understanding your mortgage estimate
              </h2>
              <p className="text-slate mt-4 leading-relaxed">
                A repayment mortgage pays down both the original loan and the
                interest over the selected term. A larger down payment reduces
                the amount borrowed, which can lower the regular payment and the
                interest paid over time.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                Interest-only mortgages cover interest during the term and leave
                the original balance outstanding. Adjustable-rate mortgages can
                change after their initial period, so use the adjustment fields
                to see how a later rate may affect payments.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                The amortization schedule shows how each payment is split
                between principal, interest, and estimated escrow costs. This
                calculator is an estimate for planning only; lender rates, fees,
                eligibility, and final payments may differ.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <h2 className="font-display text-navy text-2xl font-bold">
                Need help planning your finances?
              </h2>
              <p className="text-navy/70 mt-2 text-sm">
                Our advisers can help you make informed financial decisions.
              </p>
            </div>
            <Link
              href="/#contact"
              className="bg-navy hover:bg-navy-light shrink-0 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase no-underline transition-colors"
            >
              Speak to a Partner ›
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
