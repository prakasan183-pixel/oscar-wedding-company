import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OscarLogo } from './OscarLogo';

interface ImagePreloaderProps {
  imageUrls: string[];
  onComplete: () => void;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  imageUrls,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    // If mobile or touch device, bypass preloader immediately to ensure instant native touch scrolling
    const isMobileDevice =
      typeof window !== 'undefined' &&
      (window.innerWidth < 1024 ||
        'ontouchstart' in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches);

    if (isMobileDevice) {
      setIsFinished(true);
      document.body.style.overflow = '';
      onComplete();
      return;
    }

    // Deduplicate and filter non-empty URLs
    const uniqueUrls: string[] = Array.from(
      new Set(imageUrls.filter((u): u is string => Boolean(u)))
    );
    const total = uniqueUrls.length;

    if (total === 0) {
      setProgress(100);
      setIsFinished(true);
      onComplete();
      return;
    }

    let loaded = 0;

    // Quick responsive safety timeout: Never hold user longer than 1.4s
    const timeoutTimer = setTimeout(() => {
      if (!isCompletedRef.current) {
        isCompletedRef.current = true;
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = '';
          onComplete();
        }, 150);
      }
    }, 1400);

    const updateProgress = () => {
      loaded += 1;
      const targetPercent = Math.min(100, Math.round((loaded / total) * 100));
      setProgress(targetPercent);

      if (loaded >= total && !isCompletedRef.current) {
        isCompletedRef.current = true;
        clearTimeout(timeoutTimer);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = '';
          onComplete();
        }, 200);
      }
    };

    uniqueUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Ensure document body overflow remains clean and unrestrained
    document.body.style.overflow = '';

    return () => {
      clearTimeout(timeoutTimer);
      document.body.style.overflow = '';
    };
  }, [imageUrls, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="global-image-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-none"
          aria-live="polite"
          aria-label="Loading Oscar Weddings Visual Archive"
        >
          {/* Top Bar Label */}
          <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-[#736B63] font-light">
            <span>OSCAR WEDDINGS</span>
            <span>KERALA · ARCHIVE 2026</span>
          </div>

          {/* Center Brand & Progress Meter */}
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-sm px-4">
            <OscarLogo theme="dark" variant="full" />

            <p
              className="text-xs sm:text-sm font-serif italic text-[#B4ACA1] tracking-wide font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Stories of love, beautifully remembered.
            </p>

            {/* Hairline Progress Meter */}
            <div className="w-48 sm:w-56 space-y-3 pt-2">
              <div className="w-full h-[1px] bg-[#22201E] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-[#FAF8F5]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />
              </div>

              {/* Monospace progress counter */}
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#8C8479]">
                <span>PREPARING GALLERY</span>
                <span className="text-[#FAF8F5]">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footnote with delicate pulsing indicator */}
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#5A544D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C8479] animate-pulse" />
            <span>FINE ART PHOTOGRAPHY &amp; CINEMA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
