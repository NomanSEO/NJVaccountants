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
