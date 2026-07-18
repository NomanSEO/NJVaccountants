import Footer from "@/components/Footer";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import PageJsonLd from "@/components/PageJsonLd";

export const metadata = {
  title: "Investment Calculator | NJV Accountants",
  description:
    "Project investment growth with recurring contributions and return scenarios.",
};
export default function InvestmentCalculatorPage() {
  return (
    <>
      <PageJsonLd path="/calculators/investment" />
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
              Investment tool
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold text-white">
              Investment <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-5 max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Explore how an initial investment and recurring contributions
              could grow over time.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <InvestmentCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto max-w-3xl px-6">
            <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
              About the estimate
            </p>
            <h2 className="font-display text-navy mt-4 text-3xl font-bold">
              Returns are uncertain
            </h2>
            <p className="text-slate mt-4 leading-relaxed">
              Regular contributions and time in the market can materially affect
              a long-term investment balance. This tool uses a nominal annual
              return for illustration, shown alongside lower and higher return
              scenarios. Investments can fall as well as rise, and returns are
              never guaranteed.
            </p>
          </div>
        </section>
        <section className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <h2 className="font-display text-navy text-2xl font-bold">
                Want to discuss your financial plan?
              </h2>
              <p className="text-navy/70 mt-2 text-sm">
                Our advisers can help you consider your options.
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
      </main>
      <Footer />
    </>
  );
}
