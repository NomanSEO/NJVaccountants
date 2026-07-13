export default function CardGridSkeleton({ cols = 3 }: { cols?: 2 | 3 | 4 }) {
  const gridClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[
    cols
  ];
  return (
    <div className="py-24 animate-pulse">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <div className="h-3 w-24 bg-slate/20 rounded" />
          <div className="h-9 w-80 bg-slate/20 rounded" />
        </div>
        <div className={`grid ${gridClass} gap-6`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-slate/10 rounded border border-border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
