import { getAuthorSectionVisibility } from "@/lib/authorProfile";
import type { AuthorProfile } from "@/types";

export default function AuthorProfileSections({
  author,
}: {
  author: AuthorProfile;
}) {
  const visible = getAuthorSectionVisibility(author);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {visible.expertise ? (
        <section>
          <h2 className="font-display text-navy mb-4 text-2xl font-bold">
            Areas of expertise
          </h2>
          <ul className="space-y-2">
            {author.expertise?.filter(Boolean).map((item) => (
              <li key={item} className="text-slate flex gap-3">
                <span className="text-gold">›</span> {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {visible.education ? (
        <section>
          <h2 className="font-display text-navy mb-4 text-2xl font-bold">
            Education
          </h2>
          <ul className="space-y-2">
            {author.education?.filter(Boolean).map((item) => (
              <li key={item} className="text-slate flex gap-3">
                <span className="text-gold">›</span> {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {visible.experience ? (
        <section className="lg:col-span-2">
          <h2 className="font-display text-navy mb-5 text-2xl font-bold">
            Professional experience
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {author.experience?.map((item, index) => (
              <article
                key={item._key ?? `${item.title}-${index}`}
                className="border-border rounded-sm border bg-white p-5"
              >
                {item.title ? (
                  <h3 className="font-display text-navy font-bold">
                    {item.title}
                  </h3>
                ) : null}
                <p className="text-gold mt-1 text-sm font-semibold">
                  {[item.organization, item.period].filter(Boolean).join(" · ")}
                </p>
                {item.description ? (
                  <p className="text-slate mt-3 leading-7">{item.description}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {visible.achievements ? (
        <section className="lg:col-span-2">
          <h2 className="font-display text-navy mb-4 text-2xl font-bold">
            Professional achievements
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {author.achievements?.filter(Boolean).map((item) => (
              <li
                key={item}
                className="border-border text-slate rounded-sm border bg-white p-4"
              >
                <span className="text-gold mr-2">✓</span> {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
