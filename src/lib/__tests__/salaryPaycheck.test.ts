import { describe, expect, it } from 'vitest'
import { calculateSalaryPaycheck } from '@/lib/salaryPaycheck'

describe('calculateSalaryPaycheck', () => {
  it('estimates a biweekly paycheck with federal and payroll taxes', () => {
    const result = calculateSalaryPaycheck({
      annualSalary: 78_000, bonus: 0, commission: 0, overtime: 0,
      frequency: 'biweekly', filingStatus: 'single', dependants: 0,
      preTaxDeductions: 0, postTaxDeductions: 0, stateRate: 0,
      includeSocialSecurity: true, includeMedicare: true,
    })

    expect(result.grossPerPaycheck).toBe(3000)
    expect(result.socialSecurityPerPaycheck).toBeCloseTo(186)
    expect(result.medicarePerPaycheck).toBeCloseTo(43.5)
    expect(result.netPerPaycheck).toBeLessThan(result.grossPerPaycheck)
    expect(result.annualNet).toBeCloseTo(result.netPerPaycheck * 26)
  })

  it('uses user-entered state estimate and excludes opted-out payroll taxes', () => {
    const result = calculateSalaryPaycheck({
      annualSalary: 52_000, bonus: 0, commission: 0, overtime: 0,
      frequency: 'monthly', filingStatus: 'marriedJoint', dependants: 1,
      preTaxDeductions: 200, postTaxDeductions: 50, stateRate: 0.05,
      includeSocialSecurity: false, includeMedicare: false,
    })

    expect(result.socialSecurityPerPaycheck).toBe(0)
    expect(result.medicarePerPaycheck).toBe(0)
    expect(result.stateEstimatePerPaycheck).toBeCloseTo((52_000 / 12 - 200) * 0.05)
  })
})
