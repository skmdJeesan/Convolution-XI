'use client'
import React, { useEffect, useState } from 'react'

const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
  }, []);
  if (!mounted) return null;

  const particles = Array.from({ length: 30 }); 
  
  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
  );
  };

export default Particles