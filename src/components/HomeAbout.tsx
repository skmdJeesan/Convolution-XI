"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
// Import the desktop image
import AboutBlackhole from "../assets/images/AboutBlackhole.jpg";

// --- 1. SPARKLES COMPONENT ---
const Sparkles = ({
  density = 80, // Increased density slightly
  speed = 0.5,
  minSize = 0.6,
  maxSize = 2.2 // Increased max size for brighter effect
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedY: number;
      speedX: number;
      opacitySpeed: number;
      brightness: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random(),
          speedY: (Math.random() - 0.5) * speed,
          speedX: (Math.random() - 0.5) * speed,
          opacitySpeed: Math.random() * 0.02 + 0.005,
          // BRIGHTNESS: Multiplier increased (1.0 to 2.0) for stronger glow
          brightness: Math.random() * 1.0 + 1.0, 
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        p.opacity += p.opacitySpeed;
        if (p.opacity > 1 || p.opacity < 0.2) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // CALCULATION: Allow opacity to go slightly above 1 visually using brightness
        const visualOpacity = Math.min(Math.abs(p.opacity) * p.brightness, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${visualOpacity})`;
        
        // GLOW: Add shadow to larger/brighter stars
        if (p.size > 1.5) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset for next particle
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [density, speed, minSize, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// --- 2. REUSABLE TYPEWRITER COMPONENT ---
const Typewriter = ({
  text,
  start,
  speed = 30,
  onComplete,
  showCursor = true,
  className = "",
  cursorClassName = "bg-cyan-400"
}: {
  text: string;
  start: boolean;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  className?: string;
  cursorClassName?: string;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!start) return;

    if (displayedText.length === 0 && text.length > 0) {
      setIsComplete(false);
    }

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete(); 
    }
  }, [start, displayedText, text, speed, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className={`inline-block ml-1 w-[3px] md:w-[4px] h-[0.9em] align-middle ${cursorClassName}`}
        />
      )}
    </span>
  );
};

// --- 3. MAIN COMPONENT ---
export default function HomeAbout() {
  const [phase, setPhase] = useState(0);
  const [isAboutTyped, setIsAboutTyped] = useState(false);
  
  const [isMobileOrTab, setIsMobileOrTab] = useState(false);
  const [isIpadPro, setIsIpadPro] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobileOrTab(width < 1280);
      setIsIpadPro(width >= 1024 && width < 1280);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (isInView && phase === 0) {
      const timer = setTimeout(() => setPhase(1), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, phase]);

  const paragraphText =
    "At Convo 25 Lution, we bridge the gap between organic cognition and synthetic processing. We envision a future defined by the seamless integration of technology and humanity, unlocking unprecedented possibilities for innovation.";

  return (
    <ReactLenis root>
      <div
        ref={containerRef}
        className="relative w-full h-screen bg-black overflow-hidden font-sans flex items-center justify-center selection:bg-cyan-500/30"
      >
        {/* --- LAYER 0: SPARKLES (Deepest Layer) --- */}
        <Sparkles density={100} speed={0.2} minSize={0.8} maxSize={2.5} />

        {/* --- LAYER 1: BACKGROUND GRADIENT --- */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] z-0 pointer-events-none" />

        {/* --- LAYER 2: IMAGES & BLOCKER --- */}
        <motion.div
          className="absolute bottom-0 xl:bottom-[0%] right-0 xl:right-[-5%] w-full xl:w-[60vw] z-10 flex items-end justify-center xl:block pointer-events-none"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="w-full h-full flex justify-center items-end relative"
          >
            {/* --- BLOCKER DIV --- 
               This black circle sits BEHIND the image but ABOVE the sparkles (z-0).
               It prevents stars from being visible through the transparent/black parts of the image.
            */}
            <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-black rounded-full blur-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

            {/* Desktop Image */}
            <Image
              src={AboutBlackhole}
              alt="Event Horizon"
              className="hidden xl:block object-contain mix-blend-screen relative z-10"
              priority
            />

            {/* Mobile/Tablet Image */}
            <Image
              src="/assets/images/HomeAboutPhonebg.jpg"
              width={500}
              height={800}
              alt="Mobile Background"
              className="block xl:hidden object-cover w-full h-auto mix-blend-screen contrast-125 brightness-90 translate-y-4 opacity-100 md:opacity-70 relative z-10"
              priority
            />
          </motion.div>
        </motion.div>

        {/* --- LAYER 3: TEXT CONTENT (Top Layer) --- */}
        <motion.div
          className="absolute z-40"
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 1.5 }}
          animate={
            phase >= 2 
              ? { 
                  top: "12%", 
                  left: isIpadPro ? "3.8%" : (isMobileOrTab ? "4%" : "8%"), 
                  x: "0%", 
                  y: "0%", 
                  scale: 1 
                } 
              : { top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 1.5 }
          }
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          onAnimationComplete={() => { if (phase === 2) setPhase(3); }}
        >
          <h1 className="font-bold text-white tracking-tighter text-6xl md:text-8xl lg:text-9xl whitespace-nowrap drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            <Typewriter
              text="ABOUT"
              start={phase >= 1}
              speed={60}
              showCursor={!isAboutTyped}
              onComplete={() => {
                setIsAboutTyped(true);
                setTimeout(() => setPhase(2), 500);
              }}
            />
          </h1>
        </motion.div>

        <motion.div
          className="absolute top-[22%] left-[4%] xl:left-[8%] xl:top-[32%] z-30 max-w-xl text-left pr-4 xl:pr-0"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-1 bg-cyan-500 mb-6"
            initial={{ width: 0 }}
            animate={phase >= 3 ? { width: 200 } : { width: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
          />

          <div className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed min-h-[200px] tracking-wide">
            <Typewriter
              text={paragraphText}
              start={phase === 3}
              speed={15}
              showCursor={true}
            />
          </div>
        </motion.div>
      </div>
    </ReactLenis>
  );
}