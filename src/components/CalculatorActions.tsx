'use client'

import { csvEscape } from '@/lib/formatters'

type CsvValue = string | number

interface CalculatorActionsProps {
  filename: string
  rows: CsvValue[][]
  shareTitle: string
}

export default function CalculatorActions({
  filename,
  rows,
  shareTitle,
}: CalculatorActionsProps) {
  const downloadCsv = () => {
    const csv = rows
      .map((row) => row.map(csvEscape).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)
  }

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareTitle, url: location.href })
      return
    }

    await navigator.clipboard.writeText(location.href)
  }

  return (
    <div className="flex flex-wrap gap-3" aria-label="Calculator actions">
      <button
        type="button"
        onClick={() => window.print()}
        className="border border-border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy transition-colors hover:border-gold hover:text-gold-dark"
      >
        Print
      </button>
      <button
        type="button"
        onClick={downloadCsv}
        className="border border-border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy transition-colors hover:border-gold hover:text-gold-dark"
      >
        Download CSV
      </button>
      <button
        type="button"
        onClick={share}
        className="border border-border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy transition-colors hover:border-gold hover:text-gold-dark"
      >
        Share
      </button>
    </div>
  )
}
