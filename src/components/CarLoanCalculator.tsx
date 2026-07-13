'use client'

import { useMemo, useState } from 'react'
import CalculatorActions from '@/components/CalculatorActions'
import ResultBarChart from '@/components/ResultBarChart'
import { formatCurrency, type CurrencyCode } from '@/lib/formatters'
import { calculateLoanSchedule } from '@/lib/loanSchedule'

const initialValues = {
  currency: 'USD' as CurrencyCode,
  vehiclePrice: '35000',
  salesTax: '7',
  fees: '500',
  downPayment: '5000',
  tradeInValue: '0',
  tradeInBalance: '0',
  apr: '6.5',
  termMonths: '60',
  balloon: '0',
}

const inputClass = 'w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'
const numberValue = (value: string) => Number(value) || 0

export default function CarLoanCalculator() {
  const [values, setValues] = useState(initialValues)
  const [showAll, setShowAll] = useState(false)

  const vehiclePrice = numberValue(values.vehiclePrice)
  const salesTaxAmount = vehiclePrice * numberValue(values.salesTax) / 100
  const principal = vehiclePrice + salesTaxAmount + numberValue(values.fees) - numberValue(values.downPayment) - numberValue(values.tradeInValue) + numberValue(values.tradeInBalance)
  const errors = useMemo(() => {
    const next: Partial<Record<keyof typeof values, string>> = {}
    ;(['vehiclePrice', 'salesTax', 'fees', 'downPayment', 'tradeInValue', 'tradeInBalance', 'apr', 'termMonths', 'balloon'] as const).forEach((key) => {
      if (numberValue(values[key]) < 0) next[key] = 'Enter zero or a positive amount.'
    })
    if (vehiclePrice <= 0) next.vehiclePrice = 'Enter a vehicle price greater than zero.'
    if (numberValue(values.apr) > 100) next.apr = 'Enter a rate between 0% and 100%.'
    if (numberValue(values.termMonths) <= 0) next.termMonths = 'Enter a loan term greater than zero.'
    if (principal <= 0) next.downPayment = 'Your credits cannot exceed the vehicle cost.'
    if (numberValue(values.balloon) >= Math.max(0, principal)) next.balloon = 'Balloon must be smaller than the amount financed.'
    return next
  }, [values, principal, vehiclePrice])

  const result = useMemo(() => calculateLoanSchedule({
    currency: values.currency,
    principal: Math.max(0, principal),
    financedFees: 0,
    annualRate: numberValue(values.apr) / 100,
    termMonths: numberValue(values.termMonths),
    loanType: 'repayment',
    deferredMonths: 0,
    balloonAmount: numberValue(values.balloon),
  }), [values, principal])
  const isValid = Object.keys(errors).length === 0
  const update = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => setValues((current) => ({ ...current, [key]: value }))
  const schedule = showAll ? result.schedule : result.schedule.slice(0, 12)
  const csvRows = result.csvRows.map((row) => [row.period, formatCurrency(row.payment, values.currency), formatCurrency(row.principal, values.currency), formatCurrency(row.interest, values.currency), formatCurrency(row.endingBalance, values.currency)])

  return <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
    <form className="rounded-sm border border-border bg-white p-7 shadow-sm md:p-8" noValidate>
      <h2 className="font-display text-2xl font-bold text-navy">Vehicle and loan details</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">Include taxes, dealer fees, and trade-in details for a more useful estimate.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Currency" id="currency"><select id="currency" value={values.currency} onChange={(event) => update('currency', event.target.value as CurrencyCode)} className={inputClass}><option value="USD">USD</option><option value="GBP">GBP</option><option value="EUR">EUR</option></select></Field>
        <NumberField label="Vehicle price" id="vehiclePrice" value={values.vehiclePrice} error={errors.vehiclePrice} onChange={(value) => update('vehiclePrice', value)} />
        <NumberField label="Sales tax (%)" id="salesTax" value={values.salesTax} error={errors.salesTax} onChange={(value) => update('salesTax', value)} step="0.01" />
        <NumberField label="Fees" id="fees" value={values.fees} error={errors.fees} onChange={(value) => update('fees', value)} />
        <NumberField label="Down payment" id="downPayment" value={values.downPayment} error={errors.downPayment} onChange={(value) => update('downPayment', value)} />
        <NumberField label="Trade-in value" id="tradeInValue" value={values.tradeInValue} error={errors.tradeInValue} onChange={(value) => update('tradeInValue', value)} />
        <NumberField label="Trade-in loan balance" id="tradeInBalance" value={values.tradeInBalance} error={errors.tradeInBalance} onChange={(value) => update('tradeInBalance', value)} />
        <NumberField label="APR (%)" id="apr" value={values.apr} error={errors.apr} onChange={(value) => update('apr', value)} step="0.01" />
        <NumberField label="Term (months)" id="termMonths" value={values.termMonths} error={errors.termMonths} onChange={(value) => update('termMonths', value)} />
        <NumberField label="Final balloon payment" id="balloon" value={values.balloon} error={errors.balloon} onChange={(value) => update('balloon', value)} />
      </div>
    </form>

    <section className="rounded-sm bg-navy p-7 text-white md:p-8" aria-live="polite" aria-labelledby="car-loan-results">
      <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">Your estimate</p><h2 id="car-loan-results" className="mt-2 font-display text-2xl font-bold">Car loan payment</h2>
      {!isValid ? <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm">Correct the highlighted fields to see your estimate.</p> : <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Stat label="Estimated monthly payment" value={formatCurrency(result.periodicPayment, values.currency)} prominent />
        <Stat label="Amount financed" value={formatCurrency(result.financedAmount, values.currency)} />
        <Stat label="Total interest" value={formatCurrency(result.totalInterest, values.currency)} />
        <Stat label="Total paid" value={formatCurrency(result.totalCost, values.currency)} />
        {result.balloonDue > 0 && <Stat label="Balloon due at end" value={formatCurrency(result.balloonDue, values.currency)} />}
      </div>}
      <p className="mt-5 text-xs leading-relaxed text-white/55">This estimate excludes lender-specific charges and may differ from a final finance offer.</p>
    </section>

    {isValid && <section className="space-y-8 rounded-sm border border-border bg-white p-7 lg:col-span-2 md:p-8">
      <ResultBarChart title="Finance cost breakdown" items={[{ name: 'Amount financed', value: result.financedAmount, formattedValue: formatCurrency(result.financedAmount, values.currency) }, { name: 'Interest', value: result.totalInterest, formattedValue: formatCurrency(result.totalInterest, values.currency) }]} />
      <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-bold text-navy">Payment schedule</h2><p className="mt-1 text-sm text-slate">How your payment reduces the balance each month.</p></div><CalculatorActions filename="car-loan-schedule.csv" shareTitle="Car loan calculator estimate" rows={[["Month", "Payment", "Principal", "Interest", "Balance"], ...csvRows]} /></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><caption className="sr-only">Car loan payment schedule</caption><thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate"><tr>{['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map((label) => <th key={label} scope="col" className="px-3 py-3 font-semibold">{label}</th>)}</tr></thead><tbody>{schedule.map((row) => <tr key={row.period} className="border-b border-border/70"><th scope="row" className="px-3 py-3 font-medium text-navy">{row.period}</th><td className="px-3 py-3 text-slate">{formatCurrency(row.payment, values.currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.principal, values.currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.interest, values.currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.endingBalance, values.currency)}</td></tr>)}</tbody></table></div>
      {result.schedule.length > 12 && <button type="button" onClick={() => setShowAll((current) => !current)} className="border border-border px-4 py-2 text-xs font-semibold tracking-[.08em] uppercase text-navy hover:border-gold hover:text-gold-dark">{showAll ? 'Show first 12' : 'Show all'}</button>}
    </section>}
  </div>
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) { return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate">{label}</label>{children}</div> }
function NumberField({ label, id, value, error, onChange, step = '1' }: { label: string; id: string; value: string; error?: string; onChange: (value: string) => void; step?: string }) { const errorId = `${id}-error`; return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate">{label}</label><input id={id} type="number" inputMode="decimal" min="0" step={step} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`${inputClass} ${error ? 'border-gold' : ''}`} />{error && <p id={errorId} className="mt-1 text-xs text-gold-dark" role="alert">{error}</p>}</div> }
function Stat({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) { return <div className={`rounded-sm p-4 ${prominent ? 'bg-gold text-navy sm:col-span-2' : 'bg-white/10'}`}><p className={`text-[.65rem] font-semibold tracking-[.08em] uppercase ${prominent ? 'text-navy/65' : 'text-white/50'}`}>{label}</p><p className={`mt-1 font-display font-bold ${prominent ? 'text-3xl' : 'text-xl text-white'}`}>{value}</p></div> }
