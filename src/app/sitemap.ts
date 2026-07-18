import type { MetadataRoute } from "next";
import {
  getAllAuthorsForSitemap,
  getAllPublishedPosts,
} from "@/sanity/lib/queries";
import { buildSitemapEntries } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [posts, authors] = await Promise.all([
      getAllPublishedPosts(),
      getAllAuthorsForSitemap(),
    ]);
    return buildSitemapEntries({ posts, authors });
  } catch (error) {
    console.error("Unable to load dynamic sitemap content.", error);
    return buildSitemapEntries({ posts: [], authors: [] });
  }
}
