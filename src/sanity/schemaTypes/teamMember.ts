// sanity/schemaTypes/teamMember.ts
import { defineType, defineField } from "sanity";
import { schemaMarkupField } from "./schemaMarkup";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Full Name" }),
    defineField({
      name: "slug",
      title: "Profile Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", type: "string", title: "Role / Title" }),
    defineField({ name: "bio", type: "text", title: "Bio", rows: 3 }),
    defineField({
      name: "shortBio",
      type: "text",
      title: "Short Biography",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "fullBio",
      type: "array",
      title: "Full Biography",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })],
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "email",
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).custom((value) =>
          !value || value.includes("linkedin.com/")
            ? true
            : "Enter a LinkedIn profile URL.",
        ),
    }),
    defineField({
      name: "credentials",
      type: "string",
      title: "Credentials (e.g. FCA · CTA)",
    }),
    defineField({
      name: "expertise",
      title: "Areas of Expertise",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "experience",
      title: "Professional Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Position", type: "string" }),
            defineField({
              name: "organization",
              title: "Organization",
              type: "string",
            }),
            defineField({ name: "period", title: "Period", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "organization" },
          },
        },
      ],
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0).max(80).integer(),
    }),
    defineField({
      name: "initials",
      type: "string",
      title: "Initials (2 chars)",
    }),
    defineField({
      name: "gradientFrom",
      type: "string",
      title: "Card Gradient From (hex)",
    }),
    defineField({
      name: "gradientTo",
      type: "string",
      title: "Card Gradient To (hex)",
    }),
    defineField({ name: "order", type: "number", title: "Sort Order" }),
    schemaMarkupField,
  ],
});
