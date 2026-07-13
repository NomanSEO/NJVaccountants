import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import RothIraCalculator from '@/components/RothIraCalculator'

export const metadata: Metadata = {
  title: 'Roth IRA Calculator 2026 | NJV Accountants',
  description: 'Calculate your 2026 Roth IRA contribution eligibility, income phase-out, and potential tax-free retirement growth.',
}

export default function RothIraCalculatorPage() {
  return <><Navbar /><main>
    <section className="bg-navy pt-[70px]"><div className="mx-auto max-w-site px-6 py-16"><Link href="/calculators" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gold/70 no-underline transition-colors hover:text-gold">← All Calculators</Link><div className="mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[.12em] uppercase text-gold"><span className="block h-[22px] w-[3px] shrink-0 bg-gold" />Retirement planning</div><h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-tight text-white">Roth IRA <em className="not-italic text-gold">Calculator</em></h1><p className="mt-5 max-w-[620px] text-[1.0625rem] leading-[1.75] text-white/65">Check your 2026 Roth IRA eligibility and see how tax-free growth could support your retirement goals.</p></div></section>
    <section className="bg-cream py-16"><div className="mx-auto max-w-site px-6"><RothIraCalculator /></div></section>
    <section className="bg-white py-16"><div className="mx-auto max-w-site px-6"><div className="max-w-3xl"><p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">2026 Roth IRA rules</p><h2 className="mt-4 font-display text-3xl font-bold text-navy">How the Roth IRA Calculator works</h2><div className="mt-4 space-y-4 leading-relaxed text-slate"><p>A Roth IRA is funded with after-tax dollars. Subject to IRS rules, qualified withdrawals can be tax-free, which makes a Roth IRA useful for long-term retirement planning.</p><p>For 2026, the contribution limit is $7,500, or $8,600 for people aged 50 or over. Eligibility is reduced or eliminated at higher modified adjusted gross income levels. This Roth IRA calculator applies the 2026 phase-out ranges for the selected filing status.</p><p>Your projected balance depends on your contributions, investment return, and time invested. Inflation reduces future purchasing power, so this page also shows the projection in today’s dollars. It is an educational estimate; verify eligibility and tax treatment with current IRS guidance or a qualified adviser.</p></div></div></div></section>
    <section className="bg-gold py-16"><div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-8 px-6"><div><h2 className="font-display text-2xl font-bold text-navy">Ready to plan for retirement?</h2><p className="mt-2 text-sm text-navy/70">Our advisers can help you make informed long-term financial decisions.</p></div><Link href="/#contact" className="shrink-0 rounded-sm bg-navy px-8 py-3.5 text-sm font-semibold tracking-[.05em] text-white uppercase no-underline transition-colors hover:bg-navy-light">Speak to a Partner ›</Link></div></section>
  </main><Footer /></>
}
