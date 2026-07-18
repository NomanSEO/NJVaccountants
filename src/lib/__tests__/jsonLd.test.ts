import { describe, expect, it } from "vitest";
import { parseJsonLd, serializeJsonLd } from "@/lib/jsonLd";

describe("JSON-LD helpers", () => {
  it("accepts a Schema.org object", () => {
    expect(
      parseJsonLd(
        '{"@context":"https://schema.org","@type":"Organization"}',
      ),
    ).toMatchObject({ "@type": "Organization" });
  });

  it("accepts Schema.org in an array context", () => {
    expect(
      parseJsonLd(
        '{"@context":["https://schema.org",{"@language":"en"}],"@graph":[]}',
      ),
    ).not.toBeNull();
  });

  it("rejects arrays, primitives, malformed JSON, and foreign contexts", () => {
    expect(parseJsonLd("[]")).toBeNull();
    expect(parseJsonLd('"Organization"')).toBeNull();
    expect(parseJsonLd("{")) .toBeNull();
    expect(parseJsonLd('{"@context":"https://example.com"}')).toBeNull();
  });

  it("escapes characters that could terminate a script element", () => {
    const serialized = serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "Thing",
      value: "</script><script>alert('x')</script>&\u2028\u2029",
    });

    expect(serialized).not.toBeNull();
    expect(serialized).not.toContain("</script>");
    expect(serialized).not.toContain("<script>");
    expect(serialized).not.toContain("&");
    expect(serialized).toContain("\\u003c/script\\u003e");
    expect(serialized).toContain("\\u2028");
    expect(serialized).toContain("\\u2029");
  });

  it("returns null when asked to serialize invalid JSON-LD", () => {
    expect(serializeJsonLd('{"@context":"https://example.com"}')).toBeNull();
  });
});
