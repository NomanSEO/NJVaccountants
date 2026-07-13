import AboutBars from "./AboutBars";

const PILLARS = [
  {
    title: "Independence",
    text: "Privately owned, free from conflicts of interest, solely focused on client outcomes.",
  },
  {
    title: "Expertise",
    text: "140+ CPAs, tax lawyers, and industry specialists across 8 service lines.",
  },
  {
    title: "Technology",
    text: "Proprietary analytics platform and integrations with leading finance tools.",
  },
  {
    title: "Relationships",
    text: "98% client retention. Most of our business comes from referrals.",
  },
];

const TEAM = [
  { initials: "JR", name: "J. Rawlins" },
  { initials: "SM", name: "S. Moreau" },
  { initials: "AK", name: "A. Khan" },
  { initials: "LC", name: "L. Chen" },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-navy py-24"
      aria-label="About NJV Accountants"
    >
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Who We Are
            </div>
            <h2 className="font-display mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold text-white">
              Built on <em className="text-gold not-italic">Integrity,</em>{" "}
              Driven by Results
            </h2>
            <p className="mb-4 text-[0.9375rem] leading-[1.75] text-white/65">
              Founded in 1998, NJV Accountants has grown from a boutique
              practice into one of the most trusted mid-market accounting and
              advisory firms in the region. Our independence is our greatest
              asset — we answer only to our clients.
            </p>
            <p className="mb-9 text-[0.9375rem] leading-[1.75] text-white/65">
              We combine the personal service of a boutique firm with the
              technical depth and resource of a large practice. Every client
              relationship is led by a senior partner, ensuring continuity,
              accountability, and strategic focus at every stage.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {PILLARS.map((p) => (
                <div key={p.title} className="border-gold border-l-2 pl-4">
                  <div className="font-display mb-1 text-base font-semibold text-white">
                    {p.title}
                  </div>
                  <div className="text-[0.8125rem] leading-normal text-white/50">
                    {p.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "🏆 AICPA Member",
                "✓ PCAOB Registered",
                "⭐ ISO 27001",
                "📋 ICAEW Affiliated",
              ].map((badge) => (
                <div
                  key={badge}
                  className="bg-gold/10 border-gold/25 text-gold inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] uppercase"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right — metrics visual */}
          <div className="border-gold/20 overflow-hidden rounded-md border bg-white/4">
            <div className="bg-gold/10 border-gold/15 flex items-center gap-2 border-b px-6 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="font-body ml-2 text-[0.75rem] text-white/40">
                Client Portfolio Performance · 2024
              </span>
            </div>
            <div className="p-7">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="text-[0.75rem] tracking-[0.08em] text-white/45 uppercase">
                    Avg. Tax Saved
                  </div>
                  <div className="font-display text-[1.875rem] font-bold text-white">
                    $127,400
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[0.75rem] tracking-[0.08em] text-white/45 uppercase">
                    Per Client
                  </div>
                  <div className="text-[0.75rem] font-semibold text-green-400">
                    ↑ 22% YoY
                  </div>
                </div>
              </div>

              <AboutBars />

              <div className="mt-5 grid grid-cols-4 gap-4 border-t border-white/8 pt-5">
                {TEAM.map((m) => (
                  <div key={m.initials} className="text-center">
                    <div className="from-gold to-gold-dark font-display text-navy mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br text-base font-bold">
                      {m.initials}
                    </div>
                    <div className="text-[0.7rem] text-white/60">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
