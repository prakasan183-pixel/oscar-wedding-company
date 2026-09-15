// import React from 'react';
// import { PHILOSOPHY_DATA } from '../data/weddingContent';
// import { ScrollReveal } from './ScrollReveal';
// import { LazyImage } from './LazyImage';

// export const PhilosophySection: React.FC = () => {
//   const handleScrollToExperience = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const target = document.getElementById('experience');
//     if (target) {
//       target.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section
//       id="philosophy"
//       data-theme="light"
//       className="relative bg-[#FAF7F2] text-[#0A0A0A] py-28 md:py-40 px-6 md:px-12 lg:px-20 transition-colors"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Editorial Subhead / Issue Label */}
//         <ScrollReveal y={16} duration={0.75} amount={0.2}>
//           <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-6 mb-16 md:mb-24">
//             <div className="flex items-center gap-3">
//               <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#736B63] font-medium">
//                 SECTION 02 — THE PHILOSOPHY
//               </span>
//             </div>
//             <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#736B63] hidden sm:inline">
//               INTENTION &amp; OBSERVATION
//             </span>
//           </div>
//         </ScrollReveal>

//         {/* Asymmetrical Editorial Composition */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
//           {/* Left Column: Generous Editorial Typography */}
//           <ScrollReveal
//             delay={0.1}
//             y={28}
//             duration={0.85}
//             amount={0.15}
//             className="lg:col-span-7 space-y-8 md:space-y-10"
//           >
//             <h2
//               className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#0A0A0A] font-light leading-[1.12] tracking-tight"
//               style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//             >
//               {PHILOSOPHY_DATA.headline}
//             </h2>

//             <div className="space-y-6 max-w-2xl">
//               <p
//                 className="text-base sm:text-lg md:text-xl text-[#3A3632] font-light leading-[1.7] tracking-normal"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 {PHILOSOPHY_DATA.paragraph}
//               </p>
//             </div>

//             {/* Subtle Text Link */}
//             <div className="pt-2">
//               <a
//                 id="discover-approach-link"
//                 href="#experience"
//                 onClick={handleScrollToExperience}
//                 className="inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.22em] uppercase font-medium text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:text-[#736B63] hover:border-[#736B63] transition-all duration-300 group"
//               >
//                 <span>{PHILOSOPHY_DATA.linkText}</span>
//                 <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//               </a>
//             </div>
//           </ScrollReveal>

//           {/* Right Column: Quiet Editorial Frame with Generous Negative Space */}
//           <ScrollReveal
//             delay={0.22}
//             y={32}
//             duration={0.9}
//             amount={0.15}
//             className="lg:col-span-5 flex flex-col items-center lg:items-end"
//           >
//             <div className="relative w-full max-w-md space-y-4">
//               <LazyImage
//                 src={PHILOSOPHY_DATA.featuredImage}
//                 alt="Documentary Kerala wedding portrait capturing silent grace and unhurried devotion in Fort Kochi - Oscar Weddings"
//                 width={1200}
//                 height={1500}
//                 containerClassName="w-full aspect-[4/5] overflow-hidden bg-[#EAE6DF] shadow-sm"
//                 placeholderClassName="bg-[#EAE6DF]"
//                 className="w-full h-full object-cover filter grayscale contrast-105 hover:scale-[1.03] transition-transform duration-1000 ease-out"
//               />
//               <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#736B63]">
//                 <span>{PHILOSOPHY_DATA.caption}</span>
//                 <span>FIG. 01</span>
//               </div>
//             </div>
//           </ScrollReveal>
//         </div>
//       </div>
//     </section>
//   );
// };

// reduce margin-top on the scroll link to avoid extra space between hero and philosophy section.

import React from 'react';

import { PHILOSOPHY_DATA } from '../data/weddingContent';

import { ScrollReveal } from './ScrollReveal';

import { LazyImage } from './LazyImage';

export const PhilosophySection: React.FC = () => {

  const handleScrollToExperience = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = document.getElementById('experience');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="philosophy"
      data-theme="light"
      className="relative bg-[#FAF7F2] text-[#0A0A0A] py-16 md:py-24 px-6 md:px-12 lg:px-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto">

        {/* Editorial Subhead / Issue Label */}
        <ScrollReveal y={16} duration={0.75} amount={0.2}>
          <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4 mb-10 md:mb-14">

            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#736B63] font-medium">
                SECTION 02 — THE PHILOSOPHY
              </span>
            </div>

            <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#736B63] hidden sm:inline">
              INTENTION &amp; OBSERVATION
            </span>

          </div>
        </ScrollReveal>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Editorial Typography */}
          <ScrollReveal
            delay={0.1}
            y={28}
            duration={0.85}
            amount={0.15}
            className="lg:col-span-7 space-y-5 md:space-y-7"
          >

            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#0A0A0A] font-light leading-[1.12] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {PHILOSOPHY_DATA.headline}
            </h2>

            <div className="space-y-4 max-w-2xl">
              <p
                className="text-base sm:text-lg md:text-xl text-[#3A3632] font-light leading-[1.7] tracking-normal"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {PHILOSOPHY_DATA.paragraph}
              </p>
            </div>

            {/* Subtle Text Link */}
            <div className="pt-0">
              <a
                id="discover-approach-link"
                href="#experience"
                onClick={handleScrollToExperience}
                className="inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.22em] uppercase font-medium text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:text-[#736B63] hover:border-[#736B63] transition-all duration-300 group"
              >
                <span>{PHILOSOPHY_DATA.linkText}</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

          </ScrollReveal>

          {/* Right Column: Editorial Image */}
          <ScrollReveal
            delay={0.22}
            y={32}
            duration={0.9}
            amount={0.15}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >

            <div className="relative w-full max-w-md space-y-3">

              <div className="group overflow-hidden">
                <LazyImage
                  src={PHILOSOPHY_DATA.featuredImage}
                  alt="Documentary Kerala wedding portrait capturing silent grace and unhurried devotion in Fort Kochi - Oscar Weddings"
                  width={1200}
                  height={1500}
                  containerClassName="w-full aspect-[4/5] overflow-hidden bg-[#EAE6DF] shadow-sm"
                  placeholderClassName="bg-[#EAE6DF]"
                  className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.03] transition-[filter,transform] duration-1000 ease-out"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#736B63]">
                <span>{PHILOSOPHY_DATA.caption}</span>
                <span>FIG. 01</span>
              </div>

            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};