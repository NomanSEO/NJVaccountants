'use client'

import { useMemo, useState } from 'react'
import CalculatorActions from '@/components/CalculatorActions'
import ResultBarChart from '@/components/ResultBarChart'
import { formatCurrency, type CurrencyCode } from '@/lib/formatters'
import { calculateLoanSchedule, type LoanScheduleInput } from '@/lib/loanSchedule'

const initial = {
  currency: 'USD' as CurrencyCode,
  principal: '10000',
  annualRate: '9.5',
  termYears: '3',
  originationFee: '250',
}

const fieldClass = 'w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'
const number = (value: string) => Number(value) || 0

export default function PersonalLoanCalculator() {
  const [values, setValues] = useState(initial)
  const [compare, setCompare] = useState(false)
  const [offer, setOffer] = useState({ annualRate: '7.5', termYears: '3', originationFee: '0' })
  const [showAll, setShowAll] = useState(false)
  const update = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => setValues((current) => ({ ...current, [key]: value }))
  const updateOffer = <K extends keyof typeof offer>(key: K, value: (typeof offer)[K]) => setOffer((current) => ({ ...current, [key]: value }))

  const errors = useMemo(() => {
    const next: Partial<Record<string, string>> = {}
    if (number(values.principal) <= 0) next.principal = 'Loan amount must be greater than zero.'
    if (number(values.annualRate) < 0 || number(values.annualRate) > 100) next.annualRate = 'Enter a rate from 0% to 100%.'
    if (number(values.termYears) <= 0 || number(values.termYears) > 50) next.termYears = 'Enter a term from 1 to 50 years.'
    if (number(values.originationFee) < 0) next.originationFee = 'Enter an amount of zero or more.'
    if (compare && (number(offer.annualRate) < 0 || number(offer.annualRate) > 100)) next.offerRate = 'Enter a rate from 0% to 100%.'
    if (compare && (number(offer.termYears) <= 0 || number(offer.termYears) > 50)) next.offerTerm = 'Enter a term from 1 to 50 years.'
    if (compare && number(offer.originationFee) < 0) next.offerFee = 'Enter an amount of zero or more.'
    return next
  }, [values, offer, compare])

  const makeInput = (rate: string, term: string, fee: string): LoanScheduleInput => ({
    currency: values.currency,
    principal: number(values.principal),
    annualRate: number(rate) / 100,
    termMonths: number(term) * 12,
    financedFees: number(fee),
    loanType: 'repayment',
    deferredMonths: 0,
    balloonAmount: 0,
  })
  const input = useMemo(() => makeInput(values.annualRate, values.termYears, values.originationFee), [values])
  const result = useMemo(() => calculateLoanSchedule(input), [input])
  const comparison = useMemo(() => calculateLoanSchedule(makeInput(offer.annualRate, offer.termYears, offer.originationFee)), [values.currency, values.principal, offer])
  const valid = Object.keys(errors).length === 0
  const visible = showAll ? result.schedule : result.schedule.slice(0, 12)
  const csvRows = result.csvRows.map((row) => [row.period, formatCurrency(row.payment, values.currency), formatCurrency(row.principal, values.currency), formatCurrency(row.interest, values.currency), formatCurrency(row.endingBalance, values.currency)])

  return <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
    <form className="rounded-sm border border-border bg-white p-7 shadow-sm md:p-8" noValidate>
      <h2 className="font-display text-2xl font-bold text-navy">Loan details</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">Estimate repayment costs and compare a second personal loan offer.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Currency" id="currency"><select id="currency" value={values.currency} onChange={(event) => update('currency', event.target.value as CurrencyCode)} className={fieldClass}><option value="USD">USD</option><option value="GBP">GBP</option><option value="EUR">EUR</option></select></Field>
        <NumberField label="Loan amount" id="principal" value={values.principal} error={errors.principal} onChange={(value) => update('principal', value)} />
        <NumberField label="APR (%)" id="annualRate" value={values.annualRate} error={errors.annualRate} step="0.01" onChange={(value) => update('annualRate', value)} />
        <NumberField label="Term (years)" id="termYears" value={values.termYears} error={errors.termYears} onChange={(value) => update('termYears', value)} />
        <NumberField label="Origination fee (financed)" id="originationFee" value={values.originationFee} error={errors.originationFee} onChange={(value) => update('originationFee', value)} />
      </div>
      <label className="mt-7 flex cursor-pointer items-center gap-3 border-t border-border pt-6 text-sm font-semibold text-navy"><input type="checkbox" checked={compare} onChange={(event) => setCompare(event.target.checked)} className="h-4 w-4 accent-gold" />Compare a second offer</label>
      {compare && <div className="mt-4 grid gap-4 sm:grid-cols-2"><NumberField label="Offer APR (%)" id="offerRate" value={offer.annualRate} error={errors.offerRate} step="0.01" onChange={(value) => updateOffer('annualRate', value)} /><NumberField label="Offer term (years)" id="offerTerm" value={offer.termYears} error={errors.offerTerm} onChange={(value) => updateOffer('termYears', value)} /><NumberField label="Offer origination fee" id="offerFee" value={offer.originationFee} error={errors.offerFee} onChange={(value) => updateOffer('originationFee', value)} /></div>}
    </form>

    <section className="rounded-sm bg-navy p-7 text-white md:p-8" aria-live="polite" aria-labelledby="loan-results">
      <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">Your estimate</p><h2 id="loan-results" className="mt-2 font-display text-2xl font-bold">Personal loan repayment</h2>
      {!valid ? <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm">Correct the highlighted fields to see your estimate.</p> : <><div className="mt-7 grid gap-4 sm:grid-cols-2"><Stat label="Monthly payment" value={formatCurrency(result.periodicPayment, values.currency)} prominent /><Stat label="Amount financed" value={formatCurrency(result.financedAmount, values.currency)} /><Stat label="Net cash received" value={formatCurrency(number(values.principal), values.currency)} /><Stat label="Total interest" value={formatCurrency(result.totalInterest, values.currency)} /><Stat label="Total repayment" value={formatCurrency(result.totalCost, values.currency)} /></div><p className="mt-5 text-xs leading-relaxed text-white/55">The origination fee is added to your financed balance. Your lender may charge other fees or use different rounding.</p></>}
    </section>

    {valid && compare && <section className="rounded-sm border border-border bg-white p-7 lg:col-span-2"><h2 className="font-display text-2xl font-bold text-navy">Offer comparison</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><OfferCard name="Your offer" result={result} currency={values.currency} /><OfferCard name="Alternative offer" result={comparison} currency={values.currency} /></div></section>}
    {valid && <section className="space-y-8 rounded-sm border border-border bg-white p-7 lg:col-span-2 md:p-8"><ResultBarChart title="What you repay" items={[{ name: 'Loan amount', value: number(values.principal), formattedValue: formatCurrency(number(values.principal), values.currency) }, { name: 'Interest', value: result.totalInterest, formattedValue: formatCurrency(result.totalInterest, values.currency) }, { name: 'Financed fee', value: number(values.originationFee), formattedValue: formatCurrency(number(values.originationFee), values.currency) }]} />
      <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-bold text-navy">Repayment schedule</h2><p className="mt-1 text-sm text-slate">See how each monthly payment reduces the balance.</p></div><CalculatorActions filename="personal-loan-schedule.csv" shareTitle="Personal loan calculator estimate" rows={[["Month", "Payment", "Principal", "Interest", "Balance"], ...csvRows]} /></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><caption className="sr-only">Personal loan repayment schedule</caption><thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate"><tr>{['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map((label) => <th key={label} scope="col" className="px-3 py-3 font-semibold">{label}</th>)}</tr></thead><tbody>{visible.map((row) => <tr key={row.period} className="border-b border-border/70"><th scope="row" className="px-3 py-3 font-medium text-navy">{row.period}</th><td className="px-3 py-3 text-slate">{formatCurrency(row.payment, values.currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.principal, values.currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.interest, values.currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.endingBalance, values.currency)}</td></tr>)}</tbody></table></div>
      {result.schedule.length > 12 && <button type="button" onClick={() => setShowAll((current) => !current)} className="border border-border px-4 py-2 text-xs font-semibold tracking-[.08em] uppercase text-navy hover:border-gold hover:text-gold-dark">{showAll ? 'Show first 12' : 'Show all'}</button>}
    </section>}
  </div>
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) { return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate">{label}</label>{children}</div> }
function NumberField({ label, id, value, error, onChange, step = '1' }: { label: string; id: string; value: string; error?: string; onChange: (value: string) => void; step?: string }) { const errorId = `${id}-error`; return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate">{label}</label><input id={id} type="number" inputMode="decimal" min="0" step={step} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`${fieldClass} ${error ? 'border-gold' : ''}`} />{error && <p id={errorId} className="mt-1 text-xs text-gold-dark" role="alert">{error}</p>}</div> }
function Stat({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) { return <div className={`rounded-sm p-4 ${prominent ? 'bg-gold text-navy sm:col-span-2' : 'bg-white/10'}`}><p className={`text-[.65rem] font-semibold tracking-[.08em] uppercase ${prominent ? 'text-navy/65' : 'text-white/50'}`}>{label}</p><p className={`mt-1 font-display font-bold ${prominent ? 'text-3xl' : 'text-xl text-white'}`}>{value}</p></div> }
function OfferCard({ name, result, currency }: { name: string; result: ReturnType<typeof calculateLoanSchedule>; currency: CurrencyCode }) { return <div className="rounded-sm bg-cream p-5"><h3 className="font-display text-xl font-bold text-navy">{name}</h3><dl className="mt-4 grid gap-3 text-sm"><Row label="Monthly payment" value={formatCurrency(result.periodicPayment, currency)} /><Row label="Total interest" value={formatCurrency(result.totalInterest, currency)} /><Row label="Total repayment" value={formatCurrency(result.totalCost, currency)} /></dl></div> }
function Row({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-4"><dt className="text-slate">{label}</dt><dd className="font-semibold text-navy">{value}</dd></div> }
