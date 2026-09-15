import React from 'react';

interface OscarLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  variant?: 'full' | 'compact' | 'minimal';
  size?: 'default' | 'footer';
}

export const OscarLogo: React.FC<OscarLogoProps> = ({
  className = '',
  theme = 'dark',
  variant = 'full',
  size = 'default',
}) => {
  const textColor =
    theme === 'light' ? 'text-[#0A0A0A]' : 'text-[#FAF8F5]';
  const subColor =
    theme === 'light' ? 'text-[#6B645B]' : 'text-[#B4ACA1]';
  const hoverSubColor =
    theme === 'light' ? 'group-hover:text-[#0A0A0A]' : 'group-hover:text-[#FAF8F5]';
  const isFull = variant === 'full';
  const isMinimal = variant === 'minimal';
  const wordmarkSize = size === 'footer'
    ? 'text-3xl sm:text-4xl md:text-5xl'
    : isFull
      ? 'text-5xl sm:text-6xl md:text-7xl'
      : 'text-xl sm:text-2xl md:text-3xl';
  const companyAlignment = size === 'footer'
    ? 'self-center ml-0 md:self-start md:ml-1'
    : 'self-start ml-1';

  return (
    <div
      id="oscar-weddings-logo"
      aria-label="Oscar Weddings"
      className={`inline-flex flex-col items-center select-none group cursor-pointer transition-opacity duration-300 hover:opacity-90 ${className}`}
    >
      <span
        className={`${wordmarkSize} whitespace-nowrap font-display font-normal leading-none tracking-[0.04em] ${textColor}`}
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        OSCAR WEDDING
      </span>

      {!isMinimal && (
        <span
          className={`${isFull ? 'mt-2 text-[0.54rem]' : 'mt-1 text-[0.42rem]'} ${companyAlignment} font-medium tracking-[0.34em] ${subColor} ${hoverSubColor}`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          COMPANY
        </span>
      )}
    </div>
  );
};
