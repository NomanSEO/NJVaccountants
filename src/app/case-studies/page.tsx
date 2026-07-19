import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Client Case Studies | NJV Accountants",
  description:
    "See how NJV Accountants delivers practical financial outcomes for its clients.",
  alternates: { canonical: absoluteUrl("/case-studies") },
};

export default function CaseStudiesPage() {
  return (
    <DirectoryPageShell
      eyebrow="Client Success"
      title="Results that speak for themselves"
      intro="Read about the commercial outcomes and financial progress we help clients achieve through focused, practical advice."
    >
      <CaseStudies />
    </DirectoryPageShell>
  );
}
