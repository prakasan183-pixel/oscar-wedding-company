import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { LazyImage } from './LazyImage';
import { withSiteBase } from '../utils/siteUrl';

const inspirationImages = [
  {
    src: '/images/aleena&Nithin/HD (6) (1).jpg',
    alt: 'A moment from Aleena and Nithin’s wedding',
  },
  {
    src: '/images/vivek&sreelakshmi/HD (4).jpg',
    alt: 'A moment from Vivek and Sreelakshmi’s wedding',
  },
  {
    src: '/images/vyshak/HD (4).jpg.jpeg',
    alt: 'A wedding portrait from Vyshak’s collection',
  },
];

export const KeralaSection: React.FC = () => (
  <section
    id="kerala"
    data-theme="light"
    aria-labelledby="kerala-heading"
    className="kerala-editorial-section grid w-full overflow-hidden bg-[#F7F4EF] text-[#171615]"
  >
    <div className="kerala-editorial-feature relative min-h-0 overflow-hidden bg-[#F7F4EF]">
      <LazyImage
        src="/images/Deva/HD  (5).jpg"
        alt="A bridal portrait from Deva’s wedding collection"
        width={1200}
        height={800}
        priority
        containerClassName="h-full w-full"
        placeholderClassName="bg-[#F7F4EF]"
        className="h-full w-full object-cover object-[center_42%]"
        revealAnimation={false}
      />
      <p className="kerala-editorial-image-caption absolute bottom-0 left-0 z-10 font-editorial-sans text-[10px] font-medium uppercase leading-[1.9] tracking-[0.24em] text-white sm:text-[11px]">
        TRADITIONS
        <br />
        PEOPLE
        <br />
        PLACES
        <br />
        EMOTIONS
        <span className="mt-4 block h-px w-12 bg-white/70" aria-hidden="true" />
      </p>
    </div>

    <div className="kerala-editorial-story relative grid min-w-0 grid-rows-[1fr_auto]">
      <div className="kerala-editorial-frond-layer" aria-hidden="true">
        <img
          src={withSiteBase('/images/rootedsection/palm-frond.png')}
          alt=""
          className="kerala-editorial-frond"
        />
      </div>

      <ScrollReveal
        y={16}
        duration={0.7}
        amount={0.1}
        className="kerala-editorial-copy-block relative z-10"
      >
        <div className="kerala-editorial-eyebrow flex items-center">
          <p className="shrink-0 font-editorial-sans text-[10px] font-medium uppercase tracking-[0.34em] text-[#77736F] sm:text-[12px]">
            OUR INSPIRATION
          </p>
        </div>

        <h2
          id="kerala-heading"
          className="kerala-editorial-heading mt-6 font-cormorant font-light uppercase leading-[1.02] tracking-[0.045em] text-[#171615]"
        >
          <span className="block whitespace-nowrap">SAME ROOTS,</span>
          <span className="block whitespace-nowrap">DIFFERENT STORIES.</span>
        </h2>

        <p className="kerala-editorial-copy mt-5 max-w-[590px] font-cormorant font-normal leading-[1.42] tracking-[0.015em] text-[#77736F]">
          Our work is inspired by the rich culture, people and traditions that
          surround us. The colours, the rituals, the landscapes and the way
          celebrations bring people together continue to shape how we see and
          tell stories — wherever we go.
        </p>

        <a
          href="#experience"
          className="kerala-editorial-link group mt-8 inline-flex items-center gap-4 font-editorial-sans text-[10px] font-medium uppercase tracking-[0.25em] text-[#57534F] transition-colors hover:text-[#171615] sm:mt-9 sm:text-[11px]"
        >
          <span className="h-px w-12 bg-[#9D9993]" aria-hidden="true" />
          <span>SEE OUR PERSPECTIVE</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </ScrollReveal>

      <div className="kerala-editorial-gallery grid grid-cols-3 gap-[6px]" aria-label="Kerala wedding inspiration">
        {inspirationImages.map((image) => (
          <div className="relative min-w-0 overflow-hidden bg-[#E7E1D8]" key={image.src}>
            <LazyImage
              src={image.src}
              alt={image.alt}
              width={640}
              height={420}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              revealAnimation={false}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
