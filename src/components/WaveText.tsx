'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface WaveTextProps {
  text: string;
  className?: string;
}

export const WaveText: React.FC<WaveTextProps> = ({ text, className = '' }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Break text into individual span elements
  const breakTheText = (element: HTMLHeadingElement) => {
    const h1Text = element.textContent || '';
    const splitText = h1Text.split('');
    const clutter = splitText
      .map((char) => `<span>${char}</span>`)
      .join('');
    element.innerHTML = clutter;
  };

  // Wave animation effect
  const waveTextAnimation = () => {
    if (!h1Ref.current) return;

    const h1 = h1Ref.current;
    const originalText = h1.getAttribute('data-text') || h1.textContent;

    if (!h1.getAttribute('data-text')) {
      h1.setAttribute('data-text', originalText || '');
    }

    h1.textContent = originalText;
    breakTheText(h1);

    const spans = h1.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;

    // Kill existing animations
    gsap.killTweensOf(spans);

    // Animate each character
    spans.forEach((span, i) => {
      const distance = Math.abs(i);
      const delay = distance * 0.08;

      // Y position and opacity animation
      gsap.from(span, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        delay: delay,
        ease: 'back.out(1.5)',
        overwrite: 'auto',
      });

      // Rotation animation
      gsap.from(span, {
        rotationX: 90,
        duration: 0.7,
        delay: delay,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  };

  useEffect(() => {
    if (h1Ref.current) {
      h1Ref.current.setAttribute('data-text', text);
      breakTheText(h1Ref.current);
    }
  }, [text]);

  const handleMouseEnter = () => {
    waveTextAnimation();
  };

  return (
    <div
      ref={boxRef}
      className={`cursor-pointer px-10 py-5 bg-white/10 border-2 border-white/30 rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-1 hover:shadow-lg backdrop-blur-md ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      <h1
        ref={h1Ref}
        className="text-5xl font-bold text-white tracking-tight whitespace-nowrap leading-none m-0"
      >
        {text}
      </h1>
    </div>
  );
};
