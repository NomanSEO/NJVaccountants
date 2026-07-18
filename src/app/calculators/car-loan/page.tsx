import CarLoanCalculator from "@/components/CarLoanCalculator";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import PageJsonLd from "@/components/PageJsonLd";

export const metadata = {
  title: "Car Loan Calculator | NJV Accountants",
  description:
    "Estimate vehicle finance payments, total interest, and a full car loan payment schedule.",
};

export default function CarLoanCalculatorPage() {
  return (
    <>
      <PageJsonLd path="/calculators/car-loan" />
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
              Vehicle finance tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Car Loan <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate your monthly car payment, total borrowing cost, and how
              each payment reduces your balance.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <CarLoanCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
                A practical guide
              </p>
              <h2 className="font-display text-navy mt-4 text-3xl font-bold">
                Plan your vehicle finance with confidence
              </h2>
              <p className="text-slate mt-4 leading-relaxed">
                Your amount financed starts with the vehicle price, then adds
                sales tax, fees, and any outstanding trade-in loan. Your down
                payment and trade-in value reduce the amount borrowed.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                APR and loan term determine the monthly payment and total
                interest. A longer term can lower the monthly payment, but
                usually increases the interest paid. A balloon payment lowers
                regular payments by leaving a balance due at the end of the
                term.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                This calculator is for planning purposes. Confirm rates,
                required fees, and final payment terms with your lender before
                committing to finance.
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
