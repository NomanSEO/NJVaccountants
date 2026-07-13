"use client";

import { useMemo, useState } from "react";
import CalculatorActions from "@/components/CalculatorActions";
import ResultBarChart from "@/components/ResultBarChart";
import { formatCurrency, type CurrencyCode } from "@/lib/formatters";

type ContributionFrequency =
  "weekly" | "biweekly" | "monthly" | "semiannual" | "annual";
const periods: Record<ContributionFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  monthly: 12,
  semiannual: 2,
  annual: 1,
};
const inputClass =
  "w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";
const number = (value: string) => Number(value) || 0;

function project(
  initial: number,
  contribution: number,
  frequency: ContributionFrequency,
  annualReturn: number,
  years: number,
) {
  const perYear = periods[frequency];
  const rate = annualReturn / perYear;
  let balance = initial;
  const rows = [] as {
    year: number;
    contributed: number;
    balance: number;
    growth: number;
  }[];
  for (let year = 1; year <= Math.ceil(years); year++) {
    const cycles = Math.min(
      perYear,
      Math.max(0, Math.round((years - (year - 1)) * perYear)),
    );
    for (let period = 0; period < cycles; period++)
      balance = balance * (1 + rate) + contribution;
    const contributed =
      initial +
      contribution * Math.min(year * perYear, Math.round(years * perYear));
    rows.push({ year, contributed, balance, growth: balance - contributed });
  }
  return {
    balance,
    contributed: initial + contribution * Math.round(years * perYear),
    rows,
  };
}

export default function InvestmentCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [initial, setInitial] = useState("10000");
  const [contribution, setContribution] = useState("500");
  const [frequency, setFrequency] = useState<ContributionFrequency>("monthly");
  const [returnRate, setReturnRate] = useState("7");
  const [years, setYears] = useState("20");
  const [showAll, setShowAll] = useState(false);
  const starting = number(initial),
    added = number(contribution),
    rate = number(returnRate) / 100,
    term = number(years);
  const valid =
    starting >= 0 &&
    added >= 0 &&
    rate >= -1 &&
    rate <= 1 &&
    term > 0 &&
    (starting > 0 || added > 0);
  const scenarios = useMemo(
    () => ({
      worst: project(
        starting,
        added,
        frequency,
        Math.max(-0.99, rate - 0.03),
        term,
      ),
      base: project(starting, added, frequency, rate, term),
      best: project(starting, added, frequency, rate + 0.03, term),
    }),
    [starting, added, frequency, rate, term],
  );
  const visible = showAll
    ? scenarios.base.rows
    : scenarios.base.rows.slice(0, 12);
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <form
        className="rounded-sm border border-border bg-white p-4 shadow-sm sm:p-6 md:p-8"
        noValidate
      >
        <h2 className="font-display text-2xl font-bold text-navy">
          Investment details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Model a starting balance with regular contributions and assumed
          returns.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Currency" id="investment-currency">
            <select
              id="investment-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className={inputClass}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </Field>
          <Field label="Contribution frequency" id="investment-frequency">
            <select
              id="investment-frequency"
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as ContributionFrequency)
              }
              className={inputClass}
            >
              {Object.keys(periods).map((value) => (
                <option key={value} value={value}>
                  {value[0].toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
          </Field>
          <NumberField
            label="Starting investment"
            id="investment-initial"
            value={initial}
            onChange={setInitial}
            error={starting < 0 ? "Enter zero or more." : undefined}
          />
          <NumberField
            label="Recurring contribution"
            id="investment-contribution"
            value={contribution}
            onChange={setContribution}
            error={added < 0 ? "Enter zero or more." : undefined}
          />
          <NumberField
            label="Expected annual return (%)"
            id="investment-return"
            value={returnRate}
            onChange={setReturnRate}
            step="0.01"
            error={
              rate < -1 || rate > 1
                ? "Enter a rate from -100% to 100%."
                : undefined
            }
          />
          <NumberField
            label="Investment period (years)"
            id="investment-years"
            value={years}
            onChange={setYears}
            error={term <= 0 ? "Enter a term greater than zero." : undefined}
          />
        </div>
      </form>
      <section
        className="rounded-sm bg-navy p-4 text-white sm:p-6 md:p-8"
        aria-live="polite"
      >
        <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">
          Your estimate
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold">
          Investment projection
        </h2>
        {valid ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Stat
              label="Base-case value"
              value={formatCurrency(scenarios.base.balance, currency)}
              prominent
            />
            <Stat
              label="Total contributed"
              value={formatCurrency(scenarios.base.contributed, currency)}
            />
            <Stat
              label="Projected growth"
              value={formatCurrency(
                scenarios.base.balance - scenarios.base.contributed,
                currency,
              )}
            />
            <Stat
              label="Worst / best case"
              value={`${formatCurrency(scenarios.worst.balance, currency)} / ${formatCurrency(scenarios.best.balance, currency)}`}
            />
          </div>
        ) : (
          <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm">
            Correct the highlighted fields to see your projection.
          </p>
        )}
        <p className="mt-5 text-xs leading-relaxed text-white/55">
          Scenarios use your assumed return minus 3%, your return, and your
          return plus 3%; they are not investment advice.
        </p>
      </section>
      {valid && (
        <section className="space-y-8 rounded-sm border border-border bg-white p-4 sm:p-6 lg:col-span-2 md:p-8">
          <ResultBarChart
            title="Potential outcomes"
            items={[
              {
                name: "Worst case",
                value: scenarios.worst.balance,
                formattedValue: formatCurrency(
                  scenarios.worst.balance,
                  currency,
                ),
              },
              {
                name: "Base case",
                value: scenarios.base.balance,
                formattedValue: formatCurrency(
                  scenarios.base.balance,
                  currency,
                ),
              },
              {
                name: "Best case",
                value: scenarios.best.balance,
                formattedValue: formatCurrency(
                  scenarios.best.balance,
                  currency,
                ),
              },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">
                Year-by-year projection
              </h2>
              <p className="mt-1 text-sm text-slate">
                Base case: contributions and estimated growth over time.
              </p>
            </div>
            <CalculatorActions
              filename="investment-projection.csv"
              shareTitle="Investment calculator estimate"
              rows={[
                ["Year", "Contributed", "Balance", "Growth"],
                ...scenarios.base.rows.map((row) => [
                  row.year,
                  formatCurrency(row.contributed, currency),
                  formatCurrency(row.balance, currency),
                  formatCurrency(row.growth, currency),
                ]),
              ]}
            />
          </div>
          <div className="overflow-x-auto" data-calculator-table>
            <p className="mb-2 text-xs text-slate sm:hidden">
              Swipe to view all columns
            </p>
            <table className="w-full min-w-[620px] text-left text-sm">
              <caption className="sr-only">
                Investment projection by year
              </caption>
              <thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate">
                <tr>
                  {["Year", "Contributed", "Balance", "Growth"].map((label) => (
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
                {visible.map((row) => (
                  <tr key={row.year} className="border-b border-border/70">
                    <th scope="row" className="px-3 py-3 font-medium text-navy">
                      {row.year}
                    </th>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.contributed, currency)}
                    </td>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.balance, currency)}
                    </td>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.growth, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {scenarios.base.rows.length > 12 && (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
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
  onChange,
  error,
  step = "1",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  step?: string;
}) {
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
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${inputClass} ${error ? "border-gold" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-gold-dark">{error}</p>}
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
