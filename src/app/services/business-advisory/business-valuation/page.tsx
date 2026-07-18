import type { Metadata } from "next";
import MarketingPageShell from "@/components/MarketingPageShell";
import { businessValuationPage } from "@/content/defaultPages";
import { getContentPage, getPageSeo } from "@/sanity/lib/queries";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = {
  title: businessValuationPage.metaTitle,
  description: businessValuationPage.metaDescription,
  alternates: { canonical: absoluteUrl(businessValuationPage.path) },
};

export default async function BusinessValuationPage() {
  const [override, seo] = await Promise.all([
    getContentPage(businessValuationPage.path),
    getPageSeo(businessValuationPage.path),
  ]);
  return (
    <MarketingPageShell
      descriptor={businessValuationPage}
      override={override}
      schemaMarkup={seo?.schemaMarkup}
    />
  );
}
