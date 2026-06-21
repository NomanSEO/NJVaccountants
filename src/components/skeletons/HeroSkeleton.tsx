export default function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-navy pt-[70px] animate-pulse">
      <div className="max-w-site mx-auto px-6 py-20 grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-4 pt-8">
          <div className="h-3 w-48 bg-white/10 rounded" />
          <div className="h-12 w-full bg-white/10 rounded" />
          <div className="h-12 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded mt-2" />
          <div className="h-4 w-5/6 bg-white/10 rounded" />
          <div className="flex gap-4 mt-4">
            <div className="h-12 w-44 bg-gold/30 rounded-sm" />
            <div className="h-12 w-36 bg-white/10 rounded-sm" />
          </div>
        </div>
        <div className="h-64 bg-white/5 border border-gold/20 rounded-lg" />
      </div>
    </div>
  )
}
