import { client } from './sanity'
import type { SiteSettings, Service, TeamMember, Testimonial, CaseStudy, Post } from '@/types'

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(`*[_type == "service"] | order(order asc)`)
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(order asc)`)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(order asc)`)
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return client.fetch(`*[_type == "caseStudy"] | order(order asc)`)
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ..., author->{ name } }`
  )
}
