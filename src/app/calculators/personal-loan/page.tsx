import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import Link from "next/link";
import PageJsonLd from "@/components/PageJsonLd";

export const metadata = {
  title: "Personal Loan Calculator | NJV Accountants",
  description:
    "Estimate personal loan repayments, total interest, and compare loan offers with NJV Accountants.",
};

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <PageJsonLd path="/calculators/personal-loan" />
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
              Borrowing tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Personal Loan <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate your monthly payment, total borrowing cost, and compare
              personal loan offers before you apply.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <PersonalLoanCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
                A practical guide
              </p>
              <h2 className="font-display text-navy mt-4 text-3xl font-bold">
                Understanding personal loan costs
              </h2>
              <p className="text-slate mt-4 leading-relaxed">
                Your monthly payment depends on the amount borrowed, annual
                percentage rate, and term. A longer term can reduce the payment
                but usually increases total interest.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                An origination fee may be deducted from your proceeds or added
                to the balance. This calculator models a financed fee, so
                compare the cash you receive with the total you repay.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                Use the second offer to compare alternatives on the same loan
                amount. Estimates are for planning only; your final rate, fees,
                and eligibility are set by the lender.
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
