import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Phone, ChevronDown, Mail } from 'lucide-react';
import { OscarLogo } from './OscarLogo';
import { CONTACT_DETAILS } from '../data/weddingContent';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: 'Kochi, Kerala',
    services: 'Both Photography & Cinema',
    guestCount: '100 - 300 Guests',
    notes: '',
  });

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello Oscar Wedding Company, we would like to enquire about our wedding.\n\nNames: ${formData.names || 'Not specified'}\nDate: ${formData.weddingDate || 'TBD'}\nLocation: ${formData.location}\nServices: ${formData.services}\nGuests: ${formData.guestCount}\nNotes: ${formData.notes || 'Looking forward to hearing from you'}`
    );
    const waNumber = CONTACT_DETAILS.phone1.raw.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  const labelClass = 'mb-1 block text-[9px] uppercase tracking-[0.2em] text-[#81786D]';
  const inputClass = 'min-h-[40px] w-full rounded-[4px] border border-[#DAD4CB] bg-white/75 px-3 py-2 text-base text-[#29251F] placeholder-[#AAA39A] transition-colors focus:border-[#89765F] focus:outline-none sm:text-sm';
  const selectClass = `${inputClass} appearance-none cursor-pointer pr-9`;

  return (
    <AnimatePresence>
      <div
        id="enquiry-modal-overlay"
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Centering wrapper ensuring full scrollability on small/short mobile viewports */}
        <div className="min-h-full flex items-center justify-center p-3 xs:p-4 sm:p-6 py-6 sm:py-12">
          <motion.div
            id="enquiry-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate my-auto w-full max-w-[610px] overflow-hidden border border-[#DED8CF] bg-[#F8F6F1] px-5 py-6 text-[#29251F] shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-9 sm:py-8 md:px-12 md:py-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -left-5 top-2 h-40 w-28 overflow-hidden rounded-br-[90px] opacity-90 sm:h-48 sm:w-32">
                <img src="/images/aleena&Nithin/HD (12) (1).jpg" alt="" className="h-full w-full object-cover object-center" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F8F6F1]/50 to-[#F8F6F1]" />
              </div>
              <div className="absolute -bottom-10 -right-7 h-40 w-32 overflow-hidden rounded-tl-[100px] opacity-90 sm:h-48 sm:w-36">
                <img src="/images/Lizbeth&jibin/08 insta_.jpg" alt="" className="h-full w-full object-cover object-center" />
                <span className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F8F6F1]/45 to-[#F8F6F1]" />
              </div>
            </div>

            <button
              id="close-enquiry-modal-btn"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#DED8CF] bg-[#F8F6F1]/90 text-[#81786D] transition-colors hover:border-[#9A8A76] hover:text-[#29251F] focus:outline-none sm:right-4 sm:top-4"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {submitted ? (
              <div className="relative z-10 space-y-5 py-6 text-center sm:space-y-6 sm:py-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#9A8A76]/50 bg-white/70 text-[#665744]">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#81786D]">
                    RESERVATION REQUEST RECEIVED
                  </span>
                  <h3
                    className="text-2xl font-light leading-snug text-[#29251F] sm:text-3xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Thank you, {formData.names.split('&')[0] || 'Dear Couple'}.
                  </h3>
                  <p className="mx-auto max-w-md text-xs leading-relaxed text-[#746D64] sm:text-sm">
                    We accept only a limited number of commissions each season to ensure every celebration receives our undivided devotion. Our atelier will review your date and respond within 24 hours.
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                  <button
                    id="whatsapp-confirm-btn"
                    onClick={handleWhatsAppForward}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 bg-[#29251F] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#F8F6F1] transition-colors hover:bg-[#51483E] sm:w-auto"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </button>
                  <button
                    id="close-success-btn"
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="min-h-[46px] w-full border border-[#DAD4CB] px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-[#746D64] transition-colors hover:border-[#9A8A76] hover:text-[#29251F] sm:w-auto"
                  >
                    Return to Site
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-5 xs:mb-6 sm:mb-8 space-y-1.5 sm:space-y-2 pr-6 sm:pr-0">
                  <div className="flex justify-center mb-1">
                    <OscarLogo theme="light" variant="compact" />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#81786D]">
                    DATE AVAILABILITY &amp; COMMISSIONS
                  </p>
                  <h2
                    className="text-2xl font-light leading-snug text-[#29251F] sm:text-3xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Check Your Wedding Date
                  </h2>
                  <p className="mx-auto max-w-md text-[11px] leading-relaxed text-[#746D64] sm:text-xs">
                    Tell us about your celebration. We photograph across Kerala, South India, and select destination celebrations worldwide.
                  </p>
                </div>

                {/* Form with 16px text-base on mobile to prevent iOS Safari viewport auto-zoom */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  <div>
                      <label
                        htmlFor="enquiry-names"
                        className={labelClass}
                      >
                        Your Names
                      </label>
                      <input
                        id="enquiry-names"
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.names}
                        onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                        className={inputClass}
                      />
                  </div>
                  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-date"
                        className={labelClass}
                      >
                        Wedding Date / Month
                      </label>
                      <input
                        id="enquiry-date"
                        type="date"
                        required
                        value={formData.weddingDate}
                        onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        className={`${inputClass} cursor-pointer [color-scheme:light]`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className={labelClass}
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                      <label
                        htmlFor="enquiry-email"
                        className={labelClass}
                      >
                        Email Address
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-location"
                        className={labelClass}
                      >
                        Celebration Location
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className={selectClass}
                        >
                          <option value="Kochi, Kerala">Kochi, Kerala</option>
                          <option value="Alleppey / Backwaters, Kerala">Alleppey / Backwaters, Kerala</option>
                          <option value="Thrissur, Kerala">Thrissur, Kerala</option>
                          <option value="Trivandrum / Kovalam, Kerala">Trivandrum / Kovalam, Kerala</option>
                          <option value="Kumarakom, Kerala">Kumarakom, Kerala</option>
                          <option value="Calicut / Malabar, Kerala">Calicut / Malabar, Kerala</option>
                          <option value="Goa">Goa</option>
                          <option value="Rajasthan (Jaipur / Udaipur)">Rajasthan (Jaipur / Udaipur)</option>
                          <option value="Chennai / Bangalore / Mumbai">Chennai / Bangalore / Mumbai</option>
                          <option value="International Destination">International Destination</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#81786D]" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-service"
                        className={labelClass}
                      >
                        Service Required
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-service"
                          value={formData.services}
                          onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                          className={selectClass}
                        >
                          <option value="Both Photography & Cinema">Both Photography &amp; Cinema</option>
                          <option value="Editorial Photography Only">Editorial Photography Only</option>
                          <option value="Cinematic Wedding Film Only">Cinematic Wedding Film Only</option>
                          <option value="Multi-Day Heritage Commission">Multi-Day Heritage Commission</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#81786D]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-notes"
                      className={labelClass}
                    >
                      About Your Celebration &amp; Feeling
                    </label>
                    <textarea
                      id="enquiry-notes"
                      rows={2}
                      placeholder="Share a few lines about the venue, traditions, atmosphere, and what matters most to you..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {/* Mobile-Friendly CTAs */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <button
                      id="submit-enquiry-btn"
                      type="submit"
                      className="flex min-h-[44px] w-full items-center justify-center bg-[#29251F] px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#F8F6F1] transition-colors hover:bg-[#51483E] active:scale-[0.99] sm:flex-1 sm:text-[11px]"
                    >
                      REQUEST DATE AVAILABILITY →
                    </button>
                    <button
                      id="direct-whatsapp-btn"
                      type="button"
                      onClick={handleWhatsAppForward}
                      className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#CFC7BC] px-5 py-3.5 text-[10px] uppercase tracking-[0.18em] text-[#51483E] transition-colors hover:border-[#8B7A65] hover:bg-white/60 active:scale-[0.99] sm:w-auto sm:text-[11px]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#81786D]" />
                      <span>CHAT ON WHATSAPP</span>
                    </button>
                  </div>

                  {/* Direct Contact Atelier Info */}
                  <div className="border-t border-[#E1DBD2] pt-3 text-center text-[8px] tracking-[0.16em] text-[#81786D]">
                    <span>DIRECT INQUIRIES: </span>
                    <a href={CONTACT_DETAILS.phone1.tel} className="font-mono text-[#51483E] hover:text-[#171615]">
                      {CONTACT_DETAILS.phone1.display}
                    </a>
                    <span className="mx-1.5 text-[#B9B1A6]">·</span>
                    <a href={CONTACT_DETAILS.phone2.tel} className="font-mono text-[#51483E] hover:text-[#171615]">
                      {CONTACT_DETAILS.phone2.display}
                    </a>
                    <div className="pt-1">
                      <a href={`mailto:${CONTACT_DETAILS.email}`} className="font-mono text-[#51483E] transition-colors hover:text-[#171615]">
                        {CONTACT_DETAILS.email}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
