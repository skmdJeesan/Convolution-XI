"use client";
import React, { useEffect, useState } from 'react';

export default function ParticlesBackground({ theme = 'snow' }: { theme?: 'snow' | 'scifi' }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 4 + 3}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.6 + 0.2,
        size: `${Math.random() * 8 + 4}px`,
      }));
      setParticles(newParticles);
    };
    createParticles();
  }, []);

  const isScifi = theme === 'scifi';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${isScifi ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white blur-[1px]'}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            top: '-5%',
            animation: `fall ${p.animationDuration} linear infinite`,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall {
          0% { transform: translateY(-5vh) translateX(0) rotate(0deg); }
          100% { transform: translateY(105vh) translateX(30px) rotate(360deg); }
        }
      `}} />
    </div>
  );
}