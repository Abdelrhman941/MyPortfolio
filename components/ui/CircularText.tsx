import { useState } from 'react';
import { motion } from 'motion/react';
import './CircularText.css';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers';
  className?: string;
}

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }: CircularTextProps) => {
  const letters = Array.from(text);
  const [isHovering, setIsHovering] = useState(false);

  let duration = spinDuration;
  
  if (isHovering) {
    switch (onHover) {
      case 'speedUp':
        duration = spinDuration / 4;
        break;
      case 'slowDown':
        duration = spinDuration * 2;
        break;
      case 'goBonkers':
        duration = spinDuration / 20;
        break;
      case 'pause':
        duration = 0;
        break;
      default:
        duration = spinDuration;
    }
  }

  return (
    <motion.div
      className={`circular-text ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: duration || 20,
        repeat: duration > 0 ? Infinity : 0,
        ease: 'linear'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
