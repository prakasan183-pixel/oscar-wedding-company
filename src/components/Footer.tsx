import React, { useState } from 'react';
import { OscarLogo } from './OscarLogo';
import { FOOTER_LINKS, CONTACT_DETAILS } from '../data/weddingContent';
import { ArrowUpRight, Mail, Phone, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmed);
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus('error');
      setFeedbackMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(trimmed)) {
      setStatus('error');
      setFeedbackMessage('Please provide a valid email address (e.g. name@example.com).');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    // Simulate polite network delay for tactile feedback
    setTimeout(() => {
      setStatus('success');
      setFeedbackMessage('Thank you. You are subscribed to Oscar Weddings journal updates.');
      try {
        localStorage.setItem('oscar_journal_subscriber', trimmed);
      } catch {
        // Gracefully handle storage limitations
      }
    }, 450);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      id="footer"
      data-theme="dark"
      className="relative bg-[#070707] text-[#FAF8F5] border-t border-[#1C1A18] pt-14 pb-8 md:pt-20 md:pb-10 px-6 md:px-12 lg:px-20"
    >
      <ScrollReveal y={20} duration={0.8} amount={0.2}>
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          {/* Main Footer Grid: 3 Editorial Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Column 1: Brand Logo & Editorial Stature */}
            <div className="md:col-span-4 space-y-4 text-center md:text-left">
              <OscarLogo theme="dark" variant="full" />
              <p className="text-[10px] tracking-[0.24em] uppercase text-[#8C8479] leading-relaxed">
                LUXURY WEDDING PHOTOGRAPHY &amp; CINEMATIC FILMS
              </p>
              <p className="text-xs text-[#6E675E] font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                Capturing authentic royal, coastal, and heritage celebrations across Kerala, South India, and luxury destination weddings globally.
              </p>
            </div>

            {/* Column 2: Direct Contact Concierge */}
            <div className="md:col-span-4 space-y-4 text-center md:text-left border-y md:border-y-0 md:border-x border-[#1C1A18] py-8 md:py-0 md:px-8">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#8C8479] font-medium block">
                DIRECT INQUIRIES &amp; ATELIER
              </span>

              {/* Email */}
              <div className="space-y-1">
                <a
                  id="footer-email-link"
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="inline-flex items-center gap-2 text-xs tracking-wider text-[#FAF8F5] hover:text-[#C5A880] transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8C8479] flex-shrink-0" />
                  <span>{CONTACT_DETAILS.email}</span>
                </a>
              </div>

              {/* Both Phone Numbers */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <a
                      id="footer-phone-1"
                      href={CONTACT_DETAILS.phone1.tel}
                      className="inline-flex items-center gap-2 text-xs tracking-wider text-[#FAF8F5] hover:text-[#C5A880] transition-colors font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#8C8479] flex-shrink-0" />
                      <span>{CONTACT_DETAILS.phone1.display}</span>
                    </a>
                    <a
                      id="footer-phone-1-wa"
                      href={CONTACT_DETAILS.phone1.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-[2px] bg-[#17201A] border border-[#223326] text-[#A7D7B5] hover:border-[#4B7055] transition-colors flex items-center gap-1"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-2.5 h-2.5" />
                      <span>WA</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <a
                      id="footer-phone-2"
                      href={CONTACT_DETAILS.phone2.tel}
                      className="inline-flex items-center gap-2 text-xs tracking-wider text-[#FAF8F5] hover:text-[#C5A880] transition-colors font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#8C8479] flex-shrink-0" />
                      <span>{CONTACT_DETAILS.phone2.display}</span>
                    </a>
                    <a
                      id="footer-phone-2-wa"
                      href={CONTACT_DETAILS.phone2.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-[2px] bg-[#17201A] border border-[#223326] text-[#A7D7B5] hover:border-[#4B7055] transition-colors flex items-center gap-1"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-2.5 h-2.5" />
                      <span>WA</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 border-t border-[#1C1A18]/60">
                {FOOTER_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[10px] tracking-[0.22em] uppercase text-[#736B63] hover:text-[#FAF8F5] transition-colors font-light"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Complete Social & Media Portfolio Links */}
            <div className="md:col-span-4 space-y-4 text-center md:text-left">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#8C8479] font-medium block">
                FOLLOW OUR ARCHIVE &amp; STORIES
              </span>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
                {/* Instagram */}
                <a
                  id="footer-social-instagram"
                  href={CONTACT_DETAILS.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.22em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors flex items-center justify-between group p-2 rounded-[2px] bg-[#121110] border border-[#1F1D1B] hover:border-[#38332E]"
                >
                  <span className="group-hover:text-white">INSTAGRAM</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#736B63] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Threads */}
                <a
                  id="footer-social-threads"
                  href={CONTACT_DETAILS.socials.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.22em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors flex items-center justify-between group p-2 rounded-[2px] bg-[#121110] border border-[#1F1D1B] hover:border-[#38332E]"
                >
                  <span className="group-hover:text-white">THREADS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#736B63] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* YouTube */}
                <a
                  id="footer-social-youtube"
                  href={CONTACT_DETAILS.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.22em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors flex items-center justify-between group p-2 rounded-[2px] bg-[#121110] border border-[#1F1D1B] hover:border-[#38332E]"
                >
                  <span className="group-hover:text-white">YOUTUBE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#736B63] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Facebook */}
                <a
                  id="footer-social-facebook"
                  href={CONTACT_DETAILS.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.22em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors flex items-center justify-between group p-2 rounded-[2px] bg-[#121110] border border-[#1F1D1B] hover:border-[#38332E]"
                >
                  <span className="group-hover:text-white">FACEBOOK</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#736B63] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Pinterest */}
                <a
                  id="footer-social-pinterest"
                  href={CONTACT_DETAILS.socials.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 text-xs tracking-[0.22em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors flex items-center justify-between group p-2 rounded-[2px] bg-[#121110] border border-[#1F1D1B] hover:border-[#38332E]"
                >
                  <span className="group-hover:text-white">PINTEREST BOARDS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#736B63] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Editorial Journal Dispatches — Minimalist Newsletter Section */}
          <div className="border-t border-[#1C1A18] pt-10 pb-2">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
              {/* Left Column: Quiet Editorial Context */}
              <div className="space-y-1.5 max-w-md text-center md:text-left mx-auto md:mx-0">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#8C8479] font-medium block">
                  THE JOURNAL &amp; DISPATCHES
                </span>
                <h3 className="font-serif text-lg md:text-xl text-[#FAF8F5] font-light tracking-wide">
                  Stories, ritual notes &amp; seasonal availability.
                </h3>
                <p className="text-xs text-[#6E675E] font-light leading-relaxed">
                  Infrequent, thoughtful updates from Oscar Weddings. No promotional noise.
                </p>
              </div>

              {/* Right Column: Accessible Minimalist Newsletter Form */}
              <div className="w-full max-w-md mx-auto md:mx-0">
                {status === 'success' ? (
                  <div
                    id="footer-journal-status"
                    role="status"
                    aria-live="polite"
                    className="p-3.5 rounded-[2px] bg-[#0E1511] border border-[#1E2D22] text-[#A7D7B5] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#A7D7B5] flex-shrink-0" />
                      <span>{feedbackMessage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setEmail('');
                        setFeedbackMessage('');
                      }}
                      className="text-[10px] tracking-wider uppercase text-[#8C8479] hover:text-[#FAF8F5] underline cursor-pointer transition-colors flex-shrink-0"
                    >
                      New entry
                    </button>
                  </div>
                ) : (
                  <form
                    id="footer-journal-form"
                    noValidate
                    onSubmit={handleNewsletterSubmit}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <label htmlFor="footer-journal-email" className="sr-only">
                        Email address for Oscar Weddings Journal updates
                      </label>
                      <div className="relative flex-1">
                        <input
                          id="footer-journal-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') {
                              setStatus('idle');
                              setFeedbackMessage('');
                            }
                          }}
                          placeholder="Enter your email address"
                          disabled={status === 'submitting'}
                          aria-required="true"
                          aria-invalid={status === 'error' ? 'true' : 'false'}
                          aria-describedby="footer-journal-feedback"
                          className={`w-full bg-[#121110] border text-xs text-[#FAF8F5] placeholder-[#5C564E] px-3.5 py-2.5 rounded-[2px] transition-colors focus:outline-none ${
                            status === 'error'
                              ? 'border-[#8E3B3B] focus:border-[#D98282]'
                              : 'border-[#211F1D] focus:border-[#C5A880]'
                          }`}
                        />
                      </div>
                      <button
                        id="footer-journal-submit"
                        type="submit"
                        disabled={status === 'submitting'}
                        className="px-4 py-2.5 text-[10px] tracking-[0.22em] uppercase font-medium bg-[#FAF8F5] text-[#0A0A0A] hover:bg-[#C5A880] transition-colors rounded-[2px] flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <span>JOINING...</span>
                        ) : (
                          <>
                            <span>SUBSCRIBE</span>
                            <ArrowRight className="w-3 h-3 text-[#0A0A0A]" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Status & Validation Feedback */}
                    <div
                      id="footer-journal-feedback"
                      role={status === 'error' ? 'alert' : 'status'}
                      aria-live="polite"
                      className="min-h-[18px] text-[11px]"
                    >
                      {status === 'error' ? (
                        <p className="text-[#D98282]">{feedbackMessage}</p>
                      ) : (
                        <p className="text-[#5C564E]">
                          Curated journal dispatches. Unsubscribe anytime.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Minimalist Editorial Up-Arrow Button (Back To Top) */}
          <div className="flex flex-col items-center justify-center pt-4">
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="group flex flex-col items-center justify-center p-2 focus:outline-none cursor-pointer active:scale-95 transition-all duration-300"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
                <svg
                  width="20"
                  height="46"
                  viewBox="0 0 20 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#8C8479]/60 group-hover:stroke-[#FAF8F5] transition-colors duration-300"
                >
                  <path
                    d="M10 44V2M10 2L3 9.5M10 2L17 9.5"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Minimal Copyright & Fine Print */}
          <div className="border-t border-[#1C1A18] pt-6 flex flex-col sm:flex-row items-center justify-between text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase text-[#6E675E] gap-3.5 text-center sm:text-left">
            <p>© 2026 OSCAR WEDDINGS. ALL RIGHTS RESERVED.</p>
            <p>KERALA · SOUTH INDIA · DESTINATIONS WORLDWIDE</p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};
