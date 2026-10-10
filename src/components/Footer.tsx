import React from 'react';
import { OscarLogo } from './OscarLogo';
import { CONTACT_DETAILS } from '../data/weddingContent';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const socialLinks = [
  { id: 'instagram', label: 'INSTAGRAM', href: CONTACT_DETAILS.socials.instagram, borderHover: 'hover:border-[#E1306C]', textHover: 'group-hover:text-[#E1306C]' },
  { id: 'threads', label: 'THREADS', href: CONTACT_DETAILS.socials.threads, borderHover: 'hover:border-[#FAFAFA]', textHover: 'group-hover:text-[#FAFAFA]' },
  { id: 'youtube', label: 'YOUTUBE', href: CONTACT_DETAILS.socials.youtube, borderHover: 'hover:border-[#FF0000]', textHover: 'group-hover:text-[#FF0000]' },
  { id: 'facebook', label: 'FACEBOOK', href: CONTACT_DETAILS.socials.facebook, borderHover: 'hover:border-[#1877F2]', textHover: 'group-hover:text-[#1877F2]' },
  { id: 'pinterest', label: 'PINTEREST BOARDS', href: CONTACT_DETAILS.socials.pinterest, borderHover: 'hover:border-[#E60023]', textHover: 'group-hover:text-[#E60023]' },
];

export const Footer: React.FC = () => {
  const renderSocialLink = (link: typeof socialLinks[number], alignment: 'left' | 'right' = 'left') => (
    <a
      key={link.id}
      id={`footer-social-${link.id}`}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between gap-4 border border-[#1F1D1B] bg-[#121110] p-2 text-xs font-medium tracking-[0.18em] text-[#B4ACA1] transition-colors ${link.borderHover} ${alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <span className={link.textHover}>{link.label}</span>
      <ArrowUpRight className={`h-3.5 w-3.5 flex-shrink-0 text-[#736B63] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${link.textHover}`} />
    </a>
  );

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
          <div className="space-y-8 lg:space-y-0">
            <div className="space-y-4 text-center lg:hidden">
              <OscarLogo theme="dark" variant="full" size="footer" />
              <span className="block text-[9px] font-medium tracking-[0.3em] uppercase text-[#8C8479]">
                FOLLOW OUR ARCHIVE &amp; STORIES
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {socialLinks.map((link) => renderSocialLink(link))}
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
              <div className="space-y-3">
                {socialLinks.slice(0, 2).map((link) => renderSocialLink(link))}
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#8C8479]">
                  FOLLOW OUR ARCHIVE &amp; STORIES
                </span>
                <OscarLogo theme="dark" variant="full" size="footer" />
              </div>
              <div className="space-y-3">
                {socialLinks.slice(2).map((link) => renderSocialLink(link, 'right'))}
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
            <p>© 2026 OSCAR WEDDING COMPANY. ALL RIGHTS RESERVED.</p>
            <p>KERALA · SOUTH INDIA · DESTINATIONS WORLDWIDE</p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};
