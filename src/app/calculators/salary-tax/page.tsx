import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalaryTaxCalculator from "@/components/SalaryTaxCalculator";
import { SALARY_TAX_SLABS_2026_27 } from "@/lib/salaryTax";
import Link from "next/link";

export const metadata = {
  title: "Salary Tax Calculator Pakistan 2026–2027 | NJV Accountants",
  description:
    "Estimate your income tax on salary for tax year 2026–2027 with our free salary tax calculator as per FBR and Income tax rules. Monthly and annual breakdown across all tax slabs.",
};

const fmtRs = (n: number) =>
  n === Infinity ? "—" : "Rs. " + n.toLocaleString("en-PK");

// Avoid floating-point artifacts like 0.29 * 100 = 28.9999…
const ratePct = (rate: number) => +(rate * 100).toFixed(2);

export default function SalaryTaxPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-16">
            <a
              href="/calculators"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors"
            >
              ← All Calculators
            </a>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Tax Year 2026–2027
            </div>
            <h1 className="font-display mb-5 text-[clamp(2.25rem,5vw,3.25rem)] leading-tight font-bold text-white">
              Salary Tax <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="max-w-155 text-[1.0625rem] leading-[1.75] text-white/65">
              Estimate the income tax payable on your salary for tax year
              2026–2027. Enter your monthly or annual taxable salary to see your
              tax, take-home pay, and a full slab-wise breakdown.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <SalaryTaxCalculator />
          </div>
        </section>

        {/* Slab reference table */}
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto px-6">
            <div className="text-gold mb-4 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-4.5 w-0.75 shrink-0" />
              Reference
            </div>
            <h2 className="font-display text-navy mb-7 text-[clamp(1.5rem,3vw,2rem)] font-bold">
              Salary Tax Slabs 2026–2027
            </h2>
            <div
              className="border-border overflow-x-auto rounded-sm border"
              data-calculator-table
            >
              <p className="text-slate px-3 pt-3 text-xs sm:hidden">
                Swipe to view all columns
              </p>
              <table className="w-full min-w-140 border-collapse text-left">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-5 py-3.5 text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
                      Taxable Income
                    </th>
                    <th className="px-5 py-3.5 text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
                      Rate
                    </th>
                    <th className="px-5 py-3.5 text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
                      Tax
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SALARY_TAX_SLABS_2026_27.map((slab, i) => (
                    <tr
                      key={slab.over}
                      className={i % 2 === 0 ? "bg-white" : "bg-cream"}
                    >
                      <td className="text-navy px-5 py-3.5 text-sm font-medium">
                        {slab.label}
                      </td>
                      <td className="text-slate px-5 py-3.5 text-sm">
                        {slab.rate === 0 ? "0%" : `${ratePct(slab.rate)}%`}
                      </td>
                      <td className="text-slate px-5 py-3.5 text-sm">
                        {slab.rate === 0
                          ? "No tax"
                          : slab.baseTax === 0
                            ? `${ratePct(slab.rate)}% of amount over ${fmtRs(slab.over)}`
                            : `${fmtRs(slab.baseTax)} + ${ratePct(slab.rate)}% of amount over ${fmtRs(slab.over)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-light mt-4 max-w-175 text-xs leading-relaxed">
              Figures are for tax year 2026–2027 and apply to taxable salary
              income. This calculator provides an estimate only and does not
              account for tax credits, rebates, surcharges, or other
              adjustments. Please consult a tax professional for advice specific
              to your circumstances.
            </p>
          </div>
        </section>
        {/*
  ============================================================
  SEO CONTENT SECTION — Salary Tax Calculator page
  ============================================================
  WHERE TO PASTE THIS:
  Drop this block directly BELOW your slabs table component,
  inside the same page file (e.g. app/calculators/salary-tax/page.tsx),
  still inside the <main> or page wrapper.

  Uses the same Tailwind classes as the rest of the site
  (text-navy, text-slate, bg-cream, border-border, text-gold, font-display)
  so it will look native to the page — no new CSS needed.

  Primary keyword:   salary tax calculator
  Secondary keywords: income tax calculator Pakistan, salary tax slabs 2026-2027,
                       how to calculate income tax on salary, FBR tax calculator,
                       tax on salary in Pakistan, income tax return Pakistan
  ============================================================
*/}

        <section
          className="bg-white py-20"
          aria-label="Salary tax calculator guide"
        >
          <div className="max-w-site mx-auto px-6">
            <div className="mx-auto max-w-205">
              {/* Intro — primary keyword in first 100 words */}
              <div className="mb-14">
                <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
                  <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
                  Salary Tax Guide
                </div>
                <h2 className="font-display text-navy mb-5 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-bold">
                  How This{" "}
                  <em className="text-gold not-italic">
                    Salary Tax Calculator
                  </em>{" "}
                  Works
                </h2>
                <p className="text-slate mb-4 text-[1.0625rem] leading-[1.8]">
                  Our{" "}
                  <strong className="text-navy">
                    salary tax calculator Pakistan 2026-27
                  </strong>{" "}
                  gives you an instant, accurate estimate of the income tax
                  deducted from your monthly or annual salary in Pakistan for
                  tax year 2026–2027. Simply enter your gross salary and the
                  calculator applies the latest FBR salary tax slabs to show
                  your total tax liability, monthly tax deduction, and net
                  take-home pay — all in a few seconds, with no sign-up
                  required.
                </p>
                <p className="text-slate text-[1.0625rem] leading-[1.8]">
                  Whether you&apos;re a salaried employee planning your monthly
                  budget, an HR or payroll professional calculating withholding
                  tax for staff, or simply want to know how much income tax on
                  salary you should expect this year, this tool is designed to
                  make Pakistan&apos;s salary tax rules simple to understand.
                </p>
              </div>

              {/* Tax laws section */}
              <div className="mb-14">
                <h3 className="font-display text-navy mb-4 text-[1.5rem] font-bold">
                  Salary Tax Laws in Pakistan — What You Need to Know
                </h3>
                <p className="text-slate mb-4 text-[1rem] leading-[1.8]">
                  Income tax on salary in Pakistan is governed by the{" "}
                  <strong className="text-navy">
                    Income Tax Ordinance, 2001
                  </strong>
                  , and is administered by the Federal Board of Revenue (FBR).
                  Salaried individuals are taxed under Section 12 of the
                  Ordinance, which treats salary — including basic pay,
                  allowances, bonuses, and most benefits-in-kind — as taxable
                  income for the relevant tax year (1 July to 30 June).
                </p>
                <p className="text-slate mb-4 text-[1rem] leading-[1.8]">
                  Pakistan uses a{" "}
                  <strong className="text-navy">
                    progressive salary tax slab
                  </strong>{" "}
                  system: income up to a set threshold is tax-free, and amounts
                  above each slab boundary are taxed at increasing rates.
                  Employers are legally required to deduct income tax at source
                  (withholding tax) from monthly salary under Section 149, and
                  deposit it with FBR on the employee&apos;s behalf — which is
                  why your payslip already reflects tax deductions before you
                  receive your net pay.
                </p>
                <p className="text-slate text-[1rem] leading-[1.8]">
                  Key points every salaried taxpayer should know:
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "The tax year runs from 1 July to 30 June, and slab rates are revised through the Finance Act each year.",
                    "Filing an annual income tax return is mandatory for salaried persons above the taxable threshold, even if tax has already been withheld by the employer.",
                    "Filers (those on the FBR Active Taxpayers List) benefit from lower withholding tax rates on banking transactions, property, and vehicle purchases compared to non-filers.",
                    "Certain allowances (e.g. medical allowance up to prescribed limits) may be exempt from tax, which can affect your actual taxable salary.",
                  ].map((point, i) => (
                    <li
                      key={i}
                      className="text-slate flex items-start gap-3 text-[0.9375rem] leading-[1.6]"
                    >
                      <span className="text-gold mt-0.5 text-lg leading-none font-bold">
                        ›
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits section */}
              <div className="mb-14">
                <h3 className="font-display text-navy mb-4 text-[1.5rem] font-bold">
                  Benefits of Using an Online Salary Tax Calculator
                </h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[
                    {
                      title: "Instant, Accurate Results",
                      text: "Get your exact tax liability and take-home pay calculated against the current FBR salary tax slabs — no manual slab-matching or spreadsheet formulas needed.",
                    },
                    {
                      title: "Better Financial Planning",
                      text: "Knowing your monthly tax deduction in advance helps you budget accurately and plan savings, loan repayments, or major purchases with confidence.",
                    },
                    {
                      title: "Understand Your Payslip",
                      text: "See exactly how much of your salary goes to income tax versus what you take home, so payslip deductions never come as a surprise.",
                    },
                    {
                      title: "Free and Always Up to Date",
                      text: "Our income tax calculator Pakistan tool is updated whenever FBR revises salary tax slabs, so you always get results based on the current tax year.",
                    },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="border-border bg-cream/40 rounded-sm border p-6"
                    >
                      <h4 className="font-display text-navy mb-2 text-[1.0625rem] font-bold">
                        {b.title}
                      </h4>
                      <p className="text-slate text-[0.875rem] leading-[1.65]">
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ section — great for featured snippets / People Also Ask */}
              <div className="mb-14">
                <h3 className="font-display text-navy mb-6 text-[1.5rem] font-bold">
                  Frequently Asked Questions
                </h3>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      q: "How is income tax calculated on salary in Pakistan?",
                      a: "Income tax on salary is calculated by applying the FBR\u2019s progressive salary tax slabs to your annual taxable salary. Each portion of your income falling within a slab is taxed at that slab\u2019s rate, and the amounts are added together to get your total annual tax liability, which is then divided across 12 months for withholding purposes.",
                    },
                    {
                      q: "Is this salary tax calculator accurate for tax year 2026–2027?",
                      a: "Yes. The calculator uses the salary tax slabs applicable for the current tax year as notified by FBR, so results reflect up-to-date rates for tax year 2026\u201327.",
                    },
                    {
                      q: "Do I still need to file a tax return if my employer already deducts tax?",
                      a: "Generally yes. Withholding tax deducted by your employer is only an advance payment of your tax liability \u2014 salaried individuals above the taxable threshold are still required to file an annual income tax return with FBR to formally declare income and remain on the Active Taxpayers List.",
                    },
                    {
                      q: "What counts as taxable salary income?",
                      a: "Taxable salary typically includes basic pay, cost-of-living allowances, bonuses, commissions, and the cash value of most perquisites and benefits-in-kind, with a few exemptions (such as limited medical allowances) available under the Income Tax Ordinance.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border-border border-b pb-5">
                      <h4 className="font-display text-navy mb-2 text-[1.0625rem] font-bold">
                        {item.q}
                      </h4>
                      <p className="text-slate text-[0.9375rem] leading-[1.7]">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-navy rounded-sm p-8 text-center md:p-10">
                <h3 className="font-display mb-3 text-[1.375rem] font-bold text-white">
                  Need Help With Your Tax Filing or Planning?
                </h3>
                <p className="mx-auto mb-7 max-w-125 text-[0.9375rem] leading-[1.7] text-white/70">
                  This salary tax calculator gives you a quick estimate — but
                  every income situation is different. Our tax specialists at
                  NJV Accountants can review your salary structure, help you
                  claim eligible exemptions, and file your annual income tax
                  return correctly and on time.
                </p>
                <Link
                  href="/#contact"
                  className="bg-gold text-navy hover:bg-gold-light inline-flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider uppercase no-underline transition-all hover:-translate-y-px"
                >
                  Talk to a Tax Specialist ›
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* CTA */}
        <div className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <div className="font-display text-navy text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.3] font-bold">
                Need help optimising your tax position?
              </div>
              <div className="text-navy/70 mt-2 text-[0.9375rem]">
                Our partners can help you plan ahead and stay compliant.
              </div>
            </div>
            <Link
              href="/#contact"
              className="bg-navy hover:bg-navy-light inline-flex shrink-0 items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase no-underline transition-colors"
            >
              Speak to a Partner &rsaquo;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
