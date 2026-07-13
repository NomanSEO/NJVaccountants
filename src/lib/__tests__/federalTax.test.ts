import { describe, expect, it } from "vitest";
import { calculateFederalTax } from "@/lib/federalTax";

const baseInput = {
  filingStatus: "single" as const,
  grossIncome: 60_000,
  age: 40,
  deductionType: "standard" as const,
  itemizedDeductions: 0,
  retirementContributions: 0,
  otherAdjustments: 0,
  credits: 0,
  withholding: 0,
  estimatedPayments: 0,
  stateLocalRate: 0,
};

describe("calculateFederalTax", () => {
  it("applies the 2026 single progressive brackets after the standard deduction", () => {
    const result = calculateFederalTax(baseInput);

    expect(result.taxableIncome).toBe(43_900);
    expect(result.federalTax).toBe(5_020);
    expect(result.marginalRate).toBe(0.12);
  });

  it("never lets non-refundable credits reduce federal tax below zero", () => {
    const result = calculateFederalTax({
      ...baseInput,
      filingStatus: "marriedJoint",
      grossIncome: 30_000,
      credits: 9_999,
    });

    expect(result.federalTax).toBe(0);
  });

  it("returns a positive refund when payments exceed total tax", () => {
    const result = calculateFederalTax({
      ...baseInput,
      grossIncome: 30_000,
      withholding: 3_000,
      estimatedPayments: 500,
    });

    expect(result.refundOrBalance).toBe(2_080);
  });

  it("returns zero tax and rates for zero income", () => {
    const result = calculateFederalTax({ ...baseInput, grossIncome: 0 });

    expect(result.adjustedIncome).toBe(0);
    expect(result.taxableIncome).toBe(0);
    expect(result.federalTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
    expect(result.marginalRate).toBe(0);
  });

  it("taxes income at a bracket threshold without spilling into the next bracket", () => {
    const result = calculateFederalTax({ ...baseInput, grossIncome: 66_500 });

    expect(result.taxableIncome).toBe(50_400);
    expect(result.federalTaxBeforeCredits).toBe(5_800);
    expect(result.marginalRate).toBe(0.12);
    expect(result.bracketBreakdown).toEqual([
      { rate: 0.1, taxableAmount: 12_400, tax: 1_240 },
      { rate: 0.12, taxableAmount: 38_000, tax: 4_560 },
    ]);
  });

  it("uses the selected itemized deduction amount", () => {
    const result = calculateFederalTax({
      ...baseInput,
      deductionType: "itemized",
      itemizedDeductions: 10_000,
    });

    expect(result.deduction).toBe(10_000);
    expect(result.taxableIncome).toBe(50_000);
    expect(result.federalTax).toBe(5_752);
  });

  it.each([
    ["single", 16_100, 43_900, 5_020],
    ["marriedSeparate", 16_100, 43_900, 5_020],
    ["marriedJoint", 32_200, 27_800, 2_840],
    ["headOfHousehold", 24_150, 35_850, 3_948],
  ] as const)(
    "calculates the supplied 2026 rules for %s filers",
    (filingStatus, deduction, taxableIncome, federalTax) => {
      const result = calculateFederalTax({ ...baseInput, filingStatus });

      expect(result.deduction).toBe(deduction);
      expect(result.taxableIncome).toBe(taxableIncome);
      expect(result.federalTax).toBe(federalTax);
    },
  );
});
