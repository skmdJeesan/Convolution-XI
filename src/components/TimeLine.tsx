'use client';

import React, { useState, useEffect } from 'react';
import DesktopTimeline from './DesktopTimeline';
import TabletTimeline from './TabletTimeline';
import MobileTimeline from './MobileTimeline';

const Timeline = () => {
  // 1. Initialize with null or a default to prevent hydration mismatch
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    // 2. Only run this on the client
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Prevent rendering until we know the screen size (avoids hydration errors)
  if (windowWidth === null) {
     return <div className="min-h-screen bg-[#050505]"></div>; 
  }

  return (
    <div id='timeline'>
      {/* RENDER LOGIC: Only ONE component exists at a time */}
      
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