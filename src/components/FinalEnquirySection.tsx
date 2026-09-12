import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { ENQUIRY_DATA, CONTACT_DETAILS } from '../data/weddingContent';
import { ScrollReveal } from './ScrollReveal';

interface FinalEnquirySectionProps {
  onOpenEnquiry: () => void;
}

export const FinalEnquirySection: React.FC<FinalEnquirySectionProps> = ({
  onOpenEnquiry,
}) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(ENQUIRY_DATA.whatsappPrefill);
    const waNumber = ENQUIRY_DATA.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <section
      id="enquiry"
      data-theme="dark"
      className="relative bg-[#0A0A0A] text-[#FAF8F5] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#1F1D1B]"
    >
      <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
        {/* Subtle Label */}
        <ScrollReveal delay={0} y={16} duration={0.8} amount={0.2}>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-6 bg-[#8C8479]/40" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-[#8C8479] font-light">
              COMMISSIONS &amp; RESERVATIONS
            </span>
            <span className="h-[1px] w-6 bg-[#8C8479]/40" />
          </div>
        </ScrollReveal>

        {/* Oversized Serif Headline with generous negative space */}
        <ScrollReveal delay={0.12} y={24} duration={0.85} amount={0.2}>
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-[#FAF8F5] uppercase tracking-[0.06em] leading-[1.08] max-w-4xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {ENQUIRY_DATA.headline}
          </h2>
        </ScrollReveal>

        {/* Sophisticated Body Line */}
        <ScrollReveal delay={0.22} y={20} duration={0.85} amount={0.2}>
          <p
            className="text-base sm:text-xl md:text-2xl font-serif italic text-[#B4ACA1] max-w-2xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {ENQUIRY_DATA.subtext}
          </p>
        </ScrollReveal>

        {/* Refined CTAs */}
        <ScrollReveal delay={0.32} y={20} duration={0.85} amount={0.2}>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              id="final-check-date-btn"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-10 py-4.5 bg-[#FAF8F5] text-[#0A0A0A] text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#E6E1D8] transition-all duration-300 inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{ENQUIRY_DATA.primaryCTA}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <button
              id="final-whatsapp-btn"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto px-8 py-4.5 border border-[#2B2824] bg-black/40 text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-light hover:border-[#8C8479] hover:bg-white/5 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#B4ACA1]" />
              <span>{ENQUIRY_DATA.secondaryCTA}</span>
            </button>
          </div>

          {/* Direct Atelier Calling & Email Strips */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-wider text-[#B4ACA1]">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#736B63] w-full block sm:inline sm:w-auto">
              SPEAK DIRECTLY:
            </span>
            <a
              href={CONTACT_DETAILS.phone1.tel}
              className="hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1.5 font-mono"
            >
              <Phone className="w-3 h-3 text-[#8C8479]" />
              <span>{CONTACT_DETAILS.phone1.display}</span>
            </a>
            <span className="text-[#3A352F] hidden sm:inline">|</span>
            <a
              href={CONTACT_DETAILS.phone2.tel}
              className="hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1.5 font-mono"
            >
              <Phone className="w-3 h-3 text-[#8C8479]" />
              <span>{CONTACT_DETAILS.phone2.display}</span>
            </a>
            <span className="text-[#3A352F] hidden sm:inline">|</span>
            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1.5 font-mono"
            >
              <Mail className="w-3 h-3 text-[#8C8479]" />
              <span>{CONTACT_DETAILS.email}</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Studio Note */}
        <ScrollReveal delay={0.42} y={16} duration={0.8} amount={0.2}>
          <div className="pt-10 text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#736B63] space-y-1">
            <p>THRISSUR &amp; KOCHI STUDIOS · SERVING KERALA &amp; DESTINATIONS WORLDWIDE</p>
            <p className="opacity-80">CURRENTLY RESERVING CALENDARS FOR 2025 &amp; 2026</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
