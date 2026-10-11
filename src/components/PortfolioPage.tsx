import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { STORIES_DATA } from '../data/weddingContent';
import { WeddingStory } from '../types';
import { OscarLogo } from './OscarLogo';
import { LazyImage } from './LazyImage';
import { withSiteBase } from '../utils/siteUrl';

interface PortfolioPageProps {
  onOpenStory: (story: WeddingStory) => void;
  onOpenEnquiry: () => void;
}

const storyOrder = [
  'albin-thara',
  'aleena-nithin',
  'vivek-sreelakshmi',
  'lizbeth-jibin',
  'deva',
  'jesica',
  'piyush',
  'vyshak',
];

const orderedStories = storyOrder.flatMap((id) => {
  const story = STORIES_DATA.find((item) => item.id === id);
  return story ? [story] : [];
});

const portfolioStories = orderedStories;
const portfolioColumns = [
  ['albin-thara'],
  ['aleena-nithin', 'deva'],
  ['vivek-sreelakshmi'],
  ['lizbeth-jibin', 'jesica'],
];
const mosaicStoryIds = new Set(portfolioColumns.flat());

const filters = ['All', 'Kerala', 'Tamil Nadu', 'Destination', 'Christian', 'Muslim'] as const;
type PortfolioFilter = (typeof filters)[number];

const matchesFilter = (story: WeddingStory, filter: PortfolioFilter): boolean => {
  if (filter === 'All') return true;

  const searchableText = [
    story.location,
    story.category,
    story.title,
    story.description,
    ...story.rituals,
  ].join(' ').toLowerCase();

  if (filter === 'Kerala') {
    return searchableText.includes('kerala');
  }

  return searchableText.includes(filter.toLowerCase());
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onOpenStory,
  onOpenEnquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('All');
  const filteredStories = useMemo(
    () => portfolioStories.filter((story) => matchesFilter(story, activeFilter)),
    [activeFilter],
  );
  const availableFilters = useMemo(
    () => new Set(filters.filter((filter) => portfolioStories.some((story) => matchesFilter(story, filter)))),
    [],
  );

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#171615]">
      <header className="border-b border-[#EAE6DF]">
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-12">
          <a href={withSiteBase('/')} aria-label="Oscar Wedding Company home" className="shrink-0">
            <OscarLogo variant="compact" theme="light" size="navbar" className="scale-[0.78] origin-left sm:scale-[0.88]" />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-3 lg:flex xl:gap-5">
            {[
              ['HOME', '/'],
              ['ABOUT', '/#philosophy'],
              ['WEDDINGS', '/#stories'],
              ['FILMS', '/#craft'],
              ['JOURNAL', '/#stories'],
              ['CONTACT', '/#enquiry'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={withSiteBase(href)}
                className="font-editorial-sans text-[9px] font-medium tracking-[0.19em] text-[#3E3934] transition-colors hover:text-[#8C8479]"
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-2 rounded-full bg-[#171615] px-4 py-2.5 font-editorial-sans text-[8px] font-medium tracking-[0.2em] text-[#FAF8F5] transition-colors hover:bg-[#736B63] sm:px-5"
          >
            GET IN TOUCH <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1152px] px-5 pb-16 pt-8 sm:px-8 sm:pt-10 lg:px-0 lg:pt-12">
        <a
          href={withSiteBase('/#stories')}
          className="mb-7 inline-flex items-center gap-2 font-editorial-sans text-[9px] font-medium uppercase tracking-[0.19em] text-[#736B63] transition-colors hover:text-[#171615]"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK TO HOME
        </a>

        <section aria-labelledby="portfolio-title">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-editorial-sans text-[9px] font-medium uppercase tracking-[0.2em] text-[#736B63]">
                OUR STORIES
              </p>
              <h1
                id="portfolio-title"
                className="mt-1.5 font-cormorant text-[32px] font-normal uppercase leading-none tracking-[0.015em] text-[#171615] sm:text-[38px] lg:text-[42px]"
              >
                THE WEDDING ARCHIVE
              </h1>
              <p className="mt-2.5 font-editorial-sans text-[11px] font-light tracking-[0.015em] text-[#736B63] sm:text-xs">
                Real people. Real celebrations. Timeless stories from across Kerala and beyond.
              </p>
            </div>

            <nav
              aria-label="Filter wedding stories"
              className="-mx-1 flex gap-4 overflow-x-auto pb-1 lg:mx-0 lg:gap-5"
            >
              {filters.map((filter) => {
                const isAvailable = availableFilters.has(filter);
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    disabled={!isAvailable}
                    aria-pressed={isActive}
                    className={`relative shrink-0 pb-2 font-editorial-sans text-[8px] font-medium uppercase tracking-[0.16em] transition-colors sm:text-[9px] ${
                      isActive ? 'text-[#171615]' : 'text-[#736B63] hover:text-[#171615]'
                    } disabled:cursor-default disabled:opacity-40`}
                  >
                    {filter}
                    {isActive && <span className="absolute inset-x-0 bottom-0 h-px bg-[#171615]" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {filteredStories.length > 0 ? (
            <div className="portfolio-layout-grid mt-7 sm:mt-8">
              <div className="portfolio-mosaic-columns">
                {portfolioColumns.map((column, columnIndex) => (
                  <div className="portfolio-mosaic-column" key={columnIndex}>
                    {column.flatMap((id) => {
                      const story = filteredStories.find((item) => item.id === id);
                      if (!story) return [];

                      const isTallCard = id === 'albin-thara' || id === 'vivek-sreelakshmi';

                      return [
                        <article key={story.id}>
                          <button
                            type="button"
                            onClick={() => onOpenStory(story)}
                            aria-label={`Open ${story.couple} wedding story`}
                            className="group block w-full text-left"
                          >
                            <div className={`portfolio-card-image overflow-hidden rounded-[2px] bg-[#EAE6DF] ${isTallCard ? 'portfolio-card-image--tall' : ''}`}>
                              <LazyImage
                                src={story.coverImage}
                                alt={`${story.couple} wedding story`}
                                width={900}
                                height={isTallCard ? 1100 : 608}
                                rootMargin="80px 0px"
                                containerClassName="h-full w-full"
                                className="block h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                                revealAnimation={false}
                              />
                            </div>

                            <div className="px-2 pt-2.5 sm:px-2.5 sm:pt-3">
                              <h2 className="portfolio-couple-name m-0 whitespace-nowrap font-cormorant font-normal leading-none tracking-[-0.025em] text-[#171615] normal-case">
                                {story.couple}
                              </h2>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="whitespace-nowrap font-editorial-sans text-[7px] font-medium uppercase tracking-[0.22em] text-[#736B63] sm:text-[8px]">
                                  {story.location.split('·')[0].trim()}
                                </span>
                                <span className="h-px w-full max-w-[56px] bg-[#B4ACA1]" aria-hidden="true" />
                              </div>
                            </div>
                          </button>
                        </article>,
                      ];
                    })}
                  </div>
                ))}
              </div>

              <div className="portfolio-second-row">
                {filteredStories
                  .filter((story) => !mosaicStoryIds.has(story.id))
                  .map((story) => (
                    <article key={story.id}>
                      <button
                        type="button"
                        onClick={() => onOpenStory(story)}
                        aria-label={`Open ${story.couple} wedding story`}
                        className="group block w-full text-left"
                      >
                        <div className="portfolio-card-image overflow-hidden rounded-[2px] bg-[#EAE6DF]">
                          <LazyImage
                            src={story.coverImage}
                            alt={`${story.couple} wedding story`}
                            width={900}
                            height={608}
                            rootMargin="80px 0px"
                            containerClassName="h-full w-full"
                            className="block h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                            revealAnimation={false}
                          />
                        </div>

                        <div className="px-2 pt-2.5 sm:px-2.5 sm:pt-3">
                          <h2 className="portfolio-couple-name m-0 whitespace-nowrap font-cormorant font-normal leading-none tracking-[-0.025em] text-[#171615] normal-case">
                            {story.couple}
                          </h2>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="whitespace-nowrap font-editorial-sans text-[7px] font-medium uppercase tracking-[0.22em] text-[#736B63] sm:text-[8px]">
                              {story.location.split('·')[0].trim()}
                            </span>
                            <span className="h-px w-full max-w-[56px] bg-[#B4ACA1]" aria-hidden="true" />
                          </div>
                        </div>
                      </button>
                    </article>
                  ))}
              </div>
            </div>
          ) : (
            <p className="py-20 text-center font-cormorant text-xl text-[#736B63]">
              No stories found in this collection.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};
