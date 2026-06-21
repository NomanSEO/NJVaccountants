// src/components/Contact.tsx
'use client'
import { useState } from 'react'

const SERVICES = [
  'Accounting & Bookkeeping',
  'Taxation Services',
  'Audit & Assurance',
  'Business Advisory',
  'M&A Due Diligence',
  'Forensic Accounting',
  'Multiple Services',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit() {
    if (!firstName.trim() || !email.trim()) {
      alert('Please fill in at least your name and email address.')
      return
    }
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-white/[0.06] border border-white/[0.12] rounded-sm px-4 py-3 text-white font-body text-[0.9375rem] outline-none focus:border-gold transition-colors placeholder:text-white/30'

  return (
    <section id="contact" className="py-24 bg-navy" aria-label="Contact us">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Get in Touch
            </div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-white leading-tight mb-5">
              Let&apos;s Start a <em className="not-italic text-gold">Conversation</em>
            </h2>
            <p className="text-[1.0625rem] text-white/65 leading-[1.7] max-w-[560px]">
              Whether you&apos;re exploring our services or facing an urgent financial challenge, our team is ready to help. First consultation is always complimentary.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              {[
                { icon: '📍', label: 'Main Office', value: '1200 Financial District Blvd, Suite 4400\nNew York, NY 10004' },
                { icon: '📞', label: 'Telephone', value: '+1 (800) 746-6225\nMon – Fri, 8am – 6pm EST' },
                { icon: '✉️', label: 'Email', value: 'hello@pinnacleadvisory.com\nReplies within 4 business hours' },
                { icon: '🏢', label: 'Other Offices', value: 'London · Chicago · Toronto · Dubai' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center shrink-0 text-base">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[0.75rem] tracking-[0.08em] uppercase text-gold font-semibold mb-1">{item.label}</div>
                    <div className="text-[0.9375rem] text-white/80 whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/[0.04] border border-gold/[0.15] rounded-md p-10">
            <h3 className="font-display text-[1.25rem] font-bold text-white mb-7">Request a Consultation</h3>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-first">First Name</label>
                <input id="f-first" type="text" placeholder="Jonathan" autoComplete="given-name" className={inputCls} value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-last">Last Name</label>
                <input id="f-last" type="text" placeholder="Rawlins" autoComplete="family-name" className={inputCls} />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-email">Email Address</label>
              <input id="f-email" type="email" placeholder="j.rawlins@company.com" autoComplete="email" className={inputCls} value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-company">Company Name</label>
                <input id="f-company" type="text" placeholder="Acme Corp" autoComplete="organization" className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-phone">Phone Number</label>
                <input id="f-phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" className={inputCls} />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-service">Service Area</label>
              <select id="f-service" className={`${inputCls} appearance-none cursor-pointer [&>option]:bg-navy`}>
                <option value="">Select a service…</option>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2" htmlFor="f-message">Tell Us About Your Needs</label>
              <textarea id="f-message" rows={4} placeholder="Briefly describe your situation…" className={`${inputCls} resize-y min-h-[120px]`} />
            </div>

            {submitted ? (
              <div className="w-full py-3.5 bg-navy text-gold text-center text-sm font-semibold rounded-sm border border-gold/30">
                ✓ Enquiry Received — We&apos;ll be in touch within 4 hours
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase cursor-pointer border-0 hover:bg-gold-light transition-colors"
              >
                Submit Enquiry ›
              </button>
            )}
            <p className="text-[0.75rem] text-white/35 mt-4 text-center">
              Your information is handled in accordance with our Privacy Policy. We never share or sell client data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
