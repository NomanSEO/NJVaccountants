"use client";

import { useMemo, useState } from "react";
import { calculateSalaryTax } from "@/lib/salaryTax";
import Link from "next/link";

type Period = "monthly" | "annual";

const fmt = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-PK");

const pct = (n: number) => (n * 100).toFixed(2) + "%";

export default function SalaryTaxCalculator() {
  const [rawValue, setRawValue] = useState("");
  const [period, setPeriod] = useState<Period>("monthly");

  const numericValue = useMemo(() => {
    const cleaned = rawValue.replace(/[^0-9.]/g, "");
    return cleaned === "" ? null : parseFloat(cleaned);
  }, [rawValue]);

  const annualIncome =
    numericValue == null
      ? 0
      : period === "monthly"
        ? numericValue * 12
        : numericValue;

  const result = useMemo(
    () => calculateSalaryTax(annualIncome),
    [annualIncome],
  );
  const hasInput = numericValue != null && numericValue > 0;

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      {/* ── Input panel ── */}
      <div className="border-border rounded-sm border bg-white p-4 shadow-[0_8px_30px_rgba(11,31,58,0.05)] sm:p-6 md:p-8">
        <h2 className="font-display text-navy mb-1.5 text-[1.375rem] font-bold">
          Your Salary
        </h2>
        <p className="text-slate mb-6 text-sm leading-relaxed">
          Enter your taxable salary income to estimate your income tax for tax
          year 2026–2027.
        </p>

        {/* Period toggle */}
        <div className="bg-cream border-border mb-5 inline-flex rounded-sm border p-1">
          {(["monthly", "annual"] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-sm px-5 py-2 text-[0.8125rem] font-semibold tracking-[0.04em] uppercase transition-colors ${
                period === p
                  ? "bg-navy text-white"
                  : "text-slate hover:text-navy bg-transparent"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Amount field */}
        <label
          htmlFor="salary"
          className="text-slate mb-2 block text-xs font-semibold tracking-[0.08em] uppercase"
        >
          {period === "monthly" ? "Monthly" : "Annual"} Taxable Salary
        </label>
        <div className="relative">
          <span className="text-slate pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold">
            Rs.
          </span>
          <input
            id="salary"
            inputMode="decimal"
            placeholder="0"
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            className="text-navy bg-cream border-border focus:border-gold focus:ring-gold/20 w-full rounded-sm border py-3.5 pr-4 pl-12 text-lg font-semibold transition-all outline-none focus:ring-2"
          />
        </div>

        {period === "monthly" && hasInput && (
          <p className="text-slate-light mt-3 text-[0.8125rem]">
            Annual taxable income:{" "}
            <strong className="text-navy">{fmt(annualIncome)}</strong>
          </p>
        )}

        <p className="text-slate-light border-border mt-6 border-t pt-4 text-xs leading-relaxed">
          This is an estimate based on the published salary tax slabs for tax
          year 2026–2027 and assumes the full amount is taxable salary income.
          For tailored advice,{" "}
          <Link
            href="/#contact"
            className="text-gold hover:text-gold-dark font-semibold"
          >
            speak to a partner
          </Link>
          .
        </p>
      </div>

      {/* ── Results panel ── */}
      <div className="bg-navy relative overflow-hidden rounded-sm p-4 text-white sm:p-6 md:p-8">
        <div className="hero-pattern" />
        <div className="relative">
          <div className="text-gold mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-4.5 w-0.75 shrink-0" />
            Your Estimate
          </div>

          {/* Headline numbers */}
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-[0.7rem] tracking-[0.08em] text-white/50 uppercase">
                Tax / {period === "monthly" ? "Month" : "Year"}
              </div>
              <div className="font-display text-gold text-[1.75rem] leading-tight font-bold">
                {fmt(
                  period === "monthly" ? result.monthlyTax : result.annualTax,
                )}
              </div>
            </div>
            <div>
              <div className="mb-1 text-[0.7rem] tracking-[0.08em] text-white/50 uppercase">
                Take-home / {period === "monthly" ? "Month" : "Year"}
              </div>
              <div className="font-display text-[1.75rem] leading-tight font-bold text-white">
                {fmt(
                  period === "monthly"
                    ? result.monthlyTakeHome
                    : result.annualTakeHome,
                )}
              </div>
            </div>
          </div>

          {/* Secondary stats */}
          <div className="mb-7 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
            <Stat label="Annual Tax" value={fmt(result.annualTax)} />
            <Stat label="Annual Take-home" value={fmt(result.annualTakeHome)} />
            <Stat label="Effective Rate" value={pct(result.effectiveRate)} />
            <Stat label="Marginal Rate" value={pct(result.marginalRate)} />
          </div>

          {/* Slab breakdown */}
          <div className="mb-3 text-[0.7rem] tracking-[0.08em] text-white/50 uppercase">
            Slab-wise Breakdown
          </div>
          {result.breakdown.length === 0 ? (
            <p className="text-sm leading-relaxed text-white/60">
              No tax payable — taxable income is within the tax-free threshold
              of Rs. 600,000.
            </p>
          ) : (
            <div className="space-y-2.5">
              {result.breakdown.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center justify-between border-b border-white/10 pb-2.5 text-sm last:border-0"
                >
                  <div>
                    <div className="text-white/85">{b.label}</div>
                    <div className="text-[0.7rem] text-white/45">
                      {+b.ratePercent.toFixed(2)}% on {fmt(b.taxableInSlab)}
                    </div>
                  </div>
                  <div className="text-gold ml-4 shrink-0 font-semibold">
                    {fmt(b.taxInSlab)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-navy p-4">
      <div className="mb-1 text-[0.65rem] tracking-[0.08em] text-white/45 uppercase">
        {label}
      </div>
      <div className="font-semibold text-white">{value}</div>
    </div>
  );
}
