import { defineField, defineType } from "sanity";
import { schemaMarkupField } from "./schemaMarkup";

function isNormalizedPublicPath(value: string): boolean {
  return (
    value.startsWith("/") &&
    !value.includes("?") &&
    !value.includes("#") &&
    !value.includes("//") &&
    !value.startsWith("/studio") &&
    !value.startsWith("/api") &&
    (value === "/" || !value.endsWith("/"))
  );
}

export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO / Schema Markup",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Editor Label",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "path",
      title: "Public Page Path",
      description: "Use a path such as /, /about, or /calculators.",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && isNormalizedPublicPath(value)
            ? true
            : "Use a normalized public path beginning with / and without a trailing slash.",
        ),
    }),
    schemaMarkupField,
  ],
  preview: {
    select: { title: "label", subtitle: "path" },
  },
});
