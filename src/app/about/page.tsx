import type { Metadata } from "next";
import { Suspense } from "react";
import MarketingPageShell from "@/components/MarketingPageShell";
import Team from "@/components/Team";
import CardGridSkeleton from "@/components/skeletons/CardGridSkeleton";
import { aboutPage } from "@/content/defaultPages";
import { getContentPage, getPageSeo } from "@/sanity/lib/queries";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
  alternates: { canonical: absoluteUrl(aboutPage.path) },
};

export default async function AboutPage() {
  const [override, seo] = await Promise.all([
    getContentPage(aboutPage.path),
    getPageSeo(aboutPage.path),
  ]);
  return (
    <MarketingPageShell
      descriptor={aboutPage}
      override={override}
      schemaMarkup={seo?.schemaMarkup}
    >
      <Suspense fallback={<CardGridSkeleton cols={4} />}>
        <Team />
      </Suspense>
    </MarketingPageShell>
  );
}
