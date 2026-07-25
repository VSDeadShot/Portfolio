"use client";

import { motion, Variants } from 'framer-motion';
import { useMemo } from 'react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>;
  easing?: number[] | string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = [0.22, 1, 0.36, 1],
  onAnimationComplete,
  stepDuration = 0.28
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(8px)', opacity: 0, y: -14 } : { filter: 'blur(8px)', opacity: 0, y: 14 },
    [direction]
  );
  const defaultTo = useMemo(() => ({ filter: 'blur(0px)', opacity: 1, y: 0 }), []);

  const fromState = animationFrom ?? defaultFrom;
  const toState = animationTo ?? defaultTo;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000
      }
    }
  };

  const childVariants: Variants = {
    hidden: fromState,
    visible: {
      ...toState,
      transition: { duration: stepDuration, ease: easing as any }
    }
  };

  return (
    <motion.div
      className={`${className} flex flex-wrap`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin as any }}
    >
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={index}
          variants={childVariants}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment === ' ' ? ' ' : segment}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
