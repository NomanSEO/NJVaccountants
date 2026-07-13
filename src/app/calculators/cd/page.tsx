import CDCalculator from "@/components/CDCalculator";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "CD Calculator | NJV Accountants",
  description: "Calculate certificate of deposit maturity value and interest.",
};

export default function CDCalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy pt-[70px]">
          <div className="mx-auto max-w-site px-6 py-16">
            <Link
              href="/calculators"
              className="mb-8 inline-flex text-sm font-semibold text-gold/70 no-underline hover:text-gold"
            >
              ← All Calculators
            </Link>
            <div className="mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[.12em] uppercase text-gold">
              <span className="block h-[22px] w-[3px] bg-gold" />
              Savings tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold text-white">
              CD <em className="not-italic text-gold">Calculator</em>
            </h1>
            <p className="mt-5 max-w-[620px] text-[1.0625rem] leading-[1.75] text-white/65">
              See how a certificate of deposit could grow from a single deposit
              at a fixed APY.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-site px-6">
            <CDCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="mx-auto max-w-site px-6 max-w-3xl">
            <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">
              How it works
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy">
              Plan your fixed-term savings
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              A certificate of deposit generally pays a stated annual percentage
              yield for a chosen term. Compounding determines how often earned
              interest is added to your balance. Actual returns can vary with
              terms, early withdrawal penalties, and account conditions.
            </p>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
function CTA() {
  return (
    <section className="bg-gold py-16">
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-8 px-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy">
            Need help with your savings strategy?
          </h2>
          <p className="mt-2 text-sm text-navy/70">
            Our advisers can help you plan with confidence.
          </p>
        </div>
        <Link
          href="/#contact"
          className="bg-navy px-8 py-3.5 text-sm font-semibold uppercase text-white no-underline"
        >
          Speak to a Partner ›
        </Link>
      </div>
    </section>
  );
}
