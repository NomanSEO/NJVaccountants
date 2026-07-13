// src/components/Contact.tsx
"use client";
import { useState } from "react";

const SERVICES = [
  "Accounting & Bookkeeping",
  "Taxation Services",
  "Audit & Assurance",
  "Business Advisory",
  "M&A Due Diligence",
  "Forensic Accounting",
  "Multiple Services",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (!firstName.trim() || !email.trim()) {
      alert("Please fill in at least your name and email address.");
      return;
    }
    setSubmitted(true);
  }

  const inputCls =
    "w-full bg-white/[0.06] border border-white/[0.12] rounded-sm px-4 py-3 text-white font-body text-[0.9375rem] outline-none focus:border-gold transition-colors placeholder:text-white/30";

  return (
    <section id="contact" className="bg-navy py-24" aria-label="Contact us">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Get in Touch
            </div>
            <h2 className="font-display mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold text-white">
              Let&apos;s Start a{" "}
              <em className="text-gold not-italic">Conversation</em>
            </h2>
            <p className="max-w-140 text-[1.0625rem] leading-[1.7] text-white/65">
              Whether you&apos;re exploring our services or facing an urgent
              financial challenge, our team is ready to help. First consultation
              is always complimentary.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              {[
                {
                  icon: "📍",
                  label: "Main Office",
                  value: "Gulshan-e-Madina,Phase1\nFaisalabad,Pakistan",
                },
                {
                  icon: "📞",
                  label: "Telephone",
                  value: "+92-322-5401701\nMon – Fri, 9am – 6pm ",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "Nomanj.ajs@gmail.com\nReplies within 1 business hour",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="bg-gold/10 border-gold/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border text-base">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-gold mb-1 text-[0.75rem] font-semibold tracking-[0.08em] uppercase">
                      {item.label}
                    </div>
                    <div className="text-[0.9375rem] whitespace-pre-line text-white/80">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="border-gold/15 rounded-md border bg-white/4 p-10">
            <h3 className="font-display mb-7 text-[1.25rem] font-bold text-white">
              Request a Consultation
            </h3>
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div>
                <label
                  className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                  htmlFor="f-first"
                >
                  First Name
                </label>
                <input
                  id="f-first"
                  type="text"
                  placeholder="Jonathan"
                  autoComplete="given-name"
                  className={inputCls}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                  htmlFor="f-last"
                >
                  Last Name
                </label>
                <input
                  id="f-last"
                  type="text"
                  placeholder="Rawlins"
                  autoComplete="family-name"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                htmlFor="f-email"
              >
                Email Address
              </label>
              <input
                id="f-email"
                type="email"
                placeholder="j.rawlins@company.com"
                autoComplete="email"
                className={inputCls}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div>
                <label
                  className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                  htmlFor="f-company"
                >
                  Company Name
                </label>
                <input
                  id="f-company"
                  type="text"
                  placeholder="Acme Corp"
                  autoComplete="organization"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                  htmlFor="f-phone"
                >
                  Phone Number
                </label>
                <input
                  id="f-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                htmlFor="f-service"
              >
                Service Area
              </label>
              <select
                id="f-service"
                className={`${inputCls} [&>option]:bg-navy cursor-pointer appearance-none`}
              >
                <option value="">Select a service…</option>
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                className="mb-2 block text-[0.75rem] font-semibold tracking-[0.08em] text-white/60 uppercase"
                htmlFor="f-message"
              >
                Tell Us About Your Needs
              </label>
              <textarea
                id="f-message"
                rows={4}
                placeholder="Briefly describe your situation…"
                className={`${inputCls} min-h-30 resize-y`}
              />
            </div>

            {submitted ? (
              <div className="bg-navy text-gold border-gold/30 w-full rounded-sm border py-3.5 text-center text-sm font-semibold">
                ✓ Enquiry Received — We&apos;ll be in touch within 4 hours
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gold text-navy hover:bg-gold-light inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border-0 py-3.5 text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                Submit Enquiry ›
              </button>
            )}
            <p className="mt-4 text-center text-[0.75rem] text-white/35">
              Your information is handled in accordance with our Privacy Policy.
              We never share or sell client data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
