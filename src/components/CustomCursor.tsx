import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Helper to reliably check if device is a desktop mouse/trackpad environment (fine pointer + hover capability)
const checkIsDesktopDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  const isDesktopWidth = window.innerWidth >= 1024;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  return isDesktopWidth && hasFinePointer && canHover;
};

// Precise luminance and background theme detector
const getBackgroundTheme = (x: number, y: number): 'dark' | 'light' => {
  if (typeof document === 'undefined') return 'dark';

  // Since CustomCursor has pointer-events: none, elementFromPoint returns the true element underneath
  let el = document.elementFromPoint(x, y) as HTMLElement | null;

  while (el && el !== document.body && el !== document.documentElement) {
    // 1. Explicit data-theme tag on section or element
    const dataTheme = el.getAttribute('data-theme');
    if (dataTheme === 'dark' || dataTheme === 'light') {
      return dataTheme;
    }

    // 2. Explicit class-name detection for dark vs light surfaces
    const classes = el.className;
    if (typeof classes === 'string') {
      if (
        classes.includes('bg-[#0A0A0A]') ||
        classes.includes('bg-[#070706]') ||
        classes.includes('bg-[#070707]') ||
        classes.includes('bg-[#0E0D0C]') ||
        classes.includes('bg-[#141312]') ||
        classes.includes('bg-[#171615]') ||
        classes.includes('bg-[#121110]') ||
        classes.includes('bg-black')
      ) {
        return 'dark';
      }
      if (
        classes.includes('bg-[#FAF7F2]') ||
        classes.includes('bg-[#FAF8F5]') ||
        classes.includes('bg-[#FAF9F6]') ||
        classes.includes('bg-[#EAE6DF]') ||
        classes.includes('bg-[#F3EFEA]') ||
        classes.includes('bg-white')
      ) {
        return 'light';
      }
    }

    // 3. Computed background-color and luminance analysis
    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor;

    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

        // If background has meaningful opacity, calculate relative luminance
        if (a >= 0.2) {
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          return lum < 135 ? 'dark' : 'light';
        }
      }
    }

    el = el.parentElement;
  }

  return 'dark'; // Fallback for root
};

export const CustomCursor: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [cursorLabel, setCursorLabel] = useState('');
  const [hoverType, setHoverType] = useState<'default' | 'image' | 'button' | 'text'>('default');

  // Motion values for ultra-smooth fluid cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring fluid trailing
  const springConfig = { damping: 26, stiffness: 320, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // High-precision springs for pinpoint center dot (instantaneous feedback)
  const dotSpringConfig = { damping: 42, stiffness: 1200, mass: 0.05 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  const lastCoordsRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  // Update background theme based on coordinates
  const updateTheme = useCallback((x: number, y: number) => {
    if (x < 0 || y < 0) return;
    const theme = getBackgroundTheme(x, y);
    setIsDarkBg(theme === 'dark');
  }, []);

  useEffect(() => {
    const updateDeviceType = () => {
      const desktop = checkIsDesktopDevice();
      setIsDesktop(desktop);
      if (!desktop) {
        document.documentElement.classList.remove('custom-cursor-active');
        setIsVisible(false);
      }
    };

    updateDeviceType();

    window.addEventListener('resize', updateDeviceType, { passive: true });
    window.addEventListener('orientationchange', updateDeviceType, { passive: true });

    return () => {
      window.removeEventListener('resize', updateDeviceType);
      window.removeEventListener('orientationchange', updateDeviceType);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastCoordsRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check background luminance under cursor position
      updateTheme(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (lastCoordsRef.current.x >= 0 && lastCoordsRef.current.y >= 0) {
        updateTheme(lastCoordsRef.current.x, lastCoordsRef.current.y);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, [role="button"], input, textarea, select, img, .cursor-pointer, [data-cursor], [data-cursor="hover"], [data-cursor-text]'
      );

      if (interactive) {
        setIsHovered(true);

        const customText =
          interactive.getAttribute('data-cursor-text') ||
          (interactive.getAttribute('data-cursor') !== 'hover' &&
          interactive.getAttribute('data-cursor') !== 'image' &&
          interactive.getAttribute('data-cursor') !== 'button'
            ? interactive.getAttribute('data-cursor')
            : null);

        const isImg = target.closest('img, .editorial-img-wrapper, [data-cursor="image"]');

        if (customText) {
          setHoverType('text');
          setCursorLabel(customText);
        } else if (isImg && !target.closest('#hero')) {
          setHoverType('image');
          setCursorLabel('VIEW');
        } else {
          setHoverType('button');
          setCursorLabel('');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Activate custom cursor styling on desktop
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isDesktop, isVisible, mouseX, mouseY, updateTheme]);

  // Render nothing on mobile, tablet, or touch-first devices
  if (!isDesktop) {
    return null;
  }

  // Calculate dynamic dimensions
  const ringSize = isHovered ? (cursorLabel ? 60 : 48) : 30;

  return (
    <div
      id="custom-minimalist-cursor"
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      {/* Outer Fluid Trailing Ring with Pure White / Black Dynamic Adaptation */}
      <motion.div
        className="absolute rounded-full pointer-events-none flex items-center justify-center top-0 left-0"
        style={{
          x: smoothX,
          y: smoothY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: isDarkBg
            ? isHovered
              ? 'rgba(255, 255, 255, 0.92)'
              : 'rgba(255, 255, 255, 0.55)'
            : isHovered
            ? 'rgba(18, 16, 14, 0.92)'
            : 'rgba(18, 16, 14, 0.55)',
          backgroundColor: isDarkBg
            ? isHovered
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(255, 255, 255, 0.02)'
            : isHovered
            ? 'rgba(18, 16, 14, 0.10)'
            : 'rgba(18, 16, 14, 0.02)',
          transition:
            'border-color 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.22s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        animate={{
          scale: isPressed ? 0.82 : isHovered ? 1.08 : 1,
          borderWidth: '1px',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 24,
          mass: 0.2,
        }}
      >
        {/* Editorial Text Badge (VIEW or custom action) */}
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-serif italic text-[10px] tracking-[0.22em] uppercase font-light select-none text-center leading-none"
            style={{
              color: isDarkBg ? '#FFFFFF' : '#12100E',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              transition: 'color 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Pinpoint Precision Center Dot with Pure White / Black Dynamic Inversion */}
      <motion.div
        className="absolute rounded-full pointer-events-none top-0 left-0"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 3.5 : 4.5,
          height: isHovered ? 3.5 : 4.5,
          backgroundColor: isDarkBg ? '#FFFFFF' : '#12100E',
          boxShadow: isDarkBg
            ? '0 0 6px rgba(255, 255, 255, 0.45)'
            : '0 0 4px rgba(0, 0, 0, 0.25)',
          transition:
            'background-color 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        animate={{
          scale: isPressed ? 0.6 : 1,
          opacity: cursorLabel ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 32,
        }}
      />
    </div>
  );
};
