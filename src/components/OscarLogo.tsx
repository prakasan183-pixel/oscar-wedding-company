import React from 'react';

interface OscarLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  variant?: 'full' | 'compact' | 'minimal';
  size?: 'default' | 'footer' | 'navbar';
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
    : size === 'navbar'
      ? 'text-2xl xl:text-3xl'
    : isFull
      ? 'text-5xl sm:text-6xl md:text-7xl'
      : 'text-xl sm:text-2xl md:text-3xl';
  const companyAlignment = size === 'footer'
    ? 'self-center ml-0 md:self-start md:ml-1'
    : size === 'navbar'
      ? 'self-start ml-0 lg:self-center'
      : 'self-start ml-1';
  const companyColor = size === 'navbar' && theme === 'light' ? 'text-[#4A443D]' : subColor;

  return (
    <div
      id="oscar-wedding-company-logo"
      aria-label="Oscar Wedding Company"
      className={`inline-flex flex-col items-center select-none group cursor-pointer transition-opacity duration-300 hover:opacity-90 ${className}`}
    >
      <span
        className={`${wordmarkSize} whitespace-nowrap font-display font-cormorant font-medium leading-none tracking-[0.04em] ${textColor}`}
      >
        OSCAR WEDDING
      </span>

      {!isMinimal && (
        <span
          className={`${size === 'navbar' ? 'mt-1 text-[0.62rem] lg:mt-1.5 lg:text-[0.68rem]' : isFull ? 'mt-2 text-[0.54rem]' : 'mt-1 text-[0.42rem]'} ${companyAlignment} font-cormorant font-medium tracking-[0.24em] ${companyColor} ${hoverSubColor}`}
        >
          COMPANY
        </span>
      )}
    </div>
  );
};
