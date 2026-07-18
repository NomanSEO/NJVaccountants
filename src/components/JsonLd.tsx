import { serializeJsonLd } from "@/lib/jsonLd";

export default function JsonLd({ value }: { value?: unknown }) {
  const serialized = serializeJsonLd(value);
  if (!serialized) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
