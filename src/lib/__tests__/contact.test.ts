import { describe, expect, it, vi } from "vitest";
import {
  handleContactSubmission,
  contactMessageForStatus,
  validateContactPayload,
  type ContactConfig,
} from "@/lib/contact";

const validPayload = {
  firstName: "Usama",
  lastName: "Ashraf",
  email: "customer@example.com",
  company: "Example Ltd",
  phone: "+92 300 0000000",
  service: "Business Valuation",
  message: "Please contact me about a valuation.",
  website: "",
  captchaToken: "captcha-token",
};

const config: ContactConfig = {
  mailjetApiKey: "api-key",
  mailjetSecretKey: "secret-key",
  senderEmail: "verified@example.com",
  recaptchaSecret: "captcha-secret",
  recipientEmail: "usamaashraf82@live.com",
};

describe("validateContactPayload", () => {
  it("normalizes a valid payload", () => {
    const result = validateContactPayload({
      ...validPayload,
      firstName: "  Usama  ",
      message: "  Please contact me about a valuation.  ",
    });

    expect(result).toEqual({
      ok: true,
      data: { ...validPayload, firstName: "Usama" },
    });
  });

  it("returns field errors for required fields and malformed email", () => {
    const result = validateContactPayload({
      firstName: "",
      email: "not-an-email",
      message: "",
      captchaToken: "",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors).toMatchObject({
        firstName: expect.any(String),
        email: expect.any(String),
        message: expect.any(String),
        captchaToken: expect.any(String),
      });
    }
  });

  it("rejects values over their maximum lengths", () => {
    const result = validateContactPayload({
      ...validPayload,
      firstName: "x".repeat(81),
      message: "x".repeat(5001),
    });
    expect(result.ok).toBe(false);
  });
});

describe("handleContactSubmission", () => {
  it("accepts a filled honeypot without calling external services", async () => {
    const verifyCaptcha = vi.fn();
    const sendMail = vi.fn();
    const result = await handleContactSubmission(
      { ...validPayload, website: "https://spam.example" },
      config,
      { verifyCaptcha, sendMail },
    );

    expect(result).toEqual({ status: "success" });
    expect(verifyCaptcha).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns unavailable when integration configuration is incomplete", async () => {
    const result = await handleContactSubmission(validPayload, {
      ...config,
      senderEmail: "",
    });
    expect(result).toEqual({ status: "unavailable" });
  });

  it("blocks Mailjet when reCAPTCHA verification fails", async () => {
    const sendMail = vi.fn();
    const result = await handleContactSubmission(validPayload, config, {
      verifyCaptcha: vi.fn().mockResolvedValue(false),
      sendMail,
    });
    expect(result).toEqual({ status: "captcha_error" });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns success only after CAPTCHA and Mailjet succeed", async () => {
    const verifyCaptcha = vi.fn().mockResolvedValue(true);
    const sendMail = vi.fn().mockResolvedValue(true);
    const result = await handleContactSubmission(validPayload, config, {
      verifyCaptcha,
      sendMail,
    });
    expect(result).toEqual({ status: "success" });
    expect(verifyCaptcha).toHaveBeenCalledWith("captcha-token", config);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ email: "customer@example.com" }),
      config,
    );
  });

  it("maps Mailjet rejection and dependency exceptions to delivery failure", async () => {
    const failed = await handleContactSubmission(validPayload, config, {
      verifyCaptcha: vi.fn().mockResolvedValue(true),
      sendMail: vi.fn().mockResolvedValue(false),
    });
    const thrown = await handleContactSubmission(validPayload, config, {
      verifyCaptcha: vi.fn().mockRejectedValue(new Error("network")),
      sendMail: vi.fn(),
    });
    expect(failed).toEqual({ status: "delivery_error" });
    expect(thrown).toEqual({ status: "delivery_error" });
  });
});

describe("contactMessageForStatus", () => {
  it("provides specific accessible messages for CAPTCHA and unavailable states", () => {
    expect(contactMessageForStatus("captcha_error")).toContain("reCAPTCHA");
    expect(contactMessageForStatus("unavailable")).toContain("temporarily unavailable");
    expect(contactMessageForStatus("delivery_error")).not.toContain("Mailjet");
  });
});
