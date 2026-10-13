import type { MetadataRoute } from "next";
import {
  getAllAuthorsForSitemap,
  getAllPublishedPosts,
  getAllServicesForSitemap,
} from "@/sanity/lib/queries";
import { buildSitemapEntries } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [posts, authors, services] = await Promise.all([
      getAllPublishedPosts(),
      getAllAuthorsForSitemap(),
      getAllServicesForSitemap(),
    ]);
    return buildSitemapEntries({ posts, authors, services });
  } catch (error) {
    console.error("Unable to load dynamic sitemap content.", error);
    return buildSitemapEntries({ posts: [], authors: [] });
  }
}
