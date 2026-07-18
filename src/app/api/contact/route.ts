import { NextResponse } from "next/server";
import { CONTACT_RECIPIENT } from "@/config/site";
import {
  buildContactEmail,
  handleContactSubmission,
  readJsonRequestBody,
  type ContactConfig,
  type ContactData,
  type ContactResult,
} from "@/lib/contact";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 32 * 1024;

function configuration(): ContactConfig {
  return {
    mailjetApiKey: process.env.MAILJET_API_KEY?.trim() ?? "",
    mailjetSecretKey: process.env.MAILJET_SECRET_KEY?.trim() ?? "",
    senderEmail: process.env.MAILJET_SENDER_EMAIL?.trim() ?? "",
    recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY?.trim() ?? "",
    recipientEmail: CONTACT_RECIPIENT,
  };
}

async function verifyCaptcha(
  token: string,
  config: ContactConfig,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret: config.recaptchaSecret,
    response: token,
  });
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    },
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function sendMailjet(
  data: ContactData,
  config: ContactConfig,
): Promise<boolean> {
  const email = buildContactEmail(data);
  const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${config.mailjetApiKey}:${config.mailjetSecretKey}`,
      ).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: config.senderEmail,
            Name: "NJV Accountants Website",
          },
          To: [{ Email: config.recipientEmail, Name: "NJV Accountants" }],
          ReplyTo: {
            Email: data.email,
            Name: [data.firstName, data.lastName].filter(Boolean).join(" "),
          },
          Subject: email.subject,
          TextPart: email.text,
          HTMLPart: email.html,
        },
      ],
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("Mailjet rejected a contact message.", {
      status: response.status,
    });
  }
  return response.ok;
}

function responseFor(result: ContactResult) {
  switch (result.status) {
    case "success":
      return NextResponse.json({ status: "success" }, { status: 200 });
    case "validation_error":
      return NextResponse.json(result, { status: 422 });
    case "captcha_error":
      return NextResponse.json(result, { status: 400 });
    case "unavailable":
      return NextResponse.json(result, { status: 503 });
    case "delivery_error":
      return NextResponse.json(result, { status: 502 });
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json(
      { status: "validation_error", message: "JSON requests are required." },
      { status: 400 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { status: "validation_error", message: "Request is too large." },
      { status: 413 },
    );
  }

  const parsedBody = await readJsonRequestBody(request, MAX_REQUEST_BYTES);
  if (!parsedBody.ok && parsedBody.reason === "too_large") {
    return NextResponse.json(
      { status: "validation_error", message: "Request is too large." },
      { status: 413 },
    );
  }
  if (!parsedBody.ok) {
    return NextResponse.json(
      { status: "validation_error", message: "Invalid JSON request." },
      { status: 400 },
    );
  }

  const result = await handleContactSubmission(parsedBody.value, configuration(), {
    verifyCaptcha,
    sendMail: sendMailjet,
  });
  return responseFor(result);
}
