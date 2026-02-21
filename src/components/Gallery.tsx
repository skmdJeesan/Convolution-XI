"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import "../app/gallery.css";

// 1. Define Data Structure: Keeps the JSX clean and allows specific styling (big vs small)
const galleryImages = [
  { src: "/Galleria/1.jpg", isBig: true },
  { src: "/Galleria/2.jpg", isBig: false },
  { src: "/Galleria/3.jpg", isBig: false },
  { src: "/Galleria/4.JPG", isBig: true },
  { src: "/Galleria/5.jpg", isBig: true },
  { src: "/Galleria/6.jpg", isBig: true },
  { src: "/Galleria/7.jpg", isBig: false },
  { src: "/Galleria/8.jpg", isBig: true },
  { src: "/Galleria/9.jpg", isBig: true },
  { src: "/Galleria/10.jpg", isBig: false },
  { src: "/Galleria/11.jpg", isBig: false },
  { src: "/Galleria/12.jpg", isBig: true },
  { src: "/Galleria/13.jpg", isBig: true },
  { src: "/Galleria/14.jpg", isBig: true },
  { src: "/Galleria/15.jpg", isBig: false },
  { src: "/Galleria/16.jpg", isBig: false },
  { src: "/Galleria/17.jpg", isBig: true },
  { src: "/Galleria/18.jpg", isBig: false },
  { src: "/Galleria/19.jpg", isBig: true },
  { src: "/Galleria/20.jpg", isBig: true },
  { src: "/Galleria/21.jpg", isBig: true },
  { src: "/Galleria/22.jpg", isBig: false },
  { src: "/Galleria/23.webp", isBig: false },
  { src: "/Galleria/24.jpg", isBig: false },
  { src: "/Galleria/25.jpg", isBig: true },
  { src: "/Galleria/26.jpg", isBig: false },
];

const Gallery = () => {
  // 2. Double the array for seamless scrolling
  // We do this in JS, not DOM manipulation, to respect React's lifecycle
  const scrollerContent = [...galleryImages, ...galleryImages];

  // 3. Setup the Ref and InView hook
  const containerRef = useRef(null);
  // 'amount: 0.3' means the animation starts when 30% of the gallery is visible
  // 'once: false' ensures it pauses/plays every time you scroll away/back
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  return (
    <div id="gallery" className="relative min-h-[95vh] w-full py-10 bg-black overflow-hidden">
      
      {/* Background*/}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020203]"></div>
        <div className="absolute bottom-0 left-0 bg-linear-to-t from-black/90 to-transparent h-15 w-full pointer-events-none z-69"></div>
        <div 
        className="absolute inset-0"
        style={{
            background: 'linear-gradient(to bottom, rgba(5, 0, 19, 1) 0%,rgba(72, 33, 103, 0.25) 15%,rgba(115, 12, 197, 0.25) 25%, rgba(170, 37, 178, 0.25) 40%,   rgba(145, 54, 150, 0.25) 50%,rgba(105, 13, 177, 0.25) 65%, rgba(73, 19, 114, 0.25) 75%,rgba(70, 21, 109, 0.25) 90%, rgba(13, 13, 22, .4) 100%)'
        }}
    ></div>
        <div
          className="absolute inset-0 opacity-[0.13] md:opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center pointer-events-none select-none mb-6"
      >
        <h1 className="font-orbitron font-bold text-center text-3xl sm:text-4xl tracking-wide text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
          Gallery
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
        </h1>
      </motion.div>

      <div ref={containerRef} className="outer-container-scroll galleryContainer relative z-10 w-full">
        <div 
          className="scroller" 
          data-direction="left" 
          data-speed="fast" 
          data-animated="true"
          data-play-state={isInView ? "running" : "paused"}
        >
          <div className="scroller__inner">
            {scrollerContent.map((item, index) => (
              <div
                key={index}
                className={`item ${item.isBig ? 'big' : ''} relative w-full h-full group`}
              >
                <Image 
                  src={item.src} 
                  alt="Gallery Item"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 33vw, 20vw"
                  loading={index < 10 ? "eager" : "lazy"}
                  // Placeholder blur helps perceived performance
                  placeholder="empty" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;


{/* <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-fuchsia-900/15 blur-[100px] rounded-full mix-blend-screen will-change-transform"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-purple-900/50 blur-[100px] rounded-full mix-blend-screen will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[70vh] bg-cyan-900/20 blur-[100px] rounded-full mix-blend-screen will-change-transform"></div> */}