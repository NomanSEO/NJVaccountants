export default function HeroSkeleton() {
  return (
    <div className="bg-navy min-h-screen animate-pulse pt-17.5">
      <div className="max-w-site mx-auto grid grid-cols-2 gap-16 px-6 py-20">
        <div className="flex flex-col gap-4 pt-8">
          <div className="h-3 w-48 rounded bg-white/10" />
          <div className="h-12 w-full rounded bg-white/10" />
          <div className="h-12 w-3/4 rounded bg-white/10" />
          <div className="mt-2 h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
          <div className="mt-4 flex gap-4">
            <div className="bg-gold/30 h-12 w-44 rounded-sm" />
            <div className="h-12 w-36 rounded-sm bg-white/10" />
          </div>
        </div>
        <div className="border-gold/20 h-64 rounded-lg border bg-white/5" />
      </div>
    </div>
  );
}
