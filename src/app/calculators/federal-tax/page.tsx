import type { Metadata } from "next";
import Link from "next/link";
import FederalTaxCalculator from "@/components/FederalTaxCalculator";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FEDERAL_TAX_RULES_2026, type FilingStatus } from "@/lib/federalTax";

export const metadata: Metadata = {
  title: "Federal Income Tax Calculator 2026 | NJV Accountants",
  description:
    "Estimate your 2026 U.S. federal income tax, marginal rate, state and local tax estimate, and expected refund or balance due.",
};

const statusLabels: Record<FilingStatus, string> = {
  single: "Single",
  marriedSeparate: "Married filing separately",
  marriedJoint: "Married filing jointly",
  headOfHousehold: "Head of household",
};
const rates = [10, 12, 22, 24, 32, 35, 37];
const money = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export default function FederalTaxPage() {
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
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Tax year 2026
            </div>
            <h1 className="font-display mb-5 text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Federal Income Tax{" "}
              <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate your U.S. federal income tax, state and local tax, and
              potential refund or balance due for 2026.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <FederalTaxCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="text-gold mb-4 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-4.5 w-0.75 shrink-0" />
              Reference
            </div>
            <h2 className="font-display text-navy mb-7 text-[clamp(1.5rem,3vw,2rem)] font-bold">
              2026 federal income tax brackets
            </h2>
            <div
              className="border-border overflow-x-auto rounded-sm border"
              data-calculator-table
            >
              <p className="text-slate px-3 pt-3 text-xs sm:hidden">
                Swipe to view all columns
              </p>
              <table className="w-full min-w-180 border-collapse text-left">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-5 py-3.5 text-xs uppercase">Rate</th>
                    {(Object.keys(statusLabels) as FilingStatus[]).map(
                      (status) => (
                        <th
                          key={status}
                          className="px-5 py-3.5 text-xs uppercase"
                        >
                          {statusLabels[status]}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rates.map((rate, index) => (
                    <tr
                      key={rate}
                      className={index % 2 ? "bg-cream" : "bg-white"}
                    >
                      <td className="text-navy px-5 py-3.5 text-sm font-semibold">
                        {rate}%
                      </td>
                      {(Object.keys(statusLabels) as FilingStatus[]).map(
                        (status) => {
                          const brackets =
                            FEDERAL_TAX_RULES_2026[status].brackets;
                          const lower = brackets[index];
                          const upper = brackets[index + 1];
                          return (
                            <td
                              key={status}
                              className="text-slate px-5 py-3.5 text-sm"
                            >
                              {upper
                                ? `${money(lower)}–${money(upper - 1)}`
                                : `${money(lower)} and over`}
                            </td>
                          );
                        },
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-light mt-4 text-xs leading-relaxed">
              Bracket figures and standard deductions are provided for quick
              reference. This calculator is an estimate and does not replace
              professional tax advice or an IRS filing.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16" aria-labelledby="federal-tax-guide">
          <div className="max-w-site mx-auto max-w-225 px-6">
            <div className="text-gold mb-4 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-4.5 w-0.75 shrink-0" />
              Tax planning guide
            </div>
            <h2
              id="federal-tax-guide"
              className="font-display text-navy mb-5 text-[clamp(1.5rem,3vw,2rem)] font-bold"
            >
              Federal Income Tax Calculator
            </h2>
            <div className="text-slate space-y-4 leading-[1.75]">
              <p>
                Federal income tax is progressive: each portion of taxable
                income is taxed at the rate for its bracket. Start with gross
                income, subtract eligible adjustments and either the standard or
                itemized deduction, then apply the brackets for your filing
                status.
              </p>
              <p>
                Credits reduce federal tax after it is calculated, while
                withholding and estimated payments affect whether you may
                receive a refund or owe a balance. The optional state and local
                figure is a simple taxable-income estimate; actual rules vary by
                location.
              </p>
              <p>
                Use this estimate to plan ahead, then confirm deductions,
                credits, and filing requirements with current IRS guidance or a
                qualified tax professional.
              </p>
            </div>
          </div>
        </section>
        <div className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <div className="font-display text-navy text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.3] font-bold">
                Need help with your tax planning?
              </div>
              <div className="text-navy/70 mt-2 text-[0.9375rem]">
                Our advisers can help you understand your wider tax position.
              </div>
            </div>
            <Link
              href="/#contact"
              className="bg-navy hover:bg-navy-light inline-flex shrink-0 items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase no-underline transition-colors"
            >
              Speak to a Partner ›
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
