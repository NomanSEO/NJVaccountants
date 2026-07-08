// src/components/Footer.tsx
import BrandLogo from './BrandLogo'

const SERVICES_LINKS = ['Accounting & Bookkeeping','Taxation Services','Audit & Assurance','Business Advisory','M&A Due Diligence','Forensic Accounting','ESG Reporting']
const COMPANY_LINKS  = [['About Us','#about'],['Our Team','#team'],['Case Studies','#case-studies'],['Insights','#blog'],['Testimonials','#testimonials'],['Careers','#contact'],['Press & Media','#contact']]
const OFFICES        = ['Faisalabad']

export default function Footer() {
  return (
    <footer className="bg-navy-dark pt-16 pb-8" aria-label="Site footer">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 max-w-[260px]">
              <BrandLogo variant="full" />
            </div>
            <p className="text-[0.875rem] text-white/45 leading-[1.65] max-w-[260px]">
              Independent accounting, tax, and advisory. Partnering with ambitious businesses since 1998.
            </p>
            <div className="flex gap-3 mt-6">
              {[['in','LinkedIn'],['𝕏','Twitter'],['f','Facebook'],['▶','YouTube']].map(([icon, label]) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 bg-white/[0.06] border border-white/10 rounded-sm flex items-center justify-center text-[0.875rem] text-white/50 no-underline hover:border-gold hover:text-gold transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-display text-[0.875rem] font-bold text-white mb-5 uppercase tracking-[0.06em]">Services</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {SERVICES_LINKS.map(s => (
                <li key={s}><a href="#services" className="text-white/45 no-underline text-[0.875rem] hover:text-gold transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-display text-[0.875rem] font-bold text-white mb-5 uppercase tracking-[0.06em]">Company</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={label}><a href={href} className="text-white/45 no-underline text-[0.875rem] hover:text-gold transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Offices + Accreditations */}
          <div>
            <div className="font-display text-[0.875rem] font-bold text-white mb-5 uppercase tracking-[0.06em]">Offices</div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {OFFICES.map(o => (
                <li key={o}><a href="#contact" className="text-white/45 no-underline text-[0.875rem] hover:text-gold transition-colors">{o}</a></li>
              ))}
            </ul>
            <div className="mt-7">
              <div className="font-display text-[0.875rem] font-bold text-white mb-3 uppercase tracking-[0.06em]">Accreditations</div>
              <div className="flex flex-col gap-1.5">
                {['🏆 AICPA Member Firm','✓ PCAOB Registered','⭐ ISO 27001 Certified'].map(a => (
                  <span key={a} className="text-[0.8rem] text-white/40">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-7 flex flex-col md:flex-row justify-between items-center gap-3 flex-wrap">
          <div className="text-[0.8125rem] text-white/30">© 2025 NJV Accountants. All rights reserved.</div>
          <div className="flex gap-6">
            {['Privacy Policy','Terms of Service','Cookie Policy','Accessibility'].map(l => (
              <a key={l} href="#" className="text-[0.8125rem] text-white/30 no-underline hover:text-gold transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
