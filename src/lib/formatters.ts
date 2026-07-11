export type CurrencyCode = 'USD' | 'GBP' | 'EUR'

export const formatCurrency = (value: number, currency: CurrencyCode) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`

export const csvEscape = (value: string | number) =>
  `"${String(value).replaceAll('"', '""')}"`
