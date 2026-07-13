import { getTeamMembers } from "@/sanity/lib/queries";

export default async function Team() {
  const members = await getTeamMembers();

  return (
    <section id="team" className="bg-cream py-24" aria-label="Our team">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14 text-center">
          <div className="text-gold mb-5 flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
            The People
          </div>
          <h2 className="font-display text-navy mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            Meet Our <em className="text-gold not-italic">Leadership</em> Team
          </h2>
          <p className="text-slate mx-auto max-w-140 text-[1.0625rem] leading-[1.7]">
            Seasoned professionals with decades of experience across accounting,
            tax, audit, and strategic advisory.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <article
              key={m._id}
              className="border-border overflow-hidden rounded-sm border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)]"
            >
              <div
                className="relative flex h-55 items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${m.gradientFrom} 0%, ${m.gradientTo} 100%)`,
                }}
              >
                <div className="from-navy/60 absolute right-0 bottom-0 left-0 h-[40%] bg-linear-to-t to-transparent" />
                <span className="font-display text-5xl font-bold text-white/20">
                  {m.initials}
                </span>
              </div>
              <div className="p-5">
                <div className="font-display text-navy text-[1.0625rem] font-bold">
                  {m.name}
                </div>
                <div className="text-gold mt-0.5 mb-2 text-[0.8125rem] font-semibold">
                  {m.role}
                </div>
                <p className="text-slate mb-3 text-[0.8125rem] leading-[1.6]">
                  {m.bio}
                </p>
                <div className="text-slate-light text-[0.7rem] tracking-[0.06em] uppercase">
                  {m.credentials}
                </div>
                <a
                  href="#contact"
                  className="text-gold hover:text-gold-light mt-4 inline-block text-sm font-semibold transition-colors"
                >
                  Work With {m.name} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
