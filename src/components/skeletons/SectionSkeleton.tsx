export default function SectionSkeleton() {
  return (
    <div className="py-24 animate-pulse">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-col gap-4 mb-14">
          <div className="h-3 w-24 bg-gold/30 rounded" />
          <div className="h-9 w-96 bg-slate/20 rounded" />
          <div className="h-4 w-[560px] bg-slate/10 rounded" />
        </div>
      </div>
    </div>
  )
}
