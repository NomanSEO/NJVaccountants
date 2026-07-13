import type { CurrencyCode } from './formatters'

export type LoanType = 'repayment' | 'interestOnly'

export type LoanScheduleInput = {
  currency: CurrencyCode
  principal: number
  financedFees: number
  annualRate: number
  termMonths: number
  loanType: LoanType
  deferredMonths: number
  balloonAmount: number
}

export type LoanScheduleRow = {
  period: number
  payment: number
  principal: number
  interest: number
  endingBalance: number
}

export type LoanYearlyRow = Omit<LoanScheduleRow, 'period'> & {
  year: number
  periods: number
}

export type LoanResult = {
  financedAmount: number
  periodicPayment: number
  yearlyPayment: number
  totalInterest: number
  totalPaid: number
  balloonDue: number
  totalCost: number
  schedule: LoanScheduleRow[]
  yearlySchedule: LoanYearlyRow[]
  csvRows: LoanScheduleRow[]
}

const paymentForBalance = (
  balance: number,
  monthlyRate: number,
  periods: number,
  residual: number,
) => {
  if (periods <= 0) return 0
  if (monthlyRate === 0) return Math.max(0, (balance - residual) / periods)

  const growth = (1 + monthlyRate) ** periods
  return Math.max(0, (balance * growth - residual) * monthlyRate / (growth - 1))
}

const toYearlySchedule = (schedule: LoanScheduleRow[]): LoanYearlyRow[] => {
  const rows: LoanYearlyRow[] = []

  schedule.forEach((row, index) => {
    const year = Math.floor(index / 12) + 1
    const existing = rows.at(-1)

    if (!existing || existing.year !== year) {
      rows.push({
        year,
        periods: 1,
        payment: row.payment,
        principal: row.principal,
        interest: row.interest,
        endingBalance: row.endingBalance,
      })
      return
    }

    existing.periods += 1
    existing.payment += row.payment
    existing.principal += row.principal
    existing.interest += row.interest
    existing.endingBalance = row.endingBalance
  })

  return rows
}

export function calculateLoanSchedule(input: LoanScheduleInput): LoanResult {
  const financedAmount = Math.max(0, input.principal) + Math.max(0, input.financedFees)
  const termMonths = Math.max(0, Math.floor(input.termMonths))
  const deferredMonths = Math.min(termMonths, Math.max(0, Math.floor(input.deferredMonths)))
  const monthlyRate = Math.max(0, input.annualRate) / 12
  const schedule: LoanScheduleRow[] = []
  let balance = financedAmount

  for (let period = 1; period <= deferredMonths; period += 1) {
    const interest = balance * monthlyRate
    balance += interest
    schedule.push({ period, payment: 0, principal: 0, interest, endingBalance: balance })
  }

  const repaymentPeriods = termMonths - deferredMonths
  const requestedBalloon = Math.min(Math.max(0, input.balloonAmount), balance)
  const periodicPayment = input.loanType === 'interestOnly'
    ? balance * monthlyRate
    : paymentForBalance(balance, monthlyRate, repaymentPeriods, requestedBalloon)

  for (let period = deferredMonths + 1; period <= termMonths; period += 1) {
    const interest = balance * monthlyRate
    const principal = input.loanType === 'interestOnly'
      ? 0
      : Math.min(Math.max(0, balance - requestedBalloon), Math.max(0, periodicPayment - interest))
    const payment = input.loanType === 'interestOnly' ? interest : principal + interest
    balance = Math.max(requestedBalloon, balance - principal)
    schedule.push({ period, payment, principal, interest, endingBalance: balance })
  }

  const totalInterest = schedule.reduce((total, row) => total + row.interest, 0)
  const totalPaid = schedule.reduce((total, row) => total + row.payment, 0)
  const balloonDue = schedule.at(-1)?.endingBalance ?? financedAmount

  return {
    financedAmount,
    periodicPayment,
    yearlyPayment: periodicPayment * 12,
    totalInterest,
    totalPaid,
    balloonDue,
    totalCost: totalPaid + balloonDue,
    schedule,
    yearlySchedule: toYearlySchedule(schedule),
    csvRows: schedule.map((row) => ({ ...row })),
  }
}
