"use client";

import { useMemo, useState } from "react";
import CalculatorActions from "@/components/CalculatorActions";
import ResultBarChart from "@/components/ResultBarChart";
import { formatCurrency } from "@/lib/formatters";

export type RothFilingStatus =
  | "single"
  | "marriedJoint"
  | "marriedSeparateNotLivedWithSpouse"
  | "marriedSeparateLivedWithSpouse";
export type ContributionFrequency = "annual" | "monthly";

export interface RothIraInput {
  age: number;
  filingStatus: RothFilingStatus;
  modifiedAgi: number;
  contribution: number;
  contributionFrequency: ContributionFrequency;
  years: number;
  returnRate: number;
  inflationRate: number;
  traditionalTaxRate: number;
}

const PHASEOUT: Record<RothFilingStatus, [number, number]> = {
  single: [153000, 168000],
  marriedJoint: [242000, 252000],
  marriedSeparateNotLivedWithSpouse: [153000, 168000],
  marriedSeparateLivedWithSpouse: [0, 10000],
};

export function calculateRothIra(input: RothIraInput) {
  const limit = input.age >= 50 ? 8600 : 7500;
  const [start, end] = PHASEOUT[input.filingStatus];
  const allowedContribution =
    input.modifiedAgi < start
      ? limit
      : input.modifiedAgi >= end
        ? 0
        : Math.floor((limit * (end - input.modifiedAgi)) / (end - start) / 10) *
          10;
  const requestedAnnual =
    input.contributionFrequency === "monthly"
      ? input.contribution * 12
      : input.contribution;
  const eligibleContribution = Math.max(
    0,
    Math.min(requestedAnnual, allowedContribution),
  );
  const annualRate = Math.max(0, input.returnRate);
  let rothBalance = 0;
  let traditionalBalance = 0;
  let contributions = 0;
  const years = Array.from(
    { length: Math.max(0, Math.floor(input.years)) },
    (_, index) => {
      const opening = rothBalance;
      if (input.contributionFrequency === "monthly") {
        const monthlyRate = annualRate / 12;
        const monthlyContribution = eligibleContribution / 12;
        for (let month = 0; month < 12; month += 1)
          rothBalance = rothBalance * (1 + monthlyRate) + monthlyContribution;
        traditionalBalance =
          traditionalBalance * (1 + annualRate) + eligibleContribution;
      } else {
        rothBalance = rothBalance * (1 + annualRate) + eligibleContribution;
        traditionalBalance =
          traditionalBalance * (1 + annualRate) + eligibleContribution;
      }
      contributions += eligibleContribution;
      return {
        year: index + 1,
        opening,
        contribution: eligibleContribution,
        interest: rothBalance - opening - eligibleContribution,
        balance: rothBalance,
      };
    },
  );
  const realBalance =
    rothBalance / Math.pow(1 + Math.max(0, input.inflationRate), input.years);
  return {
    limit,
    allowedContribution,
    requestedAnnual,
    eligibleContribution,
    contributions,
    rothBalance,
    realBalance,
    traditionalBalance,
    traditionalAfterTax:
      traditionalBalance *
      (1 - Math.min(1, Math.max(0, input.traditionalTaxRate))),
    years,
  };
}

const initial = {
  age: "35",
  filingStatus: "single" as RothFilingStatus,
  modifiedAgi: "90000",
  contribution: "7500",
  contributionFrequency: "annual" as ContributionFrequency,
  years: "30",
  returnRate: "6",
  inflationRate: "3",
  traditionalTaxRate: "22",
};
const fieldClass =
  "w-full rounded-sm border border-border bg-cream px-3 py-2.5 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20";
const number = (value: string) => Number(value) || 0;
const labels: Record<RothFilingStatus, string> = {
  single: "Single / head of household",
  marriedJoint: "Married filing jointly / surviving spouse",
  marriedSeparateNotLivedWithSpouse:
    "Married filing separately (did not live with spouse)",
  marriedSeparateLivedWithSpouse:
    "Married filing separately (lived with spouse)",
};

export default function RothIraCalculator() {
  const [values, setValues] = useState(initial);
  const [showAll, setShowAll] = useState(false);
  const update = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => setValues((current) => ({ ...current, [key]: value }));
  const input = useMemo<RothIraInput>(
    () => ({
      age: number(values.age),
      filingStatus: values.filingStatus,
      modifiedAgi: number(values.modifiedAgi),
      contribution: number(values.contribution),
      contributionFrequency: values.contributionFrequency,
      years: number(values.years),
      returnRate: number(values.returnRate) / 100,
      inflationRate: number(values.inflationRate) / 100,
      traditionalTaxRate: number(values.traditionalTaxRate) / 100,
    }),
    [values],
  );
  const errors = useMemo(
    () => ({
      age:
        input.age < 0 || input.age > 100 ? "Enter an age from 0 to 100." : "",
      modifiedAgi: input.modifiedAgi < 0 ? "Enter zero or more." : "",
      contribution: input.contribution < 0 ? "Enter zero or more." : "",
      years: input.years <= 0 || input.years > 70 ? "Enter 1 to 70 years." : "",
      returnRate:
        input.returnRate < 0 || input.returnRate > 1 ? "Enter 0% to 100%." : "",
      inflationRate:
        input.inflationRate < 0 || input.inflationRate > 1
          ? "Enter 0% to 100%."
          : "",
      traditionalTaxRate:
        input.traditionalTaxRate < 0 || input.traditionalTaxRate > 1
          ? "Enter 0% to 100%."
          : "",
    }),
    [input],
  );
  const valid = !Object.values(errors).some(Boolean);
  const result = useMemo(() => calculateRothIra(input), [input]);
  const visible = showAll ? result.years : result.years.slice(0, 12);
  const rows = result.years.map((row) => [
    row.year,
    formatCurrency(row.contribution, "USD"),
    formatCurrency(row.interest, "USD"),
    formatCurrency(row.balance, "USD"),
  ]);
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <form
        className="rounded-sm border border-border bg-white p-7 shadow-sm md:p-8"
        noValidate
      >
        <h2 className="font-display text-2xl font-bold text-navy">
          Roth IRA details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Use 2026 IRS contribution limits and your income to estimate
          eligibility and long-term growth.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Current age"
            id="age"
            value={values.age}
            error={errors.age}
            onChange={(value) => update("age", value)}
          />
          <Field label="Filing status" id="filingStatus">
            <select
              id="filingStatus"
              value={values.filingStatus}
              onChange={(event) =>
                update("filingStatus", event.target.value as RothFilingStatus)
              }
              className={fieldClass}
            >
              {Object.entries(labels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <NumberField
            label="Modified AGI"
            id="modifiedAgi"
            value={values.modifiedAgi}
            error={errors.modifiedAgi}
            onChange={(value) => update("modifiedAgi", value)}
          />
          <Field label="Contribution frequency" id="contributionFrequency">
            <select
              id="contributionFrequency"
              value={values.contributionFrequency}
              onChange={(event) =>
                update(
                  "contributionFrequency",
                  event.target.value as ContributionFrequency,
                )
              }
              className={fieldClass}
            >
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
            </select>
          </Field>
          <NumberField
            label={
              values.contributionFrequency === "monthly"
                ? "Monthly contribution"
                : "Annual contribution"
            }
            id="contribution"
            value={values.contribution}
            error={errors.contribution}
            onChange={(value) => update("contribution", value)}
          />
          <NumberField
            label="Years invested"
            id="years"
            value={values.years}
            error={errors.years}
            onChange={(value) => update("years", value)}
          />
          <NumberField
            label="Annual return (%)"
            id="returnRate"
            value={values.returnRate}
            error={errors.returnRate}
            step="0.1"
            onChange={(value) => update("returnRate", value)}
          />
          <NumberField
            label="Inflation (%)"
            id="inflationRate"
            value={values.inflationRate}
            error={errors.inflationRate}
            step="0.1"
            onChange={(value) => update("inflationRate", value)}
          />
          <NumberField
            label="Traditional IRA withdrawal tax (%)"
            id="traditionalTaxRate"
            value={values.traditionalTaxRate}
            error={errors.traditionalTaxRate}
            step="0.1"
            onChange={(value) => update("traditionalTaxRate", value)}
          />
        </div>
      </form>
      <section
        className="rounded-sm bg-navy p-7 text-white md:p-8"
        aria-live="polite"
        aria-labelledby="roth-results"
      >
        <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold">
          Your 2026 estimate
        </p>
        <h2 id="roth-results" className="mt-2 font-display text-2xl font-bold">
          Roth IRA projection
        </h2>
        {!valid ? (
          <p className="mt-7 rounded-sm border border-gold/50 bg-white/5 p-4 text-sm">
            Correct the highlighted fields to see your estimate.
          </p>
        ) : (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Stat
                label="Eligible annual contribution"
                value={formatCurrency(result.eligibleContribution, "USD")}
                prominent
              />
              <Stat
                label="2026 contribution limit"
                value={formatCurrency(result.allowedContribution, "USD")}
              />
              <Stat
                label="Projected Roth value"
                value={formatCurrency(result.rothBalance, "USD")}
              />
              <Stat
                label="Value in today’s dollars"
                value={formatCurrency(result.realBalance, "USD")}
              />
              <Stat
                label="Roth vs traditional after tax"
                value={formatCurrency(
                  result.rothBalance - result.traditionalAfterTax,
                  "USD",
                )}
              />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              Roth contributions are made after tax and qualified withdrawals
              are generally tax-free. Traditional IRA results assume all
              withdrawals are taxed at your selected rate.
            </p>
          </>
        )}
      </section>
      {valid && (
        <section className="space-y-8 rounded-sm border border-border bg-white p-7 lg:col-span-2 md:p-8">
          <ResultBarChart
            title="Roth IRA growth"
            items={[
              {
                name: "Contributions",
                value: result.contributions,
                formattedValue: formatCurrency(result.contributions, "USD"),
              },
              {
                name: "Investment growth",
                value: result.rothBalance - result.contributions,
                formattedValue: formatCurrency(
                  result.rothBalance - result.contributions,
                  "USD",
                ),
              },
              {
                name: "Traditional IRA after tax",
                value: result.traditionalAfterTax,
                formattedValue: formatCurrency(
                  result.traditionalAfterTax,
                  "USD",
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
                Contributions are limited to the calculated 2026 eligibility
                each year for this illustration.
              </p>
            </div>
            <CalculatorActions
              filename="roth-ira-projection.csv"
              shareTitle="Roth IRA calculator estimate"
              rows={[["Year", "Contribution", "Growth", "Balance"], ...rows]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <caption className="sr-only">Roth IRA annual projection</caption>
              <thead className="border-b border-border text-xs tracking-[.08em] uppercase text-slate">
                <tr>
                  {["Year", "Contribution", "Growth", "Balance"].map(
                    (label) => (
                      <th
                        key={label}
                        scope="col"
                        className="px-3 py-3 font-semibold"
                      >
                        {label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr key={row.year} className="border-b border-border/70">
                    <th scope="row" className="px-3 py-3 font-medium text-navy">
                      {row.year}
                    </th>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.contribution, "USD")}
                    </td>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.interest, "USD")}
                    </td>
                    <td className="px-3 py-3 text-slate">
                      {formatCurrency(row.balance, "USD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.years.length > 12 && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="border border-border px-4 py-2 text-xs font-semibold tracking-[.08em] uppercase text-navy hover:border-gold hover:text-gold-dark"
            >
              {showAll ? "Show first 12 years" : "Show all years"}
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
        className={`${fieldClass} ${error ? "border-gold" : ""}`}
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
