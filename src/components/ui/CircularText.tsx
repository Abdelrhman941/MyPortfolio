import { motion } from 'motion/react';
import { useState } from 'react';

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
      style={{
        margin: '0 auto',
        borderRadius: '50%',
        width: '200px',
        position: 'relative',
        height: '200px',
        fontWeight: 900,
        color: '#fff',
        textAlign: 'center',
        cursor: 'pointer',
        transformOrigin: '50% 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            style={{
              transform,
              WebkitTransform: transform,
              position: 'absolute',
              display: 'inline-block',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              fontSize: '14px',
              transition: 'all 0.5s cubic-bezier(0, 0, 0, 1)',
              fontWeight: 700,
              letterSpacing: '2px'
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
