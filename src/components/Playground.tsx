'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'

// Dynamically import WhiteBot with SSR disabled
const WhiteBot = dynamic(() => import("@/components/WhiteBot"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black" />, // Optional placeholder while downloading
});

const Playground = () => {
  const [shouldLoadBot, setShouldLoadBot] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setShouldLoadBot(true);
      } else {
        setShouldLoadBot(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {shouldLoadBot && <WhiteBot />} 
    </>
  )
}

export default Playground