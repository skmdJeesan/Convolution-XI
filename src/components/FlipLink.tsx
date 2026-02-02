import { motion } from 'motion/react'
import React, { useRef } from 'react'

function FlipLink({ children }: { children: string }) {
  const topDivRef = useRef<HTMLDivElement>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  const handleHoverStart = () => {
    if (topDivRef.current && bottomDivRef.current) {
      const topSpans = topDivRef.current.querySelectorAll('span');
      const bottomSpans = bottomDivRef.current.querySelectorAll('span');

      topSpans.forEach((span, i) => {
        span.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
          {
            duration: 250,
            delay: 25 * i,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        );
      });

      bottomSpans.forEach((span, i) => {
        span.animate(
          [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
          {
            duration: 250,
            delay: 25 * i,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        );
      });
    }
  };

  return (
    <motion.div
      
      className='relative block overflow-hidden whitespace-nowrap'
      onHoverStart={handleHoverStart}
    >
      <div ref={topDivRef}>
        {children.split('').map((l, i) => {
          return <span
            className='inline-block'
            key={i}>{l}</span>
        })}
      </div>
      <div ref={bottomDivRef} className='absolute inset-0'>
        {children.split('').map((l, i) => {
          return <span
            className='inline-block'
            key={i}>{l}</span>
        })}
      </div>
    </motion.div>
  )
}

export default FlipLink