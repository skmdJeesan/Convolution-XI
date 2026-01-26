'use client'
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import ConvoLogo from "@/assets/images/ConvoSvg.svg";
import { MdCall, MdLocationOn, MdOutlineEmail, MdArrowForward } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useWaveText } from '@/hooks/useWaveText';
import FlipLink from './FlipLink';

const events = [
  { name: "Algomaniac", href: "/event/algomaniac" },
  { name: "Abol Tabol", href: "/event/aboltabol" },
  { name: "Circuistics", href: "/event/circuistics" },
  { name: "Decisia", href: "/event/decisia" },
  { name: "Eureka", href: "/event/eureka" },
  { name: "Sparkhack", href: "/event/sparkhack" },
  { name: "Inquizzitive", href: "/event/inquizzitive" },
  { name: "JU Talks", href: "/event/jutalks" },
  { name: "24 Frames", href: "/event/frames" },
];

//PARTICLES COMPONENT
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
  }, []);
  if(!mounted) return null;
  const particles = Array.from({ length: 50 });
  return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((_, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-particle"
                  style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${10 + Math.random() * 20}s`,
                      opacity: Math.random() * 0.5 + 0.2,
                  }}
              />
          ))}
      </div>
  );
};

export default function Footer() {
  const { ref, breakTheText } = useWaveText({ 
    scrub: 2, 
    yoyo: false,
    markers: false 
  });
  const [text, setText] = useState("Convolution");

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-text', text);
      breakTheText();
    }
  }, [text, breakTheText]);

  return (
    
    <div id='contact' className='relative bg-black flex flex-col pt-5 overflow-hidden  z-0'>
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
          {/* Deep Space Blackout */}
          <div className="absolute inset-0 bg-black/90 z-0"></div>

          {/* Nebulas */}
          <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-violet-950/20 blur-[100px] z-0"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-950/20 blur-[100px] z-0"></div>

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 z-0"></div>
          
          <Particles />
      </div>
     
      </div>


      <div className="w-full maxWidthForSections relative z-20">
        <div className="sm:grid w-full grid-cols-2 md:grid-cols-3 mt-4 flex flex-col items-center sm:items-start gap-x-2 gap-y-8">
          
          {/* Logo & address */}
          <div className="flex flex-col gap-6 justify-center sm:justify-start sm:items-start items-center">
            <div className="w-54 relative">
              <Image
                src={ConvoLogo}
                alt="convo logo"
                className="object-cover"
              />
            </div>
            <div className="pt-2 border-t border-white/20 w-full">
               <p className="text-gray-300 mt-4 sm:text-left md:text-base text-sm text-center">
                Department of Electrical Engineering <br />
                Jadavpur University <br />
                188, Raja Subodh Chandra Mallick Rd, Jadavpur, <br />
                Kolkata, West Bengal 700032 <br />
                India
              </p>
            </div>
            <div className="flex justify-center md:justify-end gap-4">
                        <Link href="#" className='text-gray-300 hover:text-cyan-500 hover:scale-110 transition-all'>
                            <FaInstagram size={25} />
                        </Link>
                        <Link href="#" className='text-gray-300 hover:text-cyan-500 hover:scale-110 transition-all'>
                            <FaFacebook size={25} />
                        </Link>
                        <Link href="#" className='text-gray-300 hover:text-cyan-500 hover:scale-110 transition-all'>
                            <FaLinkedin size={25} />
                        </Link>
                </div>
          </div>

          {/* Let's connect */}
          <div className='md:ml-6 lg:ml-12 md:pt-19'>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase mb-6 border-b border-white/20 pb-2 inline-block ml-9 sm:ml-0">
                Let's Connect
            </h3>
            
            <ul className="flex flex-col gap-5">
              {/* Email */}
              <li className='flex items-start gap-4'>
                <Link href="mailto:convolutionXI2026@gmail.com" className='flex items-center justify-normal'>
                  <MdOutlineEmail className="text-3xl text-cyan-500 mt-0.5" />
                </Link>
                <div className="text-[17px]">
                  <span className="text-gray-300 text-[16px] font-bold tracking-wider block mb-0.5">Email</span>
                  <Link 
                  href="mailto:convolutionXI2026@gmail.com" 
                  className="text-gray-300 hover:text-cyan-400 transition-colors block break-all"
                >
                  convolutionx2026@gmail.com
                </Link>
                </div>
              </li>

              {/* Address */}
              <li className='flex items-start gap-4'>
                <Link target="_blank" href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5" className="flex items-center justify-normal">
                    <MdLocationOn className="text-3xl text-cyan-500 mt-0.5" />
                </Link>
                <div className="text-[14px">
                  <span className="text-gray-300 text-[16px] font-bold tracking-wider block mb-0.5">Address</span>
                <Link 
                  href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5" 
                  target="_blank"
                  className="text-gray-300 hover:text-cyan-400 transition-colors block leading-relaxed"
                >
                  Department of Electrical Engineering, <br />
                  Jadavpur University
                </Link>
                </div>
              </li>

              {/* Phone */}
              <li className='flex items-start gap-4'>
  {/* Icon click calls the primary number */}
  <a href="tel:+919933671072" className="hover:scale-110 transition-transform">
    <MdCall className="text-3xl text-cyan-500 mt-0.5" />
  </a>

  <div className="text-[14px]">
    <span className="text-gray-300 text-[16px] font-bold tracking-wider block mb-1">
      Phone
    </span>
    <a 
      href="tel:+917679880740" 
      className="block text-gray-300 hover:text-cyan-400 transition-colors"
    >
      +91 76798 80740
    </a>
    <a 
      href="tel:+919933671072" 
      className="block text-gray-300 hover:text-cyan-400 transition-colors"
    >
      +91 99336 71072
    </a>
  </div>
</li>
            </ul>
          </div>

          {/* Events */}
          <div className='md:ml-26 lg:ml-12 md:pt-19'>
            <h3 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 uppercase mb-6 border-b border-white/20 pb-2 inline-block">
                Events
            </h3>
    
            <ul className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2">
              {events.map((event, index) => (
              <li key={index}>
                <Link href={event.href} className="group flex items-center justify-between border-b border-transparent hover:border-white/10 pb-1 transition-colors gap-x-1" >
                    <span className="text-[17px] text-gray-300 group-hover:text-cyan-400 transition-colors">
                        <FlipLink>{event.name}</FlipLink>
                    </span>
                    <span className="text-cyan-400 text-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                        <MdArrowForward />
                    </span>
                </Link>
              </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

{/*Big Convo Text*/}
<div className='relative w-full -mt-13 md:-mt-25  h-[25vw] md:h-[22vw] overflow-hidden z-10 pointer-events-none flex items-end justify-center'>
        
        <h1 
            ref={ref as React.RefObject<HTMLHeadingElement>} 
            className='text-center text-[18vw] [&_span]:text-transparent [&_span]:bg-clip-text [&_span]:bg-gradient-to-b [&_span]:from-white [&_span]:to-gray-500 tracking-tighter font-black leading-[0.8] whitespace-nowrap translate-y-[10%] md:translate-y-6'
        >
            {text}
        </h1>

      </div>
      
     

      {/*Bottom*/}
        <div className='relative w-full border-t border-white/10 bg-black/40 backdrop-blur-md z-30'>
        <div className="max-w-[1440px] mx-auto ">
            <div className="flex flex-col items-center">
                
                <div className="text-[15px] tracking-wider text-gray-400 text-center md:text-left">
                    © 2026 Convolution
                </div>

                <div className="text-[15px] tracking-wider text-gray-400 text-center">
                    Made with ⚡ by <span className="text-white text-[17px]">Team Convo</span>
                </div>
            </div>
        </div>
      </div>

      {/* Background Image*/}
      <div className="w-full h-16 absolute bottom-0 left-0 opacity-70 z-0">
        <Image src='/page-bottom.jpg' alt='footer' fill className='object-cover'/>
      </div>

    </div>
  );
}