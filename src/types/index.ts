// src/types/index.ts

export interface HeroStat {
  num: string;
  label: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroTitleHighlight: string;
  heroDesc: string;
  heroStats: HeroStat[];
  trustLogos: Array<{ name: string }>;
  ctaTitle: string;
  ctaSubtitle: string;
}

export interface Service {
  _id: string;
  title: string;
  icon: string;
  description: string;
  bullets: string[];
  order: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  order: number;
  slug?: { current: string };
  shortBio?: string;
  fullBio?: PortableTextBlock[];
  image?: SanityImage;
  email?: string;
  linkedIn?: string;
  expertise?: string[];
  education?: string[];
  experience?: AuthorExperience[];
  achievements?: string[];
  yearsExperience?: number;
  schemaMarkup?: string;
}

export interface AuthorExperience {
  _key?: string;
  title?: string;
  organization?: string;
  period?: string;
  description?: string;
}

export interface AuthorSummary {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  shortBio?: string;
  credentials?: string;
  slug?: { current: string };
  image?: SanityImage;
}

export type AuthorProfile = TeamMember;

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  initials: string;
  order: number;
}

export interface CaseResult {
  num: string;
  label: string;
}

export interface CaseStudy {
  _id: string;
  company: string;
  industry: string;
  tag: string;
  challenge: string;
  results: CaseResult[];
  order: number;
}

export interface SanityImage {
  asset?: { _ref: string; _type: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

export interface Post {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  author: AuthorSummary;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  headerImage?: SanityImage;
  languageCode: string;
  languageName?: string;
  translationRootId?: string;
  schemaMarkup?: string;
}

export interface PostFull extends Post {
  markdown?: string;
  body: PortableTextBlock[];
}

export interface PostTranslation {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  languageCode: string;
  languageName?: string;
}

export interface SitemapAuthor {
  _id: string;
  _updatedAt?: string;
  slug?: { current: string };
}

export interface PageSeo {
  _id: string;
  path: string;
  label?: string;
  schemaMarkup?: string;
}

export interface ContentPage {
  _id: string;
  path: string;
  title: string;
  eyebrow?: string;
  intro: string;
  body: PortableTextBlock[];
  ctaTitle?: string;
  ctaText?: string;
}
