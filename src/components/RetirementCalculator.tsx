"use client";

import { useMemo, useState } from "react";
import CalculatorActions from "@/components/CalculatorActions";
import ResultBarChart from "@/components/ResultBarChart";
import { formatCurrency as formatUsd } from "@/lib/formatters";

type Values = {
  currentAge: string;
  retirementAge: string;
  lifeExpectancy: string;
  currentSavings: string;
  monthlyContribution: string;
  monthlySpending: string;
  returnRate: string;
  inflationRate: string;
  salaryGrowth: string;
};
const initial: Values = {
  currentAge: "35",
  retirementAge: "65",
  lifeExpectancy: "80",
  currentSavings: "50000",
  monthlyContribution: "750",
  monthlySpending: "5000",
  returnRate: "5",
  inflationRate: "3",
  salaryGrowth: "3",
};
const fieldClass =
  "w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";
const num = (v: string) => Number(v) || 0;
const formatCurrency = (value: number) => formatUsd(value, "USD");

export default function RetirementCalculator() {
  const [values, setValues] = useState(initial);
  const [showAll, setShowAll] = useState(false);
  const update = (key: keyof Values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));
  const error = useMemo(() => {
    const a = num(values.currentAge),
      r = num(values.retirementAge),
      l = num(values.lifeExpectancy);
    return (
      a < 18 ||
      r <= a ||
      l <= r ||
      l > 120 ||
      num(values.currentSavings) < 0 ||
      num(values.monthlyContribution) < 0 ||
      num(values.monthlySpending) < 0 ||
      num(values.returnRate) < 0 ||
      num(values.inflationRate) < 0
    );
  }, [values]);
  const data = useMemo(() => project(values), [values]);
  const rows = showAll ? data.yearly : data.yearly.slice(0, 12);
  const csv = data.yearly.map((r) => [
    r.age,
    r.phase,
    formatCurrency(r.balance),
    formatCurrency(r.contribution),
    formatCurrency(r.income),
  ]);
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <form
        className="border-border rounded-sm border bg-white p-4 shadow-sm sm:p-6 md:p-8"
        noValidate
      >
        <h2 className="font-display text-navy text-2xl font-bold">
          Your retirement plan
        </h2>
        <p className="text-slate mt-2 text-sm leading-relaxed">
          Model savings through retirement in today’s dollars.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input
            label="Current age"
            id="currentAge"
            value={values.currentAge}
            onChange={(v) => update("currentAge", v)}
          />
          <Input
            label="Retirement age"
            id="retirementAge"
            value={values.retirementAge}
            onChange={(v) => update("retirementAge", v)}
          />
          <Input
            label="Plan through age"
            id="lifeExpectancy"
            value={values.lifeExpectancy}
            onChange={(v) => update("lifeExpectancy", v)}
          />
          <Input
            label="Current retirement savings"
            id="currentSavings"
            value={values.currentSavings}
            onChange={(v) => update("currentSavings", v)}
          />
          <Input
            label="Monthly contribution"
            id="monthlyContribution"
            value={values.monthlyContribution}
            onChange={(v) => update("monthlyContribution", v)}
          />
          <Input
            label="Monthly retirement spending"
            id="monthlySpending"
            value={values.monthlySpending}
            onChange={(v) => update("monthlySpending", v)}
          />
          <Input
            label="Annual return (%)"
            id="returnRate"
            value={values.returnRate}
            step="0.1"
            onChange={(v) => update("returnRate", v)}
          />
          <Input
            label="Inflation (%)"
            id="inflationRate"
            value={values.inflationRate}
            step="0.1"
            onChange={(v) => update("inflationRate", v)}
          />
          <Input
            label="Salary growth (%)"
            id="salaryGrowth"
            value={values.salaryGrowth}
            step="0.1"
            onChange={(v) => update("salaryGrowth", v)}
          />
        </div>
        {error && (
          <p
            role="alert"
            className="border-gold bg-gold/10 text-navy mt-5 rounded-sm border p-3 text-sm"
          >
            Enter an adult current age, a later retirement age, and a plan age
            after retirement. Amounts and rates cannot be negative.
          </p>
        )}
      </form>
      <section
        className="bg-navy rounded-sm p-4 text-white sm:p-6 md:p-8"
        aria-live="polite"
      >
        <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
          Your estimate
        </p>
        <h2 className="font-display mt-2 text-2xl font-bold">
          Retirement outlook
        </h2>
        {!error && (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Stat
                label="Target nest egg"
                value={formatCurrency(data.target)}
                primary
              />
              <Stat
                label="Projected balance"
                value={formatCurrency(data.balanceAtRetirement)}
              />
              <Stat
                label="Sustainable annual income"
                value={formatCurrency(data.sustainableIncome)}
              />
              <Stat
                label="Monthly sustainable income"
                value={formatCurrency(data.sustainableIncome / 12)}
              />
              <Stat
                label="Retirement gap / surplus"
                value={formatCurrency(data.balanceAtRetirement - data.target)}
              />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              Target uses your projected retirement spending, inflation, and the
              selected planning horizon. This is an educational estimate, not
              investment advice.
            </p>
          </>
        )}
      </section>
      {!error && (
        <section className="border-border space-y-8 rounded-sm border bg-white p-4 sm:p-6 md:p-8 lg:col-span-2">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[.12em] uppercase">
              Scenarios
            </p>
            <h2 className="font-display text-navy mt-2 text-2xl font-bold">
              How return assumptions affect the outcome
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {data.scenarios.map((s) => (
                <div key={s.name} className="bg-cream rounded-sm p-5">
                  <p className="text-slate text-xs font-semibold tracking-widest uppercase">
                    {s.name} · {s.rate.toFixed(1)}%
                  </p>
                  <p className="font-display text-navy mt-2 text-2xl font-bold">
                    {formatCurrency(s.balance)}
                  </p>
                  <p className="text-slate mt-1 text-sm">
                    Balance at retirement
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ResultBarChart
            title="Base-case retirement picture"
            items={[
              {
                name: "Target nest egg",
                value: data.target,
                formattedValue: formatCurrency(data.target),
              },
              {
                name: "Projected balance",
                value: data.balanceAtRetirement,
                formattedValue: formatCurrency(data.balanceAtRetirement),
              },
              {
                name: "Sustainable income",
                value: data.sustainableIncome,
                formattedValue: formatCurrency(data.sustainableIncome),
              },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-navy text-2xl font-bold">
                Yearly projection
              </h2>
              <p className="text-slate mt-1 text-sm">
                Annual balances in nominal dollars.
              </p>
            </div>
            <CalculatorActions
              filename="retirement-projection.csv"
              shareTitle="Retirement calculator estimate"
              rows={[
                ["Age", "Phase", "Balance", "Contribution", "Income"],
                ...csv,
              ]}
            />
          </div>
          <div className="overflow-x-auto" data-calculator-table>
            <p className="text-slate mb-2 text-xs sm:hidden">
              Swipe to view all columns
            </p>
            <table className="w-full min-w-155 text-left text-sm">
              <caption className="sr-only">
                Yearly retirement projection
              </caption>
              <thead className="border-border text-slate border-b text-xs tracking-[.08em] uppercase">
                <tr>
                  {["Age", "Phase", "Balance", "Contribution", "Income"].map(
                    (h) => (
                      <th key={h} scope="col" className="px-3 py-3">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.age} className="border-border/70 border-b">
                    <th scope="row" className="text-navy px-3 py-3">
                      {r.age}
                    </th>
                    <td className="text-slate px-3 py-3">{r.phase}</td>
                    <td className="text-slate px-3 py-3">
                      {formatCurrency(r.balance)}
                    </td>
                    <td className="text-slate px-3 py-3">
                      {formatCurrency(r.contribution)}
                    </td>
                    <td className="text-slate px-3 py-3">
                      {formatCurrency(r.income)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.yearly.length > 12 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="border-border text-navy hover:border-gold border px-4 py-2 text-xs font-semibold tracking-[.08em] uppercase"
            >
              {showAll ? "Show first 12" : "Show all years"}
            </button>
          )}
        </section>
      )}
    </div>
  );
}

function project(v: Values) {
  const age = num(v.currentAge),
    retire = num(v.retirementAge),
    end = num(v.lifeExpectancy),
    inflation = num(v.inflationRate) / 100,
    rate = num(v.returnRate) / 100;
  const build = (annualRate: number) => {
    let balance = num(v.currentSavings);
    const yearly: {
      age: number;
      phase: string;
      balance: number;
      contribution: number;
      income: number;
    }[] = [];
    for (let current = age + 1; current <= end; current++) {
      const working = current <= retire;
      const contribution = working
        ? num(v.monthlyContribution) *
          12 *
          Math.pow(1 + num(v.salaryGrowth) / 100, current - age - 1)
        : 0;
      const income = working
        ? 0
        : num(v.monthlySpending) *
          12 *
          Math.pow(1 + inflation, current - retire - 1);
      balance = Math.max(0, balance * (1 + annualRate) + contribution - income);
      yearly.push({
        age: current,
        phase: working ? "Saving" : "Retired",
        balance,
        contribution,
        income,
      });
    }
    return yearly;
  };
  const yearly = build(rate),
    atRetire =
      yearly.find((r) => r.age === retire)?.balance ?? num(v.currentSavings),
    yearsRetired = Math.max(1, end - retire),
    realRate = (1 + rate) / (1 + inflation) - 1,
    annualSpending = num(v.monthlySpending) * 12;
  const target =
    realRate === 0
      ? annualSpending * yearsRetired
      : (annualSpending * (1 - Math.pow(1 + realRate, -yearsRetired))) /
        realRate;
  const scenarios = [
    { name: "Conservative", rate: Math.max(0, rate - 0.02) },
    { name: "Base case", rate },
    { name: "Optimistic", rate: rate + 0.02 },
  ].map((s) => ({
    ...s,
    balance: build(s.rate).find((r) => r.age === retire)?.balance ?? 0,
  }));
  return {
    yearly,
    balanceAtRetirement: atRetire,
    target,
    sustainableIncome: atRetire * 0.04,
    scenarios,
  };
}
function Input({
  label,
  id,
  value,
  onChange,
  step = "1",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-slate mb-2 block text-xs font-semibold tracking-[.08em] uppercase"
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
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass}
      />
    </div>
  );
}
function Stat({
  label,
  value,
  primary = false,
}: {
  label: string;
  value: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded-sm p-4 ${primary ? "bg-gold text-navy sm:col-span-2" : "bg-white/10"}`}
    >
      <p
        className={`text-[.65rem] font-semibold tracking-[.08em] uppercase ${primary ? "text-navy/65" : "text-white/50"}`}
      >
        {label}
      </p>
      <p
        className={`font-display mt-1 font-bold ${primary ? "text-3xl" : "text-xl text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
