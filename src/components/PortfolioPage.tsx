import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { OscarLogo } from './OscarLogo';

const placeholderTiles = [
  'grid-cols-1 grid-rows-1',
  'grid-cols-1 grid-rows-1',
  'col-span-2 grid-cols-1 grid-rows-1',
  'grid-cols-1 grid-rows-1',
  'row-span-2 grid-cols-1 grid-rows-1',
  'grid-cols-1 grid-rows-1',
];

export const PortfolioPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-5 text-[#141312] sm:px-7 sm:py-8 lg:px-12 lg:py-10">
      <header className="mx-auto flex max-w-[1280px] items-center justify-between border-b border-[#D9D4CC] pb-5 sm:pb-7">
        <a href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#736B63] transition-colors hover:text-[#141312]">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back Home
        </a>
        <OscarLogo variant="compact" theme="light" />
      </header>

      <div className="mx-auto max-w-[1280px] pb-8 pt-12 sm:pb-12 sm:pt-16">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-[10px] uppercase tracking-[0.38em] text-[#8C8479]">Selected Works</p>
          <h1 className="mt-3 font-serif text-3xl font-light uppercase tracking-[0.18em] sm:text-5xl">The Portfolio</h1>
        </div>

        <div className="grid auto-rows-[minmax(220px,24vw)] grid-cols-2 gap-3 sm:gap-5 lg:auto-rows-[minmax(300px,28vw)]">
          {placeholderTiles.map((tile, index) => (
            <div
              key={index}
              aria-label={`Portfolio image placeholder ${index + 1}`}
              className={`${tile} bg-[#000000]`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
