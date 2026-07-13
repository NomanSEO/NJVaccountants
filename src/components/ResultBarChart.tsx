interface ResultBarChartItem {
  name: string;
  value: number;
  formattedValue: string;
}

interface ResultBarChartProps {
  title: string;
  items: ResultBarChartItem[];
}

export default function ResultBarChart({ title, items }: ResultBarChartProps) {
  const maximum = Math.max(...items.map((item) => item.value), 0);

  return (
    <section aria-labelledby="result-bar-chart-title">
      <h3
        id="result-bar-chart-title"
        className="font-display text-navy text-xl font-bold"
      >
        {title}
      </h3>
      <ol className="mt-4 space-y-4">
        {items.map((item) => {
          const width =
            maximum === 0 ? 0 : Math.max(0, (item.value / maximum) * 100);

          return (
            <li key={item.name}>
              <div className="mb-1 flex items-center justify-between gap-4 text-sm">
                <span className="text-slate">{item.name}</span>
                <span className="text-navy font-semibold">
                  {item.formattedValue}
                </span>
              </div>
              <div
                role="img"
                aria-label={`${item.name}: ${item.formattedValue}`}
                className="bg-cream h-3 overflow-hidden"
              >
                <div
                  className="bg-gold h-full"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
