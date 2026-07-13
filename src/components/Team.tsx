import { getTeamMembers } from "@/sanity/lib/queries";

export default async function Team() {
  const members = await getTeamMembers();

  return (
    <section id="team" className="py-24 bg-cream" aria-label="Our team">
      <div className="max-w-site mx-auto px-6">
        <header className="text-center mb-14">
          <div className="flex items-center justify-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            The People
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            Meet Our <em className="not-italic text-gold">Leadership</em> Team
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7] mx-auto">
            Seasoned professionals with decades of experience across accounting,
            tax, audit, and strategic advisory.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <article
              key={m._id}
              className="bg-white rounded-sm overflow-hidden border border-border hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="h-[220px] flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${m.gradientFrom} 0%, ${m.gradientTo} 100%)`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="font-display text-5xl font-bold text-white/20">
                  {m.initials}
                </span>
              </div>
              <div className="p-5">
                <div className="font-display text-[1.0625rem] font-bold text-navy">
                  {m.name}
                </div>
                <div className="text-[0.8125rem] text-gold font-semibold mt-0.5 mb-2">
                  {m.role}
                </div>
                <p className="text-[0.8125rem] text-slate leading-[1.6] mb-3">
                  {m.bio}
                </p>
                <div className="text-[0.7rem] tracking-[0.06em] text-slate-light uppercase">
                  {m.credentials}
                </div>
                <a
                  href="#contact"
                  className="mt-4 inline-block text-sm font-semibold text-gold hover:text-gold-light transition-colors"
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
