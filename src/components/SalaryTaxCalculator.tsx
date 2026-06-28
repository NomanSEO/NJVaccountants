'use client'

import { useMemo, useState } from 'react'
import { calculateSalaryTax } from '@/lib/salaryTax'

type Period = 'monthly' | 'annual'

const fmt = (n: number) =>
  'Rs. ' + Math.round(n).toLocaleString('en-PK')

const pct = (n: number) => (n * 100).toFixed(2) + '%'

export default function SalaryTaxCalculator() {
  const [rawValue, setRawValue] = useState('')
  const [period, setPeriod] = useState<Period>('monthly')

  const numericValue = useMemo(() => {
    const cleaned = rawValue.replace(/[^0-9.]/g, '')
    return cleaned === '' ? null : parseFloat(cleaned)
  }, [rawValue])

  const annualIncome =
    numericValue == null ? 0 : period === 'monthly' ? numericValue * 12 : numericValue

  const result = useMemo(() => calculateSalaryTax(annualIncome), [annualIncome])
  const hasInput = numericValue != null && numericValue > 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Input panel ── */}
      <div className="bg-white border border-border rounded-sm p-7 md:p-8 shadow-[0_8px_30px_rgba(11,31,58,0.05)]">
        <h2 className="font-display text-[1.375rem] font-bold text-navy mb-1.5">
          Your Salary
        </h2>
        <p className="text-sm text-slate mb-6 leading-relaxed">
          Enter your taxable salary income to estimate your income tax for tax
          year 2026–2027.
        </p>

        {/* Period toggle */}
        <div className="inline-flex p-1 bg-cream border border-border rounded-sm mb-5">
          {(['monthly', 'annual'] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-5 py-2 text-[0.8125rem] font-semibold tracking-[0.04em] uppercase rounded-sm transition-colors ${
                period === p
                  ? 'bg-navy text-white'
                  : 'bg-transparent text-slate hover:text-navy'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Amount field */}
        <label
          htmlFor="salary"
          className="block text-xs font-semibold tracking-[0.08em] uppercase text-slate mb-2"
        >
          {period === 'monthly' ? 'Monthly' : 'Annual'} Taxable Salary
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate font-semibold pointer-events-none">
            Rs.
          </span>
          <input
            id="salary"
            inputMode="decimal"
            placeholder="0"
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-lg font-semibold text-navy bg-cream border border-border rounded-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
          />
        </div>

        {period === 'monthly' && hasInput && (
          <p className="text-[0.8125rem] text-slate-light mt-3">
            Annual taxable income: <strong className="text-navy">{fmt(annualIncome)}</strong>
          </p>
        )}

        <p className="text-xs text-slate-light mt-6 leading-relaxed border-t border-border pt-4">
          This is an estimate based on the published salary tax slabs for tax year
          2026–2027 and assumes the full amount is taxable salary income. For
          tailored advice,{' '}
          <a href="/#contact" className="text-gold font-semibold hover:text-gold-dark">
            speak to a partner
          </a>
          .
        </p>
      </div>

      {/* ── Results panel ── */}
      <div className="bg-navy rounded-sm p-7 md:p-8 text-white relative overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-6">
            <span className="block w-[3px] h-[18px] bg-gold shrink-0" />
            Your Estimate
          </div>

          {/* Headline numbers */}
          <div className="grid grid-cols-2 gap-4 mb-7">
            <div>
              <div className="text-[0.7rem] tracking-[0.08em] uppercase text-white/50 mb-1">
                Tax / {period === 'monthly' ? 'Month' : 'Year'}
              </div>
              <div className="font-display text-[1.75rem] font-bold text-gold leading-tight">
                {fmt(period === 'monthly' ? result.monthlyTax : result.annualTax)}
              </div>
            </div>
            <div>
              <div className="text-[0.7rem] tracking-[0.08em] uppercase text-white/50 mb-1">
                Take-home / {period === 'monthly' ? 'Month' : 'Year'}
              </div>
              <div className="font-display text-[1.75rem] font-bold text-white leading-tight">
                {fmt(period === 'monthly' ? result.monthlyTakeHome : result.annualTakeHome)}
              </div>
            </div>
          </div>

          {/* Secondary stats */}
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden mb-7">
            <Stat label="Annual Tax" value={fmt(result.annualTax)} />
            <Stat label="Annual Take-home" value={fmt(result.annualTakeHome)} />
            <Stat label="Effective Rate" value={pct(result.effectiveRate)} />
            <Stat label="Marginal Rate" value={pct(result.marginalRate)} />
          </div>

          {/* Slab breakdown */}
          <div className="text-[0.7rem] tracking-[0.08em] uppercase text-white/50 mb-3">
            Slab-wise Breakdown
          </div>
          {result.breakdown.length === 0 ? (
            <p className="text-sm text-white/60 leading-relaxed">
              No tax payable — taxable income is within the tax-free threshold of
              Rs. 600,000.
            </p>
          ) : (
            <div className="space-y-2.5">
              {result.breakdown.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center justify-between text-sm border-b border-white/10 pb-2.5 last:border-0"
                >
                  <div>
                    <div className="text-white/85">{b.label}</div>
                    <div className="text-[0.7rem] text-white/45">
                      {+b.ratePercent.toFixed(2)}% on {fmt(b.taxableInSlab)}
                    </div>
                  </div>
                  <div className="font-semibold text-gold shrink-0 ml-4">
                    {fmt(b.taxInSlab)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-navy p-4">
      <div className="text-[0.65rem] tracking-[0.08em] uppercase text-white/45 mb-1">
        {label}
      </div>
      <div className="font-semibold text-white">{value}</div>
    </div>
  )
}
