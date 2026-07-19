import type { MetadataRoute } from "next";
import {
  getAllAuthorsForSitemap,
  getAllCaseStudiesForSitemap,
  getAllPublishedPosts,
  getAllServicesForSitemap,
} from "@/sanity/lib/queries";
import { buildSitemapEntries } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [posts, authors, services, caseStudies] = await Promise.all([
      getAllPublishedPosts(),
      getAllAuthorsForSitemap(),
      getAllServicesForSitemap(),
      getAllCaseStudiesForSitemap(),
    ]);
    return buildSitemapEntries({ posts, authors, services, caseStudies });
  } catch (error) {
    console.error("Unable to load dynamic sitemap content.", error);
    return buildSitemapEntries({ posts: [], authors: [] });
  }
}
