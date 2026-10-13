import type { Metadata } from "next";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | NJV Accountants",
  description:
    "NJV Accountants is reviewing its case study content before publication.",
  robots: { index: false, follow: true },
};

export default function CaseStudiesPage() {
  return (
    <DirectoryPageShell
      eyebrow="Case Studies"
      title="Case studies are being reviewed"
      intro="We are checking the permissions and details needed to publish client examples responsibly."
    >
      <section className="bg-white py-20">
        <div className="max-w-site mx-auto px-6">
          <p className="text-slate max-w-170 text-lg leading-8">
            In the meantime, explore our services or speak with us about the
            financial challenges facing your e-commerce business.
          </p>
          <Link
            href="/services"
            className="text-navy hover:text-gold mt-6 inline-block font-semibold"
          >
            Explore services →
          </Link>
        </div>
      </section>
    </DirectoryPageShell>
  );
}
