export type FilingStatus = 'single' | 'marriedSeparate' | 'marriedJoint' | 'headOfHousehold'

export type FederalTaxInput = {
  filingStatus: FilingStatus
  grossIncome: number
  age: number
  deductionType: 'standard' | 'itemized'
  itemizedDeductions: number
  retirementContributions: number
  otherAdjustments: number
  credits: number
  withholding: number
  estimatedPayments: number
  stateLocalRate: number
}

export type FederalTaxResult = {
  adjustedIncome: number
  deduction: number
  taxableIncome: number
  federalTaxBeforeCredits: number
  federalTax: number
  stateLocalEstimate: number
  totalTax: number
  refundOrBalance: number
  effectiveRate: number
  marginalRate: number
  bracketBreakdown: { rate: number; taxableAmount: number; tax: number }[]
}

type FederalTaxRule = {
  brackets: number[]
  standardDeduction: number
}

const RATES = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]

export const FEDERAL_TAX_RULES_2026: Record<FilingStatus, FederalTaxRule> = {
  single: {
    brackets: [0, 12_400, 50_400, 105_700, 201_775, 256_225, 640_600],
    standardDeduction: 16_100,
  },
  marriedSeparate: {
    brackets: [0, 12_400, 50_400, 105_700, 201_775, 256_225, 384_350],
    standardDeduction: 16_100,
  },
  marriedJoint: {
    brackets: [0, 24_800, 100_800, 211_400, 403_550, 512_450, 768_700],
    standardDeduction: 32_200,
  },
  headOfHousehold: {
    brackets: [0, 17_700, 67_450, 105_700, 201_750, 256_200, 640_600],
    standardDeduction: 24_150,
  },
}

export function calculateFederalTax(input: FederalTaxInput): FederalTaxResult {
  const rules = FEDERAL_TAX_RULES_2026[input.filingStatus]
  const adjustedIncome = Math.max(
    0,
    input.grossIncome - input.retirementContributions - input.otherAdjustments,
  )
  const deduction = input.deductionType === 'itemized'
    ? input.itemizedDeductions
    : rules.standardDeduction
  const taxableIncome = Math.max(0, adjustedIncome - deduction)

  let federalTaxBeforeCredits = 0
  let marginalRate = 0
  const bracketBreakdown: FederalTaxResult['bracketBreakdown'] = []

  for (let index = 0; index < rules.brackets.length; index += 1) {
    const lowerBound = rules.brackets[index]
    if (taxableIncome <= lowerBound) break

    const upperBound = rules.brackets[index + 1] ?? Infinity
    const taxableAmount = Math.min(taxableIncome, upperBound) - lowerBound
    const rate = RATES[index]
    const tax = taxableAmount * rate

    federalTaxBeforeCredits += tax
    marginalRate = rate
    bracketBreakdown.push({ rate, taxableAmount, tax })
  }

  const federalTax = Math.max(0, federalTaxBeforeCredits - input.credits)
  const stateLocalEstimate = taxableIncome * input.stateLocalRate
  const totalTax = federalTax + stateLocalEstimate
  const refundOrBalance = input.withholding + input.estimatedPayments - totalTax

  return {
    adjustedIncome,
    deduction,
    taxableIncome,
    federalTaxBeforeCredits,
    federalTax,
    stateLocalEstimate,
    totalTax,
    refundOrBalance,
    effectiveRate: adjustedIncome > 0 ? federalTax / adjustedIncome : 0,
    marginalRate,
    bracketBreakdown,
  }
}
