import type { CurrencyCode } from "./formatters";

export type MortgageInput = {
  currency: CurrencyCode;
  homePrice: number;
  downPayment: number;
  annualRate: number;
  termYears: number;
  loanType: "fixed" | "adjustable" | "interestOnly";
  adjustmentMonth: number;
  adjustedAnnualRate: number;
  annualPropertyTax: number;
  annualInsurance: number;
  annualHoa: number;
  annualMortgageInsurance: number;
};

export type MortgageScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  escrow: number;
};

export type MortgageResult = {
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyHousingCost: number;
  yearlyHousingCost: number;
  totalInterest: number;
  totalPaid: number;
  schedule: MortgageScheduleRow[];
};

const monthlyPayment = (
  principal: number,
  annualRate: number,
  remainingMonths: number,
) => {
  if (principal <= 0 || remainingMonths <= 0) return 0;

  const monthlyRate = annualRate / 12;
  return monthlyRate === 0
    ? principal / remainingMonths
    : (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -remainingMonths);
};

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const loanAmount = Math.max(0, input.homePrice - input.downPayment);
  const termMonths = Math.max(0, input.termYears * 12);
  const escrow =
    (input.annualPropertyTax +
      input.annualInsurance +
      input.annualHoa +
      input.annualMortgageInsurance) /
    12;

  if (loanAmount === 0 || termMonths === 0) {
    return {
      loanAmount,
      monthlyPrincipalAndInterest: 0,
      monthlyHousingCost: escrow,
      yearlyHousingCost: escrow * 12,
      totalInterest: 0,
      totalPaid: 0,
      schedule: [],
    };
  }

  const initialPayment =
    input.loanType === "interestOnly"
      ? loanAmount * (input.annualRate / 12)
      : monthlyPayment(loanAmount, input.annualRate, termMonths);
  const schedule: MortgageScheduleRow[] = [];
  let balance = loanAmount;
  let payment = initialPayment;
  let monthlyRate = input.annualRate / 12;

  for (let month = 1; month <= termMonths; month += 1) {
    if (input.loanType === "adjustable" && month === input.adjustmentMonth) {
      monthlyRate = input.adjustedAnnualRate / 12;
      payment = monthlyPayment(
        balance,
        input.adjustedAnnualRate,
        termMonths - month + 1,
      );
    }

    const interest = balance * monthlyRate;
    const principal =
      input.loanType === "interestOnly"
        ? 0
        : Math.min(balance, payment - interest);
    balance = Math.max(0, balance - principal);

    schedule.push({
      month,
      payment,
      principal,
      interest,
      endingBalance: balance,
      escrow,
    });
  }

  const totalInterest = schedule.reduce(
    (total, row) => total + row.interest,
    0,
  );
  const totalPaid = schedule.reduce((total, row) => total + row.payment, 0);

  return {
    loanAmount,
    monthlyPrincipalAndInterest: initialPayment,
    monthlyHousingCost: initialPayment + escrow,
    yearlyHousingCost: (initialPayment + escrow) * 12,
    totalInterest,
    totalPaid,
    schedule,
  };
}
