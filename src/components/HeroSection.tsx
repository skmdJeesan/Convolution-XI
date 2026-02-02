// 'use client'
// import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import Image from "next/image";
// import ConvoSvg from "@/assets/images/ConvoSvg.svg";
// import Artboard18 from "@/assets/images/Artboard18.svg";


// const SplineLoader = () => (
//     <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
//         <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin filter blur-[2px]"></div>
//         <div className="absolute text-cyan-500 font-mono text-[10px] md:text-sm tracking-[0.2em] animate-pulse mt-24 md:mt-32">LOADING SYSTEM</div>
//     </div>
// );

// const SplineScene = dynamic(() => import('@splinetool/react-spline'), {
//     ssr: false,
//     loading: SplineLoader
// });

// const Particles = () => {
//     const [mounted, setMounted] = useState(false);
//     useEffect(() => {
//         setMounted(true);
//     }, []);
//     if (!mounted) return null;

//     const particles = Array.from({ length: 30 }); 

//     return (
//         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//             {particles.map((_, i) => (
//                 <div
//                     key={i}
//                     className="absolute w-5 h-1 bg-purple-300 rounded-full animate-particle"
//                     style={{
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         animationDelay: `${Math.random() * 5}s`,
//                         animationDuration: `${10 + Math.random() * 10}s`,
//                         opacity: Math.random() * 0.5 + 0.2,
//                     }}
//                 />
//             ))}
//         </div>
//     );
// };

// const BackgroundGrid = () => (
//     <>
//         <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay">
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_100%)] animate-pan-grid"></div>
//             <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,#000_70%,transparent_100%)] animate-pan-grid-reverse"></div>
//         </div>

//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] bg-cyan-500/10 blur-[80px] md:blur-[150px] rounded-full z-0 pointer-events-none animate-pulse-slow" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-fuchsia-600/10 blur-[60px] md:blur-[100px] rounded-full z-0 pointer-events-none mix-blend-screen animate-pulse-slower" />
//         <div className="absolute inset-0 z-[60] pointer-events-none mix-blend-color-dodge opacity-20 bg-[url('/assets/images/noise.png')] animate-noise"></div>
//     </>
// );

// const HeadsUpDisplay = () => (
//     <>

//         <div className="absolute top-[35%] xl:top-1/3 left-[4%] z-[1] hidden md:flex flex-col gap-4 pointer-events-none text-cyan-400 text-xs tracking-widest animate-slide-in-left">
//             <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
//                 <span className="animate-typewriter">KERNEL: ACTIVE</span>
//             </div>
//             <div className="h-[2px] w-32 bg-gradient-to-r from-cyan-400 to-transparent animate-grow-width" />
//             <p className="animate-typewriter" style={{ animationDelay: '0.5s' }}>UPLINK: SECURE_CHANNEL_01</p>
//             <p className="animate-typewriter text-cyan-400/60" style={{ animationDelay: '0.8s' }}>PING: 4ms</p>
//         </div>

//         <div className="absolute bottom-[20%] xl:bottom-1/3 right-[5%] z-[1] hidden md:flex flex-col gap-4 pointer-events-none text-fuchsia-400 text-xs tracking-widest text-right items-end animate-slide-in-right">
//             <div className="flex items-center gap-2">
//                 <span className="animate-typewriter" style={{ animationDelay: '1s' }}>COGNITION_MATRIX</span>
//                 <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-pulse" />
//             </div>
//             <div className="h-[2px] w-32 bg-gradient-to-l from-fuchsia-400 to-transparent animate-grow-width" style={{ animationDelay: '0.5s' }} />
//             <p className="animate-typewriter" style={{ animationDelay: '1.5s' }}>SYNAPSE_ID: 0x8F4A</p>
//             <p className="animate-typewriter text-fuchsia-400/60" style={{ animationDelay: '1.8s' }}>VER. 2.5.0-X</p>
//         </div>

//         <div className="absolute top-0 left-0 w-full z-40 p-4 md:p-8 flex justify-end items-start pointer-events-none">
//             <div className="text-right font-mono text-[8px] md:text-[10px] text-cyan-300/50 leading-tight animate-fade-in-down md:mr-6 md:mt-4">
//             <div className='hidden md:block'>
//                 <p>{`> INIT_SEQUENCE_START`}</p>
//                 <p>{`> LOADING ASSETS... 100%`}</p>
//                 <p>{`> DECRYPTING_KEYS... OK`}</p>
//                 <p className="animate-blink text-cyan-300">{`> AWAITING_INPUT_`}</p>
//             </div>

//             </div>
//         </div>

//         {/* Scanning Corners */}
//         <div className="absolute top-4 left-4 md:top-5 md:left-5 w-16 h-16 md:w-32 md:h-32 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl md:rounded-tl-3xl pointer-events-none animate-scan-corner-tl"></div>
//         <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-32 md:h-32 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-2xl md:rounded-tr-3xl pointer-events-none animate-scan-corner-tr"></div>
//         <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-32 md:h-32 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-2xl md:rounded-bl-3xl pointer-events-none animate-scan-corner-bl"></div>
//         <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-32 md:h-32 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl md:rounded-br-3xl pointer-events-none animate-scan-corner-br"></div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
//             <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-cyan-400 animate-pulse whitespace-nowrap">SCROLL TO EXPLORE</span>
//             <div className="w-[2px] h-10 md:h-16 bg-gradient-to-b from-cyan-400 via-cyan-600 to-transparent animate-scroll-down" />
//         </div>
//     </>
// );

// // --- 2. MAIN COMPONENT ---

// function HeroSection() {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     return (
//         <div className="h-[100dvh] w-full relative overflow-hidden mx-auto bg-[#030305] font-mono selection:bg-cyan-500/30">

//             <BackgroundGrid />
//             <Particles />

//             {/* Logo */}
//             <div className="absolute top-[20%] md:top-[23%] xl:top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none select-none flex justify-center w-full">
//                 <div className="relative group animate-float w-full flex justify-center">
//                     <div className="absolute -inset-10 md:-inset-32 bg-cyan-500/30 blur-[60px] md:blur-[100px] rounded-full animate-pulse-slow" />
//                     <Image
//                         src={Artboard18}
//                         alt="Convolution Logo Center"
//                         className="w-[75vw] md:w-[70vw] xl:w-[45vw] max-w-[300px] md:max-w-5xl h-auto object-contain relative z-10 drop-shadow-[0_0_50px_rgba(6,182,212,1)] opacity-95 "
//                         priority
//                     />
//                 </div>
//             </div>

//             {/* --- LAYER 3: 3D Scene (Spline) --- */}
//             <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
//                 {isMounted && (
//                     <div className="relative w-full h-full transition-transform duration-1000 ease-out 
//                         scale-[0.75] translate-y-[10%] 
//                         md:scale-[0.90] md:translate-y-[15%]
//                         xl:scale-100 xl:translate-y-[15%]">
//                         <SplineScene 
//                             scene="https://prod.spline.design/bb7X40PsHo7K7BB5/scene.splinecode"
//                             className="w-full h-full animate-subtle-hover"
//                         />
//                     </div>
//                 )}
//             </div>

//             <HeadsUpDisplay />

//             {/* <div className="absolute bottom-0 left-0 w-full h-28 md:h-50 bg-gradient-to-t from-[#000000] via-[#030305]/80 to-transparent z-20 pointer-events-none" /> */}
//         </div>
//     );
// }

// export default HeroSection;


































// 'use client'
// import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import Image from "next/image";
// import Artboard18 from "@/assets/images/Artboard18.svg"; // Ensure this path is correct

// // --- 1. UTILITY COMPONENTS ---

// const SplineLoader = () => (
//     <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b15] z-50">
//         <div className="relative">
//             <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-b-fuchsia-500 rounded-full animate-spin"></div>
//             <div className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-widest text-xs animate-pulse">
//                 LOADING
//             </div>
//         </div>
//     </div>
// );

// const SplineScene = dynamic(() => import('@splinetool/react-spline'), {
//     ssr: false,
//     loading: SplineLoader
// });

// const Particles = () => {
//     const [mounted, setMounted] = useState(false);
//     useEffect(() => {
//         setMounted(true);
//     }, []);
//     if (!mounted) return null;

//     const particles = Array.from({ length: 35 });
//     // A more playful color palette
//     const colors = ['bg-cyan-400', 'bg-fuchsia-400', 'bg-yellow-300', 'bg-purple-400'];

//     return (
//         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//             {particles.map((_, i) => (
//                 <div
//                     key={i}
//                     className={`absolute rounded-full animate-float ${colors[i % colors.length]}`}
//                     style={{
//                         width: Math.random() * 6 + 2 + 'px', // Varying sizes (dots instead of lines)
//                         height: Math.random() * 6 + 2 + 'px',
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         animationDelay: `${Math.random() * 1}s`,
//                         animationDuration: `${4 + Math.random() * 7}s`, // Slower, floaty movement
//                         opacity: Math.random() * 0.6 + 0.3,
//                         boxShadow: '0 0 10px currentColor' // Glow effect
//                     }}
//                 />
//             ))}
//         </div>
//     );
// };

// const BackgroundGrid = () => (
//     <>
//         {/* Lighter, colorful gradient background */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0f0f1a] to-[#000000] z-0"></div>

//         {/* Soft Grid */}
//         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
//         </div>

//         {/* Colorful Ambient Blobs - Warmer and brighter */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse-slow" />
//         <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-fuchsia-500/20 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen animate-float" />
//         <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/20 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
//     </>
// );

// const HeadsUpDisplay = () => (
//     <>
//         {/* Left Card - Glassmorphism style instead of raw text */}
//         <div className="absolute top-[35%] xl:top-1/3 left-[4%] z-[1] hidden md:flex flex-col gap-3 pointer-events-none animate-slide-in-left">
//             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     <span className="text-cyan-300 font-bold text-xs tracking-wider">SYSTEM ONLINE</span>
//                 </div>
//                 <div className="text-gray-300 text-xs font-mono">
//                     <p>Welcome to the future.</p>
//                     <p className="text-white/50 mt-1">Ready for impact?</p>
//                 </div>
//             </div>
//         </div>

//         {/* Right Card */}
//         <div className="absolute bottom-[20%] xl:bottom-1/3 right-[5%] z-[1] hidden md:flex flex-col gap-3 pointer-events-none text-right items-end animate-slide-in-right">
//              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
//                 <div className="flex items-center justify-end gap-3 mb-2">
//                     <span className="text-fuchsia-300 font-bold text-xs tracking-wider">VERSION 2.6</span>
//                     <div className="w-2 h-2 bg-fuchsia-400 rounded-full" />
//                 </div>
//                 <div className="text-gray-300 text-xs font-mono">
//                     <p>Convolution 2026</p>
//                     <p className="text-white/50 mt-1">Tech • Art • Future</p>
//                 </div>
//             </div>
//         </div>

//         {/* Top Right Status - Simplified */}
//         <div className="absolute top-0 left-0 w-full z-40 p-6 flex justify-end items-start pointer-events-none">
//             <div className="hidden md:flex flex-col items-end gap-1">
//                 <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono tracking-widest">
//                     SECURE_CONNECTION
//                 </div>
//             </div>
//         </div>

//         {/* Rounded Corners instead of Sharp Brackets */}
//         <div className="absolute top-6 left-6 w-24 h-24 border-l-2 border-t-2 border-white/10 rounded-tl-3xl pointer-events-none"></div>
//         <div className="absolute top-6 right-6 w-24 h-24 border-r-2 border-t-2 border-white/10 rounded-tr-3xl pointer-events-none"></div>
//         <div className="absolute bottom-6 left-6 w-24 h-24 border-l-2 border-b-2 border-white/10 rounded-bl-3xl pointer-events-none"></div>
//         <div className="absolute bottom-6 right-6 w-24 h-24 border-r-2 border-b-2 border-white/10 rounded-br-3xl pointer-events-none"></div>

//         {/* Scroll Indicator - Softer */}
//         {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none">
//             <span className="text-[10px] tracking-[0.4em] text-white/40 animate-pulse">SCROLL</span>
//             <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
//                 <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" />
//             </div>
//         </div> */}
//     </>
// );


// // const HeadsUpDisplay = () => (
// //     <>
// //         {/* Left Card */}
// //         <div className="absolute top-[35%] xl:top-1/3 left-[4%] z-[1] hidden md:flex flex-col gap-3 pointer-events-none animate-slide-in-left">
// //             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
// //                 <div className="flex items-center gap-3 mb-2">
// //                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
// //                     <span className="text-cyan-300 font-bold text-xs tracking-wider">SYSTEM ONLINE</span>
// //                 </div>
// //                 <div className="text-gray-300 text-xs font-mono">
// //                     <p>Welcome to the future.</p>
// //                     <p className="text-white/50 mt-1">Ready for impact?</p>
// //                 </div>
// //             </div>
// //         </div>

// //         {/* Right Card */}
// //         <div className="absolute bottom-[20%] xl:bottom-1/3 right-[5%] z-[1] hidden md:flex flex-col gap-3 pointer-events-none text-right items-end animate-slide-in-right">
// //              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
// //                 <div className="flex items-center justify-end gap-3 mb-2">
// //                     <span className="text-fuchsia-300 font-bold text-xs tracking-wider">VERSION 2.6</span>
// //                     <div className="w-2 h-2 bg-fuchsia-400 rounded-full" />
// //                 </div>
// //                 <div className="text-gray-300 text-xs font-mono">
// //                     <p>Convolution 2026</p>
// //                     <p className="text-white/50 mt-1">Tech • Art • Future</p>
// //                 </div>
// //             </div>
// //         </div>

// //         {/* Top Right Status */}
// //         <div className="absolute top-0 left-0 w-full z-40 p-6 flex justify-end items-start pointer-events-none">
// //             <div className="hidden md:flex flex-col items-end gap-1">
// //                 <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono tracking-widest">
// //                     SECURE_CONNECTION
// //                 </div>
// //             </div>
// //         </div>

// //         {/* Rounded Corners */}
// //         <div className="absolute top-6 left-6 w-24 h-24 border-l-2 border-t-2 border-white/10 rounded-tl-3xl pointer-events-none"></div>
// //         <div className="absolute top-6 right-6 w-24 h-24 border-r-2 border-t-2 border-white/10 rounded-tr-3xl pointer-events-none"></div>
// //         <div className="absolute bottom-6 left-6 w-24 h-24 border-l-2 border-b-2 border-white/10 rounded-bl-3xl pointer-events-none"></div>
// //         <div className="absolute bottom-6 right-6 w-24 h-24 border-r-2 border-b-2 border-white/10 rounded-br-3xl pointer-events-none"></div>

// //         {/* --- NEW SCI-FI SCROLL INDICATOR --- */}
// //         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 pointer-events-none">
// //             {/* Tech Text */}
// //             <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-300/60 animate-pulse mb-2">
// //                 INITIALIZE_DESCENT
// //             </span>

// //             {/* Animated Chevrons (Arrows) */}
// //             <div className="relative flex flex-col items-center -space-y-2 opacity-80">
// //                 {/* Top Chevron (Fades out first) */}
// //                 <div className="w-6 h-6 border-r-2 border-b-2 border-cyan-400 rotate-45 animate-pulse"></div>

// //                 {/* Middle Chevron (Delayed) */}
// //                 <div className="w-6 h-6 border-r-2 border-b-2 border-fuchsia-400 rotate-45 animate-bounce"></div>

// //                 {/* Bottom Chevron (White tip) */}
// //                 <div className="w-6 h-6 border-r-2 border-b-2 border-white rotate-45 animate-pulse"></div>
// //             </div>

// //             {/* Glow effect behind arrows */}
// //             <div className="absolute bottom-0 w-10 h-10 bg-cyan-400/20 blur-xl rounded-full"></div>
// //         </div>
// //     </>
// // );











// // --- 2. MAIN COMPONENT ---

// function HeroSection() {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     return (
//         // Changed bg to match the lighter gradient logic
//         <div className="h-[100dvh] w-full relative overflow-hidden mx-auto bg-[#0b0b15] font-sans selection:bg-cyan-500/30">

//             <BackgroundGrid />
//             <Particles />

//             {/* Logo - Adjusted glow to be softer */}
//             <div className="absolute top-[20%] md:top-[23%] xl:top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none select-none flex justify-center w-full">
//                 <div className="relative group w-full flex justify-center">
//                     <div className="absolute -inset-10 md:-inset-32 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-[60px] md:blur-[100px] rounded-full opacity-50" />
//                     <Image
//                         src={Artboard18}
//                         alt="Convolution Logo Center"
//                         className="w-[75vw] md:w-[70vw] xl:w-[45vw] max-w-[300px] md:max-w-5xl h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
//                         priority
//                     />
//                 </div>
//             </div>

//             {/* --- LAYER 3: 3D Scene --- */}
//             <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
//                 {isMounted && (
//                     <div className="relative w-full h-full transition-transform duration-1000 ease-out 
//                         scale-[0.75] translate-y-[10%] 
//                         md:scale-[0.90] md:translate-y-[15%]
//                         xl:scale-90 xl:translate-y-[12%]">
//                         <SplineScene 
//                             scene="https://prod.spline.design/bb7X40PsHo7K7BB5/scene.splinecode"
//                             className="w-full h-full"
//                         />
//                     </div>
//                 )}
//             </div>

//             <HeadsUpDisplay />
//         </div>
//     );
// }

// export default HeroSection;
































// 'use client'
// import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import Image from "next/image";
// import Artboard18 from "@/assets/images/Artboard18.svg"; // Ensure this path is correct
// import Link from 'next/link'; // Added for the buttons

// // --- 1. UTILITY COMPONENTS ---

// const SplineLoader = () => (
//     <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b15] z-50">
//         <div className="relative">
//             <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-b-fuchsia-500 rounded-full animate-spin"></div>
//             <div className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-widest text-xs animate-pulse">
//                 LOADING
//             </div>
//         </div>
//     </div>
// );

// const SplineScene = dynamic(() => import('@splinetool/react-spline'), {
//     ssr: false,
//     loading: SplineLoader
// });

// const Particles = () => {
//     const [mounted, setMounted] = useState(false);
//     useEffect(() => {
//         setMounted(true);
//     }, []);
//     if (!mounted) return null;

//     const particles = Array.from({ length: 35 });
//     const colors = ['bg-cyan-400', 'bg-fuchsia-400', 'bg-yellow-300', 'bg-purple-400'];

//     return (
//         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//             {particles.map((_, i) => (
//                 <div
//                     key={i}
//                     className={`absolute rounded-full animate-float ${colors[i % colors.length]}`}
//                     style={{
//                         width: Math.random() * 6 + 2 + 'px',
//                         height: Math.random() * 6 + 2 + 'px',
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         animationDelay: `${Math.random() * 1}s`,
//                         animationDuration: `${4 + Math.random() * 7}s`,
//                         opacity: Math.random() * 0.6 + 0.3,
//                         boxShadow: '0 0 10px currentColor'
//                     }}
//                 />
//             ))}
//         </div>
//     );
// };

// const BackgroundGrid = () => (
//     <>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0f0f1a] to-[#000000] z-0"></div>
//         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
//         </div>

//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse-slow" />
//         <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-fuchsia-500/20 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen animate-float" />
//         <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/20 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
//     </>
// );

// const HeadsUpDisplay = () => (
//     <>
//         {/* Left Card */}
//         <div className="absolute top-[35%] xl:top-1/3 left-[4%] z-[1] hidden md:flex flex-col gap-3 pointer-events-none animate-slide-in-left">
//             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     <span className="text-cyan-300 font-bold text-xs tracking-wider">SYSTEM ONLINE</span>
//                 </div>
//                 <div className="text-gray-300 text-xs font-mono">
//                     <p>Welcome to the future.</p>
//                     <p className="text-white/50 mt-1">Ready for impact?</p>
//                 </div>
//             </div>
//         </div>

//         {/* Right Card */}
//         <div className="absolute bottom-[20%] xl:bottom-1/3 right-[5%] z-[1] hidden md:flex flex-col gap-3 pointer-events-none text-right items-end animate-slide-in-right">
//              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)]">
//                 <div className="flex items-center justify-end gap-3 mb-2">
//                     <span className="text-fuchsia-300 font-bold text-xs tracking-wider">VERSION 2.6</span>
//                     <div className="w-2 h-2 bg-fuchsia-400 rounded-full" />
//                 </div>
//                 <div className="text-gray-300 text-xs font-mono">
//                     <p>Convolution 2026</p>
//                     <p className="text-white/50 mt-1">Tech • Art • Future</p>
//                 </div>
//             </div>
//         </div>

//         {/* Top Right Status */}
//         <div className="absolute top-0 left-0 w-full z-40 p-6 flex justify-end items-start pointer-events-none">
//             <div className="hidden md:flex flex-col items-end gap-1">
//                 <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono tracking-widest">
//                     SECURE_CONNECTION
//                 </div>
//             </div>
//         </div>

//         {/* Corners */}
//         <div className="absolute top-6 left-6 w-24 h-24 border-l-2 border-t-2 border-white/10 rounded-tl-3xl pointer-events-none"></div>
//         <div className="absolute top-6 right-6 w-24 h-24 border-r-2 border-t-2 border-white/10 rounded-tr-3xl pointer-events-none"></div>
//         <div className="absolute bottom-6 left-6 w-24 h-24 border-l-2 border-b-2 border-white/10 rounded-bl-3xl pointer-events-none"></div>
//         <div className="absolute bottom-6 right-6 w-24 h-24 border-r-2 border-b-2 border-white/10 rounded-br-3xl pointer-events-none"></div>
//     </>
// );

// // --- 3. NEW NAVIGATION COMPONENTS (THE SICK BUTTONS) ---

// const SciFiButton = ({ label, href, color = "cyan" }) => {
//     // Determine color classes based on prop
//     const borderClass = color === "fuchsia" ? "border-fuchsia-500/50 group-hover:border-fuchsia-400" : "border-cyan-500/50 group-hover:border-cyan-400";
//     const textClass = color === "fuchsia" ? "text-fuchsia-100 group-hover:text-fuchsia-50" : "text-cyan-100 group-hover:text-cyan-50";
//     const glowClass = color === "fuchsia" ? "group-hover:shadow-[0_0_20px_rgba(232,121,249,0.6)]" : "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]";
//     const bgHover = color === "fuchsia" ? "group-hover:bg-fuchsia-500/10" : "group-hover:bg-cyan-500/10";

//     return (
//       <Link href={href || "#"} className="relative group">
//         <div 
//             className={`
//                 relative px-8 py-3 
//                 bg-[#0b0b15]/80 backdrop-blur-md 
//                 border-b-2 ${borderClass} 
//                 overflow-hidden transition-all duration-300
//                 ${glowClass} ${bgHover}
//             `}
//             style={{
//                 clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)"
//             }}
//         >
//             {/* Scanline Effect */}
//             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></div>

//             {/* Tech Markers */}
//             <div className={`absolute top-1 right-1 w-1 h-1 ${color === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-cyan-400'} rounded-full opacity-50`}></div>
//             <div className={`absolute bottom-1 left-1 w-1 h-1 ${color === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-cyan-400'} rounded-full opacity-50`}></div>

//             {/* Text */}
//             <span className={`relative z-10 font-mono text-sm tracking-[0.2em] uppercase font-bold ${textClass} transition-colors`}>
//                 {label}
//             </span>
//         </div>
//       </Link>
//     );
//   };

// const NavigationDock = () => {
//     return (
//         <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto">
//             {/* Decorative Line connecting buttons */}
//             <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -z-10"></div>

//             <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
//                 <SciFiButton label="Timeline" href="/timeline" color="cyan" />
//                 <SciFiButton label="Events" href="/events" color="fuchsia" />
//                 <SciFiButton label="Gallery" href="/gallery" color="cyan" />
//                 <SciFiButton label="Sponsors" href="/sponsors" color="fuchsia" />
//             </div>
//         </div>
//     );
// };


// // --- 4. MAIN COMPONENT ---

// function HeroSection() {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     return (
//         <div className="h-[100dvh] w-full relative overflow-hidden mx-auto bg-[#0b0b15] font-sans selection:bg-cyan-500/30">

//             <BackgroundGrid />
//             <Particles />

//             {/* Logo */}
//             <div className="absolute top-[20%] md:top-[23%] xl:top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none select-none flex justify-center w-full">
//                 <div className="relative group w-full flex justify-center">
//                     <div className="absolute -inset-10 md:-inset-32 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-[60px] md:blur-[100px] rounded-full opacity-50" />
//                     <Image
//                         src={Artboard18}
//                         alt="Convolution Logo Center"
//                         className="w-[75vw] md:w-[70vw] xl:w-[45vw] max-w-[300px] md:max-w-5xl h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
//                         priority
//                     />
//                 </div>
//             </div>

//             {/* --- LAYER 3: 3D Scene --- */}
//             <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
//                 {isMounted && (
//                     <div className="relative w-full h-full transition-transform duration-1000 ease-out 
//                         scale-[0.75] translate-y-[10%] 
//                         md:scale-[0.90] md:translate-y-[15%]
//                         xl:scale-90 xl:translate-y-[12%]">
//                         <SplineScene 
//                             scene="https://prod.spline.design/bb7X40PsHo7K7BB5/scene.splinecode"
//                             className="w-full h-full"
//                         />
//                     </div>
//                 )}
//             </div>

//             <HeadsUpDisplay />

//             {/* Added the new Navigation Dock here */}
//             <NavigationDock /> 
//         </div>
//     );
// }

// export default HeroSection;


























'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import ConvoLogo from "@/assets/images/Convologo.png";
import Link from 'next/link';

// --- 1. UTILITY COMPONENTS ---

const SplineLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b15] z-50">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-b-fuchsia-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-widest text-xs animate-pulse">
                LOADING
            </div>
        </div>
    </div>
);

// Lazy load Spline
const SplineScene = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: SplineLoader
});

const Particles = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const particles = Array.from({ length: 75 });
    const colors = ['bg-cyan-400', 'bg-fuchsia-400', 'bg-yellow-300', 'bg-purple-400'];

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {particles.map((_, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full animate-float ${colors[i % colors.length]}`}
                    style={{
                        width: Math.random() * 6 + 2 + 'px',
                        height: Math.random() * 6 + 2 + 'px',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 1}s`,
                        animationDuration: `${4 + Math.random() * 7}s`,
                        opacity: Math.random() * 0.6 + 0.3,
                        boxShadow: '0 0 10px currentColor'
                    }}
                />
            ))}
        </div>
    );
};

const BackgroundGrid = () => (
    <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#0f0f1a] to-[#000000] z-0"></div>
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full z-0 pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-fuchsia-500/20 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/20 blur-[90px] rounded-full z-0 pointer-events-none mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
    </>
);

// --- HUD & DECORATIONS ---
const HeadsUpDisplay = () => (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
        {/* Top Left Decoration */}
        <div className="absolute top-0 left-0 p-1 hidden md:block">
            <div className="w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-xl relative">
                <div className="absolute top-0 left-0 w-10 h-[2px] bg-cyan-400 box-shadow-[0_0_10px_cyan]"></div>
                <div className="absolute top-0 left-0 w-[2px] h-10 bg-cyan-400 box-shadow-[0_0_10px_cyan]"></div>
            </div>
        </div>

        {/* Top Right Decoration */}
        <div className="absolute top-0 right-0 p-1 hidden md:block">
            <div className="w-32 h-32 border-r-2 border-t-2 border-fuchsia-500/30 rounded-tr-xl relative">
                <div className="absolute top-0 right-0 w-10 h-[2px] bg-fuchsia-400 box-shadow-[0_0_10px_fuchsia]"></div>
                <div className="absolute top-0 right-0 w-[2px] h-10 bg-fuchsia-400 box-shadow-[0_0_10px_fuchsia]"></div>
            </div>
        </div>

        {/* Status Text Left */}
        <div className="absolute top-[35%] xl:top-1/3 left-6 z-[1] hidden md:flex flex-col gap-3 animate-slide-in-left">
            <div className="bg-[#0b0b15]/40 backdrop-blur-sm border-l-2 border-cyan-500/50 pl-4 py-2">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                    <span className="text-cyan-300 font-bold text-[10px] tracking-widest uppercase">System Online</span>
                </div>
                <div className="text-gray-400 text-[10px] font-mono leading-tight">
                    <p>INIT_SEQUENCE_COMPLETE</p>
                    <p>RENDERING_CORE: ACTIVE</p>
                </div>
            </div>
        </div>

        {/* Status Text Right */}
        <div className="absolute bottom-[40%] xl:bottom-1/3 right-6 z-[1] hidden md:flex flex-col gap-3 text-right items-end animate-slide-in-right">
            <div className="bg-[#0b0b15]/40 backdrop-blur-sm border-r-2 border-fuchsia-500/50 pr-4 py-2">
                <div className="flex items-center justify-end gap-3 mb-1">
                    <span className="text-fuchsia-300 font-bold text-[10px] tracking-widest uppercase">Version 2.6</span>
                    <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" />
                </div>
                <div className="text-gray-400 text-[10px] font-mono leading-tight">
                    <p>CONVOLUTION_PROTOCOL</p>
                    <p>AWAITING_INPUT...</p>
                </div>
            </div>
        </div>

        {/* Vertical Ruler Lines */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 h-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block"></div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 h-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block"></div>
    </div>
);

// --- NAVIGATION ---
const SciFiButton = ({ label, href, color = "cyan" }: { label: string; href: string; color?: "cyan" | "fuchsia" }) => {
    // We shift hover behavior to 'lg' (1024px+) so tablets stay in 'mobile' mode
    const textClass = color === "fuchsia" ? "text-fuchsia-100 lg:group-hover:text-fuchsia-50" : "text-cyan-100 lg:group-hover:text-cyan-50";
    const bgHover = color === "fuchsia" ? "lg:group-hover:bg-fuchsia-900/100" : "lg:group-hover:bg-cyan-900/100";
    const bottomBorderColor = color === "fuchsia" ? "bg-fuchsia-500" : "bg-cyan-500";
    const shadowColor = color === "fuchsia" ? "rgba(232,121,249,0.4)" : "rgba(34,211,238,0.4)";
    const clipStyle = { clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" };

    return (
        <Link href={href || "#"} className="relative group block w-full md:w-auto h-[45px] md:h-[50px] min-w-[130px] md:min-w-[160px]">
            
            {/* 1. PULSING GLOW: Visible on everything below 'lg' (Tablets included) */}
            <div 
                className="absolute inset-0 opacity-40 animate-pulse lg:hidden" 
                style={{ 
                    ...clipStyle, 
                    backgroundColor: color === 'fuchsia' ? '#d946ef' : '#06b6d4',
                    filter: `blur(8px)` 
                }} 
            />

            {/* 2. OUTER BORDER LAYER */}
            <div className={`absolute inset-0 bg-white/20 transition-all duration-300 ${color === 'fuchsia' ? 'lg:group-hover:bg-fuchsia-400/50' : 'lg:group-hover:bg-cyan-400/50'}`} style={clipStyle} />
            
            {/* 3. MAIN CONTENT BODY */}
            <div className={`absolute inset-[1px] bg-[#0b0b15]/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${bgHover}`} style={clipStyle}>
                
                {/* SCANLINE: Constant shimmer on all screens, but switches to hover-only on 'lg' */}
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full 
                    animate-shimmer lg:animate-none lg:group-hover:translate-x-[200%] lg:group-hover:transition-transform lg:group-hover:duration-700 lg:group-hover:ease-in-out`}>
                </div>

                {/* BOTTOM BORDER: Constant glow on mobile/tablet | Hover glow on lg desktop */}
                <div className={`absolute bottom-0 left-0 w-full h-[2px] ${bottomBorderColor} 
                    shadow-[0_0_15px_${shadowColor}] lg:shadow-none lg:opacity-50 lg:group-hover:opacity-100 lg:group-hover:shadow-[0_0_10px_currentColor] transition-all`}>
                </div>

                {/* TECH MARKERS: Pulsing on mobile/tablet | Static on lg desktop */}
                <div className={`absolute top-1 right-2 w-1 h-1 rounded-full ${color === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-cyan-400'} 
                    opacity-80 animate-pulse lg:animate-none lg:opacity-50`}>
                </div>
                <div className={`absolute bottom-1.5 left-2 w-1 h-1 rounded-full ${color === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-cyan-400'} 
                    opacity-80 animate-pulse lg:animate-none lg:opacity-50`}>
                </div>

                <span className={`relative z-10 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-bold ${textClass} transition-colors`}>
                    {label}
                </span>
            </div>
        </Link>
    );
};

const CommandDeck = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full z-50 p-0 xl:p-12 pointer-events-none">
            {/* --- MOBILE LAYOUT (GRID) --- */}
            <div className="md:hidden w-full flex flex-col items-center justify-end pb-0 pointer-events-auto">
                <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
                    <SciFiButton label="Timeline" href="#timeline" color="cyan" />
                    <SciFiButton label="Gallery" href="#gallery" color="cyan" />
                    <SciFiButton label="Events" href="#all-events" color="fuchsia" />
                    <SciFiButton label="Sponsors" href="#sponsors" color="fuchsia" />
                </div>
                <div className="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* --- DESKTOP LAYOUT (SPLIT) --- */}
            <div className="hidden md:flex absolute bottom-12 left-12 flex-col gap-4 pointer-events-auto animate-slide-in-left" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="absolute -left-12 bottom-6 w-12 h-[2px] bg-cyan-500/30">
                    <div className="absolute right-0 -top-1 w-2 h-2 bg-cyan-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3">
                    <SciFiButton label="Timeline" href="/timeline" color="cyan" />
                    <SciFiButton label="Events" href="/events" color="fuchsia" />
                </div>
            </div>

            <div className="hidden md:flex absolute bottom-12 right-12 flex-col gap-4 pointer-events-auto items-end animate-slide-in-right" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="absolute -right-12 bottom-6 w-12 h-[2px] bg-fuchsia-500/30">
                    <div className="absolute left-0 -top-1 w-2 h-2 bg-fuchsia-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3 items-end">
                    <SciFiButton label="Gallery" href="/gallery" color="cyan" />
                    <SciFiButton label="Sponsors" href="/sponsors" color="fuchsia" />
                </div>
            </div>
        </div>
    );
};

// --- 4. MAIN COMPONENT ---

function HeroSection() {
    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDeviceType('mobile');
            } else if (width >= 768 && width < 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const MOBILE_VIDEO_PATH = "/assets/videos/hero_robot_mobile_15.mp4";

    return (
        <div id='home' className="h-[100dvh] w-full relative overflow-hidden mx-auto bg-[#0b0b15] font-sans selection:bg-cyan-500/30">
            {/* We place the BackgroundGrid here. */}
            <BackgroundGrid />
            <Particles />
            <HeadsUpDisplay />

            {/* Logo */}
            <div className="absolute top-[20%] md:top-[20%] xl:top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 md:z-10 pointer-events-none select-none flex justify-center w-full">
                <div className="relative group w-full flex justify-center">
                    <div className="absolute -inset-10 md:-inset-32 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-[60px] md:blur-[100px] rounded-full opacity-10" />
                    <Image
                        src={ConvoLogo}
                        alt="Convolution Logo Center"
                        className="w-[75vw] md:w-[45vw] xl:w-[45vw] max-w-[300px] md:max-w-5xl h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                        priority
                    />
                </div>
            </div>

            {/* --- MEDIA LAYER --- */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
                
                {/* 1. Mobile Video (< 768px) ONLY */}
                {deviceType === 'mobile' && (
                    <video
                        key="mobile-video"
                        className="absolute inset-0 w-full h-full"
                        autoPlay loop muted playsInline preload="auto"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    >
                        <source src={MOBILE_VIDEO_PATH} type="video/mp4" />
                    </video>
                )}

                {/* 2. Tablet & Desktop (>= 768px) ONLY - Shared 3D Scene */}
                {(deviceType === 'tablet' || deviceType === 'desktop') && (
                    <div className="w-full h-full relative transition-transform duration-1000 ease-out 
                        md:scale-100 md:translate-y-[10%]
                        xl:scale-100 xl:translate-y-[10%]">
                        <SplineScene
                            scene="https://prod.spline.design/sUHCRF2aYfkFBahz/scene.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                )}

                {/* Loading State */}
                {deviceType === null && <SplineLoader />}
            </div>

            <CommandDeck />
        </div>
    );
}

export default HeroSection;