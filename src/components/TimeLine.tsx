'use client';

import React, { useState, useEffect } from 'react';
import DesktopTimeline from './DesktopTimeline';
import TabletTimeline from './TabletTimeline';
import MobileTimeline from './MobileTimeline';

const Timeline = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowWidth === null) {
     return <div className="min-h-screen bg-[#050505]"></div>; 
  }

  return (
    
    <div id='timeline'>
      
      {/* Desktop: > 1024px */}
      {windowWidth > 1024 && (
        <DesktopTimeline />
      )}

      {/* Tablet: 768px - 1024px */}
      {windowWidth >= 768 && windowWidth <= 1024 && (
        <TabletTimeline />
      )}

      {/* Mobile: < 768px */}
      {windowWidth < 768 && (
        <MobileTimeline />
      )}
    </div>
  );
};

export default Timeline;