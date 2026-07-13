import { describe, expect, it } from 'vitest'
import { calculateLoanSchedule } from '@/lib/loanSchedule'

const baseInput = {
  currency: 'USD' as const,
  principal: 10_000,
  financedFees: 0,
  annualRate: 0.12,
  termMonths: 12,
  loanType: 'repayment' as const,
  deferredMonths: 0,
  balloonAmount: 0,
}

describe('calculateLoanSchedule', () => {
  it('amortizes the principal plus financed fees and returns CSV-ready rows', () => {
    const result = calculateLoanSchedule({ ...baseInput, financedFees: 500 })

    expect(result.financedAmount).toBe(10_500)
    expect(result.periodicPayment).toBeCloseTo(932.91, 2)
    expect(result.schedule).toHaveLength(12)
    expect(result.schedule.at(-1)?.endingBalance).toBeCloseTo(0, 8)
    expect(result.csvRows[0]).toEqual({
      period: 1,
      payment: expect.any(Number),
      principal: expect.any(Number),
      interest: expect.any(Number),
      endingBalance: expect.any(Number),
    })
  })

  it('keeps the financed balance outstanding on an interest-only loan', () => {
    const result = calculateLoanSchedule({ ...baseInput, loanType: 'interestOnly' })

    expect(result.periodicPayment).toBeCloseTo(100, 2)
    expect(result.schedule.at(-1)?.endingBalance).toBe(10_000)
    expect(result.totalInterest).toBeCloseTo(1_200, 2)
  })

  it('accrues interest during a deferred period before amortizing the remaining term', () => {
    const result = calculateLoanSchedule({ ...baseInput, deferredMonths: 2 })

    expect(result.schedule[0]).toMatchObject({ payment: 0, principal: 0, interest: 100 })
    expect(result.schedule[1]?.endingBalance).toBeCloseTo(10_201, 8)
    expect(result.schedule[2]?.payment).toBeGreaterThan(1_000)
    expect(result.schedule.at(-1)?.endingBalance).toBeCloseTo(0, 8)
  })

  it('leaves the selected balloon residual due at the end of a repayment loan', () => {
    const result = calculateLoanSchedule({ ...baseInput, balloonAmount: 2_000 })

    expect(result.schedule.at(-1)?.endingBalance).toBeCloseTo(2_000, 8)
    expect(result.balloonDue).toBeCloseTo(2_000, 8)
    expect(result.totalPaid + result.balloonDue).toBeCloseTo(10_769.48, 2)
  })

  it('aggregates the monthly schedule into annual display rows', () => {
    const result = calculateLoanSchedule({ ...baseInput, termMonths: 24 })

    expect(result.yearlySchedule).toHaveLength(2)
    expect(result.yearlySchedule[0]).toMatchObject({ year: 1, periods: 12 })
    expect(result.yearlySchedule[1]?.endingBalance).toBeCloseTo(0, 8)
  })

  it('splits zero-interest principal evenly across repayment periods', () => {
    const result = calculateLoanSchedule({ ...baseInput, annualRate: 0 })

    expect(result.periodicPayment).toBeCloseTo(833.33, 2)
    expect(result.totalInterest).toBe(0)
  })
})
