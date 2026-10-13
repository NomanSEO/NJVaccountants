import Link from "next/link";

const support = [
  {
    title: "Accounting & reconciliation",
    text: "Set up consistent books and match orders, returns, courier COD statements, digital payments and bank receipts.",
  },
  {
    title: "Business advisory",
    text: "Prepare management reports that show margins, cash flow and the effect of delivery costs, commissions and advertising.",
  },
  {
    title: "Internal audit & controls",
    text: "Review how sales, inventory, expenses and settlements are recorded, approved and checked for exceptions.",
  },
  {
    title: "Tax planning & compliance",
    text: "Organize supporting records and review applicable Pakistani income tax and sales tax matters in light of the business’s circumstances.",
  },
];

export default function IllustrativeCaseStudy() {
  return (
    <section
      className="bg-cream py-20 lg:py-24"
      aria-labelledby="illustrative-case-study-heading"
    >
      <div className="max-w-site mx-auto px-6">
        <p className="text-gold mb-3 text-xs font-semibold tracking-widest uppercase">
          Illustrative Case Study
        </p>
        <h2
          id="illustrative-case-study-heading"
          className="font-display text-navy max-w-215 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold"
        >
          Improving Financial Visibility for a Pakistan-Based E-commerce Business
        </h2>
        <p className="text-slate mt-5 max-w-190 leading-7">
          This fictional example shows how NJV Accountants could bring its four
          services together for an online retailer. It does not describe a
          client engagement or actual results.
        </p>

        <div className="border-border mt-10 grid overflow-hidden rounded-sm border bg-white lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="p-7 sm:p-9">
            <h3 className="font-display text-navy text-xl font-bold">
              The business and its challenge
            </h3>
            <p className="text-slate mt-4 leading-7">
              A Pakistani consumer-products retailer sells through its own
              website and local marketplaces. Customers pay by COD, bank
              transfer and digital methods. Orders, cancellations, returns,
              courier remittances and bank deposits sit in separate records.
            </p>
            <p className="text-slate mt-4 leading-7">
              Inconsistent bookkeeping makes it hard to see cash flow or
              product-level profitability after delivery charges, commissions,
              advertising and returns. Sales, inventory and expense controls
              need clearer documentation, while the business needs to assess
              its applicable tax obligations.
            </p>
          </div>
          <div className="bg-navy p-7 text-white sm:p-9">
            <h3 className="font-display text-xl font-bold">
              How NJV could support it
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {support.map((item) => (
                <div key={item.title}>
                  <h4 className="text-gold font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-slate max-w-190 leading-7">
            <strong className="text-navy">Potential value:</strong> More
            reliable reconciliations and management reports could help the
            owner investigate differences, understand margins and make
            better-informed cash flow decisions. Actual outcomes depend on the
            business’s records, processes and agreed scope of work.
          </p>
          <Link
            href="#contact"
            className="bg-gold text-navy hover:bg-gold-light inline-flex shrink-0 items-center justify-center rounded-sm px-6 py-3 font-semibold"
          >
            Discuss Your Business Needs
          </Link>
        </div>
      </div>
    </section>
  );
}
