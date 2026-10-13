import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanity";
import type { PortableTextBlock, SanityImage } from "@/types";

interface PortableTableValue {
  rows?: Array<{ _key?: string; cells?: string[] }>;
}

export default function ContentPageBody({
  body,
}: {
  body: PortableTextBlock[];
}) {
  return (
    <div className="prose mx-auto max-w-200">
      <PortableText
        value={body}
        components={{
          types: {
            image: ({ value }: { value: SanityImage }) =>
              value.asset ? (
                <figure className="my-10">
                  <div className="relative aspect-video overflow-hidden rounded-sm">
                    <Image
                      src={urlFor(value).width(1000).url()}
                      alt={value.alt ?? ""}
                      fill
                      sizes="(max-width: 800px) 100vw, 800px"
                      className="object-contain"
                    />
                  </div>
                  {value.caption ? (
                    <figcaption className="text-slate-light mt-3 text-center text-sm italic">
                      {value.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null,
            table: ({ value }: { value: PortableTableValue }) => {
              const [header, ...rows] = value.rows ?? [];
              if (!header?.cells?.length) return null;
              return (
                <div className="my-10 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        {header.cells.map((cell, index) => (
                          <th
                            key={`${cell}-${index}`}
                            className="bg-navy border-border border p-3 text-left text-white"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={row._key ?? index} className="even:bg-cream">
                          {row.cells?.map((cell, cellIndex) => (
                            <td
                              key={`${cell}-${cellIndex}`}
                              className="border-border border p-3 align-top"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            },
          },
        }}
      />
    </div>
  );
}
