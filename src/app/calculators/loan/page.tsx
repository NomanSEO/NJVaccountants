import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Loan Calculator | NJV Accountants",
  description:
    "Estimate loan repayments, interest costs, and your complete repayment schedule with our free loan calculator.",
};

export default function LoanCalculatorPage() {
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
              Borrowing tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Loan <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate your loan payment, total interest, and full repayment
              schedule. Compare terms, rates, fees, deferrals, and balloon
              payments before you borrow.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <LoanCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
                A practical guide
              </p>
              <h2 className="font-display text-navy mt-4 text-3xl font-bold">
                How loan repayments work
              </h2>
              <p className="text-slate mt-4 leading-relaxed">
                A repayment loan combines principal and interest in each
                scheduled payment. At the beginning of a typical loan, more of
                each payment goes to interest; as the balance reduces, more goes
                to principal.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                Interest-only loans pay the interest during the term and leave
                the original balance to repay at the end. A deferred period
                postpones payments but interest can continue to accrue. A
                balloon payment is the amount left due at the end of the agreed
                term.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                This is a planning estimate, not a lending offer. Actual rates,
                fees, payment dates, and lender conditions may change your final
                cost.
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
