import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RetirementCalculator from "@/components/RetirementCalculator";
import Link from "next/link";

export const metadata = {
  title: "Retirement Calculator | NJV Accountants",
  description:
    "Project retirement savings, target nest egg, and sustainable retirement income with NJV Accountants.",
};

export default function RetirementCalculatorPage() {
  return (
    <>
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
              Retirement planning tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Retirement <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate the savings you may need, what your current plan could
              grow to, and sustainable retirement income.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <RetirementCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
                Plan with perspective
              </p>
              <h2 className="font-display text-navy mt-4 text-3xl font-bold">
                Making retirement estimates useful
              </h2>
              <p className="text-slate mt-4 leading-relaxed">
                Your actual outcome depends on investment performance,
                inflation, tax, retirement timing, and changing spending. Use a
                range of return assumptions rather than relying on one forecast.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                Review your contribution level regularly and seek professional
                advice before making investment or retirement decisions.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <h2 className="font-display text-navy text-2xl font-bold">
                Ready to discuss your financial future?
              </h2>
              <p className="text-navy/70 mt-2 text-sm">
                Our advisers can help you make informed financial decisions.
              </p>
            </div>
            <Link
              href="/#contact"
              className="bg-navy px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase no-underline"
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
