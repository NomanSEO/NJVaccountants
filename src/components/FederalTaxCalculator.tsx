'use client'

import { useMemo, useState } from 'react'
import CalculatorActions from '@/components/CalculatorActions'
import ResultBarChart from '@/components/ResultBarChart'
import { calculateFederalTax, type FederalTaxInput, type FilingStatus } from '@/lib/federalTax'
import { formatCurrency, formatPercent } from '@/lib/formatters'

const initialInput: FederalTaxInput = {
  filingStatus: 'single',
  grossIncome: 75_000,
  age: 40,
  deductionType: 'standard',
  itemizedDeductions: 0,
  retirementContributions: 0,
  otherAdjustments: 0,
  credits: 0,
  withholding: 0,
  estimatedPayments: 0,
  stateLocalRate: 0,
}

const statusLabels: Record<FilingStatus, string> = {
  single: 'Single',
  marriedSeparate: 'Married filing separately',
  marriedJoint: 'Married filing jointly',
  headOfHousehold: 'Head of household',
}

const currency = (value: number) => formatCurrency(value, 'USD')

export default function FederalTaxCalculator() {
  const [input, setInput] = useState(initialInput)
  const [showDetails, setShowDetails] = useState(false)

  const errors = useMemo(() => {
    const next: Partial<Record<Exclude<keyof FederalTaxInput, 'filingStatus' | 'deductionType'>, string>> = {}
    const fields = Object.entries(input) as [keyof FederalTaxInput, FederalTaxInput[keyof FederalTaxInput]][]

    fields.forEach(([field, value]) => {
      if (field !== 'filingStatus' && field !== 'deductionType' && typeof value === 'number' && value < 0) {
        next[field] = 'Enter zero or a positive amount.'
      }
    })
    if (input.stateLocalRate > 1) next.stateLocalRate = 'Enter a rate between 0% and 100%.'

    return next
  }, [input])
  const isInvalid = Object.keys(errors).length > 0
  const result = useMemo(() => calculateFederalTax(input), [input])

  const setNumber = (field: Exclude<keyof FederalTaxInput, 'filingStatus' | 'deductionType'>, value: string) => {
    const parsed = Number(value)
    setInput((current) => ({ ...current, [field]: Number.isFinite(parsed) ? parsed : 0 }))
  }

  const csvRows = [
    ['Federal Income Tax Estimate 2026', 'Amount'],
    ['Filing status', statusLabels[input.filingStatus]],
    ['Gross income', result.adjustedIncome + input.retirementContributions + input.otherAdjustments],
    ['Adjusted income', result.adjustedIncome],
    ['Deduction', result.deduction],
    ['Taxable income', result.taxableIncome],
    ['Federal income tax', result.federalTax],
    ['State/local estimate', result.stateLocalEstimate],
    ['Total estimated tax', result.totalTax],
    [input.withholding + input.estimatedPayments - result.federalTax >= 0 ? 'Estimated federal refund' : 'Estimated federal balance due', Math.abs(input.withholding + input.estimatedPayments - result.federalTax)],
    ['State/local payments', 'Not included in this estimate'],
    [],
    ['Bracket rate', 'Taxable income in bracket', 'Tax'],
    ...result.bracketBreakdown.map((bracket) => [formatPercent(bracket.rate), bracket.taxableAmount, bracket.tax]),
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <section className="bg-white border border-border rounded-sm p-7 md:p-8 shadow-sm" aria-labelledby="federal-tax-inputs">
        <h2 id="federal-tax-inputs" className="font-display text-[1.5rem] font-bold text-navy">Your tax details</h2>
        <p className="mt-2 text-sm text-slate leading-relaxed">Enter annual amounts in U.S. dollars. This tool provides a federal tax estimate, not tax advice.</p>

        <div className="mt-7 space-y-5">
          <label className="block">
            <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-slate mb-2">Filing status</span>
            <select value={input.filingStatus} onChange={(event) => setInput((current) => ({ ...current, filingStatus: event.target.value as FilingStatus }))} className="w-full bg-cream border border-border rounded-sm px-4 py-3 text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
              {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumberField id="gross-income" label="Gross annual income" value={input.grossIncome} onChange={(value) => setNumber('grossIncome', value)} error={errors.grossIncome} />
            <NumberField id="age" label="Age" value={input.age} onChange={(value) => setNumber('age', value)} prefix="" error={errors.age} />
          </div>

          <fieldset>
            <legend className="text-xs font-semibold tracking-[0.08em] uppercase text-slate mb-2">Deduction method</legend>
            <div className="flex flex-wrap gap-4">
              {(['standard', 'itemized'] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                  <input type="radio" name="deductionType" checked={input.deductionType === type} onChange={() => setInput((current) => ({ ...current, deductionType: type }))} className="accent-gold" />
                  {type === 'standard' ? 'Standard deduction' : 'Itemized deductions'}
                </label>
              ))}
            </div>
          </fieldset>
          {input.deductionType === 'itemized' && <NumberField id="itemized-deductions" label="Itemized deductions" value={input.itemizedDeductions} onChange={(value) => setNumber('itemizedDeductions', value)} error={errors.itemizedDeductions} />}

          <button type="button" onClick={() => setShowDetails((shown) => !shown)} className="text-sm font-semibold text-navy hover:text-gold-dark">
            {showDetails ? '− Hide additional details' : '+ Add contributions, credits and payments'}
          </button>
          {showDetails && <div className="grid grid-cols-1 gap-5 border-t border-border pt-5 sm:grid-cols-2">
            <NumberField id="retirement" label="Retirement contributions" value={input.retirementContributions} onChange={(value) => setNumber('retirementContributions', value)} error={errors.retirementContributions} />
            <NumberField id="adjustments" label="Other adjustments" value={input.otherAdjustments} onChange={(value) => setNumber('otherAdjustments', value)} error={errors.otherAdjustments} />
            <NumberField id="credits" label="Non-refundable credits" value={input.credits} onChange={(value) => setNumber('credits', value)} error={errors.credits} />
            <NumberField id="withholding" label="Federal tax withheld" value={input.withholding} onChange={(value) => setNumber('withholding', value)} error={errors.withholding} />
            <NumberField id="estimated-payments" label="Estimated federal tax payments" value={input.estimatedPayments} onChange={(value) => setNumber('estimatedPayments', value)} error={errors.estimatedPayments} />
            <NumberField id="state-local-rate" label="State/local tax rate" value={input.stateLocalRate * 100} onChange={(value) => setNumber('stateLocalRate', String(Number(value) / 100))} suffix="%" error={errors.stateLocalRate} />
          </div>}
        </div>
      </section>

      <section className="bg-navy rounded-sm p-7 md:p-8 text-white relative overflow-hidden" aria-labelledby="federal-tax-results">
        <div className="hero-pattern" />
        <div className="relative">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-4"><span className="block w-[3px] h-[18px] bg-gold" />2026 estimate</div>
          <h2 id="federal-tax-results" className="font-display text-[1.5rem] font-bold">Your estimated taxes</h2>
          <p className="mt-2 text-sm text-white/65">Estimated only; your actual return may differ.</p>
          <div className="grid grid-cols-2 gap-4 mt-7">
            <Result label="Federal income tax" value={currency(result.federalTax)} accent />
            <Result label="Federal + state/local estimate" value={currency(result.totalTax)} />
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-sm overflow-hidden mt-6">
            <Stat label="Taxable income" value={currency(result.taxableIncome)} />
            <Stat label="State/local estimate" value={currency(result.stateLocalEstimate)} />
            <Stat label="Effective rate" value={formatPercent(result.effectiveRate)} />
            <Stat label="Marginal rate" value={formatPercent(result.marginalRate)} />
          </div>
          <div className="mt-6 border border-gold/40 bg-white/5 p-4">
            <div className="text-[0.7rem] tracking-[0.08em] uppercase text-white/50">{input.withholding + input.estimatedPayments - result.federalTax >= 0 ? 'Estimated federal refund' : 'Estimated federal balance due'}</div>
            <div className="font-display text-2xl font-bold text-gold mt-1">{currency(Math.abs(input.withholding + input.estimatedPayments - result.federalTax))}</div>
            <p className="mt-2 text-xs leading-relaxed text-white/55">State/local taxes are a separate estimate and are not included because no state/local payments are entered.</p>
          </div>
        </div>
      </section>

      <section className="lg:col-span-2 bg-white border border-border rounded-sm p-7 md:p-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ResultBarChart title="Tax by federal bracket" items={result.bracketBreakdown.map((bracket) => ({ name: `${formatPercent(bracket.rate)} bracket`, value: bracket.tax, formattedValue: currency(bracket.tax) }))} />
          <div>
            <h3 className="font-display text-xl font-bold text-navy">Bracket breakdown</h3>
            <div className="overflow-x-auto mt-4 border border-border rounded-sm">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead className="bg-cream text-navy"><tr><th className="px-4 py-3">Rate</th><th className="px-4 py-3">Income taxed</th><th className="px-4 py-3">Tax</th></tr></thead>
                <tbody>{result.bracketBreakdown.length ? result.bracketBreakdown.map((bracket) => <tr key={bracket.rate} className="border-t border-border"><td className="px-4 py-3 text-slate">{formatPercent(bracket.rate)}</td><td className="px-4 py-3 text-slate">{currency(bracket.taxableAmount)}</td><td className="px-4 py-3 font-semibold text-navy">{currency(bracket.tax)}</td></tr>) : <tr><td colSpan={3} className="px-4 py-5 text-slate">No federal income tax is estimated at this taxable income.</td></tr>}</tbody>
              </table>
            </div>
            <fieldset disabled={isInvalid} className="mt-6 disabled:opacity-50"><CalculatorActions filename="federal-tax-estimate.csv" rows={csvRows} shareTitle="Federal income tax estimate" /></fieldset>
          </div>
        </div>
      </section>
    </div>
  )
}

function NumberField({ id, label, value, onChange, prefix = '$', suffix, error }: { id: string; label: string; value: number; onChange: (value: string) => void; prefix?: string; suffix?: string; error?: string }) {
  const errorId = `${id}-error`
  return <label className="block"><span className="block text-xs font-semibold tracking-[0.08em] uppercase text-slate mb-2">{label}</span><div className="relative">{prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate">{prefix}</span>}<input id={id} type="number" min="0" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`w-full bg-cream border rounded-sm py-3 text-navy outline-none focus:ring-2 focus:ring-gold/20 ${error ? 'border-gold focus:border-gold' : 'border-border focus:border-gold'} ${prefix ? 'pl-8 pr-4' : suffix ? 'pl-4 pr-8' : 'px-4'}`} />{suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate">{suffix}</span>}</div>{error && <span id={errorId} className="block mt-2 text-xs text-gold-dark" role="alert">{error}</span>}</label>
}

function Result({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div><div className="text-[0.7rem] tracking-[0.08em] uppercase text-white/50 mb-1">{label}</div><div className={`font-display text-[1.6rem] font-bold leading-tight ${accent ? 'text-gold' : 'text-white'}`}>{value}</div></div>
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-navy p-4"><div className="text-[0.65rem] tracking-[0.08em] uppercase text-white/45 mb-1">{label}</div><div className="font-semibold text-white">{value}</div></div>
}
