import { describe, expect, it } from "vitest";
import { calculateMortgage } from "@/lib/mortgage";

const baseInput = {
  currency: "USD" as const,
  homePrice: 400_000,
  downPayment: 80_000,
  annualRate: 0.06,
  termYears: 30,
  loanType: "fixed" as const,
  adjustmentMonth: 61,
  adjustedAnnualRate: 0.07,
  annualPropertyTax: 4_800,
  annualInsurance: 1_200,
  annualHoa: 0,
  annualMortgageInsurance: 0,
};

describe("calculateMortgage", () => {
  it("amortizes a fixed-rate loan and separates monthly escrow", () => {
    const result = calculateMortgage(baseInput);

    expect(result.loanAmount).toBe(320_000);
    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(1_918.56, 2);
    expect(result.monthlyHousingCost).toBeCloseTo(2_418.56, 2);
    expect(result.schedule).toHaveLength(360);
    expect(result.schedule.at(-1)?.endingBalance).toBeCloseTo(0, 8);
  });

  it("divides the balance evenly over the term at a zero interest rate", () => {
    const result = calculateMortgage({ ...baseInput, annualRate: 0 });

    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(888.89, 2);
    expect(result.totalInterest).toBe(0);
  });

  it("keeps the principal outstanding for interest-only loans", () => {
    const result = calculateMortgage({
      ...baseInput,
      loanType: "interestOnly",
    });

    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(1_600, 2);
    expect(result.schedule.at(-1)?.endingBalance).toBe(320_000);
    expect(result.totalInterest).toBeCloseTo(576_000, 2);
  });

  it("recalculates an adjustable-rate payment at its adjustment month", () => {
    const result = calculateMortgage({ ...baseInput, loanType: "adjustable" });

    expect(result.schedule[59].payment).toBeCloseTo(1_918.56, 2);
    expect(result.schedule[60].payment).toBeGreaterThan(
      result.schedule[59].payment,
    );
    expect(result.schedule[60].payment).toBeCloseTo(2_104.6, 2);
  });

  it("retains escrow housing costs when the down payment covers the home", () => {
    const result = calculateMortgage({ ...baseInput, downPayment: 400_000 });

    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPrincipalAndInterest).toBe(0);
    expect(result.monthlyHousingCost).toBe(500);
    expect(result.yearlyHousingCost).toBe(6_000);
    expect(result.totalInterest).toBe(0);
    expect(result.schedule).toHaveLength(0);
  });

  it("includes all annual escrow items in annual housing cost without treating them as interest", () => {
    const result = calculateMortgage({
      ...baseInput,
      annualHoa: 1_200,
      annualMortgageInsurance: 600,
    });

    expect(result.schedule[0].escrow).toBe(650);
    expect(result.yearlyHousingCost).toBeCloseTo(
      result.monthlyHousingCost * 12,
      8,
    );
    expect(result.totalInterest).toBeCloseTo(370_682.2, 2);
  });
});
