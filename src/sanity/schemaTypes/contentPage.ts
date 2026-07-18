import { defineArrayMember, defineField, defineType } from "sanity";
import { CONTENT_PAGE_ROUTES } from "../../config/site";

export const contentPage = defineType({
  name: "contentPage",
  title: "Editable Content Page",
  type: "document",
  fields: [
    defineField({
      name: "path",
      title: "Page",
      type: "string",
      options: {
        list: CONTENT_PAGE_ROUTES.map((path) => ({ title: path, value: path })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(40).max(700),
    }),
    defineField({
      name: "body",
      title: "Page Content",
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(400),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "path" },
  },
});
