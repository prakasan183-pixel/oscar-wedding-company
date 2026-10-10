import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { ScrollReveal } from './ScrollReveal';

export const BeyondPhotographsSection: React.FC = () => (
  <section
    id="beyond-photographs"
    data-theme="light"
    aria-labelledby="beyond-photographs-heading"
    className="beyond-photographs-section relative overflow-hidden bg-[#FAF8F5] text-[#171615]"
  >
    <div className="beyond-photographs-inner relative">
      <ScrollReveal y={16} duration={0.7} amount={0.12}>
        <header className="beyond-photographs-header text-center">
          <p className="font-editorial-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[#77736F] sm:text-[12px]">
            BEYOND THE PHOTOGRAPHS
            <span className="ml-3 inline-block h-px w-12 translate-y-[-3px] bg-[#9D9993]" aria-hidden="true" />
          </p>
          <h2
            id="beyond-photographs-heading"
            className="beyond-photographs-heading mt-5 font-cormorant font-light uppercase leading-[1.05] tracking-[0.035em] text-[#171615]"
          >
            THE PEOPLE ARE THE STORY.
          </h2>
          <p className="beyond-photographs-intro mx-auto mt-4 max-w-[660px] font-cormorant font-normal leading-[1.45] tracking-[0.01em] text-[#77736F]">
            Weddings are about families, friendships, rituals, laughter, quiet moments
            and the people who make the day meaningful. We capture the real emotions,
            the connections and the beauty that live beyond the frames.
          </p>
        </header>
      </ScrollReveal>

      <div className="beyond-photographs-heart absolute right-0 top-0" aria-hidden="true">
        <LazyImage
          src="/images/rootedsection/people-story-heart.png"
          alt=""
          width={230}
          height={242}
          containerClassName="h-full w-full"
          className="h-full w-full object-contain"
          revealAnimation={false}
        />
      </div>

      <div className="beyond-photographs-feature">
        <ScrollReveal
          y={16}
          duration={0.75}
          amount={0.1}
          className="beyond-photographs-quote relative flex flex-col justify-center"
        >
          <span
            className="beyond-photographs-quote-mark font-cormorant font-semibold leading-[0.7] text-[#E4DED5]"
            aria-hidden="true"
          >
            “
          </span>
          <p className="beyond-photographs-quote-text mt-4 font-cormorant font-normal leading-[1.08] tracking-[0.005em] text-[#171615]">
            <span className="beyond-photographs-quote-desktop font-cormorant">
              We photograph
              <br />
              what it felt like
              <br />
              to be there.
            </span>
            <span className="beyond-photographs-quote-mobile font-cormorant">
              We photograph what it
              <br />
              felt like to be there.
            </span>
          </p>
          <span className="mt-8 h-px w-16 bg-[#A9A197]" aria-hidden="true" />
        </ScrollReveal>

        <div className="beyond-photographs-image-wrap min-w-0">
          <div className="beyond-photographs-image block overflow-hidden bg-[#EAE6DF]">
            <LazyImage
              src="/images/story-backwater-procession.jpg"
              alt="A bride and groom celebrate with family and friends during a Kerala wedding procession"
              width={1200}
              height={800}
              priority
              containerClassName="h-full w-full"
              className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-[1.025]"
              revealAnimation={false}
            />
          </div>
          <div className="beyond-photographs-caption flex items-center justify-between gap-4">
            <p className="font-editorial-sans text-[9px] font-medium uppercase tracking-[0.26em] text-[#77736F] sm:text-[11px]">
              THE MOMENTS BETWEEN
            </p>
            <a
              href="/portfolio"
              className="group inline-flex shrink-0 items-center gap-2 font-editorial-sans text-[9px] font-medium uppercase tracking-[0.24em] text-[#57534F] transition-colors hover:text-[#171615] sm:text-[11px]"
            >
              <span>OUR STORIES</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
