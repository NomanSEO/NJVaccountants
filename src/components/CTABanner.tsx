// src/components/CTABanner.tsx
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function CTABanner() {
  const s = await getSiteSettings();
  if (!s) return null;

  return (
    <div className="bg-gold py-18" aria-label="Call to action">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <div className="font-display text-navy max-w-150 text-[clamp(1.5rem,3vw,2rem)] leading-[1.3] font-bold">
              {s.ctaTitle}
            </div>
            <div className="text-navy/70 mt-2 text-[0.9375rem]">
              {s.ctaSubtitle}
            </div>
          </div>
          <a
            href="#contact"
            className="bg-navy hover:bg-navy-light inline-flex shrink-0 items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase no-underline transition-colors"
          >
            Speak to a Partner Today ›
          </a>
        </div>
      </div>
    </div>
  );
}
