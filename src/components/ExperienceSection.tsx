import React from 'react';
import { motion } from 'motion/react';
import { withSiteBase } from '../utils/siteUrl';

const approachSteps = [
  {
    number: '01',
    title: <>Observe<br />Deeply</>,
    description: 'We take time to know you, your people and what truly matters.',
  },
  {
    number: '02',
    title: <>Capture<br />Honestly</>,
    description: 'Real moments over perfection, always.',
  },
  {
    number: '03',
    title: <>Tell a<br />Bigger Story</>,
    description: 'Your wedding, woven with emotion, culture and the little in-betweens.',
  },
  {
    number: '04',
    title: <>Create a<br />Lasting Legacy</>,
    description: 'Photographs and films that feel alive, even years from now.',
  },
];

export const ExperienceSection: React.FC = () => (
  <section
    id="experience"
    data-theme="light"
    aria-labelledby="approach-heading"
    className="our-approach-section relative overflow-hidden bg-[#FAF8F5] text-[#171615]"
  >
    <img
      src={withSiteBase('/images/rootedsection/approach-flower-left-clean.png')}
      alt=""
      aria-hidden="true"
      className="our-approach-flourish our-approach-flourish-left"
      width={314}
      height={695}
    />
    <img
      src={withSiteBase('/images/rootedsection/approach-flower-right-clean.png')}
      alt=""
      aria-hidden="true"
      className="our-approach-flourish our-approach-flourish-right"
      width={667}
      height={632}
    />
    <div className="our-approach-inner relative z-10 mx-auto max-w-[1680px]">
      <header className="flex items-center justify-between gap-6">
        <h2
          id="approach-heading"
          className="font-editorial-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#35312D] sm:text-[13px]"
        >
          OUR APPROACH
        </h2>
        <p className="border-b border-[#4C4C4C] pb-1 font-editorial-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#595959] sm:text-[12px]">
          A THOUGHTFUL PROCESS
        </p>
      </header>

      <motion.div
        className="our-approach-grid mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:mt-14 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {approachSteps.map((step, index) => (
          <motion.article
            className="our-approach-step relative"
            key={step.number}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {index > 0 && <span className="our-approach-divider" aria-hidden="true" />}
            {index % 2 === 0 && (
              <span className="our-approach-mobile-divider" aria-hidden="true" />
            )}
            <p className="our-approach-number font-cormorant font-light leading-[0.8] tracking-[-0.055em] text-[#D8D2CB]">
              {step.number}
            </p>
            <h3
              className="our-approach-title mt-3 font-cormorant font-normal leading-[1.02] tracking-[-0.045em] text-[#111111] normal-case"
              style={{ textTransform: 'none' }}
            >
              {step.title}
            </h3>
            <p className="our-approach-description mt-4 max-w-[20ch] font-editorial-sans font-light leading-[1.55] text-[#666666]">
              {step.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);
