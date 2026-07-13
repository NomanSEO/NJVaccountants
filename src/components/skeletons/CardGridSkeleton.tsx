export default function CardGridSkeleton({ cols = 3 }: { cols?: 2 | 3 | 4 }) {
  const gridClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[
    cols
  ];
  return (
    <div className="animate-pulse py-24">
      <div className="max-w-site mx-auto px-6">
        <div className="mb-14 flex flex-col gap-4">
          <div className="bg-slate/20 h-3 w-24 rounded" />
          <div className="bg-slate/20 h-9 w-80 rounded" />
        </div>
        <div className={`grid ${gridClass} gap-6`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="bg-slate/10 border-border h-64 rounded border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
