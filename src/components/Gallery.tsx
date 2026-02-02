"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

// --- STAR DATA ---
// 150 stars with randomized size for a "deep space" effect
const stars = Array.from({ length: 150 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 0.7 + 0.5,
  opacity: Math.random() * 0.7 + 0.3, 
  delay: `${Math.random() * 5}s`,
  duration: Math.random() * 3 + 2, 
}));

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 1. DATA
  const baseItems = [
    { color: "rgba(244, 170, 200, 1)", img: "https://images.unsplash.com/photo-1518005020951-ecc8591883b8?w=800&q=80" },
    { color: "rgba(45, 186, 233, 1)", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80" },
    { color: "rgba(214, 221, 244, 1)", img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80" },
    { color: "rgba(82, 119, 192, 1)", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80" },
    { color: "rgba(138, 218, 245, 1)", img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80" },
    { color: "rgba(203, 215, 193, 1)", img: "https://images.unsplash.com/photo-1521185496955-15097b20c5fe?w=800&q=80" },
    { color: "rgba(91, 209, 250, 1)", img: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=800&q=80" },
  ];

  const marqueeItems = [
    ...baseItems, ...baseItems, ...baseItems, ...baseItems,
    ...baseItems, ...baseItems, ...baseItems, ...baseItems
  ];

  const rowCount = 7;
  const rows = Array.from({ length: rowCount });
  const holePath = "M 50, 48 H 54 C 56, 48, 56, 52, 54, 52 H 46 C 44, 52, 44, 48, 46, 48 Z";

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
      },
    });

    gsap.set("#goggleImage", { transformOrigin: "center center" });
    gsap.set("#maskHole", { transformOrigin: "center center" });

    // Initial State
    gsap.set(gridRef.current, { opacity: 0, scale: 0.5 });

    tl
    .to("#maskHole", {
      scale: 85,
      duration: 5,
      ease: "power2.inOut", 
    })
    .to("#goggleImage", {
      scale: 85,
      opacity: 0,
      duration: 5,
      ease: "power2.inOut",
    }, "<")
    .to("#maskLayer", {
      opacity: 0,
      duration: 1,
      ease: "power1.out"
    }, "-=1")
    .to(gridRef.current, {
      opacity: 1,
      scale: 1,
      duration: 6,
      ease: "power2.out"
    }, "<")
    .to({}, { duration: 2 })
    .to(gridRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 2,
      ease: "power2.in"
    });

    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      const direction = i % 2 === 0 ? 1 : -1;
      const duration = 150 + (i * 20);
      gsap.set(row, { xPercent: direction === 1 ? -50 : 0 });
      const tween = gsap.to(row, {
        xPercent: direction === 1 ? 0 : -50,
        ease: "none",
        duration: duration,
        repeat: -1,
      });
      row.addEventListener("mouseenter", () => tween.pause());
      row.addEventListener("mouseleave", () => tween.play());
    });
  }, { scope: containerRef });

  // RENDERER
  const renderStars = () => (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: star.delay,
            borderRadius: '50%',
            // Only add a glow to the larger stars
            boxShadow: star.size > 1.2 ? '0 0 3px 0.5px rgba(255, 255, 255, 0.6)' : 'none',
          }}
        ></div>
      ))}
    </>
  );

  return (
    <ReactLenis root>
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          
          .image-grid-container {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 150vmax;
              height: 150vmax;
              transform: translate(-50%, -50%) rotateX(45deg) rotateZ(45deg);
              perspective: 1000px;
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              z-index: 10;
              justify-content: center;
              align-items: center;
              opacity: 0; 
              will-change: transform, opacity;
          }

          @media (min-width: 768px) {
            .image-grid-container {
               width: 300vmax;
               height: 300vmax;
               gap: 4rem;
            }
          }

          .tile-link {
            display: block;
            position: relative;
            cursor: pointer;
          }

          .tile-img {
            display: block;
            width: 90vw; 
            height: 30vh; 
            object-fit: cover;
            border-radius: 12px;
            position: relative;
            transition: all 0.25s ease-out; 
            will-change: transform, box-shadow;
            box-shadow: 0 0 0 rgba(0,0,0,0); 
          }

          @media (min-width: 768px) {
            .tile-img {
               width: 600px; 
               height: 400px;
               border-radius: 24px;
            }
          }

          .tile-link:hover .tile-img {
            transform: scale(1.02);
            z-index: 50;
            box-shadow: 
              5px 5px var(--shadow-color-40),
              10px 10px var(--shadow-color-30), 
              15px 15px var(--shadow-color-20);
          }
        `}</style>

        {/* --- LAYER 1: DEEP BACKGROUND STARS (z-0) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           {renderStars()}
        </div>

        {/* --- LAYER 2: GRID (z-10) --- */}
        <div ref={gridRef} className="image-grid-container">
          {rows.map((_, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => { rowsRef.current[rowIndex] = el; }}
              className="flex gap-4 md:gap-16 w-max will-change-transform"
              style={{ marginLeft: rowIndex % 2 === 0 ? '-150px' : '0px' }}
            >
              {marqueeItems.map((item, imgIndex) => {
                const colorBase = item.color.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',');
                const style = {
                  '--shadow-color-40': `rgba(${colorBase}, 0.4)`,
                  '--shadow-color-30': `rgba(${colorBase}, 0.3)`,
                  '--shadow-color-20': `rgba(${colorBase}, 0.2)`,
                  backgroundColor: item.color
                } as React.CSSProperties;

                return (
                  <div key={`${rowIndex}-${imgIndex}`} className="flex-shrink-0">
                    <a className="tile-link" href="#">
                      <img src={item.img} alt="gallery-tile" className="tile-img" style={style} />
                    </a>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* --- LAYER 3: MASK OVERLAY (z-50) --- */}
        <div id="maskLayer" className="absolute inset-0 z-50 h-full w-full pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="theMask">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                <path id="maskHole" d={holePath} fill="black" />
              </mask>
            </defs>
            
            {/* Masked Group */}
            <g mask="url(#theMask)">
               <rect width="100%" height="100%" fill="black" />
               {/* FIX: Removed xmlns attribute from the div below.
                  This fixes the TypeScript error while keeping the stars.
               */}
               <foreignObject x="0" y="0" width="100" height="100">
                  <div className="w-full h-full relative overflow-hidden">
                     {renderStars()}
                  </div>
               </foreignObject>
            </g>

            <image
              id="goggleImage"
              href="/assets/images/appleV.svg"
              x="33" y="36" width="33" height="31"
              className="origin-center"
            />
          </svg>
        </div>
      </section>
    </ReactLenis>
  );
};

export default Gallery;