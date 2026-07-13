// sanity/schema.ts
import { siteSettings } from "./schemaTypes/siteSettings";
import { service } from "./schemaTypes/service";
import { teamMember } from "./schemaTypes/teamMember";
import { testimonial } from "./schemaTypes/testimonial";
import { caseStudy } from "./schemaTypes/caseStudy";
import { post } from "./schemaTypes/post";

export const schemaTypes = [
  siteSettings,
  service,
  teamMember,
  testimonial,
  caseStudy,
  post,
];
