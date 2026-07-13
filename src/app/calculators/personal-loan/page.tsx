import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import Link from "next/link";

export const metadata = {
  title: "Personal Loan Calculator | NJV Accountants",
  description:
    "Estimate personal loan repayments, total interest, and compare loan offers with NJV Accountants.",
};

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy pt-[70px]">
          <div className="mx-auto max-w-site px-6 py-16">
            <Link
              href="/calculators"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gold/70 no-underline transition-colors hover:text-gold"
            >
              ← All Calculators
            </Link>
            <div className="mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[.12em] uppercase text-gold">
              <span className="block h-[22px] w-[3px] shrink-0 bg-gold" />
              Borrowing tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-tight text-white">
              Personal Loan <em className="not-italic text-gold">Calculator</em>
            </h1>
            <p className="mt-5 max-w-[620px] text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate your monthly payment, total borrowing cost, and compare
              personal loan offers before you apply.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-site px-6">
            <PersonalLoanCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="mx-auto max-w-site px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">
                A practical guide
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy">
                Understanding personal loan costs
              </h2>
              <p className="mt-4 leading-relaxed text-slate">
                Your monthly payment depends on the amount borrowed, annual
                percentage rate, and term. A longer term can reduce the payment
                but usually increases total interest.
              </p>
              <p className="mt-4 leading-relaxed text-slate">
                An origination fee may be deducted from your proceeds or added
                to the balance. This calculator models a financed fee, so
                compare the cash you receive with the total you repay.
              </p>
              <p className="mt-4 leading-relaxed text-slate">
                Use the second offer to compare alternatives on the same loan
                amount. Estimates are for planning only; your final rate, fees,
                and eligibility are set by the lender.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gold py-16">
          <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">
                Need help planning your finances?
              </h2>
              <p className="mt-2 text-sm text-navy/70">
                Our advisers can help you make informed financial decisions.
              </p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 rounded-sm bg-navy px-8 py-3.5 text-sm font-semibold tracking-[.05em] text-white uppercase no-underline transition-colors hover:bg-navy-light"
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
