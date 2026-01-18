'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseWaveTextProps {
  scrub?: number | boolean;
  yoyo?: boolean;
  markers?: boolean;
}

interface UseWaveTextReturn {
  ref: React.RefObject<HTMLElement | null>;
  breakTheText: () => void;
}

// Custom hook for Animation triggers and syncs with scroll - wavy pop-up effect

export const useWaveText = (options: UseWaveTextProps = {}): UseWaveTextReturn => {
  const ref = useRef<HTMLElement>(null);
  const { scrub = 1, yoyo = false, markers = false } = options;
  const isInitialized = useRef(false);

  const breakTheText = useCallback(() => {
    if (!ref.current) return;

    const element = ref.current;
    const h1Text = element.getAttribute('data-text') || element.textContent || '';
    const splitText = h1Text.split('');
    const clutter = splitText
      .map((char) => `<span style="display: inline-block;">${char}</span>`)
      .join('');
    element.innerHTML = clutter;
  }, []);

  const waveTextAnimation = useCallback(() => {
    if (!ref.current) return;

    const element = ref.current;
    const spans = element.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;

    if (spans.length === 0) return;

    // Kill existing animations
    gsap.killTweensOf(spans);

    // Create timeline for synchronized animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element.parentElement, // Use parent div as trigger
        start: 'top 100%',
        end: 'top 40%',
        scrub: scrub,
        markers: markers,
      },
    });

    // Animate each character with wave effect
    spans.forEach((span, i) => {
      const distance = Math.abs(i);
      const delayFactor = distance * 0.05;

      tl.from(
        span,
        {
          y: 90,
          opacity: 0,
          
          rotationX: 90,
          duration: 1,
          ease: 'back.out(1.8)',
          yoyo: yoyo,
        },
        delayFactor
      );

      tl.from(
        span,
        {
          rotationZ: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          yoyo: yoyo,
        },
        delayFactor
      );
    });
  }, [scrub, yoyo, markers]);

  // Initialize animation on mount
  useEffect(() => {
    if (!ref.current || isInitialized.current) return;

    const element = ref.current;

    // Store original text in data attribute
    if (!element.getAttribute('data-text') && element.textContent) {
      element.setAttribute('data-text', element.textContent);
    }

    // Break text on mount
    breakTheText();
    isInitialized.current = true;
  }, [breakTheText]);

  // Setup scroll animation
  useEffect(() => {
    if (!ref.current || !isInitialized.current) return;

    const timeoutId = setTimeout(() => {
      waveTextAnimation();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === ref.current?.parentElement) {
          trigger.kill();
        }
      });
    };
  }, [waveTextAnimation]);

  return {
    ref,
    breakTheText,
  };
};