"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Define the move handler
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // We use transform for hardware acceleration (smoother than top/left)
        // We subtract half the size (16px) to center the cursor on the mouse
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };

    // 2. Add event listener
    window.addEventListener("mousemove", moveCursor);

    // 3. Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
      style={{
        // Hardware acceleration hints
        willChange: "transform",
        // Hide default cursor interaction
        pointerEvents: "none", 
      }}
    />
  );
}