'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of Spline to ensure it runs only on client
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="text-white animate-pulse">LOADING BOT...</div>
    </div>
  ),
});

export default function WhiteBot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null); 
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Intersection Observer to pause animation when off-screen
    // This prevents the page from getting heavy/laggy when scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);

        if (splineRef.current) {
          if (entry.isIntersecting) {
            splineRef.current.play();
          } else {
            splineRef.current.stop();
          }
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
    // Initial check: if loaded but off-screen (rare), stop it immediately
    if (!isInView) {
      splineApp.stop();
    }
  }

  return (
    <div ref={containerRef} className="w-full h-screen bg-black relative">
      <Spline
        onLoad={onLoad}
        // Ensure this URL is correct and public
        scene="https://prod.spline.design/NDbRFWmhe5l1U1eN/scene.splinecode" 
        className="w-full h-full"
      />
      {/* Overlay to blend the bottom of the bot into the page */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black via-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
