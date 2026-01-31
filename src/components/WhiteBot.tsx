'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

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
      window.removeEventListener('resize', checkDevice);
      observer.disconnect();
    };
  }, []);

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
    if (isInView) {
      splineApp.play();
    } else {
      splineApp.stop();
    }
  }

  // Mobile check
  if (!hasMounted || isMobile === true) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full h-screen bg-black relative">
      <Spline
        onLoad={onLoad}
        // I updated this to match the file name in your commit logs
        scene="/r_4_x_bot.spline" 
        className="w-full h-full"
      />
      <div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-black via-black/100 to-transparent z-50 pointer-events-none" />
    </div>
  );
}