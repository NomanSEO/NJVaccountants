// sanity/schemaTypes/caseStudy.ts
import { defineType, defineField, defineArrayMember } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", title: "Company Name" }),
    defineField({
      name: "slug",
      title: "Page Slug",
      type: "slug",
      options: { source: "company", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "industry", type: "string", title: "Industry & Size" }),
    defineField({
      name: "tag",
      type: "string",
      title: "Service Tag (e.g. Taxation)",
    }),
    defineField({
      name: "challenge",
      type: "text",
      title: "Challenge Description",
      rows: 3,
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "num",
              type: "string",
              title: "Number / Value",
            }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
        }),
      ],
    }),
    defineField({ name: "order", type: "number", title: "Sort Order" }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        }),
        defineArrayMember({ type: "table", title: "Table" }),
      ],
    }),
  ],
});
