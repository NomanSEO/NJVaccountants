import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import { caseStudySlug } from "@/lib/contentSlugs";
import { absoluteUrl, caseStudyPath } from "@/lib/seo";
import { getCaseStudy, getCaseStudies } from "@/sanity/lib/queries";

export const revalidate = 600;

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((caseStudy) => ({ slug: caseStudySlug(caseStudy) }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.company} Case Study | NJV Accountants`,
    description: caseStudy.challenge,
    alternates: { canonical: absoluteUrl(caseStudyPath(slug)) },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <DirectoryPageShell
      eyebrow={caseStudy.tag}
      title={`${caseStudy.company}: a client success story`}
      intro={caseStudy.industry}
    >
      <section className="bg-white py-20">
        <div className="max-w-site mx-auto grid gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div>
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              The challenge
            </span>
            <h2 className="font-display text-navy mt-3 text-3xl font-bold">
              Building a practical path forward
            </h2>
            <p className="text-slate mt-6 text-lg leading-8">
              {caseStudy.challenge}
            </p>
          </div>
          <div className="bg-navy rounded-sm p-8">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              The results
            </span>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {caseStudy.results.map((result) => (
                <div key={result.label}>
                  <div className="font-display text-gold text-3xl font-bold">
                    {result.num}
                  </div>
                  <div className="mt-1 text-sm leading-5 text-white/65">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gold py-16">
        <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
          <div>
            <h2 className="font-display text-navy text-3xl font-bold">
              Create progress for your business
            </h2>
            <p className="text-navy/70 mt-3 text-lg">
              Speak with our team about the outcome you want to achieve.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-navy hover:bg-navy-light rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase"
          >
            Contact us
          </Link>
        </div>
      </section>
    </DirectoryPageShell>
  );
}
