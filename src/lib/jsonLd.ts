export type JsonLdObject = Record<string, unknown>;

const SCHEMA_CONTEXTS = new Set([
  "https://schema.org",
  "http://schema.org",
  "https://schema.org/",
  "http://schema.org/",
]);

function isPlainObject(value: unknown): value is JsonLdObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}

function hasSchemaContext(value: JsonLdObject): boolean {
  const context = value["@context"];
  if (typeof context === "string") return SCHEMA_CONTEXTS.has(context);
  if (!Array.isArray(context)) return false;
  return context.some(
    (item) => typeof item === "string" && SCHEMA_CONTEXTS.has(item),
  );
}

export function parseJsonLd(value: unknown): JsonLdObject | null {
  if (value === null || value === undefined || value === "") return null;

  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return null;
    }
  }

  if (!isPlainObject(parsed) || !hasSchemaContext(parsed)) return null;
  return parsed;
}

export function serializeJsonLd(value: unknown): string | null {
  const parsed = parseJsonLd(value);
  if (!parsed) return null;

  return JSON.stringify(parsed)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
