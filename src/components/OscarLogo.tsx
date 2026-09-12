import React from 'react';

interface OscarLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  variant?: 'full' | 'compact' | 'minimal';
}

export const OscarLogo: React.FC<OscarLogoProps> = ({
  className = '',
  theme = 'dark',
  variant = 'full',
}) => {
  const textColor =
    theme === 'light' ? 'text-[#0A0A0A]' : 'text-[#FAF8F5]';
  const subColor =
    theme === 'light' ? 'text-[#6B645B]' : 'text-[#B4ACA1]';
  const hoverSubColor =
    theme === 'light' ? 'group-hover:text-[#0A0A0A]' : 'group-hover:text-[#FAF8F5]';

  return (
    <div
      id="oscar-weddings-logo"
      className={`inline-flex flex-col items-start select-none group cursor-pointer transition-opacity duration-300 hover:opacity-90 ${className}`}
    >
      {/* Top line: OSCAR WEDDING in bold, on one single line */}
      <span
        className={`font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.11em] sm:tracking-[0.14em] md:tracking-[0.16em] uppercase leading-none whitespace-nowrap ${textColor}`}
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        OSCAR WEDDING
      </span>

      {/* Down line: COMPANY in light font weight, placed on the proper end side (aligned right with a subtle inset) */}
      <div className="w-full flex justify-end pr-0.5 sm:pr-1 pt-1 sm:pt-1.5">
        <span
          className={`text-[7px] sm:text-[8.5px] md:text-[10px] tracking-[0.32em] sm:tracking-[0.4em] font-light uppercase leading-none transition-colors ${subColor} ${hoverSubColor}`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          COMPANY
        </span>
      </div>

      {variant === 'full' && (
        <div className="w-full flex justify-end pr-1 sm:pr-1.5 pt-1">
          <span
            className={`text-[6.5px] sm:text-[7.5px] tracking-[0.34em] uppercase opacity-60 font-light ${subColor}`}
          >
            KERALA
          </span>
        </div>
      )}
    </div>
  );
};
