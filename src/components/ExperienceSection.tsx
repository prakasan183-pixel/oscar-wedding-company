import React, { useState } from 'react';
import { EXPERIENCE_STAGES } from '../data/weddingContent';
import { Plus, Minus } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ExperienceSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const toggleStage = (idx: number) => {
    setActiveStage(activeStage === idx ? null : idx);
  };

  return (
    <section
      id="experience"
      data-theme="light"
      className="relative bg-[#FAF7F2] text-[#0A0A0A] py-16 md:py-24 px-6 md:px-12 lg:px-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Section Header */}
        <ScrollReveal y={20} duration={0.8} amount={0.2}>
          <div className="max-w-3xl md:max-w-6xl space-y-4 border-b border-[#E2DDD5] pb-4">
            <span className="text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-[#736B63] font-medium block">
              THE OSCAR EXPERIENCE
            </span>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#0A0A0A] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              A considered approach, from the first conversation to the final photograph.
            </h2>
          </div>
        </ScrollReveal>

        {/* Four-Stage Editorial Sequence (Not repetitive cards, but elegant linear sequence) */}
        <div className="divide-y divide-[#E2DDD5] border-y border-[#E2DDD5]">
          {EXPERIENCE_STAGES.map((stage, index) => {
            const isOpen = activeStage === index;
            return (
              <ScrollReveal
                key={stage.number}
                delay={index * 0.08}
                y={20}
                duration={0.75}
                amount={0.15}
              >
                <div
                  className="py-8 md:py-10 transition-colors hover:bg-[#F3EFEA]/60 px-4 md:px-6 -mx-4 md:-mx-6 cursor-pointer"
                  onClick={() => toggleStage(index)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
                    {/* Stage Number & Title */}
                    <div className="md:col-span-4 flex items-baseline gap-6">
                      <span
                        className="text-4xl md:text-5xl font-serif text-[#736B63] font-light select-none"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {stage.number}
                      </span>
                      <div>
                        <span className="text-xs tracking-[0.25em] text-[#736B63] uppercase block">
                          STAGE
                        </span>
                        <h3
                          className="text-2xl md:text-3xl font-serif text-[#0A0A0A] font-light tracking-wide mt-0.5"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    {/* Summary Copy */}
                    <div className="md:col-span-7 space-y-4">
                      <p
                        className="text-base sm:text-lg md:text-xl text-[#262422] font-light leading-relaxed"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {stage.summary}
                      </p>

                      {/* Subtle Expandable Narrative */}
                      {isOpen && (
                        <div className="pt-3 border-t border-[#E2DDD5]/80 animate-fadeIn">
                          <p className="text-sm sm:text-base text-[#736B63] font-light leading-relaxed">
                            {stage.detail}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Subtle Indicator */}
                    <div className="md:col-span-1 flex md:justify-end text-[#736B63]">
                      <span className="text-xs uppercase tracking-widest flex items-center gap-1 font-mono">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#0A0A0A]" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#736B63]" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Quiet Footnote Note */}
        <ScrollReveal delay={0.15} y={16} duration={0.8} amount={0.2}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs tracking-[0.2em] uppercase text-[#736B63] gap-4 pt-4">
            <span>COMMISSIONS ACCEPTED GLOBALLY</span>
            <span>ESTIMATED RETENTION: MAXIMUM 18 CELEBRATIONS PER YEAR</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
