import { describe, expect, it } from 'vitest'
import { csvEscape, formatCurrency, formatPercent } from '@/lib/formatters'

describe('formatCurrency', () => {
  it('formats whole USD amounts with an English locale', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,235')
  })
})

describe('formatPercent', () => {
  it('formats fractional values to two decimal places', () => {
    expect(formatPercent(0.1234)).toBe('12.34%')
  })
})

describe('csvEscape', () => {
  it('quotes values and escapes embedded quotes', () => {
    expect(csvEscape('A "quoted" value')).toBe('"A ""quoted"" value"')
  })
})
