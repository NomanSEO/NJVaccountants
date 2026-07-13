// src/components/TrustStrip.tsx
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function TrustStrip() {
  const s = await getSiteSettings();
  if (!s) return null;

  return (
    <div
      className="bg-cream border-border border-t border-b py-7"
      aria-label="Client logos"
    >
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div className="text-slate-light text-[0.75rem] tracking-widest whitespace-nowrap uppercase">
            Trusted by industry leaders
          </div>
          <div className="flex flex-wrap items-center gap-9">
            {s.trustLogos.map((logo) => (
              <div
                key={logo.name}
                className="font-display text-logo text-base font-semibold tracking-[0.02em] opacity-60"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
