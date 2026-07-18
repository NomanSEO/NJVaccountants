// sanity/schemaTypes/post.ts
import { defineType, defineField, defineArrayMember } from "sanity";
import { schemaMarkupField } from "./schemaMarkup";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "excerpt", type: "text", title: "Excerpt", rows: 2 }),
    defineField({ name: "category", type: "string", title: "Category" }),
    defineField({
      name: "language",
      type: "reference",
      title: "Language",
      to: [{ type: "language" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationOf",
      type: "reference",
      title: "English Original",
      description:
        "For translated posts, select the original English article. Leave empty on the English article.",
      to: [{ type: "post" }],
      options: {
        filter: '!defined(translationOf) && coalesce(language->code, "en") == "en"',
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      title: "Updated At",
    }),
    defineField({
      name: "readTime",
      type: "number",
      title: "Read Time (minutes)",
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })],
    }),
    defineField({
      name: "markdown",
      title: "Markdown Content",
      description:
        "GitHub-flavored Markdown. When populated, this takes precedence over Body Content on the site.",
      type: "text",
      rows: 20,
    }),
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
    schemaMarkupField,
  ],
});
