"use client";

import { csvEscape } from "@/lib/formatters";

type CsvValue = string | number;

interface CalculatorActionsProps {
  filename: string;
  rows: CsvValue[][];
  shareTitle: string;
}

export default function CalculatorActions({
  filename,
  rows,
  shareTitle,
}: CalculatorActionsProps) {
  const downloadCsv = () => {
    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareTitle, url: location.href });
      return;
    }

    await navigator.clipboard.writeText(location.href);
  };

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      aria-label="Calculator actions"
    >
      <button
        type="button"
        onClick={() => window.print()}
        className="min-h-11 w-full border border-border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy transition-colors hover:border-gold hover:text-gold-dark sm:w-auto"
      >
        Print
      </button>
      <button
        type="button"
        onClick={downloadCsv}
        className="min-h-11 w-full border border-border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy transition-colors hover:border-gold hover:text-gold-dark sm:w-auto"
      >
        Download CSV
      </button>
      <button
        type="button"
        onClick={share}
        className="min-h-11 w-full border border-border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-navy transition-colors hover:border-gold hover:text-gold-dark sm:w-auto"
      >
        Share
      </button>
    </div>
  );
}
