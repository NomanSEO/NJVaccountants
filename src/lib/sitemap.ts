import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES } from "@/config/site";
import {
  absoluteUrl,
  authorPath,
  blogPath,
  buildBlogAlternates,
  isLanguageCode,
} from "@/lib/seo";

export interface SitemapPostInput {
  _id: string;
  _updatedAt?: string;
  slug?: { current?: string };
  languageCode: string;
  translationRootId?: string;
}

export interface SitemapAuthorInput {
  _id: string;
  _updatedAt?: string;
  slug?: { current?: string };
}

export interface SitemapInput {
  posts: SitemapPostInput[];
  authors: SitemapAuthorInput[];
}

function validDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function staticEntry(path: string): MetadataRoute.Sitemap[number] {
  const priority = path === "/" ? 1 : path === "/blog" ? 0.8 : 0.7;
  return {
    url: absoluteUrl(path),
    changeFrequency: path === "/" || path === "/blog" ? "weekly" : "monthly",
    priority,
  };
}

export function buildSitemapEntries({
  posts,
  authors,
}: SitemapInput): MetadataRoute.Sitemap {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const route of PUBLIC_ROUTES) {
    const entry = staticEntry(route);
    entries.set(entry.url, entry);
  }

  const validPosts = posts.filter(
    (post) =>
      isLanguageCode(post.languageCode) && Boolean(post.slug?.current?.trim()),
  );
  const families = new Map<string, SitemapPostInput[]>();
  for (const post of validPosts) {
    const familyId = post.translationRootId || post._id;
    families.set(familyId, [...(families.get(familyId) ?? []), post]);
  }

  for (const familyPosts of families.values()) {
    const links = familyPosts.map((post) => ({
      language: post.languageCode,
      slug: post.slug!.current!,
    }));

    for (const post of familyPosts) {
      const current = {
        language: post.languageCode,
        slug: post.slug!.current!,
      };
      const alternates = buildBlogAlternates(links, current);
      const url = absoluteUrl(blogPath(current.language, current.slug));
      entries.set(url, {
        url,
        lastModified: validDate(post._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: alternates.languages },
      });
    }
  }

  for (const author of authors) {
    const slug = author.slug?.current?.trim();
    if (!slug) continue;
    const url = absoluteUrl(authorPath(slug));
    entries.set(url, {
      url,
      lastModified: validDate(author._updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [...entries.values()].sort((a, b) => a.url.localeCompare(b.url));
}
