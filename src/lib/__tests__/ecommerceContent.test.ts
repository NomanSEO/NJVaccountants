import { describe, expect, it } from "vitest";
import { coreServices, financialChallenges } from "../ecommerceContent";

describe("e-commerce homepage content", () => {
  it("links four distinct services to existing detail routes", () => {
    expect(coreServices.map((service) => service.href)).toEqual([
      "/services/accounting-and-bookkeeping",
      "/services/business-advisory",
      "/services/taxation",
      "/services/audit-and-assurance",
    ]);
  });

  it("covers the main operating challenges without unsupported results", () => {
    expect(financialChallenges).toHaveLength(5);
    expect(financialChallenges.map((item) => item.title)).toEqual([
      "Reconciliation",
      "Profitability",
      "Cash flow",
      "Tax readiness",
      "Financial controls",
    ]);
    expect(JSON.stringify({ coreServices, financialChallenges })).not.toMatch(
      /guarantee|tax saved|recovered funds/i,
    );
  });
});
