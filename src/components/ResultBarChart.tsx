interface ResultBarChartItem {
  name: string
  value: number
  formattedValue: string
}

interface ResultBarChartProps {
  title: string
  items: ResultBarChartItem[]
}

export default function ResultBarChart({ title, items }: ResultBarChartProps) {
  const maximum = Math.max(...items.map((item) => item.value), 0)

  return (
    <section aria-labelledby="result-bar-chart-title">
      <h3 id="result-bar-chart-title" className="font-display text-xl font-bold text-navy">
        {title}
      </h3>
      <ol className="mt-4 space-y-4">
        {items.map((item) => {
          const width = maximum === 0 ? 0 : Math.max(0, (item.value / maximum) * 100)

          return (
            <li key={item.name}>
              <div className="mb-1 flex items-center justify-between gap-4 text-sm">
                <span className="text-slate">{item.name}</span>
                <span className="font-semibold text-navy">{item.formattedValue}</span>
              </div>
              <div
                role="img"
                aria-label={`${item.name}: ${item.formattedValue}`}
                className="h-3 overflow-hidden bg-cream"
              >
                <div className="h-full bg-gold" style={{ width: `${width}%` }} />
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
