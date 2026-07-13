"use client";

import { useMemo, useState } from "react";
import CalculatorActions from "@/components/CalculatorActions";
import ResultBarChart from "@/components/ResultBarChart";
import { formatCurrency, type CurrencyCode } from "@/lib/formatters";
import { calculateLoanSchedule, type LoanType } from "@/lib/loanSchedule";

type Frequency = "monthly" | "yearly";

const initialValues = {
  currency: "USD" as CurrencyCode,
  principal: "25000",
  annualRate: "7.5",
  term: "5",
  termUnit: "years" as "years" | "months",
  loanType: "repayment" as LoanType,
  deferredMonths: "0",
  balloonAmount: "0",
  fees: "0",
};
const inputClass =
  "w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";
const numberValue = (value: string) => Number(value) || 0;

export default function LoanCalculator() {
  const [values, setValues] = useState(initialValues);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [showAll, setShowAll] = useState(false);
  const termMonths =
    values.termUnit === "years"
      ? numberValue(values.term) * 12
      : numberValue(values.term);
  const errors = useMemo(() => {
    const next: Partial<Record<keyof typeof values, string>> = {};
    (
      [
        "principal",
        "annualRate",
        "deferredMonths",
        "balloonAmount",
        "fees",
      ] as const
    ).forEach((field) => {
      if (numberValue(values[field]) < 0) next[field] = "Enter zero or more.";
    });
    if (numberValue(values.principal) <= 0)
      next.principal = "Loan amount must be greater than zero.";
    if (numberValue(values.annualRate) > 100)
      next.annualRate = "Enter a rate between 0% and 100%.";
    if (termMonths <= 0) next.term = "Term must be greater than zero.";
    if (numberValue(values.deferredMonths) > termMonths)
      next.deferredMonths = "Deferral cannot exceed the term.";
    if (
      numberValue(values.balloonAmount) >
      numberValue(values.principal) + numberValue(values.fees)
    )
      next.balloonAmount = "Balloon cannot exceed the financed amount.";
    return next;
  }, [values, termMonths]);
  const input = useMemo(
    () => ({
      currency: values.currency,
      principal: numberValue(values.principal),
      financedFees: numberValue(values.fees),
      annualRate: numberValue(values.annualRate) / 100,
      termMonths,
      loanType: values.loanType,
      deferredMonths: numberValue(values.deferredMonths),
      balloonAmount: numberValue(values.balloonAmount),
    }),
    [values, termMonths],
  );
  const result = useMemo(() => calculateLoanSchedule(input), [input]);
  const isValid = Object.keys(errors).length === 0;
  const rows = result.schedule.map((row) => [
    row.period,
    formatCurrency(row.payment, input.currency),
    formatCurrency(row.principal, input.currency),
    formatCurrency(row.interest, input.currency),
    formatCurrency(row.endingBalance, input.currency),
  ]);
  const scheduleLength =
    frequency === "monthly"
      ? result.schedule.length
      : result.yearlySchedule.length;
  const visibleMonthlyRows = showAll
    ? result.schedule
    : result.schedule.slice(0, 12);
  const visibleYearlyRows = showAll
    ? result.yearlySchedule
    : result.yearlySchedule.slice(0, 12);
  const update = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => setValues((current) => ({ ...current, [key]: value }));
  const payment =
    frequency === "monthly" ? result.periodicPayment : result.yearlyPayment;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        noValidate
        className="rounded-sm border border-border bg-white p-7 shadow-sm md:p-8"
      >
        <h2 className="font-display text-2xl font-bold text-navy">
          Loan details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Enter your borrowing terms to estimate repayments and see the full
          repayment schedule.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Currency" id="currency">
            <select
              id="currency"
              value={values.currency}
              onChange={(event) =>
                update("currency", event.target.value as CurrencyCode)
              }
              className={inputClass}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </Field>
          <Field label="Repayment type" id="loanType">
            <select
              id="loanType"
              value={values.loanType}
              onChange={(event) =>
                update("loanType", event.target.value as LoanType)
              }
              className={inputClass}
            >
              <option value="repayment">Repayment</option>
              <option value="interestOnly">Interest-only</option>
            </select>
          </Field>
          <NumberField
            label="Loan amount"
            id="principal"
            value={values.principal}
            error={errors.principal}
            onChange={(value) => update("principal", value)}
          />
          <NumberField
            label="Interest rate (%)"
            id="annualRate"
            value={values.annualRate}
            error={errors.annualRate}
            onChange={(value) => update("annualRate", value)}
            step="0.01"
          />
          <NumberField
            label="Term"
            id="term"
            value={values.term}
            error={errors.term}
            onChange={(value) => update("term", value)}
          />
          <Field label="Term unit" id="termUnit">
            <select
              id="termUnit"
              value={values.termUnit}
              onChange={(event) =>
                update("termUnit", event.target.value as "years" | "months")
              }
              className={inputClass}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </Field>
        </div>
        <fieldset className="mt-7 border-t border-border pt-6">
          <legend className="px-0 text-xs font-semibold tracking-[.08em] uppercase text-slate">
            Optional features
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Upfront fees financed"
              id="fees"
              value={values.fees}
              error={errors.fees}
              onChange={(value) => update("fees", value)}
            />
            <NumberField
              label="Deferred payment months"
              id="deferredMonths"
              value={values.deferredMonths}
              error={errors.deferredMonths}
              onChange={(value) => update("deferredMonths", value)}
            />
            <NumberField
              label="Balloon payment"
              id="balloonAmount"
              value={values.balloonAmount}
              error={errors.balloonAmount}
              onChange={(value) => update("balloonAmount", value)}
            />
          </div>
        </fieldset>
      </form>
      <section
        className="rounded-sm bg-navy p-7 text-white md:p-8"
        aria-live="polite"
        aria-labelledby="loan-results"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">
              Your estimate
            </p>
            <h2
              id="loan-results"
              className="mt-2 font-display text-2xl font-bold"
            >
              Loan repayment
            </h2>
          </div>
          <div className="inline-flex rounded-sm border border-white/20 p-1">
            {(["monthly", "yearly"] as Frequency[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={frequency === item}
                onClick={() => setFrequency(item)}
                className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase ${frequency === item ? "bg-gold text-navy" : "text-white/70"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {!isValid ? (
          <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm">
            Correct the highlighted fields to see your estimate.
          </p>
        ) : (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Stat
                prominent
                label={`${values.loanType === "interestOnly" ? "Interest payment" : "Payment"} / ${frequency === "monthly" ? "month" : "year"}`}
                value={formatCurrency(payment, input.currency)}
              />
              <Stat
                label="Financed amount"
                value={formatCurrency(result.financedAmount, input.currency)}
              />
              <Stat
                label="Total interest"
                value={formatCurrency(result.totalInterest, input.currency)}
              />
              <Stat
                label="Total paid"
                value={formatCurrency(result.totalCost, input.currency)}
              />
              {result.balloonDue > 0 && (
                <Stat
                  label="Balloon due at term end"
                  value={formatCurrency(result.balloonDue, input.currency)}
                />
              )}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              Estimates assume a fixed annual interest rate. Deferred payments
              accrue interest; a balloon amount remains due at the end of the
              term.
            </p>
          </>
        )}
      </section>
      {isValid && (
        <section className="space-y-8 rounded-sm border border-border bg-white p-7 lg:col-span-2 md:p-8">
          <ResultBarChart
            title="Loan cost breakdown"
            items={[
              {
                name: "Amount borrowed",
                value: result.financedAmount,
                formattedValue: formatCurrency(
                  result.financedAmount,
                  input.currency,
                ),
              },
              {
                name: "Interest",
                value: result.totalInterest,
                formattedValue: formatCurrency(
                  result.totalInterest,
                  input.currency,
                ),
              },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">
                Repayment schedule
              </h2>
              <p className="mt-1 text-sm text-slate">
                How each payment is split across your loan term.
              </p>
            </div>
            <CalculatorActions
              filename="loan-repayment-schedule.csv"
              shareTitle="Loan calculator estimate"
              rows={[
                ["Month", "Payment", "Principal", "Interest", "Balance"],
                ...rows,
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <caption className="sr-only">Loan repayment schedule</caption>
              <thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate">
                <tr>
                  {[
                    frequency === "monthly" ? "Month" : "Year",
                    "Payment",
                    "Principal",
                    "Interest",
                    "Balance",
                  ].map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="px-3 py-3 font-semibold"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frequency === "monthly"
                  ? visibleMonthlyRows.map((row) => (
                      <tr
                        key={row.period}
                        className="border-b border-border/70"
                      >
                        <th
                          scope="row"
                          className="px-3 py-3 font-medium text-navy"
                        >
                          {row.period}
                        </th>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.payment, input.currency)}
                        </td>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.principal, input.currency)}
                        </td>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.interest, input.currency)}
                        </td>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.endingBalance, input.currency)}
                        </td>
                      </tr>
                    ))
                  : visibleYearlyRows.map((row) => (
                      <tr key={row.year} className="border-b border-border/70">
                        <th
                          scope="row"
                          className="px-3 py-3 font-medium text-navy"
                        >
                          {row.year}
                        </th>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.payment, input.currency)}
                        </td>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.principal, input.currency)}
                        </td>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.interest, input.currency)}
                        </td>
                        <td className="px-3 py-3 text-slate">
                          {formatCurrency(row.endingBalance, input.currency)}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          {scheduleLength > 12 && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="border border-border px-4 py-2 text-xs font-semibold tracking-[.08em] uppercase text-navy hover:border-gold hover:text-gold-dark"
            >
              {showAll ? "Show first 12" : "Show all"}
            </button>
          )}
        </section>
      )}
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
function NumberField({
  label,
  id,
  value,
  error,
  onChange,
  step = "1",
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  step?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold tracking-[.08em] uppercase text-slate"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${inputClass} ${error ? "border-gold" : ""}`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-gold-dark" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
function Stat({
  label,
  value,
  prominent = false,
}: {
  label: string;
  value: string;
  prominent?: boolean;
}) {
  return (
    <div
      className={`rounded-sm p-4 ${prominent ? "bg-gold text-navy sm:col-span-2" : "bg-white/10"}`}
    >
      <p
        className={`text-[.65rem] font-semibold tracking-[.08em] uppercase ${prominent ? "text-navy/65" : "text-white/50"}`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-display font-bold ${prominent ? "text-3xl" : "text-xl text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
