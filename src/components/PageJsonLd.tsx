import JsonLd from "@/components/JsonLd";
import { getPageSeo } from "@/sanity/lib/queries";

export default async function PageJsonLd({ path }: { path: string }) {
  let schemaMarkup: string | undefined;
  try {
    const seo = await getPageSeo(path);
    schemaMarkup = seo?.schemaMarkup;
  } catch (error) {
    console.error(`Unable to load schema markup for ${path}.`, error);
  }
  return <JsonLd value={schemaMarkup} />;
}
