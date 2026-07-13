import { calculateFederalTax, type FilingStatus } from "@/lib/federalTax";

export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

export type SalaryPaycheckInput = {
  annualSalary: number;
  bonus: number;
  commission: number;
  overtime: number;
  frequency: PayFrequency;
  filingStatus: FilingStatus;
  dependants: number;
  preTaxDeductions: number;
  postTaxDeductions: number;
  stateRate: number;
  includeSocialSecurity: boolean;
  includeMedicare: boolean;
};

export type SalaryPaycheckResult = {
  payPeriods: number;
  annualGross: number;
  grossPerPaycheck: number;
  preTaxPerPaycheck: number;
  federalPerPaycheck: number;
  socialSecurityPerPaycheck: number;
  medicarePerPaycheck: number;
  stateEstimatePerPaycheck: number;
  postTaxPerPaycheck: number;
  netPerPaycheck: number;
  annualFederal: number;
  annualSocialSecurity: number;
  annualMedicare: number;
  annualStateEstimate: number;
  annualNet: number;
};

export const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

const clean = (value: number) =>
  Math.max(0, Number.isFinite(value) ? value : 0);

export function calculateSalaryPaycheck(
  input: SalaryPaycheckInput,
): SalaryPaycheckResult {
  const payPeriods = PAY_PERIODS[input.frequency];
  const annualGross =
    clean(input.annualSalary) +
    clean(input.bonus) +
    clean(input.commission) +
    clean(input.overtime);
  const annualPreTax = clean(input.preTaxDeductions) * payPeriods;
  const taxableWages = Math.max(0, annualGross - annualPreTax);
  const annualFederal = calculateFederalTax({
    filingStatus: input.filingStatus,
    grossIncome: taxableWages,
    age: 30,
    deductionType: "standard",
    itemizedDeductions: 0,
    retirementContributions: 0,
    otherAdjustments: 0,
    credits: clean(input.dependants) * 2_000,
    withholding: 0,
    estimatedPayments: 0,
    stateLocalRate: 0,
  }).federalTax;
  const annualSocialSecurity = input.includeSocialSecurity
    ? Math.min(taxableWages, 184_500) * 0.062
    : 0;
  const additionalThreshold =
    input.filingStatus === "marriedJoint"
      ? 250_000
      : input.filingStatus === "marriedSeparate"
        ? 125_000
        : 200_000;
  const annualMedicare = input.includeMedicare
    ? taxableWages * 0.0145 +
      Math.max(0, taxableWages - additionalThreshold) * 0.009
    : 0;
  const annualStateEstimate =
    taxableWages * Math.min(1, clean(input.stateRate));
  const annualPostTax = clean(input.postTaxDeductions) * payPeriods;
  const annualNet = Math.max(
    0,
    annualGross -
      annualPreTax -
      annualFederal -
      annualSocialSecurity -
      annualMedicare -
      annualStateEstimate -
      annualPostTax,
  );
  const perPay = (value: number) => value / payPeriods;

  return {
    payPeriods,
    annualGross,
    grossPerPaycheck: perPay(annualGross),
    preTaxPerPaycheck: perPay(annualPreTax),
    federalPerPaycheck: perPay(annualFederal),
    socialSecurityPerPaycheck: perPay(annualSocialSecurity),
    medicarePerPaycheck: perPay(annualMedicare),
    stateEstimatePerPaycheck: perPay(annualStateEstimate),
    postTaxPerPaycheck: perPay(annualPostTax),
    netPerPaycheck: perPay(annualNet),
    annualFederal,
    annualSocialSecurity,
    annualMedicare,
    annualStateEstimate,
    annualNet,
  };
}
