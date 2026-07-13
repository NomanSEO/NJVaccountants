import { describe, expect, it } from 'vitest'
import { calculateRothIra } from '@/components/RothIraCalculator'

describe('calculateRothIra', () => {
  it('allows the full 2026 contribution below the single phase-out range', () => {
    const result = calculateRothIra({ age: 35, filingStatus: 'single', modifiedAgi: 100000, contribution: 7500, contributionFrequency: 'annual', years: 30, returnRate: 0.06, inflationRate: 0.03, traditionalTaxRate: 0.22 })
    expect(result.allowedContribution).toBe(7500)
    expect(result.eligibleContribution).toBe(7500)
  })

  it('reduces a single filer contribution through the 2026 phase-out range', () => {
    const result = calculateRothIra({ age: 51, filingStatus: 'single', modifiedAgi: 160500, contribution: 8600, contributionFrequency: 'annual', years: 1, returnRate: 0.06, inflationRate: 0.03, traditionalTaxRate: 0.22 })
    expect(result.allowedContribution).toBe(4300)
    expect(result.eligibleContribution).toBe(4300)
  })

  it('disallows contributions at the married-filing-separately limit when living with spouse', () => {
    const result = calculateRothIra({ age: 40, filingStatus: 'marriedSeparateLivedWithSpouse', modifiedAgi: 10000, contribution: 7500, contributionFrequency: 'annual', years: 10, returnRate: 0.06, inflationRate: 0.03, traditionalTaxRate: 0.22 })
    expect(result.allowedContribution).toBe(0)
    expect(result.eligibleContribution).toBe(0)
  })
})
