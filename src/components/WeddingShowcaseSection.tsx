import React from 'react';

export const WeddingShowcaseSection: React.FC = () => {
  return (
    <section
      aria-label="Wedding story showcase"
      className="relative overflow-hidden border-t border-[#E7E1D9] bg-[#f5f3ef] py-14 text-[#141312] sm:py-18 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:gap-14">
          <div className="max-w-[32rem] pt-0 sm:pt-0 md:-mt-5 lg:-mt-6">
            <h2
              className="text-[2.1rem] font-light leading-[0.75] tracking-[-0.05em] text-[#171412] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.7rem]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <span className="inline-block whitespace-nowrap sm:block">COUPLE</span>
              <span className="ml-1 inline-block whitespace-nowrap sm:ml-0 sm:block">WEDDING STORY</span>
            </h2>

            <div
              className="mt-4 max-w-[34rem] text-[0.98rem] leading-[1.55] text-[#2a2624] font-light sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.18rem] lg:text-justify"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <p>
                At Oscar Weddings, we photograph the glances, the laughter, the vows, and the quiet moments in between —
                the details that turn a celebration into a deeply personal story. We preserve the tenderness, the joy,
                and the feeling of two lives choosing each other, so the warmth of the day remains with you long after the
                last dance fades away, carrying the emotion of love into every chapter that follows.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden border border-[#d8d0c6] bg-[#e7e1da] shadow-[0_30px_80px_rgba(35,28,23,0.12)]">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/rahul/13.jpg"
                  alt="Luxury wedding portrait with cinematic storytelling"
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/80 bg-black/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:right-6 sm:top-6 sm:text-[9px]">
                VIEW
              </div>

              <button
                type="button"
                aria-label="Play wedding film"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/10 backdrop-blur-[2px] shadow-[0_0_0_12px_rgba(255,255,255,0.08)] transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
              >
                <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white sm:border-y-[10px] sm:border-l-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};