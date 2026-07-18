import CDCalculator from "@/components/CDCalculator";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import PageJsonLd from "@/components/PageJsonLd";

export const metadata = {
  title: "CD Calculator | NJV Accountants",
  description: "Calculate certificate of deposit maturity value and interest.",
};

export default function CDCalculatorPage() {
  return (
    <>
      <PageJsonLd path="/calculators/cd" />
      <Navbar />
      <main>
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-16">
            <Link
              href="/calculators"
              className="text-gold/70 hover:text-gold mb-8 inline-flex text-sm font-semibold no-underline"
            >
              ← All Calculators
            </Link>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75" />
              Savings tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold text-white">
              CD <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              See how a certificate of deposit could grow from a single deposit
              at a fixed APY.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <CDCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto max-w-3xl px-6">
            <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
              How it works
            </p>
            <h2 className="font-display text-navy mt-4 text-3xl font-bold">
              Plan your fixed-term savings
            </h2>
            <p className="text-slate mt-4 leading-relaxed">
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
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
        <div>
          <h2 className="font-display text-navy text-2xl font-bold">
            Need help with your savings strategy?
          </h2>
          <p className="text-navy/70 mt-2 text-sm">
            Our advisers can help you plan with confidence.
          </p>
        </div>
        <Link
          href="/#contact"
          className="bg-navy px-8 py-3.5 text-sm font-semibold text-white uppercase no-underline"
        >
          Speak to a Partner ›
        </Link>
      </div>
    </section>
  );
}
