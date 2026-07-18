import JsonLd from "@/components/JsonLd";
import { getPageSeo } from "@/sanity/lib/queries";

export default async function PageJsonLd({ path }: { path: string }) {
  try {
    const seo = await getPageSeo(path);
    return <JsonLd value={seo?.schemaMarkup} />;
  } catch (error) {
    console.error(`Unable to load schema markup for ${path}.`, error);
    return null;
  }
}
