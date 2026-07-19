function fallbackSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function serviceSlug(service: {
  slug?: { current?: string };
  title: string;
}): string {
  return service.slug?.current || fallbackSlug(service.title);
}

export function caseStudySlug(caseStudy: {
  slug?: { current?: string };
  company: string;
}): string {
  return caseStudy.slug?.current || fallbackSlug(caseStudy.company);
}
