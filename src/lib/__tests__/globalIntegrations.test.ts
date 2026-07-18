import { describe, expect, it } from "vitest";
import {
  GOOGLE_ANALYTICS_ID,
  WHATSAPP_PHONE,
  whatsappUrl,
} from "@/config/site";

describe("global integration configuration", () => {
  it("uses the requested Google Analytics measurement ID", () => {
    expect(GOOGLE_ANALYTICS_ID).toBe("G-3S4R07WLX1");
  });

  it("builds an encoded WhatsApp consultation URL for the requested number", () => {
    const url = new URL(whatsappUrl());
    expect(WHATSAPP_PHONE).toBe("923225401701");
    expect(`${url.origin}${url.pathname}`).toBe("https://wa.me/923225401701");
    expect(url.searchParams.get("text")).toBe(
      "Hello NJV Accountants, I would like to request a consultation.",
    );
  });
});
