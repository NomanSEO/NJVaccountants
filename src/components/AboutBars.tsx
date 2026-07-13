"use client";
import { useEffect, useRef } from "react";

const BARS = [
  { label: "Corporate Tax Optimisation", value: 94, display: "94%" },
  { label: "Audit Success Rate", value: 99.2, display: "99.2%" },
  { label: "Advisory ROI Delivery", value: 87, display: "87%" },
  { label: "Client Satisfaction Score", value: 98, display: "4.9/5" },
];

export default function AboutBars() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.querySelectorAll<HTMLElement>("[data-width]").forEach((bar) => {
          bar.style.width = bar.dataset.width ?? "0%";
        });
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {BARS.map((bar) => (
        <div key={bar.label}>
          <div className="mb-1.5 flex justify-between text-xs text-white/50">
            <span>{bar.label}</span>
            <span className="text-gold">{bar.display}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="bg-gold h-full rounded-full transition-[width] duration-1200 ease-out"
              style={{ width: "0%" }}
              data-width={`${bar.value}%`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
