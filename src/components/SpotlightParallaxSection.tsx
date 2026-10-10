import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURED_HALDI_STORY } from '../data/weddingContent';
import { WeddingStory } from '../types';
import { withSiteBase } from '../utils/siteUrl';

interface SpotlightParallaxSectionProps {
  onOpenStory: (story: WeddingStory) => void;
}

const spotlightStats = ['WEDDINGS COVERED', 'YEARS OF STORIES', 'DESTINATIONS'];

export const SpotlightParallaxSection: React.FC<SpotlightParallaxSectionProps> = ({
  onOpenStory,
}) => (
  <section
    id="ceremony-spotlight"
    data-theme="light"
    aria-label="Bhagya and Prabhu Haldi Ceremony Editorial Spotlight"
    className="overflow-hidden bg-[#FAF8F5] text-[#171615]"
  >
    <div
      className="grid grid-cols-3 border-b border-[#E7E1D8] px-3 py-6 sm:px-8 sm:py-8 md:py-9"
      aria-label="Oscar Wedding Company"
    >
      {spotlightStats.map((stat, index) => (
        <p
          key={stat}
          className={`flex min-h-8 items-center justify-center text-center text-[8px] font-medium uppercase leading-relaxed tracking-[0.15em] text-[#262522] sm:text-[10px] sm:tracking-[0.22em] md:text-xs ${
            index > 0 ? 'border-l border-[#77736D]' : ''
          }`}
        >
          {stat}
        </p>
      ))}
    </div>

    <div className="grid lg:h-[clamp(350px,23vw,470px)] lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
      <div className="group relative h-[250px] overflow-hidden bg-[#EAE4DA] sm:h-[330px] lg:h-full lg:min-h-0">
        <img
          src={withSiteBase('/images/thumb-haldi_ceremony_bride.jpg.jpg')}
          alt="Bhagya celebrating her Haldi ceremony among the gardens of Kumarakom"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full min-h-0 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
        />
      </div>

      <div className="flex flex-col justify-center px-7 py-9 sm:px-12 sm:py-12 lg:px-[clamp(2rem,3.6vw,4.5rem)] lg:py-10">
        <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.25em] text-[#716D67] sm:text-[10px] sm:tracking-[0.28em]">
          MARCH 26, 2025
          <span className="mx-2 text-[#A28C6E] sm:mx-3">·</span>
          KUMARAKOM · HERITAGE GROVE
        </p>

        <h2
          className="max-w-[18ch] text-[2rem] font-normal uppercase leading-[1.04] tracking-[0.005em] text-[#171615] sm:text-4xl lg:text-[clamp(2.1rem,3vw,3.5rem)]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          A Haldi Full of Sunshine
        </h2>

        <p className="mt-5 max-w-[42ch] font-cormorant text-lg leading-[1.45] text-[#625F5A] sm:mt-6 sm:text-xl">
          A vibrant celebration filled with laughter, colours and the people who make it all
          brighter.
        </p>

        <button
          type="button"
          onClick={() => onOpenStory(FEATURED_HALDI_STORY)}
          className="group mt-7 inline-flex w-fit items-center gap-4 border-b border-[#292825] pb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#171615] transition-colors hover:text-[#806B52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#806B52] sm:mt-8 sm:text-xs"
          aria-label="View full Bhagya and Prabhu Haldi ceremony story"
        >
          <span>VIEW FULL CEREMONY STORY</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </div>
    </div>
  </section>
);
