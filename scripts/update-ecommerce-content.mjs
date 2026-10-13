import { readFileSync } from "node:fs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token)
  throw new Error("Sanity project ID and write token are required.");

const read = (name) =>
  readFileSync(new URL(`../content/${name}`, import.meta.url), "utf8").trim();
const language = {
  _type: "reference",
  _ref: "ac97c2f7-8c06-4982-ab6a-11ed470cf71b",
};
const publishedAt = "2026-10-13T12:00:00+05:00";

const services = [
  [
    "e426d916-55df-4561-a135-16565ac7802c",
    "Accounting & Bookkeeping",
    "Keep your financial records organized, accurate and useful for business decisions.",
    [
      "Bookkeeping and ledger maintenance",
      "Bank, payment gateway and courier settlement reconciliations",
      "COD collections, returns and settlement reviews",
      "Revenue, expense and cost tracking",
      "Monthly management accounts and financial reporting",
      "Cash flow monitoring and profitability analysis",
    ],
  ],
  [
    "61a6c55c-b8e5-4429-b105-613f1e0455b3",
    "Business Advisory & Financial Planning",
    "Understand your financial performance and make better-informed decisions as your business grows.",
    [
      "Financial performance and profitability analysis",
      "Budgeting and forecasting",
      "Cash flow planning",
      "Product, channel and business-level performance analysis",
      "Financial modelling and scenario analysis",
      "Working capital and cost management",
      "Management reporting and decision support",
    ],
  ],
  [
    "119fca0e-8dad-4992-b915-5dcbcb1d0b98",
    "Tax Planning & Compliance",
    "Manage your tax responsibilities with organized records and informed planning relevant to Pakistan's tax framework.",
    [
      "Income tax planning and return preparation",
      "Tax record organization and compliance support",
      "Relevant withholding tax matters",
      "Applicable sales tax and e-commerce tax compliance",
      "Tax-related accounting and reconciliation support",
      "Identifying tax risks and record-keeping gaps",
    ],
  ],
  [
    "fa4d1fea-3f0e-4b7b-a25f-f895e175f088",
    "Internal Audit & Financial Controls",
    "Strengthen your business processes and improve accountability as transaction volumes increase.",
    [
      "Financial and operational control reviews",
      "COD collection and settlement process reviews",
      "Returns, refunds and payment discrepancy reviews",
      "Inventory, procurement and expense control reviews",
      "Risk assessment and internal audit assignments",
      "Practical recommendations to improve processes and reporting",
    ],
  ],
];

const mutations = services.map(([id, title, description, bullets], order) => ({
  patch: { id, set: { title, description, bullets, order: order + 1 } },
}));

mutations.push(
  {
    patch: {
      id: "d619c053-5077-4a1f-b2a5-5bf3877a38da",
      set: {
        heroTitle:
          "Accounting, Tax & Business Advisory for E-commerce Businesses in Pakistan",
        heroTitleHighlight: "E-commerce Businesses in Pakistan",
        heroDesc:
          "Professional accounting, business advisory, tax planning and internal audit services for online sellers in Pakistan.",
        heroStats: [],
        trustLogos: [],
        ctaTitle: "Let's Discuss Your E-commerce Business",
        ctaSubtitle:
          "Tell us about your accounting, reporting, tax or financial control needs.",
      },
    },
  },
  {
    patch: {
      id: "1203c7c2-af65-4050-95b5-0f28b872c731",
      set: {
        bio: "Mian Muhammad Umar Farooq has experience in direct and indirect taxation, including more than eight years of work with Parker Russell AJS Chartered Accountants, Interloop Limited, Ettihad Group and DWP Group.",
      },
    },
  },
  {
    patch: {
      id: "68ccd24a-04c2-49b6-b46e-0cda0c0a36c3",
      set: {
        bio: "Ahad Rubbani has six years of experience in external and internal audit. His previous work includes Talat Mehboob & Co. Chartered Accountants, Mubashar Corporation and KMI Group.",
      },
    },
  },
  {
    patch: {
      id: "8cbb7912-3ec5-4dab-b0fc-a3f8974398c3",
      set: {
        bio: "Noman Jahangir has more than ten years of experience in audit and business advisory, with work across textile, real estate, e-commerce, health, dairy, IT and logistics businesses.",
      },
    },
  },
);

mutations.push({
  patch: {
    id: "8d4d55a1-7c78-4bab-a8d6-f2d52c3865c1",
    set: {
      title:
        "How to File an Income Tax Return in Pakistan: A Step-by-Step FBR IRIS Guide",
      excerpt:
        "Understand the information and documents needed to prepare an income tax return, use the FBR IRIS portal and review the relevant declarations before submission. Includes guidance on applicable tax-year requirements and official filing updates.",
      markdown: read("income-tax-guide.md"),
      updatedAt: publishedAt,
      readTime: 7,
      headerImage: {
        _type: "image",
        alt: "Pakistan income tax filing guide for Tax Year 2026",
        asset: {
          _type: "reference",
          _ref: "image-77cc49574569754fbd66647333a21c2e20fa09e4-1536x1024-png",
        },
      },
    },
    unset: ["body", "schemaMarkup"],
  },
});

const posts = [
  [
    "njv-ecommerce-accounting-records",
    "E-commerce Accounting in Pakistan: Records Every Online Seller Should Maintain",
    "ecommerce-accounting-records",
    "Good records connect orders, payments, courier settlements, expenses and bank receipts. Learn what to maintain for clearer e-commerce reporting.",
    "Accounting",
    "ecommerce-accounting-records.md",
    3,
  ],
  [
    "njv-cod-courier-reconciliation",
    "How to Reconcile COD Collections and Courier Settlements",
    "cod-courier-reconciliation",
    "A practical approach to matching orders, COD collections, courier deductions and bank receipts, with an exception list for follow-up.",
    "Accounting",
    "cod-courier-reconciliation.md",
    3,
  ],
  [
    "njv-ecommerce-profitability",
    "How to Understand Profitability in an E-commerce Business",
    "ecommerce-profitability",
    "Look beyond sales totals to product costs, delivery expenses, returns, marketplace fees and cash flow when assessing e-commerce performance.",
    "Business Advisory",
    "ecommerce-profitability.md",
    3,
  ],
];

for (const [id, title, slug, excerpt, category, file, readTime] of posts) {
  mutations.push({
    createIfNotExists: {
      _id: id,
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      excerpt,
      category,
      language,
      publishedAt,
      updatedAt: publishedAt,
      readTime,
      markdown: read(file),
    },
  });
}

const response = await fetch(
  `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  },
);
if (!response.ok)
  throw new Error(
    `Sanity mutation failed: ${response.status} ${await response.text()}`,
  );
console.log(`Applied ${mutations.length} Sanity content updates.`);
