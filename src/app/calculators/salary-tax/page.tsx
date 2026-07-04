import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SalaryTaxCalculator from '@/components/SalaryTaxCalculator'
import { SALARY_TAX_SLABS_2026_27 } from '@/lib/salaryTax'

export const metadata = {
  title: 'Salary Tax Calculator 2026–2027 | Pinnacle Advisory Group',
  description:
    'Estimate your income tax on salary for tax year 2026–2027 with our free salary tax calculator. Monthly and annual breakdown across all tax slabs.',
}

const fmtRs = (n: number) =>
  n === Infinity ? '—' : 'Rs. ' + n.toLocaleString('en-PK')

// Avoid floating-point artifacts like 0.29 * 100 = 28.9999…
const ratePct = (rate: number) => +(rate * 100).toFixed(2)

export default function SalaryTaxPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-[70px] bg-navy">
          <div className="max-w-site mx-auto px-6 py-16">
            <a
              href="/calculators"
              className="inline-flex items-center gap-2 text-gold/70 text-sm font-semibold mb-8 hover:text-gold transition-colors no-underline"
            >
              ← All Calculators
            </a>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Tax Year 2026–2027
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold text-white leading-tight mb-5">
              Salary Tax <em className="not-italic text-gold">Calculator</em>
            </h1>
            <p className="text-[1.0625rem] text-white/65 leading-[1.75] max-w-[620px]">
              Estimate the income tax payable on your salary for tax year
              2026–2027. Enter your monthly or annual taxable salary to see your
              tax, take-home pay, and a full slab-wise breakdown.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 bg-cream">
          <div className="max-w-site mx-auto px-6">
            <SalaryTaxCalculator />
          </div>
        </section>

        {/* Slab reference table */}
        <section className="py-16 bg-white">
          <div className="max-w-site mx-auto px-6">
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-4">
              <span className="block w-[3px] h-[18px] bg-gold shrink-0" />
              Reference
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-navy mb-7">
              Salary Tax Slabs 2026–2027
            </h2>
            <div className="overflow-x-auto border border-border rounded-sm">
              <table className="w-full text-left border-collapse min-w-[560px]">
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
                      className={i % 2 === 0 ? 'bg-white' : 'bg-cream'}
                    >
                      <td className="px-5 py-3.5 text-sm text-navy font-medium">
                        {slab.label}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate">
                        {slab.rate === 0 ? '0%' : `${ratePct(slab.rate)}%`}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate">
                        {slab.rate === 0
                          ? 'No tax'
                          : slab.baseTax === 0
                          ? `${ratePct(slab.rate)}% of amount over ${fmtRs(slab.over)}`
                          : `${fmtRs(slab.baseTax)} + ${ratePct(slab.rate)}% of amount over ${fmtRs(slab.over)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-light mt-4 leading-relaxed max-w-[700px]">
              Figures are for tax year 2026–2027 and apply to taxable salary
              income. This calculator provides an estimate only and does not
              account for tax credits, rebates, surcharges, or other adjustments.
              Please consult a tax professional for advice specific to your
              circumstances.
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

<section className="py-20 bg-white" aria-label="Salary tax calculator guide">
  <div className="max-w-site mx-auto px-6">
    <div className="max-w-[820px] mx-auto">

      {/* Intro — primary keyword in first 100 words */}
      <div className="mb-14">
        <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
          <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
          Salary Tax Guide
        </div>
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-navy leading-tight mb-5">
          How This <em className="not-italic text-gold">Salary Tax Calculator</em> Works
        </h2>
        <p className="text-[1.0625rem] text-slate leading-[1.8] mb-4">
          Our <strong className="text-navy">salary tax calculator</strong> gives you an instant, accurate
          estimate of the income tax deducted from your monthly or annual salary in Pakistan for tax year
          2026–2027. Simply enter your gross salary and the calculator applies the latest FBR salary tax
          slabs to show your total tax liability, monthly tax deduction, and net take-home pay — all in a
          few seconds, with no sign-up required.
        </p>
        <p className="text-[1.0625rem] text-slate leading-[1.8]">
          Whether you&apos;re a salaried employee planning your monthly budget, an HR or payroll professional
          calculating withholding tax for staff, or simply want to know how much income tax on salary you
          should expect this year, this tool is designed to make Pakistan&apos;s salary tax rules simple to
          understand.
        </p>
      </div>

      {/* Tax laws section */}
      <div className="mb-14">
        <h3 className="font-display text-[1.5rem] font-bold text-navy mb-4">
          Salary Tax Laws in Pakistan — What You Need to Know
        </h3>
        <p className="text-[1rem] text-slate leading-[1.8] mb-4">
          Income tax on salary in Pakistan is governed by the <strong className="text-navy">Income Tax
          Ordinance, 2001</strong>, and is administered by the Federal Board of Revenue (FBR). Salaried
          individuals are taxed under Section 12 of the Ordinance, which treats salary — including basic
          pay, allowances, bonuses, and most benefits-in-kind — as taxable income for the relevant tax year
          (1 July to 30 June).
        </p>
        <p className="text-[1rem] text-slate leading-[1.8] mb-4">
          Pakistan uses a <strong className="text-navy">progressive salary tax slab</strong> system: income
          up to a set threshold is tax-free, and amounts above each slab boundary are taxed at increasing
          rates. Employers are legally required to deduct income tax at source (withholding tax) from
          monthly salary under Section 149, and deposit it with FBR on the employee&apos;s behalf — which is
          why your payslip already reflects tax deductions before you receive your net pay.
        </p>
        <p className="text-[1rem] text-slate leading-[1.8]">
          Key points every salaried taxpayer should know:
        </p>
        <ul className="mt-4 space-y-3">
          {[
            'The tax year runs from 1 July to 30 June, and slab rates are revised through the Finance Act each year.',
            'Filing an annual income tax return is mandatory for salaried persons above the taxable threshold, even if tax has already been withheld by the employer.',
            'Filers (those on the FBR Active Taxpayers List) benefit from lower withholding tax rates on banking transactions, property, and vehicle purchases compared to non-filers.',
            'Certain allowances (e.g. medical allowance up to prescribed limits) may be exempt from tax, which can affect your actual taxable salary.',
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.9375rem] text-slate leading-[1.6]">
              <span className="text-gold font-bold text-lg leading-none mt-0.5">›</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits section */}
      <div className="mb-14">
        <h3 className="font-display text-[1.5rem] font-bold text-navy mb-4">
          Benefits of Using an Online Salary Tax Calculator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: 'Instant, Accurate Results',
              text: 'Get your exact tax liability and take-home pay calculated against the current FBR salary tax slabs — no manual slab-matching or spreadsheet formulas needed.',
            },
            {
              title: 'Better Financial Planning',
              text: 'Knowing your monthly tax deduction in advance helps you budget accurately and plan savings, loan repayments, or major purchases with confidence.',
            },
            {
              title: 'Understand Your Payslip',
              text: 'See exactly how much of your salary goes to income tax versus what you take home, so payslip deductions never come as a surprise.',
            },
            {
              title: 'Free and Always Up to Date',
              text: 'Our income tax calculator Pakistan tool is updated whenever FBR revises salary tax slabs, so you always get results based on the current tax year.',
            },
          ].map((b, i) => (
            <div key={i} className="border border-border rounded-sm p-6 bg-cream/40">
              <h4 className="font-display text-[1.0625rem] font-bold text-navy mb-2">{b.title}</h4>
              <p className="text-[0.875rem] text-slate leading-[1.65]">{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ section — great for featured snippets / People Also Ask */}
      <div className="mb-14">
        <h3 className="font-display text-[1.5rem] font-bold text-navy mb-6">
          Frequently Asked Questions
        </h3>
        <div className="flex flex-col gap-5">
          {[
            {
              q: 'How is income tax calculated on salary in Pakistan?',
              a: 'Income tax on salary is calculated by applying the FBR\u2019s progressive salary tax slabs to your annual taxable salary. Each portion of your income falling within a slab is taxed at that slab\u2019s rate, and the amounts are added together to get your total annual tax liability, which is then divided across 12 months for withholding purposes.',
            },
            {
              q: 'Is this salary tax calculator accurate for tax year 2026–2027?',
              a: 'Yes. The calculator uses the salary tax slabs applicable for the current tax year as notified by FBR, so results reflect up-to-date rates for tax year 2026\u201327.',
            },
            {
              q: 'Do I still need to file a tax return if my employer already deducts tax?',
              a: 'Generally yes. Withholding tax deducted by your employer is only an advance payment of your tax liability \u2014 salaried individuals above the taxable threshold are still required to file an annual income tax return with FBR to formally declare income and remain on the Active Taxpayers List.',
            },
            {
              q: 'What counts as taxable salary income?',
              a: 'Taxable salary typically includes basic pay, cost-of-living allowances, bonuses, commissions, and the cash value of most perquisites and benefits-in-kind, with a few exemptions (such as limited medical allowances) available under the Income Tax Ordinance.',
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-border pb-5">
              <h4 className="font-display text-[1.0625rem] font-bold text-navy mb-2">{item.q}</h4>
              <p className="text-[0.9375rem] text-slate leading-[1.7]">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-navy rounded-sm p-8 md:p-10 text-center">
        <h3 className="font-display text-[1.375rem] font-bold text-white mb-3">
          Need Help With Your Tax Filing or Planning?
        </h3>
        <p className="text-[0.9375rem] text-white/70 leading-[1.7] max-w-[500px] mx-auto mb-7">
          This salary tax calculator gives you a quick estimate — but every income situation is different.
          Our tax specialists at NJV Accountants can review your salary structure, help you claim eligible
          exemptions, and file your annual income tax return correctly and on time.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light hover:-translate-y-px transition-all"
        >
          Talk to a Tax Specialist ›
        </a>
      </div>

    </div>
  </div>
</section>
        {/* CTA */}
        <div className="bg-gold py-16">
          <div className="max-w-site mx-auto px-6 flex items-center justify-between gap-8 flex-wrap">
            <div>
              <div className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-navy leading-[1.3]">
                Need help optimising your tax position?
              </div>
              <div className="text-[0.9375rem] text-navy/70 mt-2">
                Our partners can help you plan ahead and stay compliant.
              </div>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-navy-light transition-colors shrink-0"
            >
              Speak to a Partner &rsaquo;
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
