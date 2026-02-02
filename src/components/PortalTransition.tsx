"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shaderMaterial } from "@react-three/drei";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. THE CUSTOM FIRE SHADER ---
// This creates the Cyan/Pink pulsing energy effect
const FireMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("#00FFFF"), // Cyan
    uColor2: new THREE.Color("#FF00FF"), // Pink/Magenta
  },
  // Vertex Shader (Shape logic)
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Color/Fire logic)
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    // Simple noise function
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      // Create moving noise pattern
      float n = noise(vUv * 10.0 + uTime * 2.0);
      
      // Mix the two colors based on noise
      vec3 finalColor = mix(uColor1, uColor2, n);
      
      // Add a "glow" falloff so edges are brighter
      float strength = 1.5; 
      
      gl_FragColor = vec4(finalColor * strength, 1.0);
    }
  `
);

extend({ FireMaterial });

// --- 2. THE 3D RING COMPONENT ---
const EnergyRing = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Animate the shader time (makes the fire move)
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
    }
  });

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    // GSAP Timeline synced to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container", // The HTML div wrapping the page
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
    });

    tl.to(meshRef.current.rotation, {
      x: Math.PI / 2, // Rotate 90 deg (XY plane -> XZ plane)
      z: Math.PI * 2, // Spin around while flipping
      ease: "power1.inOut",
      duration: 5,
    })
    .to(meshRef.current.scale, {
      x: 30, // Scale HUGE to cover screen
      y: 30,
      z: 30,
      ease: "power2.in", // Accelerate at the end
      duration: 5,
    }, "<"); // Run simultaneously
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Torus: Radius, Tube Thickness, RadialSegments, TubularSegments */}
      <torusGeometry args={[1.5, 0.4, 32, 100]} />
      {/* @ts-ignore */}
      <fireMaterial ref={materialRef} transparent />
    </mesh>
  );
};

// --- 3. THE MAIN EXPORT ---
export default function PortalScene() {
  return (
    <div className="relative w-full">
      
      {/* 3D Canvas Fixed in Background */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <EnergyRing />
        </Canvas>
      </div>

      {/* Scrollable Container (The "Track") */}
      <div id="scroll-container" className="relative z-20">
        
        {/* Section 1: Intro */}
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-white text-6xl font-bold mix-blend-difference">
            SCROLL TO ENTER
          </h1>
        </div>

        {/* Section 2: Spacer for animation */}
        <div className="h-[200vh]"></div>

        {/* Section 3: The "Portal" Destination */}
        <div className="h-screen bg-black flex items-center justify-center">
           <div className="text-center">
             <h2 className="text-cyan-400 text-5xl font-mono mb-4">WELCOME TO CONVOLUTION</h2>
             <p className="text-pink-500 text-xl">The Portal is Open.</p>
           </div>
        </div>
      </div>

    </div>
  );
}