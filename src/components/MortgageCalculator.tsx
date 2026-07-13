"use client";

import { useMemo, useState } from "react";
import CalculatorActions from "@/components/CalculatorActions";
import ResultBarChart from "@/components/ResultBarChart";
import { calculateMortgage, type MortgageInput } from "@/lib/mortgage";
import { formatCurrency, type CurrencyCode } from "@/lib/formatters";

type Frequency = "monthly" | "yearly";

const initialValues = {
  currency: "USD" as CurrencyCode,
  homePrice: "400000",
  downPayment: "80000",
  annualRate: "6",
  termYears: "30",
  loanType: "fixed" as MortgageInput["loanType"],
  adjustmentMonth: "60",
  adjustedAnnualRate: "7",
  annualPropertyTax: "4800",
  annualInsurance: "1200",
  annualHoa: "0",
  annualMortgageInsurance: "0",
};

const inputClass =
  "w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";

const numberValue = (value: string) => Number(value) || 0;

export default function MortgageCalculator() {
  const [values, setValues] = useState(initialValues);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [showAll, setShowAll] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof typeof values, string>> = {};
    const negativeFields: (keyof typeof values)[] = [
      "homePrice",
      "downPayment",
      "annualRate",
      "adjustmentMonth",
      "adjustedAnnualRate",
      "annualPropertyTax",
      "annualInsurance",
      "annualHoa",
      "annualMortgageInsurance",
    ];
    negativeFields.forEach((field) => {
      if (numberValue(values[field] as string) < 0)
        next[field] = "Enter an amount of zero or more.";
    });
    if (numberValue(values.termYears) <= 0)
      next.termYears = "Term must be greater than zero.";
    if (numberValue(values.annualRate) > 100)
      next.annualRate = "Enter a rate between 0% and 100%.";
    if (numberValue(values.downPayment) > numberValue(values.homePrice)) {
      next.downPayment = "Down payment cannot exceed the home price.";
    }
    if (values.loanType === "adjustable") {
      if (numberValue(values.adjustedAnnualRate) > 100) {
        next.adjustedAnnualRate = "Enter a rate between 0% and 100%.";
      }
      if (
        numberValue(values.adjustmentMonth) <= 0 ||
        numberValue(values.adjustmentMonth) > numberValue(values.termYears) * 12
      ) {
        next.adjustmentMonth = "Adjustment must be within the loan term.";
      }
    }
    return next;
  }, [values]);

  const input = useMemo<MortgageInput>(
    () => ({
      currency: values.currency,
      homePrice: numberValue(values.homePrice),
      downPayment: numberValue(values.downPayment),
      annualRate: numberValue(values.annualRate) / 100,
      termYears: numberValue(values.termYears),
      loanType: values.loanType,
      adjustmentMonth: numberValue(values.adjustmentMonth),
      adjustedAnnualRate: numberValue(values.adjustedAnnualRate) / 100,
      annualPropertyTax: numberValue(values.annualPropertyTax),
      annualInsurance: numberValue(values.annualInsurance),
      annualHoa: numberValue(values.annualHoa),
      annualMortgageInsurance: numberValue(values.annualMortgageInsurance),
    }),
    [values],
  );
  const isValid = Object.keys(errors).length === 0;
  const result = useMemo(() => calculateMortgage(input), [input]);
  const displayPayment =
    frequency === "monthly"
      ? result.monthlyHousingCost
      : result.yearlyHousingCost;
  const displayPi =
    frequency === "monthly"
      ? result.monthlyPrincipalAndInterest
      : result.monthlyPrincipalAndInterest * 12;
  const rows = result.schedule.map((row) => [
    row.month,
    formatCurrency(row.payment, input.currency),
    formatCurrency(row.principal, input.currency),
    formatCurrency(row.interest, input.currency),
    formatCurrency(row.escrow, input.currency),
    formatCurrency(row.endingBalance, input.currency),
  ]);

  const update = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => setValues((current) => ({ ...current, [key]: value }));
  const visibleSchedule = showAll
    ? result.schedule
    : result.schedule.slice(0, 12);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        className="rounded-sm border border-border bg-white p-7 shadow-sm md:p-8"
        noValidate
      >
        <h2 className="font-display text-2xl font-bold text-navy">
          Mortgage details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Adjust the figures to get a repayment estimate in your preferred
          currency.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Currency" id="currency">
            <select
              id="currency"
              value={values.currency}
              onChange={(e) =>
                update("currency", e.target.value as CurrencyCode)
              }
              className={inputClass}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </Field>
          <Field label="Loan type" id="loanType">
            <select
              id="loanType"
              value={values.loanType}
              onChange={(e) =>
                update("loanType", e.target.value as MortgageInput["loanType"])
              }
              className={inputClass}
            >
              <option value="fixed">Fixed rate</option>
              <option value="adjustable">Adjustable rate</option>
              <option value="interestOnly">Interest-only</option>
            </select>
          </Field>
          <NumberField
            label="Home price"
            id="homePrice"
            value={values.homePrice}
            error={errors.homePrice}
            onChange={(value) => update("homePrice", value)}
          />
          <NumberField
            label="Down payment"
            id="downPayment"
            value={values.downPayment}
            error={errors.downPayment}
            onChange={(value) => update("downPayment", value)}
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
            label="Term (years)"
            id="termYears"
            value={values.termYears}
            error={errors.termYears}
            onChange={(value) => update("termYears", value)}
          />
          {values.loanType === "adjustable" && (
            <>
              <NumberField
                label="Adjustment after (months)"
                id="adjustmentMonth"
                value={values.adjustmentMonth}
                error={errors.adjustmentMonth}
                onChange={(value) => update("adjustmentMonth", value)}
              />
              <NumberField
                label="Adjusted rate (%)"
                id="adjustedAnnualRate"
                value={values.adjustedAnnualRate}
                error={errors.adjustedAnnualRate}
                onChange={(value) => update("adjustedAnnualRate", value)}
                step="0.01"
              />
            </>
          )}
        </div>
        <fieldset className="mt-7 border-t border-border pt-6">
          <legend className="px-0 text-xs font-semibold tracking-[.08em] uppercase text-slate">
            Optional annual costs
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Property tax"
              id="annualPropertyTax"
              value={values.annualPropertyTax}
              error={errors.annualPropertyTax}
              onChange={(value) => update("annualPropertyTax", value)}
            />
            <NumberField
              label="Home insurance"
              id="annualInsurance"
              value={values.annualInsurance}
              error={errors.annualInsurance}
              onChange={(value) => update("annualInsurance", value)}
            />
            <NumberField
              label="HOA fees"
              id="annualHoa"
              value={values.annualHoa}
              error={errors.annualHoa}
              onChange={(value) => update("annualHoa", value)}
            />
            <NumberField
              label="Mortgage insurance"
              id="annualMortgageInsurance"
              value={values.annualMortgageInsurance}
              error={errors.annualMortgageInsurance}
              onChange={(value) => update("annualMortgageInsurance", value)}
            />
          </div>
        </fieldset>
      </form>

      <section
        className="rounded-sm bg-navy p-7 text-white md:p-8"
        aria-live="polite"
        aria-labelledby="mortgage-results"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">
              Your estimate
            </p>
            <h2
              id="mortgage-results"
              className="mt-2 font-display text-2xl font-bold"
            >
              Mortgage payment
            </h2>
          </div>
          <div className="inline-flex rounded-sm border border-white/20 p-1">
            {(["monthly", "yearly"] as Frequency[]).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setFrequency(period)}
                aria-pressed={frequency === period}
                className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase ${frequency === period ? "bg-gold text-navy" : "text-white/70"}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        {!isValid ? (
          <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm text-white">
            Correct the highlighted fields to see your estimate.
          </p>
        ) : (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Stat
                label={`Full housing payment / ${frequency === "monthly" ? "month" : "year"}`}
                value={formatCurrency(displayPayment, input.currency)}
                prominent
              />
              <Stat
                label={`Principal & interest / ${frequency === "monthly" ? "month" : "year"}`}
                value={formatCurrency(displayPi, input.currency)}
              />
              <Stat
                label="Loan amount"
                value={formatCurrency(result.loanAmount, input.currency)}
              />
              <Stat
                label="Total interest"
                value={formatCurrency(result.totalInterest, input.currency)}
              />
              <Stat
                label="Total paid"
                value={formatCurrency(result.totalPaid, input.currency)}
              />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              Full housing payment includes estimated property tax, insurance,
              HOA fees, and mortgage insurance.
            </p>
          </>
        )}
      </section>

      {isValid && (
        <section className="space-y-8 rounded-sm border border-border bg-white p-7 lg:col-span-2 md:p-8">
          <ResultBarChart
            title="Principal vs. interest"
            items={[
              {
                name: "Principal",
                value: result.loanAmount,
                formattedValue: formatCurrency(
                  result.loanAmount,
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
                Amortization schedule
              </h2>
              <p className="mt-1 text-sm text-slate">
                Payment breakdown across the loan term.
              </p>
            </div>
            <CalculatorActions
              filename="mortgage-amortization.csv"
              shareTitle="Mortgage calculator estimate"
              rows={[
                [
                  "Month",
                  "Payment",
                  "Principal",
                  "Interest",
                  "Escrow",
                  "Balance",
                ],
                ...rows,
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <caption className="sr-only">
                Mortgage amortization schedule
              </caption>
              <thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate">
                <tr>
                  {[
                    "Month",
                    "Payment",
                    "Principal",
                    "Interest",
                    "Escrow",
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
                {visibleSchedule.map((row) => (
                  <tr key={row.month} className="border-b border-border/70">
                    <th scope="row" className="px-3 py-3 font-medium text-navy">
                      {row.month}
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
                      {formatCurrency(row.escrow, input.currency)}
                    </td>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.endingBalance, input.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.schedule.length > 12 && (
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
