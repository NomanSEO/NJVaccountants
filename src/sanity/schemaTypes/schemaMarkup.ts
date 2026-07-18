import { defineField } from "sanity";
import { parseJsonLd } from "../../lib/jsonLd";

export const schemaMarkupField = defineField({
  name: "schemaMarkup",
  title: "Schema Markup (JSON-LD)",
  description:
    'Paste one complete Schema.org JSON object. The value must include "@context": "https://schema.org".',
  type: "text",
  rows: 14,
  validation: (Rule) =>
    Rule.custom((value) => {
      if (value === undefined || value === null || value === "") return true;
      if (typeof value !== "string" || !value.trim()) {
        return "Schema markup cannot be blank when supplied.";
      }
      return parseJsonLd(value)
        ? true
        : "Schema markup must be a valid Schema.org JSON object.";
    }),
});
