import { defineField, defineType } from "sanity";
import { isLanguageCode } from "../../lib/seo";

export const language = defineType({
  name: "language",
  title: "Language",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "code",
      title: "BCP-47 Language Code",
      description: "Examples: en, es, es-MX",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && isLanguageCode(value)
            ? true
            : "Enter a valid language code such as en, es, or es-MX.",
        ),
    }),
    defineField({
      name: "nativeName",
      title: "Native Name",
      type: "string",
    }),
    defineField({
      name: "isDefault",
      title: "Default Language",
      description: "English should remain the default language.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "code" },
  },
});
