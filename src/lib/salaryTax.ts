// Pakistan salary income tax slabs — Tax Year 2026–2027
// Each slab: tax on income up to `upTo` = `baseTax` + `rate` * (income − `over`)

export interface TaxSlab {
  over: number; // income threshold this slab applies above
  upTo: number; // upper bound of the slab (Infinity for the top slab)
  baseTax: number; // fixed tax carried from lower slabs
  rate: number; // marginal rate (fraction) on the amount over `over`
  label: string;
}

export const SALARY_TAX_SLABS_2026_27: TaxSlab[] = [
  { over: 0, upTo: 600_000, baseTax: 0, rate: 0, label: "Up to Rs. 600,000" },
  {
    over: 600_000,
    upTo: 1_200_000,
    baseTax: 0,
    rate: 0.01,
    label: "Rs. 600,001 – 1,200,000",
  },
  {
    over: 1_200_000,
    upTo: 2_200_000,
    baseTax: 6_000,
    rate: 0.11,
    label: "Rs. 1,200,001 – 2,200,000",
  },
  {
    over: 2_200_000,
    upTo: 3_200_000,
    baseTax: 116_000,
    rate: 0.2,
    label: "Rs. 2,200,001 – 3,200,000",
  },
  {
    over: 3_200_000,
    upTo: 4_100_000,
    baseTax: 316_000,
    rate: 0.25,
    label: "Rs. 3,200,001 – 4,100,000",
  },
  {
    over: 4_100_000,
    upTo: 5_600_000,
    baseTax: 541_000,
    rate: 0.29,
    label: "Rs. 4,100,001 – 5,600,000",
  },
  {
    over: 5_600_000,
    upTo: 7_000_000,
    baseTax: 976_000,
    rate: 0.32,
    label: "Rs. 5,600,001 – 7,000,000",
  },
  {
    over: 7_000_000,
    upTo: Infinity,
    baseTax: 1_424_000,
    rate: 0.35,
    label: "Above Rs. 7,000,000",
  },
];

export interface SlabBreakdown {
  label: string;
  ratePercent: number;
  taxableInSlab: number; // portion of income taxed within this slab
  taxInSlab: number; // tax contributed by this slab
}

export interface TaxResult {
  annualIncome: number;
  annualTax: number;
  annualTakeHome: number;
  monthlyTax: number;
  monthlyTakeHome: number;
  effectiveRate: number; // fraction of total income paid as tax
  marginalRate: number; // top applicable marginal rate (fraction)
  breakdown: SlabBreakdown[];
}

/**
 * Computes annual salary tax for the given taxable annual income (in PKR)
 * using the 2026–2027 slabs.
 */
export function calculateSalaryTax(annualIncome: number): TaxResult {
  const income = Math.max(0, annualIncome || 0);

  let annualTax = 0;
  let marginalRate = 0;
  const breakdown: SlabBreakdown[] = [];

  for (const slab of SALARY_TAX_SLABS_2026_27) {
    if (income <= slab.over) break;
    const taxableInSlab = Math.min(income, slab.upTo) - slab.over;
    const taxInSlab = taxableInSlab * slab.rate;
    annualTax += taxInSlab;
    marginalRate = slab.rate;
    breakdown.push({
      label: slab.label,
      ratePercent: slab.rate * 100,
      taxableInSlab,
      taxInSlab,
    });
  }

  const annualTakeHome = income - annualTax;

  return {
    annualIncome: income,
    annualTax,
    annualTakeHome,
    monthlyTax: annualTax / 12,
    monthlyTakeHome: annualTakeHome / 12,
    effectiveRate: income > 0 ? annualTax / income : 0,
    marginalRate,
    breakdown,
  };
}
