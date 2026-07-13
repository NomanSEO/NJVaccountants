export default function SectionSkeleton() {
  return (
    <div className="animate-pulse py-24">
      <div className="max-w-site mx-auto px-6">
        <div className="mb-14 flex flex-col gap-4">
          <div className="bg-gold/30 h-3 w-24 rounded" />
          <div className="bg-slate/20 h-9 w-96 rounded" />
          <div className="bg-slate/10 h-4 w-140 rounded" />
        </div>
      </div>
    </div>
  );
}
