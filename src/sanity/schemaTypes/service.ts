// sanity/schemaTypes/service.ts
import { defineType, defineField, defineArrayMember } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "icon", type: "string", title: "Icon (emoji)" }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
    }),
    defineField({
      name: "bullets",
      title: "Bullet Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "order", type: "number", title: "Sort Order" }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
