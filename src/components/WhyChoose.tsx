const REASONS = [
  {
    title: "E-commerce-focused perspective",
    text: "Our approach considers the financial processes and reporting challenges associated with online selling.",
  },
  {
    title: "Connected financial services",
    text: "Accounting, business advisory, tax planning and internal audit can be considered together.",
  },
  {
    title: "Practical recommendations",
    text: "We aim to give clear explanations and recommendations owners can use in day-to-day operations.",
  },
  {
    title: "Professional and confidential service",
    text: "We handle business information with appropriate care and agree on responsibilities and deliverables for each engagement.",
  },
];

export default function WhyChoose() {
  return (
    <section
      id="about"
      className="bg-white py-20 lg:py-24"
      aria-labelledby="why-heading"
    >
      <div className="max-w-site mx-auto px-6">
        <p className="text-gold mb-3 text-xs font-semibold tracking-widest uppercase">
          Why NJV
        </p>
        <h2
          id="why-heading"
          className="font-display text-navy text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold"
        >
          Why Work with NJV Accountants?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <article
              key={reason.title}
              className="border-border rounded-sm border p-7"
            >
              <h3 className="font-display text-navy text-xl font-bold">
                {reason.title}
              </h3>
              <p className="text-slate mt-3 leading-7">{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
