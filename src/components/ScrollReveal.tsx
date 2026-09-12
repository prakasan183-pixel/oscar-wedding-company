import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  amount?: number | 'some' | 'all';
}

/**
 * ScrollReveal:
 * Delivers an understated, quiet-luxury reveal animation when a section or element
 * enters the viewport for the first time. Uses gentle editorial vertical drift,
 * silky cubic-bezier easing, and zero re-triggering (once: true).
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  y = 28,
  className = '',
  amount = 0.15,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
