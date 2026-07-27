"use client";

import { useMemo, useState } from "react";
import CalculatorActions from "@/components/CalculatorActions";
import ResultBarChart from "@/components/ResultBarChart";
import { formatCurrency } from "@/lib/formatters";
import {
  calculateSalaryPaycheck,
  type PayFrequency,
  type SalaryPaycheckInput,
} from "@/lib/salaryPaycheck";
import type { FilingStatus } from "@/lib/federalTax";

const initial: SalaryPaycheckInput = {
  annualSalary: 75000,
  bonus: 0,
  commission: 0,
  overtime: 0,
  frequency: "biweekly",
  filingStatus: "single",
  dependants: 0,
  preTaxDeductions: 0,
  postTaxDeductions: 0,
  stateRate: 0,
  includeSocialSecurity: true,
  includeMedicare: true,
};
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const labels: Record<PayFrequency, string> = {
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  semimonthly: "Semi-monthly",
  monthly: "Monthly",
};

export default function SalaryPaycheckCalculator() {
  const [input, setInput] = useState(initial);
  const [state, setState] = useState("");
  const result = useMemo(() => calculateSalaryPaycheck(input), [input]);
  const set = (
    key: keyof SalaryPaycheckInput,
    value: number | string | boolean,
  ) => setInput((o) => ({ ...o, [key]: value }));
  const money = (v: number) => formatCurrency(v, "USD");
  const rows = [
    ["Item", "Per paycheck", "Annual"],
    ["Gross pay", result.grossPerPaycheck, result.annualGross],
    ["Federal estimate", result.federalPerPaycheck, result.annualFederal],
    [
      "Social Security",
      result.socialSecurityPerPaycheck,
      result.annualSocialSecurity,
    ],
    ["Medicare", result.medicarePerPaycheck, result.annualMedicare],
    [
      "State/local estimate",
      result.stateEstimatePerPaycheck,
      result.annualStateEstimate,
    ],
    ["Net pay", result.netPerPaycheck, result.annualNet],
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="border-border border bg-white p-4 shadow-sm sm:p-6 md:p-8">
        <h2 className="font-display text-navy text-2xl font-bold">
          Pay details
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Annual salary"
            value={input.annualSalary}
            onChange={(v) => set("annualSalary", v)}
          />
          <Field
            label="Bonus"
            value={input.bonus}
            onChange={(v) => set("bonus", v)}
          />
          <Field
            label="Commission"
            value={input.commission}
            onChange={(v) => set("commission", v)}
          />
          <Field
            label="Overtime"
            value={input.overtime}
            onChange={(v) => set("overtime", v)}
          />
          <Field
            label="Pre-tax deductions / pay"
            value={input.preTaxDeductions}
            onChange={(v) => set("preTaxDeductions", v)}
          />
          <Field
            label="Post-tax deductions / pay"
            value={input.postTaxDeductions}
            onChange={(v) => set("postTaxDeductions", v)}
          />
          <label className="text-slate text-sm">
            Pay frequency
            <select
              value={input.frequency}
              onChange={(e) => set("frequency", e.target.value as PayFrequency)}
              className="border-border text-navy mt-1 w-full border p-3"
            >
              {Object.entries(labels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="text-slate text-sm">
            Filing status
            <select
              value={input.filingStatus}
              onChange={(e) =>
                set("filingStatus", e.target.value as FilingStatus)
              }
              className="border-border text-navy mt-1 w-full border p-3"
            >
              <option value="single">Single</option>
              <option value="marriedSeparate">Married separately</option>
              <option value="marriedJoint">Married jointly</option>
              <option value="headOfHousehold">Head of household</option>
            </select>
          </label>
          <Field
            label="Dependants"
            value={input.dependants}
            onChange={(v) => set("dependants", v)}
          />
          <label className="text-slate text-sm">
            State
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border-border text-navy mt-1 w-full border p-3"
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <Field
            label="State/local estimate rate (%)"
            value={input.stateRate * 100}
            onChange={(v) => set("stateRate", v / 100)}
          />
        </div>
        <p className="text-slate mt-4 text-xs">
          State/local tax is a user-entered estimate; local rules are not
          calculated.
        </p>
        <label className="text-navy mt-4 flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={input.includeSocialSecurity}
            onChange={(e) => set("includeSocialSecurity", e.target.checked)}
          />{" "}
          Include Social Security
        </label>
        <label className="text-navy mt-2 flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={input.includeMedicare}
            onChange={(e) => set("includeMedicare", e.target.checked)}
          />{" "}
          Include Medicare
        </label>
      </section>
      <section className="bg-navy p-4 text-white sm:p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold">
          Your paycheck estimate
        </h2>
        <p className="mt-4 text-xs text-white/60 uppercase">
          Net pay per {labels[input.frequency].toLowerCase()} period
        </p>
        <p className="font-display text-gold text-4xl font-bold">
          {money(result.netPerPaycheck)}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ["Gross pay", result.grossPerPaycheck],
            ["Federal estimate", result.federalPerPaycheck],
            [
              "FICA + Medicare",
              result.socialSecurityPerPaycheck + result.medicarePerPaycheck,
            ],
            ["State/local estimate", result.stateEstimatePerPaycheck],
            ["Annual net", result.annualNet],
          ].map(([l, v]) => (
            <div key={String(l)}>
              <p className="text-xs text-white/60">{l}</p>
              <p className="font-semibold">{money(Number(v))}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-border space-y-6 border bg-white p-4 sm:p-6 md:p-8 lg:col-span-2">
        <ResultBarChart
          title="Paycheck deductions"
          items={[
            {
              name: "Federal",
              value: result.federalPerPaycheck,
              formattedValue: money(result.federalPerPaycheck),
            },
            {
              name: "FICA & Medicare",
              value:
                result.socialSecurityPerPaycheck + result.medicarePerPaycheck,
              formattedValue: money(
                result.socialSecurityPerPaycheck + result.medicarePerPaycheck,
              ),
            },
            {
              name: "Net pay",
              value: result.netPerPaycheck,
              formattedValue: money(result.netPerPaycheck),
            },
          ]}
        />
        <div className="overflow-x-auto" data-calculator-table>
          <p className="text-slate mb-2 text-xs sm:hidden">
            Swipe to view all columns
          </p>
          <table className="w-full min-w-110 text-left text-sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Per paycheck</th>
                <th>Annual</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((r) => (
                <tr key={String(r[0])} className="border-border border-t">
                  <td>{r[0]}</td>
                  <td>{money(Number(r[1]))}</td>
                  <td>{money(Number(r[2]))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CalculatorActions
          filename="salary-paycheck-estimate.csv"
          rows={rows}
          shareTitle="Salary paycheck estimate"
        />
      </section>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="text-slate text-sm">
      {label}
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="border-border text-navy mt-1 w-full border p-3"
      />
Salary Paycheck Calculator USA

Estimate your take-home pay in seconds with our free Salary Paycheck Calculator. Whether you're an employee, HR professional, payroll administrator, or employer, this calculator helps estimate your net paycheck after federal income tax, state income tax, Social Security, Medicare, retirement contributions, and other payroll deductions.

What is a Salary Paycheck Calculator?

A Salary Paycheck Calculator is an online payroll tool that estimates how much money you will actually receive after mandatory payroll taxes and deductions.

It calculates your net pay by considering:

Federal Income Tax
State Income Tax
Social Security Tax
Medicare Tax
401(k) Contributions
Health Insurance Premiums
HSA/FSA Contributions
Other Pre-tax and Post-tax Deductions
Why Use Our Salary Paycheck Calculator?

Our calculator is designed for employees, employers, payroll professionals, and job seekers across the United States.

Features

✔ Federal Tax Calculation

✔ State Tax Support

✔ Social Security & Medicare Calculation

✔ Weekly, Biweekly, Semimonthly & Monthly Paychecks

✔ Annual Salary Conversion

✔ Mobile Friendly

✔ Instant Results

✔ Free Online Calculator

How to Calculate Your Take-Home Pay
Step 1

Enter your Gross Salary or hourly wage.

Step 2

Choose your pay frequency:

Weekly
Biweekly
Semimonthly
Monthly
Step 3

Select your:

State
Filing Status
Number of Dependents
Retirement Contributions
Health Insurance Deductions
Step 4

Click Calculate to view your estimated paycheck.

Salary Paycheck Formula

Net Pay = Gross Pay − Federal Tax − State Tax − Social Security − Medicare − Retirement Contributions − Other Payroll Deductions

Gross Pay vs Net Pay
Gross Pay

Gross pay is your earnings before taxes and deductions.

Net Pay

Net pay, also called take-home pay, is the amount deposited into your bank account after all payroll deductions.

Common Payroll Deductions in the United States

Your paycheck may include:

Federal Income Tax
State Income Tax
Local Income Tax (where applicable)
Social Security Tax
Medicare Tax
401(k) Contributions
Health Insurance
Dental Insurance
Vision Insurance
HSA Contributions
FSA Contributions
Life Insurance
Union Dues
Wage Garnishments
Who Can Use This Calculator?

This calculator is ideal for:

Employees
Employers
Payroll Specialists
HR Managers
CPAs
Bookkeepers
Small Business Owners
Freelancers comparing W-2 employment
Job Seekers evaluating salary offers
Why Choose NJV Accountants?

NJV Accountants develops easy-to-use financial tools that help individuals and businesses make informed payroll and financial decisions. Our calculators are designed for accuracy, speed, and ease of use while following current U.S. payroll tax principles.

Frequently Asked Questions
Is this Salary Paycheck Calculator free?

Yes. It is completely free to use.

Does the calculator include federal taxes?

Yes. Federal income tax is included in the calculation.

Does it calculate state taxes?

Yes. State income tax is calculated where applicable based on your selected state.

Does the calculator include Social Security and Medicare?

Yes. FICA taxes, including Social Security and Medicare, are included.

Can I calculate hourly wages?

Yes. You can estimate paychecks from hourly wages or annual salaries.

Is this calculator suitable for employers?

Yes. HR professionals, payroll administrators, and employers can use it for payroll planning and salary estimates.
    </label>
  );
}



