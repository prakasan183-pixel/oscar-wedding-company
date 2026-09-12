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
      `Hello Oscar Weddings, we would like to enquire about our wedding.\n\nNames: ${formData.names || 'Not specified'}\nDate: ${formData.weddingDate || 'TBD'}\nLocation: ${formData.location}\nServices: ${formData.services}\nGuests: ${formData.guestCount}\nNotes: ${formData.notes || 'Looking forward to hearing from you'}`
    );
    const waNumber = CONTACT_DETAILS.phone1.raw.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        id="enquiry-modal-overlay"
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md"
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
            className="relative w-full max-w-2xl bg-[#0F0E0D] border border-[#2B2824] rounded-xl sm:rounded-2xl p-4 xs:p-6 sm:p-8 md:p-10 shadow-2xl text-[#FAF8F5] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button with Mobile-Optimized 44px Safe Touch Area */}
            <button
              id="close-enquiry-modal-btn"
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors focus:outline-none z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {submitted ? (
              <div className="py-6 sm:py-10 text-center space-y-5 sm:space-y-6">
                <div className="w-12 h-12 mx-auto rounded-full border border-[#8C8479]/50 flex items-center justify-center text-[#E6E1D8] bg-[#181614]">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] xs:text-[10px] tracking-[0.3em] uppercase text-[#8C8479]">
                    RESERVATION REQUEST RECEIVED
                  </span>
                  <h3
                    className="text-2xl xs:text-3xl sm:text-4xl font-serif text-[#FAF8F5] font-light leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Thank you, {formData.names.split('&')[0] || 'Dear Couple'}.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B4ACA1] max-w-md mx-auto leading-relaxed">
                    We accept only a limited number of commissions each season to ensure every celebration receives our undivided devotion. Our atelier will review your date and respond within 24 hours.
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                  <button
                    id="whatsapp-confirm-btn"
                    onClick={handleWhatsAppForward}
                    className="w-full sm:w-auto px-6 py-3.5 min-h-[46px] bg-[#FAF8F5] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#E6E1D8] transition-colors inline-flex items-center justify-center gap-2"
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
                    className="w-full sm:w-auto px-6 py-3.5 min-h-[46px] border border-[#2B2824] text-[#B4ACA1] hover:text-[#FAF8F5] text-xs uppercase tracking-[0.2em] transition-colors"
                  >
                    Return to Site
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="text-center mb-5 xs:mb-6 sm:mb-8 space-y-1.5 sm:space-y-2 pr-6 sm:pr-0">
                  <div className="flex justify-center mb-1">
                    <OscarLogo theme="dark" variant="compact" />
                  </div>
                  <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.3em] text-[#8C8479]">
                    DATE AVAILABILITY &amp; COMMISSIONS
                  </p>
                  <h2
                    className="text-xl xs:text-2xl sm:text-3xl font-serif text-[#FAF8F5] font-light leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Check Your Wedding Date
                  </h2>
                  <p className="text-[11px] xs:text-xs text-[#B4ACA1] max-w-md mx-auto leading-relaxed">
                    Tell us about your celebration. We photograph across Kerala, South India, and select destination celebrations worldwide.
                  </p>
                </div>

                {/* Form with 16px text-base on mobile to prevent iOS Safari viewport auto-zoom */}
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-names"
                        className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                      >
                        Your Names
                      </label>
                      <input
                        id="enquiry-names"
                        type="text"
                        required
                        placeholder="e.g. Anjali &amp; Arjun"
                        value={formData.names}
                        onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                        className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm text-[#FAF8F5] placeholder-[#544E47] focus:border-[#8C8479] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-date"
                        className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                      >
                        Wedding Date / Month
                      </label>
                      <input
                        id="enquiry-date"
                        type="date"
                        required
                        value={formData.weddingDate}
                        onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm text-[#FAF8F5] focus:border-[#8C8479] focus:outline-none transition-colors [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        placeholder="+91 88484 25896"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm text-[#FAF8F5] placeholder-[#544E47] focus:border-[#8C8479] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm text-[#FAF8F5] placeholder-[#544E47] focus:border-[#8C8479] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-location"
                        className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                      >
                        Celebration Location
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 pr-9 min-h-[44px] text-base sm:text-sm text-[#FAF8F5] focus:border-[#8C8479] focus:outline-none transition-colors appearance-none cursor-pointer"
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
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8479] pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-service"
                        className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                      >
                        Service Required
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-service"
                          value={formData.services}
                          onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                          className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 pr-9 min-h-[44px] text-base sm:text-sm text-[#FAF8F5] focus:border-[#8C8479] focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="Both Photography & Cinema">Both Photography &amp; Cinema</option>
                          <option value="Editorial Photography Only">Editorial Photography Only</option>
                          <option value="Cinematic Wedding Film Only">Cinematic Wedding Film Only</option>
                          <option value="Multi-Day Heritage Commission">Multi-Day Heritage Commission</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8479] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-notes"
                      className="block text-[9.5px] xs:text-[10px] uppercase tracking-[0.2em] text-[#8C8479] mb-1"
                    >
                      About Your Celebration &amp; Feeling
                    </label>
                    <textarea
                      id="enquiry-notes"
                      rows={2}
                      placeholder="Share a few lines about the venue, traditions, atmosphere, and what matters most to you..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#171615] border border-[#2B2824] rounded-md px-3.5 py-2.5 text-base sm:text-sm text-[#FAF8F5] placeholder-[#544E47] focus:border-[#8C8479] focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Mobile-Friendly CTAs */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <button
                      id="submit-enquiry-btn"
                      type="submit"
                      className="w-full sm:flex-1 py-3.5 px-5 min-h-[46px] bg-[#FAF8F5] text-[#0A0A0A] text-[11px] xs:text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#E6E1D8] active:scale-[0.99] transition-all text-center flex items-center justify-center"
                    >
                      REQUEST DATE AVAILABILITY →
                    </button>
                    <button
                      id="direct-whatsapp-btn"
                      type="button"
                      onClick={handleWhatsAppForward}
                      className="w-full sm:w-auto py-3.5 px-5 min-h-[46px] border border-[#2B2824] hover:border-[#8C8479] hover:bg-white/5 active:scale-[0.99] text-[#FAF8F5] text-[11px] xs:text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B4ACA1]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  {/* Direct Contact Atelier Info */}
                  <div className="pt-2 text-center text-[9.5px] tracking-wider text-[#8C8479]">
                    <span>DIRECT INQUIRIES: </span>
                    <a href={CONTACT_DETAILS.phone1.tel} className="hover:text-white font-mono text-[#FAF8F5]">
                      {CONTACT_DETAILS.phone1.display}
                    </a>
                    <span className="mx-1.5 text-[#3A352F]">·</span>
                    <a href={CONTACT_DETAILS.phone2.tel} className="hover:text-white font-mono text-[#FAF8F5]">
                      {CONTACT_DETAILS.phone2.display}
                    </a>
                    <div className="pt-1">
                      <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-[#C5A880] transition-colors font-mono text-[#FAF8F5]">
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
