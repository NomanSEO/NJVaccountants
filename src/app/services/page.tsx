import type { Metadata } from "next";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import Services from "@/components/Services";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title:
    "E-commerce Accounting, Tax, Advisory & Audit Services | NJV Accountants",
  description:
    "Explore accounting, business advisory, tax planning and internal audit services for e-commerce businesses in Pakistan.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <DirectoryPageShell
      eyebrow="Professional Services"
      title="Financial services for e-commerce businesses in Pakistan"
      intro="Explore accounting, tax planning, business advisory and internal audit support shaped around the financial challenges of online selling."
    >
      <Services />
    </DirectoryPageShell>
  );
}
