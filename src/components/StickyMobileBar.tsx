import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, X, ArrowUpRight, Mail } from 'lucide-react';
import { ENQUIRY_DATA, CONTACT_DETAILS } from '../data/weddingContent';

interface StickyMobileBarProps {
  onOpenEnquiry: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(ENQUIRY_DATA.whatsappPrefill);
    const waNumber = ENQUIRY_DATA.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  const handleCheckDate = () => {
    onOpenEnquiry();
    setIsOpen(false);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <aside aria-label="Luxury Concierge Quick Actions" className="md:hidden">
      {/* Subtle Dark Backdrop Veil when Concierge Menu is Active */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Side Concierge Widget */}
      <div
        ref={menuRef}
        className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end"
      >
        {/* Expanded Editorial Concierge Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 flex flex-col gap-2 w-[285px] max-w-[88vw]"
            >
              {/* Header Label - Restrained & Bespoke */}
              <div className="px-3.5 py-1 bg-[#161514] border border-[#2B2723] rounded-full self-end shadow-sm flex items-center">
                <span
                  className="text-[8.5px] tracking-[0.28em] uppercase text-[#B4ACA1] font-light"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  ATELIER CONCIERGE
                </span>
              </div>

              {/* Concierge Actions Container */}
              <div className="bg-[#121110]/98 backdrop-blur-xl border border-[#2B2723] rounded-2xl p-2.5 shadow-2xl space-y-2">
                {/* Action 1: Check Date Availability */}
                <button
                  id="mobile-sticky-check-date-btn"
                  onClick={handleCheckDate}
                  className="group w-full bg-[#181614] hover:bg-[#201E1B] border border-[#26231F] hover:border-[#3D3730] p-3 rounded-xl flex items-center justify-between text-left transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#201E1B] border border-[#2E2A24] flex items-center justify-center flex-shrink-0 group-hover:border-[#8C8479]/50 transition-colors">
                      <Calendar className="w-3.5 h-3.5 text-[#FAF8F5] stroke-[1.5]" />
                    </div>
                    <div>
                      <span
                        className="block font-serif text-[15px] font-normal tracking-wide text-[#FAF8F5] leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Check Availability
                      </span>
                      <span
                        className="block text-[8.5px] tracking-[0.16em] uppercase text-[#8C8479] font-light mt-0.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Private Studio Calendar
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8C8479] group-hover:text-[#FAF8F5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>

                {/* Action 2: Direct WhatsApp Consultation */}
                <button
                  id="mobile-sticky-whatsapp-btn"
                  onClick={handleWhatsApp}
                  className="group w-full bg-[#181614] hover:bg-[#201E1B] border border-[#26231F] hover:border-[#3D3730] p-3 rounded-xl flex items-center justify-between text-left transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#17201A] border border-[#223326] flex items-center justify-center flex-shrink-0 group-hover:border-[#4B7055]/60 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-[#A7D7B5] stroke-[1.5]" />
                    </div>
                    <div>
                      <span
                        className="block font-serif text-[15px] font-normal tracking-wide text-[#FAF8F5] leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Direct WhatsApp
                      </span>
                      <span
                        className="block text-[8.5px] tracking-[0.16em] uppercase text-[#8C8479] font-light mt-0.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Instant Atelier Dialogue
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8C8479] group-hover:text-[#FAF8F5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>

                {/* Action 3: Direct Phone Call Numbers */}
                <div className="pt-2 border-t border-[#26231F] flex flex-col gap-1 px-1.5 pb-0.5 text-center">
                  <div className="flex items-center justify-between text-[8.5px] uppercase tracking-wider text-[#8C8479]">
                    <span>DIRECT ATELIER CALL</span>
                  </div>
                  <div className="flex items-center justify-between gap-1 text-[10px] text-[#FAF8F5]">
                    <a
                      href={CONTACT_DETAILS.phone1.tel}
                      className="px-2 py-1 bg-[#181614] border border-[#26231F] rounded hover:border-[#8C8479] transition-colors font-mono flex-1 text-center"
                    >
                      {CONTACT_DETAILS.phone1.display}
                    </a>
                    <a
                      href={CONTACT_DETAILS.phone2.tel}
                      className="px-2 py-1 bg-[#181614] border border-[#26231F] rounded hover:border-[#8C8479] transition-colors font-mono flex-1 text-center"
                    >
                      {CONTACT_DETAILS.phone2.display}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiet Luxury Floating Button (Free of loud yellow tones or ping dots) */}
        <button
          id="mobile-floating-concierge-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-12 h-12 rounded-full bg-[#141312] hover:bg-[#1A1816] border border-[#3A352F] hover:border-[#8C8479] text-[#FAF8F5] shadow-[0_8px_24px_rgba(0,0,0,0.65)] flex items-center justify-center transition-all duration-200 active:scale-95 group focus:outline-none"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close concierge menu' : 'Open wedding concierge options'}
        >
          {/* Morphing Minimalist Icon */}
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <X className="w-4 h-4 text-[#FAF8F5] stroke-[1.5]" />
            ) : (
              <Calendar className="w-4 h-4 text-[#FAF8F5] stroke-[1.5] transition-transform duration-200 group-hover:scale-105" />
            )}
          </motion.div>
        </button>
      </div>
    </aside>
  );
};
