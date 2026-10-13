import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import { caseStudySlug } from "@/lib/contentSlugs";
import { getCaseStudies } from "@/sanity/lib/queries";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Case Study Under Review | NJV Accountants",
  description: "This case study is being reviewed before publication.",
  robots: { index: false, follow: true },
};

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((caseStudy) => ({ slug: caseStudySlug(caseStudy) }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudies = await getCaseStudies();
  if (!caseStudies.some((item) => caseStudySlug(item) === slug)) notFound();
  return (
    <DirectoryPageShell
      eyebrow="Case Study"
      title="This case study is under review"
      intro="We are checking its details and publication permissions before sharing it."
    >
      <div className="bg-white py-20">
        <div className="max-w-site mx-auto px-6 text-slate">
          Please explore our services or contact NJV Accountants to discuss your
          business needs.
        </div>
      </div>
    </DirectoryPageShell>
  );
}
