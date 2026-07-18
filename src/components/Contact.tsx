"use client";

import { useCallback, useState, type FormEvent } from "react";
import RecaptchaCheckbox from "@/components/RecaptchaCheckbox";
import { contactMessageForStatus, type ContactStatus } from "@/lib/contact";
import { whatsappUrl } from "@/config/site";

const SERVICES = [
  "Accounting & Bookkeeping",
  "Taxation Services",
  "Audit & Assurance",
  "Business Valuation",
  "M&A Advisory",
  "Forensic Accounting",
  "Multiple Services",
];

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  website: string;
}

const EMPTY_FORM: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

export default function Contact() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [captchaToken, setCaptchaToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [status, setStatus] = useState<ContactStatus>(
    siteKey ? "idle" : "unavailable",
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onCaptchaToken = useCallback((token: string) => {
    setCaptchaToken(token);
    if (token) {
      setFieldErrors((errors) => {
        const next = { ...errors };
        delete next.captchaToken;
        return next;
      });
    }
  }, []);

  const update = (field: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((errors) => {
      const next = { ...errors };
      delete next[field];
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!siteKey) {
      setStatus("unavailable");
      return;
    }
    if (!captchaToken) {
      setFieldErrors((errors) => ({
        ...errors,
        captchaToken: "Complete the reCAPTCHA check.",
      }));
      setStatus("captcha_error");
      return;
    }

    setStatus("submitting");
    setFieldErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      const result = (await response.json()) as {
        status?: ContactStatus;
        fieldErrors?: Record<string, string>;
      };
      const nextStatus = result.status ?? "delivery_error";
      setStatus(nextStatus);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      if (nextStatus === "success") {
        setForm(EMPTY_FORM);
        setCaptchaToken("");
        setResetSignal((value) => value + 1);
      } else if (nextStatus === "captcha_error") {
        setCaptchaToken("");
        setResetSignal((value) => value + 1);
      }
    } catch {
      setStatus("delivery_error");
    }
  }

  const inputCls =
    "w-full bg-white/[0.06] border border-white/[0.12] rounded-sm px-4 py-3 text-white font-body text-[0.9375rem] outline-none focus:border-gold transition-colors placeholder:text-white/30";

  const field = (
    id: keyof FormValues,
    label: string,
    type: "text" | "email" | "tel",
    placeholder: string,
    autoComplete: string,
  ) => (
    <div>
      <label
        className="mb-2 block text-xs font-semibold tracking-wider text-white/60 uppercase"
        htmlFor={`f-${id}`}
      >
        {label}
      </label>
      <input
        id={`f-${id}`}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${inputCls} ${fieldErrors[id] ? "border-red-400" : ""}`}
        value={form[id]}
        onChange={(event) => update(id, event.target.value)}
        aria-invalid={Boolean(fieldErrors[id])}
        aria-describedby={fieldErrors[id] ? `f-${id}-error` : undefined}
      />
      {fieldErrors[id] ? (
        <p id={`f-${id}-error`} className="mt-1 text-xs text-red-300">
          {fieldErrors[id]}
        </p>
      ) : null}
    </div>
  );

  return (
    <section id="contact" className="bg-navy py-24" aria-label="Contact us">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-20">
          <div>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-widest uppercase">
              <span className="bg-gold block h-5.5 w-0.75" />
              Get in Touch
            </div>
            <h2 className="font-display mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold text-white">
              Let&apos;s Start a <em className="text-gold not-italic">Conversation</em>
            </h2>
            <p className="max-w-140 text-lg leading-8 text-white/65">
              Whether you are exploring our services or facing an urgent financial
              challenge, our team is ready to help.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              <div className="flex gap-4">
                <span className="bg-gold/10 border-gold/20 flex h-10 w-10 items-center justify-center rounded-sm border">
                  📍
                </span>
                <div>
                  <div className="text-gold text-xs font-semibold uppercase">Main Office</div>
                  <div className="mt-1 text-white/80">Gulshan-e-Madina, Phase 1<br />Faisalabad, Pakistan</div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="bg-gold/10 border-gold/20 flex h-10 w-10 items-center justify-center rounded-sm border">📞</span>
                <div>
                  <div className="text-gold text-xs font-semibold uppercase">Telephone</div>
                  <a href="tel:+923225401701" className="mt-1 block text-white/80 hover:text-gold">+92 322 5401701</a>
                </div>
              </div>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="border-gold/30 text-gold hover:bg-gold/10 inline-flex w-fit rounded-sm border px-5 py-3 font-semibold"
              >
                Continue on WhatsApp ↗
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-gold/15 rounded-md border bg-white/4 p-6 sm:p-10"
            noValidate
          >
            <h3 className="font-display mb-7 text-xl font-bold text-white">
              Request a Consultation
            </h3>
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {field("firstName", "First Name", "text", "Jonathan", "given-name")}
              {field("lastName", "Last Name", "text", "Rawlins", "family-name")}
            </div>
            <div className="mb-5">
              {field("email", "Email Address", "email", "j.rawlins@company.com", "email")}
            </div>
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {field("company", "Company Name", "text", "Acme Corp", "organization")}
              {field("phone", "Phone Number", "tel", "+92 300 0000000", "tel")}
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold tracking-wider text-white/60 uppercase" htmlFor="f-service">
                Service Area
              </label>
              <select
                id="f-service"
                value={form.service}
                onChange={(event) => update("service", event.target.value)}
                className={`${inputCls} [&>option]:bg-navy cursor-pointer`}
              >
                <option value="">Select a service…</option>
                {SERVICES.map((service) => <option key={service}>{service}</option>)}
              </select>
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold tracking-wider text-white/60 uppercase" htmlFor="f-message">
                Tell Us About Your Needs
              </label>
              <textarea
                id="f-message"
                rows={5}
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                className={`${inputCls} min-h-32 resize-y ${fieldErrors.message ? "border-red-400" : ""}`}
                aria-invalid={Boolean(fieldErrors.message)}
              />
              {fieldErrors.message ? <p className="mt-1 text-xs text-red-300">{fieldErrors.message}</p> : null}
            </div>

            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="f-website">Website</label>
              <input
                id="f-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </div>

            {siteKey ? (
              <div className="mb-5 overflow-x-auto">
                <RecaptchaCheckbox
                  siteKey={siteKey}
                  onToken={onCaptchaToken}
                  resetSignal={resetSignal}
                />
                {fieldErrors.captchaToken ? (
                  <p className="mt-1 text-xs text-red-300">{fieldErrors.captchaToken}</p>
                ) : null}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting" || !siteKey}
              className="bg-gold text-navy hover:bg-gold-light disabled:bg-gold/40 inline-flex w-full cursor-pointer items-center justify-center rounded-sm border-0 py-3.5 text-sm font-semibold tracking-wider uppercase disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Submit Enquiry ›"}
            </button>

            <div
              className={`mt-4 rounded-sm px-4 py-3 text-center text-sm ${
                status === "success"
                  ? "border border-green-400/30 bg-green-400/10 text-green-200"
                  : status === "idle"
                    ? "text-white/35"
                    : "border border-gold/20 bg-white/5 text-white/75"
              }`}
              aria-live="polite"
            >
              {contactMessageForStatus(status) ||
                "Your information is used only to respond to this enquiry."}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
