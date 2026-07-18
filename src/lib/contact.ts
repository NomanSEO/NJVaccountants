export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  website: string;
  captchaToken: string;
}

export interface ContactConfig {
  mailjetApiKey: string;
  mailjetSecretKey: string;
  senderEmail: string;
  recaptchaSecret: string;
  recipientEmail: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactData }
  | { ok: false; fieldErrors: Record<string, string> };

export type ContactResult =
  | { status: "success" }
  | { status: "validation_error"; fieldErrors: Record<string, string> }
  | { status: "captcha_error" }
  | { status: "unavailable" }
  | { status: "delivery_error" };

export type ContactStatus = ContactResult["status"] | "idle" | "submitting";

export function contactMessageForStatus(status: ContactStatus): string {
  switch (status) {
    case "success":
      return "Enquiry sent successfully. We will be in touch soon.";
    case "validation_error":
      return "Check the highlighted fields and try again.";
    case "captcha_error":
      return "The reCAPTCHA check could not be verified. Please complete it again.";
    case "unavailable":
      return "Online enquiries are temporarily unavailable. Please contact us on WhatsApp or by phone.";
    case "delivery_error":
      return "We could not send your enquiry right now. Please try again or use WhatsApp.";
    case "submitting":
      return "Sending your enquiry…";
    case "idle":
      return "";
  }
}

export interface ContactDependencies {
  verifyCaptcha: (
    token: string,
    config: ContactConfig,
  ) => Promise<boolean>;
  sendMail: (data: ContactData, config: ContactConfig) => Promise<boolean>;
}

const LIMITS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  company: 160,
  phone: 60,
  service: 120,
  message: 5000,
  website: 500,
  captchaToken: 4096,
} satisfies Record<keyof ContactData, number>;

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function payloadRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function validateContactPayload(value: unknown): ContactValidationResult {
  const source = payloadRecord(value);
  const data: ContactData = {
    firstName: stringValue(source.firstName),
    lastName: stringValue(source.lastName),
    email: stringValue(source.email).toLowerCase(),
    company: stringValue(source.company),
    phone: stringValue(source.phone),
    service: stringValue(source.service),
    message: stringValue(source.message),
    website: stringValue(source.website),
    captchaToken: stringValue(source.captchaToken),
  };
  const fieldErrors: Record<string, string> = {};

  if (!data.firstName) fieldErrors.firstName = "Enter your first name.";
  if (!data.email) {
    fieldErrors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!data.message) fieldErrors.message = "Tell us how we can help.";
  if (!data.captchaToken) {
    fieldErrors.captchaToken = "Complete the reCAPTCHA check.";
  }

  for (const [field, maximum] of Object.entries(LIMITS) as Array<
    [keyof ContactData, number]
  >) {
    if (data[field].length > maximum) {
      fieldErrors[field] = `Keep this field under ${maximum} characters.`;
    }
  }

  return Object.keys(fieldErrors).length
    ? { ok: false, fieldErrors }
    : { ok: true, data };
}

function isConfigured(config: ContactConfig): boolean {
  return Boolean(
    config.mailjetApiKey &&
      config.mailjetSecretKey &&
      config.senderEmail &&
      config.recaptchaSecret &&
      config.recipientEmail,
  );
}

export async function handleContactSubmission(
  payload: unknown,
  config: ContactConfig,
  dependencies?: ContactDependencies,
): Promise<ContactResult> {
  const raw = payloadRecord(payload);
  if (stringValue(raw.website)) return { status: "success" };

  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return { status: "validation_error", fieldErrors: validation.fieldErrors };
  }
  if (!isConfigured(config) || !dependencies) return { status: "unavailable" };

  try {
    const captchaValid = await dependencies.verifyCaptcha(
      validation.data.captchaToken,
      config,
    );
    if (!captchaValid) return { status: "captcha_error" };
    const accepted = await dependencies.sendMail(validation.data, config);
    return accepted ? { status: "success" } : { status: "delivery_error" };
  } catch (error) {
    console.error(
      "Contact submission dependency failed.",
      error instanceof Error ? error.message : "Unknown error",
    );
    return { status: "delivery_error" };
  }
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[character];
  });
}

export function buildContactEmail(data: ContactData): {
  subject: string;
  text: string;
  html: string;
} {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const rows = [
    ["Name", name],
    ["Email", data.email],
    ["Company", data.company || "Not supplied"],
    ["Phone", data.phone || "Not supplied"],
    ["Service", data.service || "Not supplied"],
    ["Message", data.message],
  ];
  return {
    subject: `Website consultation request from ${name}`,
    text: rows.map(([label, content]) => `${label}: ${content}`).join("\n\n"),
    html: `<h2>New website consultation request</h2>${rows
      .map(
        ([label, content]) =>
          `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(content).replace(/\n/g, "<br>")}</p>`,
      )
      .join("")}`,
  };
}
