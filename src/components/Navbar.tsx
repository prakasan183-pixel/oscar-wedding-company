import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail } from 'lucide-react';
import { OscarLogo } from './OscarLogo';
import { CONTACT_DETAILS } from '../data/weddingContent';
import mobileLogo from '../logo/oscarlogo4mobile.png';
import desktopLogo from '../logo/oscarlogo4desktop.png';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'The Philosophy', href: '#philosophy' },
    { label: 'Selected Stories', href: '#stories' },
    { label: 'Rooted in Kerala · Destinations', href: '#kerala' },
    { label: 'Weddings & Save The Date', href: '#specialization' },
    { label: 'Photography & Films', href: '#craft' },
    { label: 'The Experience', href: '#experience' },
  ];

  const desktopNavItems = [
    { label: 'Stories', href: '#stories' },
    { label: 'Approach', href: '#philosophy' },
    { label: 'Films', href: '#craft' },
    { label: 'About', href: '#experience' },
    { label: 'Journal', href: '#stories' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        data-theme={isScrolled ? 'light' : 'dark'}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md py-3 sm:py-4 border-b border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent py-3.5 sm:py-5'
        }`}
      >
       <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-[6%]">
  {/* Mobile Brand */}
  <a
    href="#"
    className="mt-1 !mr-2 !ml-[-19px] flex flex-shrink-0 items-center gap-2 focus:outline-none lg:hidden"
  >
    <img
      src={mobileLogo}
      alt="Oscar Wedding Company"
      className="w-[185px] max-w-[46vw] sm:w-[200px]"
      style={isScrolled ? { filter: 'brightness(0) opacity(0.62)' } : undefined}
    />
  </a>

          <nav className="hidden items-center gap-3 lg:flex xl:gap-5" aria-label="Main navigation">
            {desktopNavItems.slice(0, 3).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-cormorant text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors xl:text-[11px] xl:tracking-[0.2em] ${
                  isScrolled ? 'text-[#1C1916] hover:text-black' : 'text-white hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#" aria-label="Oscar Wedding Company home" className="absolute left-1/2 hidden -translate-x-1/2 lg:mt-2 lg:block">
            <img
              src={desktopLogo}
              alt=""
              className="w-[240px] xl:w-[270px]"
              style={isScrolled ? { filter: 'brightness(0) opacity(0.62)' } : undefined}
            />
          </a>

          <div className="flex flex-shrink-0 items-center gap-3 sm:gap-5">
            <nav className="hidden items-center gap-3 xl:gap-5 lg:flex" aria-label="More navigation">
              {desktopNavItems.slice(3).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-cormorant text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors xl:text-[11px] xl:tracking-[0.2em] ${
                    isScrolled ? 'text-[#1C1916] hover:text-black' : 'text-white hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              id="nav-check-date-btn"
              onClick={onOpenEnquiry}
              className="border border-black/15 bg-white px-3 py-2 text-[8px] font-medium uppercase tracking-[0.23em] text-[#0A0A0A] transition-all duration-300 hover:border-black/30 hover:bg-white hover:text-[#0A0A0A] sm:px-5 sm:py-2.5 sm:text-[9px]"
            >
              Enquire <span aria-hidden="true"></span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`group relative flex items-center justify-center min-w-[44px] min-h-[44px] p-1.5 rounded-full active:scale-95 transition-all duration-200 focus:outline-none ${
                isScrolled ? 'hover:bg-black/[0.06]' : 'hover:bg-white/[0.08]'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              title={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            >
              <span
                className={`hidden lg:inline-block text-[9px] uppercase tracking-[0.26em] transition-colors select-none mr-2 ${
                  isScrolled
                    ? 'text-[#0A0A0A] group-hover:text-black font-normal'
                    : 'text-[#B4ACA1] group-hover:text-[#FAF8F5] font-light'
                }`}
              >
                {mobileMenuOpen ? 'CLOSE' : 'INDEX'}
              </span>

              {/* 3 morphing lines */}
              <div className="relative w-5 h-4 xs:w-6 xs:h-5 flex flex-col justify-between items-end py-[2px] cursor-pointer">
                {/* Line 1 (Top) */}
                <span
                  className={`h-[1.25px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    isScrolled ? 'bg-[#0A0A0A]' : 'bg-[#FAF8F5]'
                  } ${
                    mobileMenuOpen
                      ? 'w-5 translate-y-[6px] xs:translate-y-[6.75px] rotate-45'
                      : 'w-5 translate-y-0 rotate-0 group-hover:w-5.5'
                  }`}
                />
                {/* Line 2 (Middle) */}
                <span
                  className={`h-[1.25px] rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isScrolled ? 'bg-[#0A0A0A]' : 'bg-[#FAF8F5]'
                  } ${
                    mobileMenuOpen
                      ? 'w-0 opacity-0 -translate-x-2'
                      : 'w-3.5 opacity-100 group-hover:w-5'
                  }`}
                />
                {/* Line 3 (Bottom) */}
                <span
                  className={`h-[1.25px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    isScrolled ? 'bg-[#0A0A0A]' : 'bg-[#FAF8F5]'
                  } ${
                    mobileMenuOpen
                      ? 'w-5 -translate-y-[6px] xs:-translate-y-[6.75px] -rotate-45'
                      : 'w-5 translate-y-0 rotate-0 group-hover:w-5.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Navigation Overlay with Mobile-Optimized Editorial Spacing */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-4 xs:p-6 sm:p-10 md:p-14 overflow-y-auto overscroll-contain min-h-[100dvh]"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-[#211F1D] pb-3.5 sm:pb-6 flex-shrink-0">
              <OscarLogo variant="compact" theme="dark" />
              
              {/* Synchronized Close Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-center min-w-[44px] min-h-[44px] p-1.5 rounded-full hover:bg-white/[0.08] active:scale-95 transition-all duration-200 focus:outline-none"
                aria-label="Close menu"
              >
                <span className="text-[9px] xs:text-[10px] uppercase tracking-[0.24em] text-[#B4ACA1] group-hover:text-[#FAF8F5] transition-colors font-light select-none mr-2">
                  CLOSE
                </span>
                <div className="relative w-5 h-4 xs:w-6 xs:h-5 flex flex-col justify-center items-center">
                  <span className="h-[1.25px] w-5 bg-[#FAF8F5] rounded-full rotate-45 translate-y-0 transition-transform duration-300" />
                  <span className="h-[1.25px] w-5 bg-[#FAF8F5] rounded-full -rotate-45 -translate-y-[1.25px] transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Menu Links with Staggered Entrance & Mobile Responsive Typographic Scaling */}
            <div className="py-4 sm:py-8 md:py-10 my-auto space-y-3 sm:space-y-5 max-w-3xl flex-grow flex flex-col justify-center">
              <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.32em] text-[#8C8479]">
                EDITORIAL DIRECTORY
              </p>
              <div className="space-y-2.5 xs:space-y-3.5 sm:space-y-5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * index }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group inline-flex items-baseline gap-3 xs:gap-4 font-serif text-2xl xs:text-[28px] sm:text-4xl md:text-5xl text-[#FAF8F5] hover:text-[#EAE6DF] transition-colors font-light tracking-tight leading-tight"
                    >
                      <span className="text-[9px] xs:text-[10px] font-sans tracking-[0.22em] text-[#8C8479] group-hover:text-[#B4ACA1] transition-colors">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  <a
                    href="#enquiry"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenEnquiry();
                    }}
                    className="group inline-flex items-baseline gap-3 xs:gap-4 font-serif text-2xl xs:text-[28px] sm:text-4xl md:text-5xl text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors font-light tracking-tight leading-tight"
                  >
                    <span className="text-[9px] xs:text-[10px] font-sans tracking-[0.22em] text-[#8C8479]">
                      06
                    </span>
                    <span>Commission &amp; Date</span>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Bottom Actions & Studio Heritage */}
            <div className="space-y-3 sm:space-y-4 pt-3.5 sm:pt-6 border-t border-[#211F1D] flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  id="mobile-drawer-check-date-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="flex-1 py-3 xs:py-3.5 sm:py-4 bg-[#FAF8F5] text-[#0A0A0A] text-[10.5px] xs:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium hover:bg-[#EAE6DF] transition-colors text-center"
                >
                  CHECK YOUR DATE &rarr;
                </button>

                <a
                  href={`${CONTACT_DETAILS.phone1.whatsapp}?text=Hello%20Oscar%20Wedding%20Company%2C%20we%20would%20love%20to%20enquire%20about%20our%20wedding%20date.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 xs:py-3.5 sm:py-4 border border-[#2B2824] hover:border-[#8C8479] text-[#FAF8F5] text-[10.5px] xs:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#A7D7B5]" />
                  <span>WHATSAPP CONCIERGE</span>
                </a>
              </div>

              {/* Direct Call & Email Options in Mobile Drawer */}
              <div className="pt-2 border-t border-[#1C1A18] flex flex-col gap-1.5 text-center text-[10px] tracking-wider text-[#B4ACA1]">
                <div className="flex items-center justify-center gap-3">
                  <a href={CONTACT_DETAILS.phone1.tel} className="hover:text-white transition-colors font-mono">
                    {CONTACT_DETAILS.phone1.display}
                  </a>
                  <span className="text-[#3A352F]">·</span>
                  <a href={CONTACT_DETAILS.phone2.tel} className="hover:text-white transition-colors font-mono">
                    {CONTACT_DETAILS.phone2.display}
                  </a>
                </div>
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-white transition-colors font-mono text-[9.5px]">
                  {CONTACT_DETAILS.email}
                </a>
              </div>

              <div className="text-center pt-1 sm:pt-2 flex items-center justify-between text-[8.5px] xs:text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#8C8479]">
                <span>KOCHI &middot; TRIVANDRUM &middot; WORLDWIDE</span>
                <span className="hidden sm:inline">EST. 2019 &middot; OSCAR WEDDING COMPANY</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
