// sanity/schemaTypes/testimonial.ts
import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", title: "Quote", rows: 4 }),
    defineField({ name: "authorName", type: "string", title: "Author Name" }),
    defineField({
      name: "authorRole",
      type: "string",
      title: "Author Role / Company",
    }),
    defineField({
      name: "initials",
      type: "string",
      title: "Initials (2 chars)",
    }),
    defineField({ name: "order", type: "number", title: "Sort Order" }),
  ],
});
