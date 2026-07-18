import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@/types";

export default function ContentPageBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="prose mx-auto max-w-200">
      <PortableText value={body} />
    </div>
  );
}
