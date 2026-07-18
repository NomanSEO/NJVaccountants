export interface MarketingPageSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface MarketingPageFaq {
  question: string;
  answer: string;
}

export interface MarketingPageDescriptor {
  path: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: MarketingPageSection[];
  faqs?: MarketingPageFaq[];
  ctaTitle: string;
  ctaText: string;
  disclaimer?: string;
}

export const aboutPage: MarketingPageDescriptor = {
  path: "/about",
  eyebrow: "About NJV Accountants",
  title: "Clear financial thinking for confident business decisions",
  metaTitle: "About NJV Accountants | Accounting & Advisory Team",
  metaDescription:
    "Learn how NJV Accountants supports businesses and individuals with practical accounting, tax, audit and advisory expertise in Faisalabad and Lahore.",
  intro:
    "NJV Accountants helps business owners, leadership teams and individuals understand their financial position, meet important obligations and make decisions with greater clarity. Our work brings accounting discipline together with practical commercial thinking, so clients receive advice that is useful beyond the next filing deadline.",
  sections: [
    {
      heading: "Advice grounded in your real business context",
      paragraphs: [
        "Financial information is most valuable when it explains what is happening, why it matters and what should happen next. We take time to understand the organisation behind the numbers: its operating model, priorities, pressures and decision timetable.",
        "That context shapes how we approach bookkeeping, reporting, tax matters, assurance work and business advisory assignments. The aim is a clear scope, dependable communication and work that gives decision-makers a stronger basis for action.",
      ],
    },
    {
      heading: "Who we support",
      paragraphs: [
        "Our clients include owner-managed businesses, growing companies, established organisations, entrepreneurs and individuals with complex financial or tax requirements. Some need reliable day-to-day finance support; others need focused analysis for a transaction, valuation, control issue or strategic decision.",
      ],
      bullets: [
        "Business owners seeking better visibility over performance and cash flow",
        "Leadership teams preparing for growth, investment or organisational change",
        "Companies strengthening reporting, controls and compliance processes",
        "Buyers and sellers assessing the financial implications of a transaction",
        "Individuals who value organised records and clear tax guidance",
      ],
    },
    {
      heading: "Capabilities across the business lifecycle",
      paragraphs: [
        "A business rarely experiences accounting, tax and commercial questions in isolation. A growth decision can affect forecasts, funding, controls and tax planning at the same time. Our service range is designed to connect those questions rather than treat them as unrelated tasks.",
      ],
      bullets: [
        "Accounting, bookkeeping and management reporting",
        "Tax compliance, planning support and financial organisation",
        "Audit and assurance support",
        "Business advisory, forecasting and decision analysis",
        "Business valuation and transaction-focused financial review",
        "Forensic accounting and investigation support",
      ],
    },
    {
      heading: "Senior attention and straightforward communication",
      paragraphs: [
        "Clients should know what work is being performed, what information is needed and when they can expect an answer. We organise engagements around clear responsibilities and practical milestones, with senior professionals involved where judgement and context matter most.",
        "We explain technical issues in direct language and distinguish confirmed facts from assumptions or areas that need further evidence. That makes it easier for clients to assess choices without being buried in terminology.",
      ],
    },
    {
      heading: "How an engagement works",
      paragraphs: [
        "Every assignment begins with a focused conversation about the decision, obligation or problem in front of you. We then agree the scope, information requirements and intended output before substantive work begins.",
      ],
      bullets: [
        "Discover: understand objectives, timing, stakeholders and available records",
        "Define: agree scope, responsibilities, deliverables and communication points",
        "Analyse: organise evidence, test assumptions and identify material issues",
        "Explain: present findings clearly, including limitations and practical options",
        "Support: help the client apply the work and identify sensible next steps",
      ],
    },
    {
      heading: "Principles that guide our work",
      paragraphs: [
        "Clarity, responsiveness, commercial awareness and confidentiality shape how we work. We protect sensitive information, ask direct questions when evidence is incomplete and avoid presenting estimates as certainty. Our role is to help clients understand the financial picture and make considered decisions within the appropriate professional and regulatory framework.",
      ],
    },
    {
      heading: "Local access in Faisalabad and Lahore",
      paragraphs: [
        "NJV Accountants serves clients through its presence in Faisalabad and Lahore, supported by digital collaboration for efficient document exchange and communication. That combination gives clients convenient access while allowing engagements to move at the pace their deadlines require.",
      ],
    },
  ],
  ctaTitle: "Start with a clear conversation",
  ctaText:
    "Tell us what you are working through. We will help you identify the right next step and the information needed to move forward.",
};

export const businessValuationPage: MarketingPageDescriptor = {
  path: "/services/business-advisory/business-valuation",
  eyebrow: "Business Advisory",
  title: "Business Valuation Services built around the decision at hand",
  metaTitle: "Business Valuation Services | NJV Accountants",
  metaDescription:
    "Business Valuation Services from NJV Accountants provide evidence-led analysis for transactions, planning, ownership changes and informed negotiation.",
  intro:
    "Our Business Valuation Services help owners, leadership teams and stakeholders understand what a business may be worth, which factors drive that conclusion and where uncertainty remains. Every valuation is shaped around its purpose, date, available evidence and the decision it needs to support.",
  sections: [
    {
      heading: "When Business Valuation Services add clarity",
      paragraphs: [
        "A valuation is not simply a formula applied to a set of accounts. The appropriate approach depends on why the work is needed, the characteristics of the company, the reliability of its information and the perspective of the intended user.",
      ],
      bullets: [
        "Preparing to buy, sell or invest in a business",
        "Planning a shareholder entry, exit or internal ownership transfer",
        "Supporting succession, restructuring or strategic planning",
        "Assessing value drivers before seeking external capital",
        "Informing negotiations or resolving a commercial disagreement",
        "Testing how forecasts, margins and risk assumptions affect value",
      ],
    },
    {
      heading: "An evidence-led valuation approach",
      paragraphs: [
        "We begin by defining the subject interest, valuation date, purpose and standard of value relevant to the assignment. We then review historic performance, current trading, financial position, forecasts, customer and supplier concentration, operating dependencies and other factors that may influence risk or sustainable earnings.",
        "Depending on the circumstances, analysis may consider income-based, market-based and asset-based methods. We reconcile the available indicators rather than selecting a result mechanically, and we explain the assumptions and limitations that have the greatest effect on the conclusion.",
      ],
    },
    {
      heading: "Information normally required",
      paragraphs: [
        "Good valuation work depends on organised and supportable information. The exact request is tailored to the business, but it commonly includes the following.",
      ],
      bullets: [
        "Historic financial statements and recent management accounts",
        "Budgets, forecasts and the assumptions behind them",
        "Details of unusual, non-recurring or owner-specific items",
        "Debt, working capital, major assets and contingent obligations",
        "Customer, product, supplier and geographic concentration information",
        "Ownership structure, material contracts and relevant business plans",
      ],
    },
    {
      heading: "Our valuation engagement process",
      paragraphs: [
        "The engagement moves through a clear sequence: scope definition, information collection, management discussion, financial normalisation, method selection, sensitivity analysis and reporting. Questions and evidence gaps are raised early so they can be addressed before conclusions are finalised.",
        "The final output is designed for its agreed use. It may be a concise advisory report, a fuller written valuation or analytical support for a negotiation. In each case, we identify the basis of work, material assumptions, methods considered and the factors a reader should weigh when using the conclusion.",
      ],
    },
    {
      heading: "What clients receive",
      paragraphs: [
        "A useful valuation should do more than state a number. It should help the client understand the commercial and financial logic behind the range, the evidence that supports it and the issues that could change it.",
      ],
      bullets: [
        "A clearly defined valuation scope and effective date",
        "Analysis of historic performance and maintainable earnings",
        "Reasoned selection and reconciliation of valuation methods",
        "Sensitivity analysis for material assumptions",
        "A clear explanation of risks, limitations and value drivers",
        "A report or decision paper suited to the agreed purpose",
      ],
    },
    {
      heading: "Using valuation insight to make a better decision",
      paragraphs: [
        "Value is affected by expectations about future cash flow, risk and the transferability of business performance. Our work highlights the operational and financial factors that matter most, helping clients prepare for negotiation, prioritise improvements or test whether a proposed transaction is commercially sensible.",
      ],
    },
  ],
  faqs: [
    {
      question: "How long does a business valuation take?",
      answer:
        "Timing depends on the purpose, complexity and quality of available information. Once the initial scope and records are reviewed, we provide a practical timetable and identify any evidence gaps that could affect it.",
    },
    {
      question: "Is a valuation the same as the eventual sale price?",
      answer:
        "No. A valuation is an evidence-based opinion prepared for a defined purpose and date. A negotiated price can also reflect buyer-specific synergies, financing, deal terms, urgency and bargaining position.",
    },
    {
      question: "Which valuation method will you use?",
      answer:
        "The method depends on the business and purpose. We may consider income, market and asset approaches, then reconcile the indicators that are most relevant and supportable.",
    },
    {
      question: "Can you value a business with limited records?",
      answer:
        "We can first assess what information exists and whether a meaningful scope is possible. Significant evidence limitations may require additional work, wider assumptions or a different form of advisory output.",
    },
  ],
  ctaTitle: "Discuss your Business Valuation Services requirement",
  ctaText:
    "Tell us the decision, timetable and stakeholders involved. We will outline an appropriate valuation scope and the records needed to begin.",
  disclaimer:
    "A valuation is prepared for its agreed purpose, effective date and users. It is not a guarantee of a transaction price, funding outcome or future business performance.",
};

export const maAdvisoryPage: MarketingPageDescriptor = {
  path: "/services/business-advisory/ma-advisory",
  eyebrow: "Business Advisory",
  title: "M&A Advisory Services for informed transaction decisions",
  metaTitle: "M&A Advisory Services | NJV Accountants",
  metaDescription:
    "M&A Advisory Services from NJV Accountants support transaction preparation, financial analysis, due diligence coordination and post-deal planning.",
  intro:
    "Our M&A Advisory Services help business owners and leadership teams approach acquisitions, disposals and ownership changes with stronger financial information. We organise the analysis, challenge key assumptions and keep attention on the issues that may affect value, risk and the practical shape of a transaction.",
  sections: [
    {
      heading: "Where M&A Advisory Services can support a transaction",
      paragraphs: [
        "Transactions place unusual demands on management. Information must be assembled quickly, forecasts tested, questions answered consistently and commercial decisions made before every uncertainty can be removed. We provide structured financial support across selected stages of that process.",
      ],
      bullets: [
        "Preparing a business and its financial information for sale",
        "Assessing a potential acquisition or strategic combination",
        "Reviewing historic performance and forecast assumptions",
        "Coordinating financial information for due diligence",
        "Evaluating working-capital, debt and completion considerations",
        "Planning financial reporting and control priorities after completion",
      ],
    },
    {
      heading: "Transaction preparation",
      paragraphs: [
        "Early preparation can reduce avoidable disruption and make the financial story easier for another party to understand. We help organise historic records, management reporting, forecast support and explanations for unusual items before formal requests intensify.",
        "For sellers, that may include identifying information gaps and normalising earnings analysis. For buyers, it may involve defining the financial questions that should be answered before significant time and cost are committed.",
      ],
    },
    {
      heading: "Financial analysis and assumption testing",
      paragraphs: [
        "Reported profit is only one part of a transaction assessment. We consider the quality and consistency of earnings, cash conversion, working-capital patterns, capital expenditure, customer or supplier concentration, debt-like items and the support available for forecasts.",
        "We distinguish information that is evidenced from management expectations that still require testing. Sensitivity analysis helps show how changes in growth, margin, cash flow or timing could affect the commercial case.",
      ],
    },
    {
      heading: "Due diligence coordination and decision support",
      paragraphs: [
        "Our role can include organising the financial data room, tracking questions, helping management prepare clear responses and reviewing findings from other specialists. The purpose is not to remove transaction risk; it is to make material financial issues visible enough for decision-makers and their legal advisers to address them appropriately.",
      ],
      bullets: [
        "Financial information request planning",
        "Historic trading and quality-of-earnings analysis",
        "Working-capital and net-debt observations",
        "Forecast and business-plan sensitivity review",
        "Identification of financial issues requiring specialist follow-up",
        "Clear summaries for management and transaction stakeholders",
      ],
    },
    {
      heading: "Deal support through key decision points",
      paragraphs: [
        "As a transaction develops, financial findings may influence valuation discussions, price mechanisms, conditions, warranties or the scope of further work. We help clients understand the financial implications and maintain a clear record of the assumptions behind their position.",
        "Legal drafting, regulated investment advice and formal tax opinions remain with appropriately appointed advisers. We collaborate with those specialists and provide the accounting and analytical input relevant to our agreed scope.",
      ],
    },
    {
      heading: "Post-deal financial priorities",
      paragraphs: [
        "Completion is the beginning of operational delivery. We can help management identify immediate reporting, cash control, accounting-policy and performance-monitoring priorities so the first months are guided by usable financial information.",
      ],
      bullets: [
        "Opening balance and reporting requirements",
        "Management information and performance measures",
        "Working-capital and cash-flow monitoring",
        "Finance-process and control priorities",
        "Tracking the assumptions that supported the transaction case",
      ],
    },
  ],
  faqs: [
    {
      question: "Do you advise both buyers and sellers?",
      answer:
        "Yes, subject to conflict checks and a clearly defined scope. The questions and outputs differ depending on the client’s role, transaction stage and decision needs.",
    },
    {
      question: "Does your work replace legal or investment advice?",
      answer:
        "No. Our role is accounting, financial analysis and transaction support within the agreed engagement. Clients should retain appropriately qualified legal, tax, regulatory and investment advisers where required.",
    },
    {
      question: "When should an adviser become involved?",
      answer:
        "Early involvement is often useful because information gaps and reporting inconsistencies can take time to resolve. We can also join a live process where a specific analytical or coordination need has already emerged.",
    },
    {
      question: "Can you guarantee a transaction will complete?",
      answer:
        "No. Completion depends on the parties, financing, negotiations, due diligence, legal terms and other factors outside an adviser’s control. Our work is intended to improve financial understanding and decision discipline.",
    },
  ],
  ctaTitle: "Talk to us about M&A Advisory Services",
  ctaText:
    "Share the transaction stage, timetable and financial questions you need to resolve. We will propose a focused scope that supports the next decision.",
  disclaimer:
    "NJV Accountants provides accounting and financial advisory support within an agreed scope. Our M&A work does not constitute legal advice, regulated investment advice or a guarantee that a transaction will complete or achieve a particular outcome.",
};
