const PAINS = [
  "Differences between orders, courier settlements and bank receipts",
  "Unclear product and channel profitability",
  "Disorganized bookkeeping and expense records",
  "Limited visibility over cash flow and working capital",
  "Tax compliance and record-keeping questions",
  "Financial controls that have not kept pace with growth",
];

export default function PainPoints() {
  return (
    <section className="bg-cream py-20 lg:py-24" aria-labelledby="pain-heading">
      <div className="max-w-site mx-auto grid gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-gold mb-3 text-xs font-semibold tracking-widest uppercase">
            Beyond sales figures
          </p>
          <h2
            id="pain-heading"
            className="font-display text-navy text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold"
          >
            Your E-commerce Business Deserves More Than Basic Bookkeeping
          </h2>
          <p className="text-slate mt-5 leading-7">
            Running an online business involves more than generating sales.
            Reliable records, cash flow visibility, an understanding of
            profitability and confidence in tax reporting all matter as the
            business grows.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PAINS.map((pain) => (
            <li
              key={pain}
              className="border-border rounded-sm border bg-white p-5 text-sm leading-6 text-slate"
            >
              <span className="text-gold mr-2 font-bold" aria-hidden="true">
                ›
              </span>
              {pain}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
