import { motion, Variants } from 'motion/react';
import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fade',
  threshold = 0.1,
}) => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide-up' ? 40 : 0,
      x: animation === 'slide-left' ? -40 : animation === 'slide-right' ? 40 : 0,
      scale: animation === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay / 1000,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
