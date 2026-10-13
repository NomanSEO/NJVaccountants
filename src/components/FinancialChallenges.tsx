import { financialChallenges } from "@/lib/ecommerceContent";

export default function FinancialChallenges() {
  return (
    <section
      className="bg-navy py-20 text-white lg:py-24"
      aria-labelledby="challenges-heading"
    >
      <div className="max-w-site mx-auto px-6">
        <div className="max-w-190">
          <p className="text-gold mb-3 text-xs font-semibold tracking-widest uppercase">
            E-commerce finance
          </p>
          <h2
            id="challenges-heading"
            className="font-display text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold"
          >
            We Understand the Financial Challenges of E-commerce
          </h2>
          <p className="mt-5 leading-7 text-white/70">
            Online sellers rely on records from storefronts, marketplaces,
            social commerce, couriers, payment gateways and banks. We bring
            those records together, investigate exceptions and interpret what
            they mean for financial reporting and decisions.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {financialChallenges.map((item, index) => (
            <article
              key={item.title}
              className="border-gold/20 bg-navy-light rounded-sm border p-5"
            >
              <span className="text-gold text-xs font-bold">0{index + 1}</span>
              <h3 className="font-display mt-3 text-lg font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
