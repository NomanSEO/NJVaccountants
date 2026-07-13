# Financial Calculators — Requirements Questionnaire

Use this questionnaire before planning or building each calculator. Questions marked **Required** must be answered before implementation. Questions marked **Optional** can use the suggested default if no preference is provided.

## Shared Questions for All Calculators

1. **Required:** Which country or jurisdiction should this calculator support?

   United States , United Kingdom

2. **Required:** Which currency and number format should it use?

   USD , Pound, Euro

3. **Required:** Who is the primary user: consumer, business owner, adviser, employee, borrower, investor, or another audience?

   consumer

4. **Required:** Should the calculator reproduce the reference tool closely, or only use it as functional inspiration?

   Reference

5. **Required:** Which inputs, results, charts, tables, and explanations are essential?

   All inputs that are required in URL provided and which are marked manadatory by that url are essential, regarding charts and tables and explanations , create chart , tables for every calculator and explanations as well. Also create seo optimized content under each table so calculator can rank high on google. Keyword is the title of calculator that should be optimized in content

6. **Required:** Which assumptions should be fixed, and which should users be allowed to change?

   Please check URL provided and make the ones mandatory that are made mandatory by that url calculator.

7. **Required:** What authoritative source will approve rates, limits, tax rules, eligibility rules, and regulatory wording?

   US IRS organization use its rates and wording regarding tax calculator

8. **Required:** Who will review and approve the calculator before publication?

   Me

9. **Required:** How frequently must time-sensitive data be reviewed or updated?

   Every month and on 1st july , 30th December

10. **Optional:** Should results be shareable, printable, downloadable, or emailed? Default: no data export in the first release.

    Include All

11. **Optional:** Should inputs be saved in the browser?

    Do not retain financial data.

12. **Optional:** Should results include a contact or consultation call-to-action?

    use the existing site CTA.

13. **Optional:** Are analytics events required for calculator starts, completions, and CTA clicks?

    Not Now

14. **Required:** What disclaimer and limitation-of-liability wording should appear?

    No wording now

15. **Required:** What example cases will the firm use to verify the results?

    Nothing

---

## 1. Federal Taxable Income Tax Calculator

1. Is this for U.S. federal income tax, Pakistan income tax, or another jurisdiction?

   USA

   Tax bracket table

| Tax rate | Single filer         | Married filing jointly / Surviving spouse | Head of household    | Married filing separately |
| -------- | -------------------- | ----------------------------------------- | -------------------- | ------------------------- |
| 10%      | $0 to $12,400        | $0 to $24,800                             | $0 to $17,700        | $0 to $12,400             |
| 12%      | $12,401 to $50,400   | $24,801 to $100,800                       | $17,701 to $67,450   | $12,401 to $50,400        |
| 22%      | $50,401 to $105,700  | $100,801 to $211,400                      | $67,451 to $105,700  | $50,401 to $105,700       |
| 24%      | $105,701 to $201,775 | $211,401 to $403,550                      | $105,701 to $201,750 | $105,701 to $201,775      |
| 32%      | $201,776 to $256,225 | $403,551 to $512,450                      | $201,751 to $256,200 | $201,776 to $256,225      |
| 35%      | $256,226 to $640,600 | $512,451 to $768,700                      | $256,201 to $640,600 | $256,226 to $384,350      |
| 37%      | $640,601 or more     | $768,701 or more                          | $640,601 or more     | $384,351 or more          |

2. Which tax year or years must be supported?

   2026-2027

3. Should the starting input be gross income or already-calculated taxable income?

   Gross Income

4. Which filing statuses must be included?

   Give options of single , married filing separately , married filing jointly and head of household

5. Should it support standard and itemized deductions?

   Yes

6. Should age, dependants, retirement contributions, tax credits, and other adjustments affect the estimate?

   Yes

7. Should it estimate total tax only, or also refund/balance due using withholding and estimated payments?

   Both

8. Should state, provincial, or local taxes be excluded or added later?

   Add in optional

9. Which official tax publication will be the source of truth?

   IRS

## 2. Mortgage Calculator

1. Which mortgage market and currency should it target?

   USA , UK and USD, Pound, Euro

2. Should inputs include home price, deposit/down payment, interest rate, and term?

   Yes

3. Should property tax, home insurance, HOA/service charges, and mortgage insurance be included?

   yes

4. Should it support fixed-rate, adjustable-rate, interest-only, or repayment mortgages?

   Support all

5. Should results show monthly payment, total interest, total cost, and an amortization schedule?

   Yes

6. Should users enter the rate manually, or should current market rates be supplied?

   Manually

7. How should payment frequency and rounding be handled?

   Round to nearest 1 and for payment frequency give options for monthly and yearly

## 3. Car Loan Calculator

1. Which country, currency, and auto-finance conventions apply?

   USA ,UK and USD,Pound,Euro - Default is USD

2. Should the price input include taxes, registration, dealer fees, and add-ons?

   Yes optional

3. Should cash down payment, trade-in value, and existing trade-in balance be separate inputs?

   Yes

4. Should the tool calculate payment from rate and term, or solve for affordable vehicle price as well?

   It should include impact of cost car , down payment , remaining payment and term of loan and apply interest rate

5. Should it support monthly, fortnightly, or weekly payments?

   Monthly

6. Should results show total interest, total financed amount, and payoff schedule?

   Yes

7. Are balloon payments or residual values required?

   Optional

## 4. Loan Calculator

1. What loan types should this general calculator cover?

   All Loan types it is a general calculator for loan not specific

2. Should it support amortized, interest-only, deferred-payment, and balloon-payment loans?

   Yes

3. Which value may users solve for: payment, principal, rate, or term?

   User will enter loan amount , interest rate , loan terms ( options in year/month) and result will occur in monthly payment against loan

4. Should origination fees and other upfront charges affect APR and net proceeds?

   Yes optional

5. Which payment frequencies are required?

   Give options for yearly and monthly – default monthly

6. Should an amortization schedule and total-cost comparison be included?

   Yes

## 5. Personal Loan Calculator

1. Which personal-loan market and currency apply?

   USA ,UK and USD,Pound,Euro - Default is USD

2. Should users enter principal, APR, term, and origination fee?

   Yes with origination fee optional

3. Should the fee be deducted from proceeds or added to the financed balance?

   added

4. Should the tool show monthly payment, net cash received, total interest, and total repayment?

   Yes

5. Should it compare multiple loan offers?

   Yes

6. Are prepayment or late-payment scenarios required?

   no

## 6. Retirement Calculator

1. Which retirement system and country should it target?

   USA

2. Should it estimate a target nest egg, projected balance, sustainable income, or all three?

   All Three

3. Which inputs are required: current age, retirement age, savings, contributions, income, and desired retirement spending?

   Current age and retirement age input required

4. What defaults should be used for investment return, inflation, salary growth, and life expectancy?

   5% investment return , 3% inflation , 3% salary growth , 80 Life expectancy

5. Should government benefits, pensions, employer plans, and other income be included?

   no

6. Should returns be modeled before or after inflation and fees?

   after

7. Should the tool show optimistic, expected, and conservative scenarios?

   Yes

## 7. CD Calculator

1. Does CD mean a U.S.-style certificate of deposit or another fixed-deposit product?

   US Style

2. Should users enter nominal rate, APY, or either one?

   APY

3. Which compounding frequencies are required?

   Give options to select either monthly or yearly

4. Should the calculator support additional deposits or only one initial deposit?

   One initial deposit

5. Should tax on interest be included?

   no

6. Are early-withdrawal penalties required?

   no

7. Should results show maturity value, interest earned, and period-by-period growth?

   Yes

## 8. Salary Paycheck Calculator

1. Which country, state/province, and local jurisdiction apply?

   USA , give option for all states to be selected , local jurisdiction of selected state would apply

2. Which tax year and payroll withholding tables should be used?

   Current tax year which is 2026 - update the data according to current date and time

3. Which pay frequencies must be supported?

   Weekly , bi-weekly , monthly , semi-monthly , give options for these

4. Which filing status, allowance, dependant, and withholding fields are required?

   Filing Status single or married filing separately , married filing jointly or qualifying surviving spouse head of household. Give options to select and for others make it optional

5. Should pre-tax and post-tax deductions be configurable?

   Yes

6. Should social insurance, Medicare, pension, or other payroll charges be included?

   Yes optional

7. Should bonuses, commissions, overtime, and benefits-in-kind be supported?

   Yes

8. Which payroll authority or provider will validate the calculation?

   IRS regarding tax calculation

## 9. Roth IRA Calculator

1. Is this specifically for U.S. Roth IRA rules?

   Yes

2. Which tax year’s contribution and income limits should apply?

   2026

3. Should eligibility and phase-out limits be calculated from filing status and modified AGI?

   Yes

4. Should the calculator compare Roth and traditional IRA outcomes?

   Yes

5. What return, inflation, fee, and tax-rate assumptions are required?

   6% return ,3% inflation rate ,

Table for above calculations limits as per IRS:

| Filing status                                                                                                            | Modified gross adjusted income            | Contribution limits             |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------- |
| • Single <br> • Head of household <br> • Married filing separately (if you didn't live with your spouse during the year) | Less than $153,000.                       | $7,500 ($8,600 if 50 or older). |
|                                                                                                                          | $153,000 or more, but less than $168,000. | Contribution is reduced.        |
|                                                                                                                          | $168,000 or more.                         | No contribution allowed.        |
| • Married filing jointly <br>• Surviving spouse                                                                          | Less than $242,000.                       | $7,500 ($8,600 if 50 or older). |
|                                                                                                                          | $242,000 or more, but less than $252,000. | Contribution is reduced.        |
|                                                                                                                          | $252,000 or more.                         | No contribution allowed.        |
| • Married filing separately (if you lived with spouse at any time during year)                                           | Less than $10,000.                        | Contribution is reduced.        |
|                                                                                                                          | $10,000 or more.                          | No contribution allowed.        |

7. Should contributions be monthly, annual, or both?

   Default annual but give options for both monthly and annual

8. Should it account for catch-up contributions and contribution timing?

   Yes

## 10. Investment Calculator

1. Should the tool model a lump sum, recurring contributions, or both?

   both

2. Should users enter nominal return, inflation-adjusted return, or both?

   Nominal return

3. Which compounding and contribution frequencies are required?

   Give options for weekly,bi-weekly, monthly, semi-annually, annually

4. Should fees, taxes, and inflation be included?

   no

5. Should contributions increase annually?

   Depending on frequencies selected

6. Should results include a chart, yearly table, total contributions, and investment growth?

   Yes

7. Should the calculator support best/base/worst-case scenarios?

   Yes

## 11. Amortization Calculator

1. Which loan types and currencies should be supported?
2. Should the schedule be monthly only or support other payment frequencies?
3. Should extra one-time and recurring payments be supported?
4. Should fees, escrow items, or insurance appear in the schedule?
5. Should users be able to choose a start date?
6. Should results be printable or downloadable?
7. How should final-payment rounding differences be handled?

## 12. 401(k) Calculator

1. Is this for U.S. 401(k) plans and which tax year?
2. Should contributions be entered as a percentage, amount, or both?
3. How should employer match formulas be entered?
4. Should annual IRS limits and age-based catch-up rules be enforced?
5. What salary growth, investment return, fees, inflation, and retirement age assumptions apply?
6. Should traditional and Roth 401(k) contributions be compared?
7. Should the result estimate retirement income or only the projected balance?

## 13. Payment Calculator

1. What is being financed: a general loan, mortgage, vehicle, annuity, or another product?
2. Which value should the calculator solve for: payment, principal, term, or rate?
3. Should payments occur at the beginning or end of each period?
4. Are balloon payments, fees, deposits, or residual values required?
5. Which payment and compounding frequencies should be available?
6. How is this calculator different from the general Loan Calculator?

## 14. Stamp Duty Calculator

1. Which country, state, territory, or province should it support?
2. Which effective date and official rate tables should apply?
3. Is the property residential, commercial, land, or another type?
4. Should first-home-buyer, owner-occupier, investor, foreign-buyer, and concession rules be included?
5. Does the calculation depend on property value, purchase price, or the greater of the two?
6. Should transfer fees and other government charges be included?
7. Who will maintain the rules when legislation changes?

## 15. VAT Calculator

1. Which countries and VAT/GST regimes must be supported?
2. Should users select a rate or enter a custom rate?
3. Should the tool add tax to a net price, extract tax from a gross price, or both?
4. Are reduced, zero, exempt, and reverse-charge treatments required?
5. What rounding convention applies at line and invoice level?
6. Should it support multiple line items or a single amount?
7. Which official authority supplies the rates?

## 16. Compound Interest Calculator

1. Should the calculator accept a lump sum, regular contributions, or both?
2. Which contribution and compounding frequencies are required?
3. Are contributions made at the beginning or end of each period?
4. Should inflation, tax, and fees be included?
5. Should the rate change over time?
6. Should results include a growth chart and annual table?

## 17. Home Equity Loan Calculator

1. Should this calculate available equity, loan payments, or both?
2. What maximum combined loan-to-value assumption should apply?
3. Should the existing mortgage balance and other liens be included?
4. Is the new loan fixed-rate, variable-rate, or user-selectable?
5. Should fees and closing costs be financed or paid upfront?
6. Should it estimate qualification or clearly limit results to an illustration?

## 18. Reverse Mortgage Calculator

1. Which country and reverse-mortgage program should be modeled?
2. What minimum age and eligibility rules apply?
3. Which inputs determine borrowing capacity: age, property value, existing liens, rates, and location?
4. Should proceeds be modeled as lump sum, line of credit, monthly payment, or multiple options?
5. Which insurance premiums, origination fees, servicing fees, and closing costs apply?
6. Should the calculator project the growing balance and remaining home equity over time?
7. Which official program data will be maintained and approved?

## 19. VA Home Loan Calculator

1. Is this for the U.S. Department of Veterans Affairs loan program?
2. Which year’s VA funding-fee schedule should apply?
3. Should service category, first/subsequent use, down payment, and disability exemption affect the fee?
4. Should taxes, insurance, HOA, and closing costs be included?
5. Should the tool calculate only payment or also affordability and entitlement usage?
6. Will current mortgage rates be entered manually or supplied externally?
7. Which VA source will be used for rule updates?

## 20. Refinance Calculator

1. What loan is being refinanced?
2. Should the calculator compare current and proposed monthly payments, total interest, and payoff dates?
3. Which closing costs, points, penalties, and fees should be included?
4. Should costs be paid upfront or rolled into the new balance?
5. Should the result calculate break-even time and lifetime savings?
6. How should a different remaining term versus new term be compared?
7. Should cash-out refinancing be excluded in favor of calculator 23?

## 21. Annuity Calculator

1. Should this calculate future value during accumulation or required payment for a target value?
2. Is the annuity ordinary or due?
3. Should payments and compounding frequencies differ?
4. Should growth rate, fees, inflation, and taxes be included?
5. Are fixed and variable annuities both in scope?
6. How is this different from calculators 46, 81, and 82?

## 22. Remortgage Calculator

1. Is this specifically for the U.K. mortgage market?
2. Should the current deal, reversion rate, and proposed deal be compared?
3. Should arrangement, valuation, legal, broker, and early-repayment fees be included?
4. Should fees be paid upfront or added to the new loan?
5. Should the result show monthly savings, total cost over the deal period, and break-even point?
6. Should repayment and interest-only mortgages be supported?

## 23. Cash-Out Refinance Calculator

1. Which mortgage market and maximum LTV rules apply?
2. Should the desired cash amount or target new loan amount drive the calculation?
3. Which closing costs and fees are deducted from cash received?
4. Should current versus new payment, interest, equity, and break-even point be shown?
5. Should the tool enforce a minimum remaining-equity assumption?
6. Should tax consequences be excluded and disclosed?

## 24. Business Loan Calculator

1. Which loan structures are required: term loan, interest-only, balloon, or SBA-style loan?
2. Should users enter APR or nominal rate plus fees?
3. Which origination, guarantee, documentation, and closing fees apply?
4. Should results show payment, total financing cost, APR, and amortization?
5. Should daily, weekly, and monthly repayment frequencies be supported?
6. Should the tool calculate debt-service coverage or affordability?

## 25. Tax Refund Estimator

1. Which country and tax year should it support?
2. Is this a simple refund estimate or a near-return-level calculation?
3. Which income types, filing statuses, deductions, credits, and dependants must be included?
4. Should withholding and estimated payments be entered separately?
5. Which refundable and non-refundable credits must be modeled?
6. Should self-employment, investment, capital-gains, or local taxes be included?
7. Which tax authority and reviewer will validate every rule?

## 26. VA Mortgage Calculator

1. How should this differ from calculator 19, or should they be merged?
2. Should it focus on full housing payment, affordability, or VA eligibility?
3. Which funding-fee exemptions and use categories apply?
4. Should taxes, insurance, HOA, and maintenance be included?
5. Should it support VA jumbo loans or limits tied to remaining entitlement?
6. Which official VA data needs annual maintenance?

## 27. Student Loan Calculator

1. Which country and student-loan system should be modeled?
2. Are loans private, government-backed, income-driven, fixed-payment, or multiple types?
3. Should users combine multiple loans with different balances and rates?
4. Should deferment, grace periods, capitalization, and fees be included?
5. Should extra payments and refinancing comparisons be supported?
6. Should the result show payoff date, total interest, and payment schedule?
7. Are forgiveness or income-based repayment rules in scope?

## 28. HELOC Payment Calculator

1. Which HELOC market and product structure apply?
2. Should it model separate draw and repayment periods?
3. Are draw-period payments interest-only or principal plus interest?
4. Should variable-rate changes and rate caps be modeled?
5. Should users schedule additional draws and repayments?
6. Should it estimate available credit from property value and combined LTV?
7. Which fees should be included?

## 29. Refinance Mortgage Calculator

1. How should this differ from calculator 20, or should they be merged?
2. Is the focus specifically on residential mortgages?
3. Should it compare payments, lifetime interest, break-even time, and equity?
4. Which refinancing costs and points should be included?
5. Should cash-out and term-reset scenarios be supported?
6. Should current market rates be supplied or entered manually?

## 30. Buy-to-Let Mortgage Calculator

1. Is this for the U.K. buy-to-let market or another jurisdiction?
2. Should it calculate payment, rental coverage, borrowing amount, yield, or all four?
3. What interest-coverage ratio and stress-rate rules should be used?
4. Should personal versus limited-company ownership be distinguished?
5. Should rent, vacancy, management fees, maintenance, insurance, and taxes affect results?
6. Are interest-only and repayment loans both required?
7. Which lender or regulatory criteria will be the source of defaults?

## 31. APY Calculator

1. Should users convert nominal interest rate to APY, APY to nominal rate, or both?
2. Which compounding frequencies should be supported?
3. Should the tool project balance growth using an initial deposit?
4. Are recurring deposits and withdrawals required?
5. Should fees reduce the displayed yield?
6. How should daily compounding and leap years be handled?

## 32. Boat Loan Calculator

1. Which country and marine-finance market apply?
2. Should taxes, registration, documentation, survey, delivery, and dealer fees be included?
3. Should trade-in, down payment, and existing finance be supported?
4. Are balloon payments or seasonal payment plans required?
5. Should results include payment, total interest, and amortization?
6. Should the calculator estimate an affordable boat price?

## 33. Pension Calculator

1. Does pension mean a defined-contribution pot, defined-benefit pension, state pension, or multiple types?
2. Which country and pension system apply?
3. Should the tool estimate retirement balance, annual pension income, or required contributions?
4. What retirement age, life expectancy, inflation, growth, fee, and annuity-rate assumptions apply?
5. Should employer contributions and tax relief be included?
6. Should lump-sum withdrawals and survivor benefits be modeled?
7. Which rules and limits require annual updates?

## 34. Finance Calculator

1. What unique user need does this cover that the loan, investment, and TVM calculators do not?
2. Should it provide tabs for future value, present value, payment, rate, and periods?
3. Which variables can be solved for?
4. Should cash flows occur at the beginning or end of periods?
5. Which compounding and payment frequencies are required?
6. Would a clearer name such as “Financial Equation Calculator” be preferable?

## 35. Commercial Property Loan Calculator

1. Which country and commercial-lending market apply?
2. Should the loan be fully amortizing, interest-only, balloon, or selectable?
3. Should LTV, debt-service coverage, net operating income, and debt yield be calculated?
4. Which fees, points, closing costs, and prepayment penalties apply?
5. Should refinancing and acquisition scenarios both be supported?
6. Should the result include balloon balance and amortization schedule?
7. Are lender qualification thresholds illustrative or enforced?

## 36. Interest Rate Calculator

1. Which scenario should it solve: loan rate, investment return, or both?
2. What known inputs will be required: principal, payment, term, and future value?
3. Should it return nominal rate, effective annual rate, or both?
4. Which payment and compounding frequencies should be supported?
5. Should irregular cash flows be excluded?
6. What precision and convergence rules should the numerical solver use?

## 37. Savings Calculator

1. Should users set a savings goal, project a future balance, or both?
2. Should initial savings and recurring deposits be supported?
3. Which deposit and compounding frequencies are required?
4. Should inflation, tax, fees, and changing rates be included?
5. Should contributions increase over time?
6. Should results show goal date, required contribution, and growth chart?

## 38. Budget Calculator

1. Which budgeting method should be used: 50/30/20, custom categories, zero-based, or another model?
2. Should income be entered gross or net?
3. Which expense categories are required and can users add their own?
4. Should expenses support weekly, monthly, and annual frequencies?
5. Should the result show surplus/deficit, category percentages, and recommendations?
6. Should data remain only in the current browser session?
7. Is downloadable or printable budgeting output required?

## 39. Land Loan Calculator

1. Which country and type of land loan apply: raw, unimproved, improved, or agricultural?
2. Should down-payment requirements vary by land type?
3. Are loans fully amortizing, balloon, interest-only, or selectable?
4. Should taxes, surveys, development costs, and closing fees be included?
5. Should the calculator show balloon balance and amortization?
6. Should it estimate affordability or only payment?

## 40. Debt-to-Income Ratio Calculator

1. Which underwriting definition should be used for gross monthly income?
2. Should front-end and back-end DTI both be calculated?
3. Which debts count: housing, cards, auto, student loans, support payments, and others?
4. Should proposed housing payment be entered separately?
5. What benchmark ranges should be displayed, and who approves them?
6. Should the calculator avoid presenting qualification as guaranteed?

## 41. Car Refinance Calculator

1. Which auto-finance market and currency apply?
2. Should the current payoff balance differ from the displayed loan balance?
3. Should current versus new payment, interest, and payoff date be compared?
4. Which title, application, origination, and early-payoff fees apply?
5. Should cash-out refinancing be excluded?
6. Should negative equity generate a warning?

## 42. Credit Card Payoff Calculator

1. Should the user solve for payoff time or required monthly payment?
2. Should one card or multiple cards be supported?
3. Is the APR fixed, promotional, variable, or scheduled to change?
4. How should minimum payments be calculated?
5. Should new purchases and fees be excluded?
6. Should snowball and avalanche strategies be compared?
7. Should results show payoff date, total interest, and monthly schedule?

## 43. ROI Calculator

1. Should simple ROI, annualized ROI, or both be calculated?
2. Should the holding period be optional or required?
3. Should intermediate cash flows, income, fees, and taxes be supported?
4. Should gains be entered directly or derived from beginning and ending values?
5. Should negative ROI and division-by-zero cases have special messaging?
6. Is IRR outside scope?

## 44. APR Calculator

1. Which regulatory definition of APR and jurisdiction apply?
2. Which fees and charges must be included or excluded?
3. Should the calculator derive APR from payment, amount financed, term, and fees?
4. Should irregular first periods or payment dates be supported?
5. Which payment frequencies are required?
6. What precision and disclosure wording are legally required?

## 45. Social Security Calculator

1. Is this for U.S. Social Security retirement benefits?
2. Which benefit year and official bend points should apply?
3. Will users enter their primary insurance amount, earnings history, or current salary history?
4. Should early, full-retirement-age, and delayed claiming scenarios be compared?
5. Should spousal, survivor, disability, and family benefits be excluded or included?
6. Should future cost-of-living adjustments and wage indexing be modeled?
7. Which SSA sources and annual update process will be used?

## 46. Annuity Payout Calculator

1. Should it calculate payout from a starting balance or required balance for a target payout?
2. Are payouts fixed-term, life-contingent, or both?
3. Is the payout made at the beginning or end of each period?
4. Should fees, tax, inflation, and changing returns be included?
5. Should principal be exhausted or leave a target remainder?
6. How is this different from calculators 21, 81, and 82?

## 47. Loan Payoff Calculator

1. Should users enter current balance, rate, payment, and desired extra payment?
2. Should the tool calculate payoff date, required payment, or both?
3. Are one-time and recurring extra payments required?
4. Should prepayment penalties or fees be included?
5. Should it compare the existing schedule with an accelerated schedule?
6. Should results show time and interest saved?

## 48. Credit Card Payment Calculator

1. Is this specifically a minimum-payment calculator?
2. Which issuer minimum-payment formulas should be supported?
3. Should the formula be user-selectable or configured as percentage plus interest/fees?
4. Should promotional and penalty APR changes be modeled?
5. Are new purchases excluded?
6. Should results warn about very long payoff periods and total interest?
7. How should this differ from calculator 42?

## 49. LTV Calculator

1. Please confirm that “ITV” is a typo and the intended calculator is loan-to-value (LTV).
2. Which asset types should it support: home, commercial property, vehicle, or general asset?
3. Should it calculate LTV, maximum loan, required deposit, or all three?
4. Should combined LTV include second mortgages and other liens?
5. Should value mean purchase price, appraised value, or the lender’s lower value?
6. What benchmark ranges may be shown without implying approval?

## 50. Annual Income Calculator

1. Which income frequencies should be convertible to annual income?
2. Should hourly income use hours per week and working weeks per year?
3. Should overtime, bonus, commission, tips, and multiple jobs be included?
4. Should unpaid leave and holidays affect annual income?
5. Is the result gross or net income?
6. Should it also show monthly, fortnightly, weekly, daily, and hourly equivalents?

## 51. Annual Salary Calculator

1. How should this differ from calculator 50?
2. Should it convert a fixed salary across pay frequencies or derive salary from hourly pay?
3. Should paid holidays, working days, and hours per week be configurable?
4. Should bonuses, overtime, and benefits be included?
5. Is the result gross salary only?
6. Should taxes be excluded in favor of paycheck calculators?

## 52. Monthly Income Calculator

1. Which source frequencies should convert to monthly income?
2. Should weekly/fortnightly income use exact annualization or a simplified multiplier?
3. Should multiple income sources be supported?
4. Should variable bonuses, commission, and overtime be averaged?
5. Is the result gross or net?
6. How should irregular work schedules be handled?

## 53. Future Value Calculator

1. Should it calculate the future value of a lump sum, recurring payments, or both?
2. Are payments at the beginning or end of each period?
3. Which payment and compounding frequencies should be supported?
4. Should inflation, tax, and fees be included?
5. Should rate changes over time be supported?
6. Should results distinguish contributions from growth?

## 54. Currency Calculator

1. Are live, delayed, daily-reference, or manually maintained rates required?
2. Which currencies must be supported?
3. Which exchange-rate provider will be licensed and funded?
4. How often should rates refresh, and what timestamp should be displayed?
5. Should spreads, bank fees, card fees, and custom margins be included?
6. What should happen if the rate service is unavailable?
7. May rates be cached, and for how long?

## 55. Mortgage Overpayment Calculator

1. Which mortgage type and market apply?
2. Should users enter recurring overpayments, one-time payments, or both?
3. Should overpayments reduce the term, reduce future payments, or allow either choice?
4. Are annual overpayment limits and early-repayment charges required?
5. Should interest rates be fixed or allowed to change?
6. Should the result show interest saved and revised payoff date?

## 56. Money Calculator

1. What exact calculation is intended by “Money Calculator”?
2. Is it for counting denominations, adding/subtracting money, inflation, currency conversion, or another purpose?
3. What unique need does it address that other listed calculators do not?
4. Which currencies and denominations apply?
5. Should it handle physical cash quantities or abstract monetary amounts?
6. Please provide one example input and expected result.

## 57. CAGR Calculator

1. Should the calculator solve for CAGR, ending value, beginning value, or duration?
2. Should the duration accept years only or exact dates?
3. Should contributions and withdrawals be excluded because they require IRR?
4. Should nominal and inflation-adjusted CAGR both be shown?
5. How should zero or negative beginning/ending values be handled?
6. Should the result include a year-by-year projection?

## 58. Hourly Paycheck Calculator

1. Which country, state/province, and local payroll jurisdiction apply?
2. Which pay period and withholding year should be used?
3. Should regular hours, overtime tiers, tips, bonuses, and commissions be included?
4. Which pre-tax and post-tax deductions are required?
5. Which filing status, dependants, allowances, and additional withholding fields apply?
6. Which payroll taxes and social contributions must be calculated?
7. Which official payroll source will validate results?

## 59. Daily Compound Interest Calculator

1. Should daily compounding use 365, 366, or an actual/365 convention?
2. Should users enter exact start and end dates or a number of days?
3. Are recurring deposits and withdrawals required?
4. Should interest accrue before or after each transaction?
5. Should tax, fees, and rate changes be included?
6. Should results include daily, monthly, or annual tables?

## 60. Early Mortgage Payoff Calculator

1. How should this differ from calculator 55, or should they be merged?
2. Should users target a payoff date or enter an extra payment amount?
3. Should one-time, monthly, fortnightly, and annual extra payments be supported?
4. Are prepayment penalties or overpayment limits required?
5. Should the tool compare term reduction, interest saved, and revised payment schedule?
6. Should taxes and insurance be excluded from payoff calculations?

## 61. After-Tax Income Calculator

1. Which country, region, and tax year apply?
2. Should income be salary only or include self-employment, investment, rental, and other income?
3. Which filing statuses, dependants, deductions, credits, and allowances are required?
4. Should payroll taxes and social contributions be included?
5. Should the result show annual and per-pay-period take-home income?
6. Should local taxes be included?
7. Which official tax sources and reviewer will approve the rules?

## 62. Military Retirement Calculator

1. Which country and military retirement system apply?
2. Which retirement plans or entry-date rules must be supported?
3. Which inputs are required: rank, years of service, pay base, retirement date, and disability rating?
4. Should cost-of-living adjustments and survivor benefits be modeled?
5. Should taxes, disability compensation, and concurrent receipt be included?
6. Which official military data and annual update process will be used?
7. Is the result educational only or intended for planning decisions?

## 63. Discount Calculator

1. Should it calculate final price, discount amount, original price, or discount percentage?
2. Should multiple sequential discounts be supported?
3. Should sales tax be applied before or after discount?
4. Should markup and margin comparisons be included or kept in calculator 68?
5. Which currency and rounding rules apply?
6. Should coupon limits or fixed-amount discounts be supported?

## 64. Overtime Calculator

1. Which country, state/province, employment category, and overtime law apply?
2. Should users enter a custom overtime multiplier or use statutory rules?
3. Are daily, weekly, weekend, holiday, and double-time thresholds required?
4. Should regular-rate calculations include bonuses, commissions, or shift differentials?
5. Should the result be gross overtime pay only or after-tax pay?
6. Which official labor authority will be the source of truth?

## 65. Present Value Calculator

1. Should it calculate present value of a lump sum, payment stream, or both?
2. Are payments made at the beginning or end of periods?
3. Which discounting and payment frequencies are required?
4. Should inflation, risk premium, fees, and taxes be represented separately or through one rate?
5. Should the tool solve for discount rate or periods as well?
6. How should negative cash flows be handled?

## 66. Lottery Tax Calculator

1. Which country, state, and local tax jurisdiction apply?
2. Which tax year should be used?
3. Should lump-sum and annuity prize options be compared?
4. Should federal, state, local, and withholding taxes be shown separately?
5. Which filing statuses and other-income assumptions affect marginal tax?
6. Should the result distinguish withholding from final tax liability?
7. Which official sources will maintain tax and payout rules?

## 67. Military Pay Calculator

1. Which country, branch, component, and pay year apply?
2. Which inputs are required: rank, years of service, duty status, location, and dependants?
3. Should housing, subsistence, special, incentive, hazardous-duty, and deployment pays be included?
4. Should tax-exempt allowances be identified separately?
5. Should deductions and estimated take-home pay be calculated?
6. Which official pay tables and allowance datasets will be maintained?
7. How often must location-based rates be updated?

## 68. Gross Margin Calculator

1. Should it calculate gross margin, markup, selling price, cost, or all four?
2. Should inputs be per unit or total-period amounts?
3. Are discounts, returns, shipping, payment fees, and taxes included in revenue or cost?
4. Should multiple products be supported?
5. What rounding precision applies?
6. Should contribution margin be excluded to avoid mixing definitions?

## 69. Bonus Tax Calculator

1. Which country, state/province, local jurisdiction, and payroll year apply?
2. Should it use an aggregate method, supplemental flat rate, annualized method, or user-selectable method?
3. Should regular salary and year-to-date withholding be required inputs?
4. Which payroll taxes and social contributions apply to the bonus?
5. Should pre-tax retirement contributions or deductions apply?
6. Should results distinguish withholding from actual final tax liability?
7. Which official payroll source will validate the method?

## 70. Time Value of Money Calculator

1. Which variable should be solvable: present value, future value, payment, rate, or number of periods?
2. Should users choose payments at the beginning or end of periods?
3. Which payment and compounding frequencies are required?
4. Should nominal and effective rates both be displayed?
5. Should balloon values and irregular cash flows be supported?
6. How should this differ from calculators 13, 34, 53, and 65?

## 71. WACC Calculator

1. Should WACC be based on market values, book values, or user choice?
2. Should cost of equity use CAPM, dividend growth, or direct entry?
3. Should cost of debt be entered directly or derived from interest expense/yield?
4. Should preferred equity and multiple debt classes be supported?
5. Which tax rate should be used?
6. Should the tool display each component’s weight and contribution?
7. Should inputs such as risk-free rate and equity risk premium be manual or externally sourced?

## 72. Working Days Calculator

1. Which countries, regions, and holiday calendars must be supported?
2. Should users choose which weekdays count as working days?
3. Are start and end dates inclusive?
4. Should custom holidays and company closure dates be allowed?
5. Which official holiday-data source will be used and updated?
6. Should the tool add/subtract working days as well as count them?
7. How should half-days and observed holidays be handled?

## 73. Bond Calculator

1. Which bond types are supported: fixed-rate, zero-coupon, callable, or multiple types?
2. Should users solve for price, yield to maturity, coupon payment, or all three?
3. Which coupon frequencies and day-count conventions apply?
4. Should settlement and maturity use exact dates?
5. Should accrued interest, clean price, and dirty price be shown?
6. Are yield-to-call, duration, and convexity required?
7. Which rounding and market conventions apply?

## 74. PCP Calculator

1. Is this for U.K. Personal Contract Purchase finance?
2. Should inputs include cash price, deposit, trade-in, APR, term, and optional final payment?
3. Should dealer contributions and fees be included?
4. Should annual mileage and excess-mileage charges be modeled?
5. Should the result show monthly payment, total payable, cost of credit, and ownership cost?
6. Should voluntary termination or early settlement be excluded?
7. Which consumer-credit APR rules apply?

## 75. Construction Loan Calculator

1. Which country and construction-loan structure apply?
2. Should interest accrue only on drawn funds?
3. How many draw stages should users be able to schedule?
4. Should an interest-only construction phase convert to a permanent mortgage?
5. Which fees, contingency, land cost, and equity contribution inputs are required?
6. Should the tool show monthly interest, total construction interest, and permanent payment?
7. Are inspection or draw fees included?

## 76. Mortgage Qualification Calculator

1. Which country and underwriting framework apply?
2. Should qualification be based on DTI, income multiples, stress rates, or multiple criteria?
3. Which income sources and existing debts count?
4. Should taxes, insurance, HOA, mortgage insurance, and other housing costs be included?
5. What down-payment, reserve, credit-score, and LTV assumptions apply?
6. Should the result estimate maximum loan, maximum home price, and payment?
7. Who approves qualification thresholds and disclaimer wording?

## 77. Mortgage Insurance Calculator — PMI

1. Is this specifically for U.S. private mortgage insurance?
2. Should PMI be estimated from LTV, credit-score band, loan type, and term?
3. Where will current PMI rate assumptions come from?
4. Should upfront and monthly mortgage insurance both be supported?
5. Should FHA, USDA, or other government insurance be excluded?
6. Should the calculator estimate when PMI may be cancelled based on amortization and appreciation?
7. How should lender-specific pricing uncertainty be disclosed?

## 78. Line of Credit Calculator

1. Is the line secured, unsecured, personal, business, or home-equity based?
2. Should it model interest-only minimum payments, fixed repayments, or both?
3. Should users schedule multiple draws and repayments?
4. Is the interest rate fixed, variable, or tied to an index plus margin?
5. Which fees, annual charges, and draw fees apply?
6. Should the result show utilization, interest cost, payment schedule, and payoff date?

## 79. Rental Property Calculator

1. Which property market, currency, and tax jurisdiction apply?
2. Should the calculator measure cash flow, cap rate, cash-on-cash return, IRR, or all four?
3. Which acquisition, financing, renovation, and closing costs are required?
4. Should vacancy, management, maintenance, insurance, taxes, utilities, and reserves be modeled?
5. Should rent, expenses, property value, and sale costs grow over time?
6. Should depreciation and income/capital-gains taxes be included?
7. What holding period and exit assumptions apply?

## 80. Retirement Withdrawal Calculator

1. Should the calculator estimate sustainable withdrawal, portfolio longevity, or required starting balance?
2. What retirement length or life-expectancy assumption applies?
3. Should withdrawals rise with inflation?
4. Should returns be fixed, scenario-based, or probabilistic?
5. Should fees, taxes, pensions, and government benefits be included?
6. Is a fixed-percentage, fixed-real-income, guardrail, or multiple strategy comparison required?
7. Should the tool avoid labeling any withdrawal rate as guaranteed safe?

## 81. Present Value of Annuity Calculator

1. Is the annuity ordinary or due?
2. Should the tool solve for present value, payment, rate, or periods?
3. Which payment and discounting frequencies are required?
4. Should there be a residual/future value after the final payment?
5. Should inflation, tax, and fees be included?
6. How should this differ from calculators 21, 46, and 65?

## 82. Future Value of Annuity Calculator

1. Is the annuity ordinary or due?
2. Should the tool solve for future value, payment, rate, or periods?
3. Which payment and compounding frequencies are required?
4. Is an initial lump sum included?
5. Should contribution growth, inflation, tax, and fees be included?
6. How should this differ from calculators 10, 16, 21, and 53?

## 83. Auto Lease Payment Calculator

1. Which country and lease conventions apply?
2. Should users enter money factor, APR equivalent, or both?
3. Which inputs are required: vehicle price, negotiated price, residual, term, mileage, and down payment?
4. Should acquisition, disposition, documentation, registration, and dealer fees be included?
5. How should sales tax be calculated in the selected jurisdiction?
6. Should trade-ins, rebates, and incentives be supported?
7. Should the result show monthly payment, due at signing, and total lease cost?

## 84. Borrowing Power Calculator

1. Which country, lender market, and underwriting framework apply?
2. Is this for mortgages, personal loans, business loans, or another product?
3. Which income sources and assessment percentages count?
4. Which living expenses, dependants, debts, credit limits, and commitments must be included?
5. What serviceability buffer, stress rate, DTI cap, and term assumptions apply?
6. Should taxes, insurance, HOA/service charges, and mortgage insurance be included?
7. Should the result show a range rather than one precise borrowing amount?
8. Who will approve and maintain lender/regulatory assumptions?

---

## Recommended Review Order

To reduce duplicated work, review calculators in reusable groups:

1. Core loan mathematics: 4, 13, 11, 36, 44, 47.
2. Mortgage family: 2, 17–20, 22, 23, 26, 28–30, 35, 39, 49, 55, 60, 75–77, 84.
3. Vehicle finance: 3, 32, 41, 74, 83.
4. Savings and investments: 7, 10, 16, 21, 31, 37, 43, 53, 57, 59, 65, 70, 71, 73, 81, 82.
5. Retirement: 6, 9, 12, 33, 45, 46, 62, 80.
6. Tax and payroll: 1, 8, 14, 15, 25, 50–52, 58, 61, 64, 66, 67, 69.
7. Budget and business: 24, 38, 40, 42, 48, 56, 63, 68, 72, 78, 79.
8. External-data tool: 54.

For each calculator, answer its questions, approve a short design specification, and only then create its implementation plan.
