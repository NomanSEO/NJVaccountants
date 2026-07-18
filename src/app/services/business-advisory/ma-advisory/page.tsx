import type { Metadata } from "next";
import MarketingPageShell from "@/components/MarketingPageShell";
import { maAdvisoryPage } from "@/content/defaultPages";
import { getContentPage, getPageSeo } from "@/sanity/lib/queries";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: maAdvisoryPage.metaTitle,
  description: maAdvisoryPage.metaDescription,
  alternates: { canonical: absoluteUrl(maAdvisoryPage.path) },
};

export default async function MaAdvisoryPage() {
  const [override, seo] = await Promise.all([
    getContentPage(maAdvisoryPage.path),
    getPageSeo(maAdvisoryPage.path),
  ]);
  return (
    <MarketingPageShell
      descriptor={maAdvisoryPage}
      override={override}
      schemaMarkup={seo?.schemaMarkup}
    />
  );
}
