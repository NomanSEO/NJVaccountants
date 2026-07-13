'use client'

import { useMemo, useState } from 'react'
import CalculatorActions from '@/components/CalculatorActions'
import ResultBarChart from '@/components/ResultBarChart'
import { formatCurrency, type CurrencyCode } from '@/lib/formatters'

const inputClass = 'w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'
const number = (value: string) => Number(value) || 0

export default function CDCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD')
  const [deposit, setDeposit] = useState('10000')
  const [apy, setApy] = useState('4.25')
  const [years, setYears] = useState('5')
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly')
  const [showAll, setShowAll] = useState(false)
  const principal = number(deposit)
  const rate = number(apy) / 100
  const term = number(years)
  const valid = principal > 0 && rate >= 0 && rate <= 100 && term > 0
  const result = useMemo(() => {
    const periods = Math.round(term * (frequency === 'monthly' ? 12 : 1))
    const compounds = frequency === 'monthly' ? 12 : 1
    const balance = valid ? principal * Math.pow(1 + rate / compounds, periods) : 0
    const rows = Array.from({ length: Math.ceil(term) }, (_, index) => {
      const completed = Math.min(index + 1, term)
      const value = principal * Math.pow(1 + rate / compounds, completed * compounds)
      return { year: index + 1, balance: value, interest: value - principal }
    })
    return { balance, interest: balance - principal, rows }
  }, [frequency, principal, rate, term, valid])
  const visible = showAll ? result.rows : result.rows.slice(0, 12)

  return <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
    <form className="rounded-sm border border-border bg-white p-7 shadow-sm md:p-8" noValidate>
      <h2 className="font-display text-2xl font-bold text-navy">CD details</h2><p className="mt-2 text-sm leading-relaxed text-slate">Estimate the value of one fixed deposit at maturity.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Currency" id="cd-currency"><select id="cd-currency" value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)} className={inputClass}><option value="USD">USD</option><option value="GBP">GBP</option><option value="EUR">EUR</option></select></Field>
        <Field label="Compounding" id="cd-frequency"><select id="cd-frequency" value={frequency} onChange={(e) => setFrequency(e.target.value as 'monthly' | 'yearly')} className={inputClass}><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></Field>
        <NumberField label="Initial deposit" id="cd-deposit" value={deposit} onChange={setDeposit} error={principal <= 0 ? 'Enter a deposit greater than zero.' : undefined} />
        <NumberField label="APY (%)" id="cd-apy" value={apy} onChange={setApy} step="0.01" error={rate < 0 || rate > 1 ? 'Enter a rate from 0% to 100%.' : undefined} />
        <NumberField label="Term (years)" id="cd-years" value={years} onChange={setYears} error={term <= 0 ? 'Enter a term greater than zero.' : undefined} />
      </div>
    </form>
    <section className="rounded-sm bg-navy p-7 text-white md:p-8" aria-live="polite"><p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">Your estimate</p><h2 className="mt-2 font-display text-2xl font-bold">Certificate of deposit value</h2>{valid ? <div className="mt-7 grid gap-4 sm:grid-cols-2"><Stat label="Value at maturity" value={formatCurrency(result.balance, currency)} prominent /><Stat label="Interest earned" value={formatCurrency(result.interest, currency)} /><Stat label="Initial deposit" value={formatCurrency(principal, currency)} /><Stat label="APY" value={`${number(apy).toFixed(2)}%`} /></div> : <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm">Correct the highlighted fields to see your estimate.</p>}<p className="mt-5 text-xs leading-relaxed text-white/55">This illustration assumes the APY remains fixed and interest stays in the account.</p></section>
    {valid && <section className="space-y-8 rounded-sm border border-border bg-white p-7 lg:col-span-2 md:p-8"><ResultBarChart title="Deposit and interest" items={[{ name: 'Initial deposit', value: principal, formattedValue: formatCurrency(principal, currency) }, { name: 'Interest earned', value: result.interest, formattedValue: formatCurrency(result.interest, currency) }]} /><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-bold text-navy">Year-by-year value</h2><p className="mt-1 text-sm text-slate">Projected balance through the maturity date.</p></div><CalculatorActions filename="cd-projection.csv" shareTitle="CD calculator estimate" rows={[["Year", "Balance", "Interest earned"], ...result.rows.map((row) => [row.year, formatCurrency(row.balance, currency), formatCurrency(row.interest, currency)])]} /></div><Table rows={visible} currency={currency} />{result.rows.length > 12 && <button type="button" onClick={() => setShowAll((value) => !value)} className="border border-border px-4 py-2 text-xs font-semibold tracking-[.08em] uppercase text-navy hover:border-gold hover:text-gold-dark">{showAll ? 'Show first 12' : 'Show all'}</button>}</section>}
  </div>
}

function Table({ rows, currency }: { rows: { year: number; balance: number; interest: number }[]; currency: CurrencyCode }) { return <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><caption className="sr-only">CD yearly balance projection</caption><thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate"><tr>{['Year', 'Balance', 'Interest earned'].map((label) => <th key={label} scope="col" className="px-3 py-3 font-semibold">{label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.year} className="border-b border-border/70"><th scope="row" className="px-3 py-3 font-medium text-navy">{row.year}</th><td className="px-3 py-3 text-slate">{formatCurrency(row.balance, currency)}</td><td className="px-3 py-3 text-slate">{formatCurrency(row.interest, currency)}</td></tr>)}</tbody></table></div> }
function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) { return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate">{label}</label>{children}</div> }
function NumberField({ label, id, value, onChange, error, step = '1' }: { label: string; id: string; value: string; onChange: (value: string) => void; error?: string; step?: string }) { return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate">{label}</label><input id={id} type="number" min="0" step={step} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} className={`${inputClass} ${error ? 'border-gold' : ''}`} />{error && <p className="mt-1 text-xs text-gold-dark">{error}</p>}</div> }
function Stat({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) { return <div className={`rounded-sm p-4 ${prominent ? 'bg-gold text-navy sm:col-span-2' : 'bg-white/10'}`}><p className={`text-[.65rem] font-semibold tracking-[.08em] uppercase ${prominent ? 'text-navy/65' : 'text-white/50'}`}>{label}</p><p className={`mt-1 font-display font-bold ${prominent ? 'text-3xl' : 'text-xl text-white'}`}>{value}</p></div> }
