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
}

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

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  author: { name: string };
  publishedAt: string;
  readTime: number;
  headerImage?: SanityImage;
}

export interface PostFull extends Post {
  body: any[];
}
