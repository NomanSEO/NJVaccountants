import type { Metadata } from "next";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import Services from "@/components/Services";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Financial Services | NJV Accountants",
  description:
    "Explore NJV Accountants' accounting, tax, audit, and business advisory services.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <DirectoryPageShell
      eyebrow="Professional Services"
      title="Financial expertise for every stage of your business"
      intro="Explore our accounting, tax, audit and advisory services. Each engagement is tailored to the priorities, challenges and ambitions of your organisation."
    >
      <Services />
    </DirectoryPageShell>
  );
}
