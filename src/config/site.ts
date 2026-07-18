export const SITE_URL = "https://www.njvaccountants.com";
export const GOOGLE_ANALYTICS_ID = "G-3S4R07WLX1";
export const WHATSAPP_PHONE = "923225401701";
export const CONTACT_RECIPIENT = "usamaashraf82@live.com";

export function whatsappUrl(
  message = "Hello NJV Accountants, I would like to request a consultation.",
): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/calculators",
  "/calculators/car-loan",
  "/calculators/cd",
  "/calculators/federal-tax",
  "/calculators/investment",
  "/calculators/loan",
  "/calculators/mortgage",
  "/calculators/personal-loan",
  "/calculators/retirement",
  "/calculators/roth-ira",
  "/calculators/salary-paycheck",
  "/calculators/salary-tax",
  "/services/business-advisory/business-valuation",
  "/services/business-advisory/ma-advisory",
] as const;

export const CONTENT_PAGE_ROUTES = [
  "/about",
  "/services/business-advisory/business-valuation",
  "/services/business-advisory/ma-advisory",
] as const;
