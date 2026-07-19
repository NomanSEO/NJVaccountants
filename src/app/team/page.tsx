import type { Metadata } from "next";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import Team from "@/components/Team";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Our Team | NJV Accountants",
  description:
    "Meet the experienced accounting, tax, audit and advisory professionals at NJV Accountants.",
  alternates: { canonical: absoluteUrl("/team") },
};

export default function TeamPage() {
  return (
    <DirectoryPageShell
      eyebrow="The People"
      title="Meet the team behind your financial progress"
      intro="Our experienced professionals bring practical expertise across accounting, tax, audit and strategic advisory."
    >
      <Team />
    </DirectoryPageShell>
  );
}
