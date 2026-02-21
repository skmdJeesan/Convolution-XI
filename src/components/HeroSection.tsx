'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import ConvoLogo from "@/assets/images/Convologo.png";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// --- 1. UTILITY & AESTHETIC COMPONENTS ---

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

// Lazy load Spline
const SplineScene = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    // loading: SplineLoader
});

const BottomFadeOverlay = () => (
    <div className="absolute bottom-0 left-0 w-full h-20 md:h-30 z-11 pointer-events-none bg-gradient-to-b from-transparent via-black/90 to-black" />
);

// --- EXISTING SVG: DATA CORE (Right Side) ---
const DataCoreSVG = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-2">
        <circle cx="50" cy="50" r="45" stroke="#e879f9" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
        <path d="M50 20 L76 35 V65 L50 80 L24 65 V35 L50 20Z" stroke="#e879f9" strokeWidth="2" fill="rgba(232, 121, 249, 0.1)" className="animate-pulse" />
        <path d="M50 20 V35 M50 80 V65 M76 35 L63 42.5 M24 35 L37 42.5 M76 65 L63 57.5 M24 65 L37 57.5" stroke="#e879f9" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="8" fill="#e879f9" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="50" cy="50" r="4" fill="#fff" />
    </svg>
);


// --- ATOMIC ORBIT (Top Left) ---
const AtomicOrbit = () => {
    return (
        <div className="absolute top-[10%] left-[10%] hidden md:block md:top-[30%] md:left-[15%] xl:top-[20%] xl:left-[15%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[120px] md:h-[120px] xl:w-[150px] xl:h-[150px] z-0 pointer-events-none opacity-70 md:opacity-80 animate-spin-slow animate-float">
            {/* We use a 3D perspective wrapper. */}

            {/* Orbit 1: Cyan - Horizontal-ish */}
            <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(70deg)_rotateY(-10deg)]">
                <div className="w-full h-full rounded-full border-[1px] border-pink-500/100 animate-[spin_3s_linear_infinite]">
                    <div className="absolute inset-0 rounded-full border-t-4 border-l-2 border-transparent border-t-pink-400 shadow-[0_0_20px_rgba(251,100,182,0.8)]"></div>
                </div>
            </div>

            {/* Orbit 2: Fuchsia - Tilted Right */}
            <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(70deg)_rotateY(50deg)]">
                <div className="w-full h-full rounded-full border-[1px] border-fuchsia-500/100 animate-[spin_4s_linear_infinite_reverse]">
                    <div className="absolute inset-0 rounded-full border-t-4 border-r-2 border-transparent border-t-fuchsia-500 shadow-[0_0_20px_rgba(232,121,249,0.8)]"></div>
                </div>
            </div>

            {/* Orbit 3: Mixed/Cyan - Tilted Left */}
            <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(70deg)_rotateY(-70deg)]">
                <div className="w-full h-full rounded-full border-[1px] border-cyan-500/100 animate-[spin_3.5s_linear_infinite]">
                    <div className="absolute inset-0 rounded-full border-t-4 border-l-2 border-transparent border-t-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>
                </div>
            </div>

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-15 h-15 bg-pink-400/100 blur-[10px] rounded-full animate-pulse"></div>
        </div>
    );
};


const BackgroundGrid = () => (
    <>
        {/* 1. Base Layer: Deep Void Color */}
        <div className="absolute inset-0 bg-[#000000] z-0" />

        {/* 2. The "Holodeck" Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-100 
            bg-[radial-gradient(#4f4f4f_1px,transparent_1px)] 
            [background-size:40px_40px] 
            [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>

        {/* 3. Central Spotlight (Highlights the Robot) */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

        {/* 4. Left Side: Your Atomic Orbit (Kept as is) */}
        <AtomicOrbit />

        {/* --- 5. NEW: THE CYBER MOON (Replaces the Wireframe Rings) --- */}
        <div className="absolute top-[30%] right-[20%] md:top-[27%] md:right-[10%] xl:top-[15%] xl:right-[5%] w-[250px] h-[250px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] z-0 pointer-events-none opacity-100 md:opacity-90 animate-float">

            {/* The Main Sphere Gradient (Pink/Purple) */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-600 via-purple-900 to-black opacity-100 shadow-[0_0_60px_rgba(192,38,211,0.4)]"></div>


            {/* The "Scanline" Overlay (Makes it look digital) */}
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-50"></div>

            {/* Inner Highlight (Rim Light) */}
            <div className="absolute inset-0 rounded-full border-[1px] border-white/20 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.1)]"></div>

            {/* Orbiting Data Ring (To keep it Sci-Fi) */}
            <div className="absolute inset-[-20px] rounded-full border border-cyan-500/40 border-dashed animate-[spin_30s_linear_infinite]"></div>

            {/* A Satellite/Node orbiting the moon */}
            <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite_reverse]">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 blur-[2px] rounded-full shadow-[0_0_10px_cyan]"></div>
            </div>
        </div>

        {/* 6. Ambient Atmosphere Clouds */}
        {/* <div className="absolute top-1/4 left-[20%] w-[300px] h-[300px] bg-fuchsia-500/50 blur-[90px] rounded-full z-0 pointer-events-none md:hidden" /> */}

        {/* NEW OPTIMIZED IMAGE: Fully Controllable */}
        <div className={`absolute z-0 pointer-events-none md:hidden mix-blend-screen opacity-100 
            /* 1. POSITION: Adjust these to move it around */
            top-[25%] left-[15%] 
            
            /* 2. BASE SIZE: The physical box holding the image */
            w-[300] h-[300] 
            
            /* 3. SCALE: Zoom the image in or out (e.g., scale-125, scale-150, scale-75) */
            scale-250
        `}>
            <Image
                src="/assets/images/Pink_blur.png"
                alt="Atmosphere Glow"
                fill
                className="object-contain"
            />
        </div>
    </>
);

// --- HUD & DECORATIONS ---
const HeadsUpDisplay = () => (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">

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

        {/* Status Text Left - WITH CUTEBOT */}
        <div className="absolute top-[47%] xl:top-1/3 left-6 z-[1] hidden md:flex flex-col gap-3 animate-slide-in-left">
            <div className="bg-[#0b0b15]/70 backdrop-blur-sm border-l-2 border-cyan-500/50 pl-4 py-3 pr-6 rounded-r-xl">
                <div className="flex items-center gap-4">

                    {/* CUTE BOT AVATAR WRAPPER */}
                    <div className="relative w-14 h-14 shrink-0 rounded-full border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.4)] overflow-hidden bg-black/60">
                        <Image
                            src="/cutebot.svg"
                            alt="System AI"
                            width={56}
                            height={56}
                            className="object-cover p-1 hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-electric opacity-50 pointer-events-none"></div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                            <span className="text-cyan-300 font-rajdhani font-bold text-xs tracking-widest uppercase shadow-cyan-glow">
                                System Online
                            </span>
                        </div>
                        <div className="text-gray-400 text-[10px] font-mono leading-tight">
                            <p>INIT_SEQUENCE_COMPLETE</p>
                            <p>RENDERING_CORE: ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Status Text Right - UPDATED WITH DATA CORE --- */}
        <div className="absolute bottom-[20%] xl:bottom-1/3 right-6 z-[1] hidden md:flex flex-col gap-3 text-right items-end animate-slide-in-right">
            <div className="bg-[#0b0b15]/70 backdrop-blur-sm border-r-2 border-fuchsia-500/50 pr-4 pl-6 py-3 rounded-l-xl">
                <div className="flex items-center justify-end gap-4">

                    {/* Text Block (Left of Icon) */}
                    <div className="flex flex-col items-end">
                        <div className="flex items-center justify-end gap-2 mb-1">
                            <span className="text-fuchsia-300 font-rajdhani font-bold text-xs tracking-widest uppercase shadow-fuchsia-glow">Version XI</span>
                            <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse" />
                        </div>
                        <div className="text-gray-400 text-[10px] font-mono leading-tight">
                            <p>CONVOLUTION_PROTOCOL</p>
                            <p>AWAITING_INPUT...</p>
                        </div>
                    </div>

                    {/* DATA CORE ICON WRAPPER (Right of Text) */}
                    <div className="relative w-14 h-14 shrink-0 rounded-full border-2 border-fuchsia-400/50 shadow-[0_0_15px_rgba(232,121,249,0.4)] overflow-hidden bg-black/60 flex items-center justify-center">
                        {/* Using the Custom SVG Component */}
                        <div className="w-full h-full hover:scale-110 transition-transform duration-500">
                            <DataCoreSVG />
                        </div>
                        {/* Holographic Scan Overlay (Fuchsia) */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-400/70 to-transparent animate-electric opacity-90 pointer-events-none"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

// --- NAVIGATION ---
const SciFiButton = ({ label, href, color = "cyan" }: { label: string; href: string; color?: "cyan" | "fuchsia" }) => {
    const textClass = color === "fuchsia" ? "text-fuchsia-100 lg:group-hover:text-fuchsia-50" : "text-cyan-100 lg:group-hover:text-cyan-50";
    const bgHover = color === "fuchsia" ? "lg:group-hover:bg-fuchsia-900/100" : "lg:group-hover:bg-cyan-900/100";
    const bottomBorderColor = color === "fuchsia" ? "bg-fuchsia-500" : "bg-cyan-500";
    const shadowColor = color === "fuchsia" ? "rgba(232,121,249,0.4)" : "rgba(34,211,238,0.4)";
    const clipStyle = { clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    return (
        <Link
            href={href || "#"}
            onClick={handleScroll}
            className="relative group block w-full md:w-auto h-[45px] md:h-[50px] min-w-[130px] md:min-w-[160px]"
        >
            <div
                className="absolute inset-0 opacity-100 animate-pulse lg:hidden"
                style={{
                    ...clipStyle,
                    backgroundColor: color === 'fuchsia' ? '#d946ef' : '#06b6d4',
                    filter: `blur(8px)`
                }}
            />

            <div className={`absolute inset-0 bg-white/20 transition-all duration-300 ${color === 'fuchsia' ? 'lg:group-hover:bg-fuchsia-400/50' : 'lg:group-hover:bg-cyan-400/50'}`} style={clipStyle} />

            <div className={`absolute inset-[1px] bg-[#0b0b15]/90 backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-300 ${bgHover}`} style={clipStyle}>

                {/* Mobile Scanline */}
                <div className={`
                    absolute inset-0 w-full h-full 
                    bg-gradient-to-r from-transparent via-purple-500/30 to-transparent 
                    -translate-x-full blur-[2px]
                    animate-electric lg:hidden
                `}>
                </div>

                {/* Desktop Scanline */}
                <div className={`
                    hidden lg:block absolute inset-0 w-full h-full 
                    bg-gradient-to-r from-transparent via-white/50 to-transparent 
                    -translate-x-[200%] group-hover:translate-x-[200%] 
                    transition-transform duration-700 ease-in-out
                `}>
                </div>

                <div className={`absolute bottom-0 left-0 w-full h-[2px] ${bottomBorderColor} 
                    shadow-[0_0_15px_${shadowColor}] lg:shadow-none lg:opacity-50 lg:group-hover:opacity-100 lg:group-hover:shadow-[0_0_10px_currentColor] transition-all`}>
                </div>

                <div className={`absolute top-1 right-2 w-1 h-1 rounded-full ${color === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-cyan-400'} 
                    opacity-10 animate-pulse`}>
                </div>
                <div className={`absolute bottom-1.5 left-2 w-1 h-1 rounded-full ${color === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-cyan-400'} 
                    opacity-10 animate-pulse`}>
                </div>

                <span className={`relative z-10 font-orbitron text-xs md:text-sm tracking-[0.2em] uppercase font-bold ${textClass} transition-colors`}>
                    {label}
                </span>
            </div>
        </Link>
    );
};

const CommandDeck = () => {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated"
    return (
        <div className="absolute -bottom-6 left-0 w-full z-50 p-0 xl:p-12 pointer-events-none">
            {/* --- MOBILE LAYOUT --- */}
            <div className="md:hidden w-full flex flex-col items-center justify-end pb-10 pointer-events-auto">
                <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
                    {!isAuthenticated ? (
                        <>
                            <SciFiButton label="Log in" href={"/login"} color="cyan" />
                            <SciFiButton label="Register" href={"/register"} color="cyan" />
                        </>
                    ) :
                        <>
                            <SciFiButton label="Gallery" href="#gallery" color="cyan" />
                            <SciFiButton label="Sponsors" href="#sponsors" color="fuchsia" />
                        </>
                    }
                    <SciFiButton label="Timeline" href="#timeline" color="cyan" />
                    <SciFiButton label="Events" href="#all-events" color="fuchsia" />

                </div>
                <div className="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* --- DESKTOP LAYOUT --- */}
            <div className="hidden md:flex absolute bottom-12 left-12 flex-col gap-4 pointer-events-auto animate-slide-in-left" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="absolute -left-12 bottom-6 w-12 h-[2px] bg-cyan-500/30">
                    <div className="absolute right-0 -top-1 w-2 h-2 bg-cyan-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3">
                    <SciFiButton label="Timeline" href="#timeline" color="cyan" />
                    <SciFiButton label="Events" href="#events" color="fuchsia" />
                </div>
            </div>

            <div className="hidden md:flex absolute bottom-12 right-12 flex-col gap-4 pointer-events-auto items-end animate-slide-in-right" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="absolute -right-12 bottom-6 w-12 h-[2px] bg-fuchsia-500/30">
                    <div className="absolute left-0 -top-1 w-2 h-2 bg-fuchsia-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3 items-end">
                    <SciFiButton label="Gallery" href="#gallery" color="cyan" />
                    <SciFiButton label="Sponsors" href="#sponsors" color="fuchsia" />
                </div>
            </div>
        </div>
    );
};

// --- 4. MAIN COMPONENT ---

function HeroSection() {
    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | null>(null);

    // Smart Scroll Logic
    // useEffect(() => {
    //     if ('scrollRestoration' in history) {
    //         history.scrollRestoration = 'auto';
    //     }

    //     const handleSmartScroll = () => {
    //         const currentScroll = window.scrollY;
    //         const heroHeight = window.innerHeight;

    //         if (currentScroll < heroHeight * 0.9) {
    //             window.scrollTo({ top: 0, behavior: 'instant' });
    //         }
    //     };

    //     handleSmartScroll();
    //     const timer = setTimeout(handleSmartScroll, 50);
    //     return () => clearTimeout(timer);
    // }, []);

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

    return (
        <div id='home' className="h-dvh w-full relative overflow-hidden mx-auto bg-[#000000] font-sans select-none ">
            <BackgroundGrid />
            <HeadsUpDisplay />

            {/* Logo */}
            <div className={`absolute ${deviceType == 'mobile' ? 'top-[45%]' : 'top-[20%]'} md:top-[15%] xl:top-[23%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 md:z-10 pointer-events-none select-none flex justify-center w-full`}>
                <div className="relative group w-full flex justify-center">
                    <div className="absolute inset-0 md:-inset-32 bg-linear-to-r from-cyan-500/20 to-fuchsia-500/20 blur-[60px] md:blur-[100px] rounded-full opacity-0" />
                    <Image
                        src={ConvoLogo}
                        alt="Convolution Logo Center"
                        className="w-[75vw] md:w-[55vw] xl:w-[35vw] max-w-75 md:max-w-5xl h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                        priority
                    />
                </div>
            </div>
            {/* --- MEDIA LAYER --- */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">

                {/* 1. Mobile (< 768px) */}
                {deviceType === 'mobile' && (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">

                        {/* Added 'scale-125' to force it 25% larger */}
                        {/* You can change 125 to 110, 150, or even [2.0] for double size */}
                        <div className="relative w-150 h-200">
                            {/* <Image
                                src="/hero_robo.png"
                                alt="NexBot Hero Mobile"
                                height={180} width={180}
                                className="object-cover absolute bottom-12 -right-10  shrink-0" 
                                priority
                            /> */}
                            {/* <Image
                                src="/bg_for_mobile3.png"
                                alt="NexBot Hero Mobile"
                                fill
                                className="object-contain animate-in"
                                priority
                            /> */}

                        </div>
                    </div>
                )}

                {/* 2. Tablet & Desktop (>= 768px) - 3D Scene */}
                {(deviceType === 'tablet' || deviceType === 'desktop') && (
                    <div className="w-full h-full relative transition-transform duration-1000 ease-out 
                        md:scale-95 md:translate-y-[5%]
                        xl:scale-100 xl:translate-y-[3%]">
                        <SplineScene
                            scene="https://prod.spline.design/sUHCRF2aYfkFBahz/scene.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                )}

                {/* Loading State */}
                {/* {deviceType === null && <SplineLoader />} */}
            </div>

            <BottomFadeOverlay />
            <CommandDeck />
        </div>
    );
}

export default HeroSection;