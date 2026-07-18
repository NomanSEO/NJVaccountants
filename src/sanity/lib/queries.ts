import { client, publishedClient } from "./sanity";
import type {
  AuthorProfile,
  CaseStudy,
  ContentPage,
  PageSeo,
  Post,
  PostFull,
  PostTranslation,
  Service,
  SiteSettings,
  SitemapAuthor,
  TeamMember,
  Testimonial,
} from "@/types";

const AUTHOR_SUMMARY_PROJECTION = `{
  _id,
  name,
  role,
  bio,
  shortBio,
  credentials,
  slug,
  image
}`;

const POST_CARD_PROJECTION = `{
  _id,
  _updatedAt,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  updatedAt,
  readTime,
  headerImage,
  schemaMarkup,
  "languageCode": coalesce(language->code, "en"),
  "languageName": coalesce(language->name, "English"),
  "translationRootId": coalesce(translationOf._ref, _id),
  author->${AUTHOR_SUMMARY_PROJECTION}
}`;

const POST_FULL_PROJECTION = `{
  _id,
  _updatedAt,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  updatedAt,
  readTime,
  headerImage,
  markdown,
  body,
  schemaMarkup,
  "languageCode": coalesce(language->code, "en"),
  "languageName": coalesce(language->name, "English"),
  "translationRootId": coalesce(translationOf._ref, _id),
  author->${AUTHOR_SUMMARY_PROJECTION}
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0] {
    ...,
    "heroStats": coalesce(heroStats, []),
    "trustLogos": coalesce(trustLogos, [])
  }`);
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(`*[_type == "service"] | order(order asc)`);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(order asc) {
    ...,
    "expertise": coalesce(expertise, []),
    "education": coalesce(education, []),
    "experience": coalesce(experience, []),
    "achievements": coalesce(achievements, [])
  }`);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(order asc)`);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return client.fetch(`*[_type == "caseStudy"] | order(order asc)`);
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && coalesce(language->code, "en") == "en"]
      | order(publishedAt desc)[0...3] ${POST_CARD_PROJECTION}`,
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) ${POST_CARD_PROJECTION}`,
  );
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  return publishedClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) ${POST_CARD_PROJECTION}`,
  );
}

export async function getPost(slug: string): Promise<PostFull | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug && coalesce(language->code, "en") == "en"][0]
      ${POST_FULL_PROJECTION}`,
    { slug },
  );
}

export async function getLocalizedPost(
  language: string,
  slug: string,
): Promise<PostFull | null> {
  return publishedClient.fetch(
    `*[_type == "post" && slug.current == $slug && coalesce(language->code, "en") == $language][0]
      ${POST_FULL_PROJECTION}`,
    { language, slug },
  );
}

export async function getPostTranslations(
  translationRootId: string,
): Promise<PostTranslation[]> {
  return publishedClient.fetch(
    `*[_type == "post" && (_id == $translationRootId || translationOf._ref == $translationRootId)]
      | order(coalesce(language->order, 0) asc) {
        _id,
        _updatedAt,
        title,
        slug,
        "languageCode": coalesce(language->code, "en"),
        "languageName": coalesce(language->name, "English")
      }`,
    { translationRootId },
  );
}

export async function getRelatedPosts(
  category: string,
  excludeId: string,
  language: string,
): Promise<Post[]> {
  return publishedClient.fetch(
    `*[_type == "post" && _id != $excludeId && category == $category && coalesce(language->code, "en") == $language]
      | order(publishedAt desc)[0...3] ${POST_CARD_PROJECTION}`,
    { category, excludeId, language },
  );
}

export async function getAuthor(slug: string): Promise<AuthorProfile | null> {
  return publishedClient.fetch(
    `*[_type == "teamMember" && slug.current == $slug][0] {
      ...,
      "expertise": coalesce(expertise, []),
      "education": coalesce(education, []),
      "experience": coalesce(experience, []),
      "achievements": coalesce(achievements, [])
    }`,
    { slug },
  );
}

export async function getAuthorPosts(authorId: string): Promise<Post[]> {
  return publishedClient.fetch(
    `*[_type == "post" && author._ref == $authorId]
      | order(publishedAt desc) ${POST_CARD_PROJECTION}`,
    { authorId },
  );
}

export async function getAllAuthorsForSitemap(): Promise<SitemapAuthor[]> {
  return publishedClient.fetch(
    `*[_type == "teamMember" && defined(slug.current)] {
      _id,
      _updatedAt,
      slug
    }`,
  );
}

export async function getPageSeo(path: string): Promise<PageSeo | null> {
  return publishedClient.fetch(
    `*[_type == "pageSeo" && path == $path][0] {
      _id,
      label,
      path,
      schemaMarkup
    }`,
    { path },
  );
}

export async function getContentPage(
  path: string,
): Promise<ContentPage | null> {
  return publishedClient.fetch(
    `*[_type == "contentPage" && path == $path][0] {
      _id,
      path,
      title,
      eyebrow,
      intro,
      body,
      ctaTitle,
      ctaText
    }`,
    { path },
  );
}
