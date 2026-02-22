'use client'
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import ConvoLogo from "@/assets/images/Convologo.png";
import { MdCall, MdLocationOn, MdOutlineEmail, MdArrowForward } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useWaveText } from '@/hooks/useWaveText';
import FlipLink from './FlipLink';
import TransitionLink from './TransitionLink';
import  fds1 from "@/assets/images/bgs/fds-1.png"
import  fds2 from "@/assets/images/bgs/fds-2.png"
import  fds3 from "@/assets/images/bgs/fds-3.png"

const events = [
    { name: "Algomaniac", href: "/events/algomaniac" },
    { name: "Abol Tabol", href: "/events/aboltabol" },
    { name: "Circuistics", href: "/events/circuistics" },
    { name: "Decisia", href: "/events/decisia" },
    { name: "Eureka", href: "/events/eureka" },
    { name: "Sparkhack", href: "/events/sparkhack" },
    { name: "Inquizzitive", href: "/events/inquizzitive" },
    { name: "JU Talks", href: "/events/jutalks" },
    { name: "24 Frames", href: "/events/frames" },
];

export default function Footer() {
    const { ref, breakTheText } = useWaveText({
        scrub: 4,
        yoyo: true,
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
        <div id='contact' className='relative bg-[#03050c] -mt-0.5 flex flex-col pt-5 overflow-hidden z-0 pt-4'>

           
            {/* --- BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    
    {/* --- MASK FADE --- */}
    <div 
        className="absolute inset-0 z-10"
        style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
        }}
    >
        
        <div 
            className="hidden md:block absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] z-0"
            style={{
                background: 'radial-gradient(circle, rgba(112, 26, 117, 0.2) 0%, transparent 70%)' 
            }}
        ></div>
        <div 
            className="hidden md:block absolute top-[-10%] left-[30%] w-[50vw] h-[60vw] z-0"
            style={{
                background: 'radial-gradient(circle, rgba(88, 28, 135, 0.25) 0%, transparent 70%)'
            }}
        ></div>

        <div 
            className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[60vw] h-[50vw] z-0"
            style={{
                background: 'radial-gradient(circle, rgba(22, 78, 99, 0.25) 0%, transparent 70%)'
            }}
        ></div>

        {/* for mobile */}
                <div className="block md:hidden absolute top-[7%] left-[7%] w-[86vw] h-[78vw] rounded-full bg-fuchsia-950/50 blur-[100px] z-0"></div>

                <div className="block md:hidden absolute top-[40%] left-[10%] w-[100vw] h-[70vw] rounded-full bg-purple-950/40 blur-[100px] z-0"></div>

                <div className="block md:hidden absolute bottom-[5%] right-[2%] w-[100vw] h-[50vw] rounded-full bg-cyan-900/30 blur-[100px] z-0"></div>
                

                {/* Grid */}
        <div

            className="absolute inset-0 z-0 opacity-[0.13] md:opacity-[0.15]"
            style={{
                backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
            }}
        ></div>
         <div className="absolute top-0 left-0 w-full h-10 bg-linear-to-b from-[#0307126f]  to-transparent z-10 pointer-events-none"></div>
    </div>
</div>
            <div className="w-full maxWidthForSections relative z-20">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mt-4 w-full">

                    {/*Logo & Address*/}
                    <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                        <div className="w-60 relative">
                            <Image
                                src={ConvoLogo}
                                alt="convo logo"
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <p className="font-orbitron text-cyan-400 font-semibold text-base uppercase tracking-wide">
                                Innovate. Integrate. Inspire.
                            </p>
                            <p className="font-rajdhani font-semibold text-slate-300 mt-4 text-sm md:text-base">
                                Department of Electrical Engineering <br />
                                Jadavpur University <br />
                                188, Raja Subodh Chandra Mallick Rd, Jadavpur, <br />
                                Kolkata, West Bengal 700032 <br />
                                India
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link target='_blank' href="https://www.instagram.com/convolution26/" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300'>
                                <FaInstagram size={18} className="text-slate-300 group-hover:text-cyan-300 transition-colors" />
                            </Link>
                            <Link target='_blank' href="https://www.facebook.com/share/15Mh8tfiC7/?mibextid=LQQJ4d" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300'>
                                <FaFacebook size={18} className="text-slate-300 group-hover:text-cyan-300 transition-colors" />
                            </Link>
                            <Link target='_blank' href="https://www.linkedin.com/company/convolution-juee/" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300'>
                                <FaLinkedin size={18} className="text-slate-300 group-hover:text-cyan-300 transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Lets connect */}
                    <div className='flex flex-col items-center w-full '>

                        <div className='flex flex-col items-center sm:items-start md:items-center md:ml-7 lg-ml-2 lg:items-start'>

                            <h3 className="font-orbitron text-[20px] md:text-xl lg:text-2xl font-bold  text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] uppercase mb-8 relative inline-block whitespace-nowrap sm:ml-11">
                                Let's Connect
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>
                            </h3>

                            <ul className="flex flex-col gap-4">
                                {/* Email */}
                                <li className='flex items-start gap-4 group'>
                                    <Link href="mailto:convolutionXI2026@gmail.com" className='flex items-center justify-center w-10 h-10 rounded-lg  bg-white/5 border border-white/10 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0'>
                                        <MdOutlineEmail className="text-xl text-cyan-400 mt-0.5 group-hover:text-cyan-300 transition-colors duration-300" />
                                    </Link>
                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-400   font-bold block mb-0.5 group-hover:text-cyan-400 transition-colors duration-300">Email</span>
                                        <Link
                                            href="mailto:convolutionxi@gmail.com"
                                            className="font-rajdhani font-semibold text-slate-200 hover:text-white transition-colors block break-all"
                                        >
                                            convolutionxi@gmail.com
                                        </Link>
                                    </div>
                                </li>

                                {/* Address */}
                                <li className='flex items-start gap-4 group'>
                                    <Link target="_blank" href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5" className="flex items-center justify-center w-10 h-10 rounded-lg  bg-white/5 border border-white/10 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0">
                                        <MdLocationOn className="text-xl text-cyan-400 mt-0.5 group-hover:text-cyan-300 transition-colors duration-300" />
                                    </Link>
                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-400 font-bold block mb-0.5 group-hover:text-cyan-400 transition-colors duration-300">Address</span>
                                        <Link
                                            href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5"
                                            target="_blank"
                                            className="font-rajdhani font-semibold text-slate-200 hover:text-white transition-colors block break-all"
                                        >
                                            Department of Electrical Engineering, <br />
                                            Jadavpur University
                                        </Link>
                                    </div>
                                </li>

                                {/* Phone */}
                                <li className='flex items-start gap-4 group'>
                                    <a href="tel:+919933671072" className="flex items-center justify-center w-10 h-10 rounded-lg  bg-white/5 border border-white/10 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 shrink-0">
                                        <MdCall className="text-xl text-cyan-400 mt-0.5 group-hover:text-cyan-300 transition-colors duration-300" />
                                    </a>

                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-400   font-bold block mb-0.5 group-hover:text-cyan-400 transition-colors duration-300">
                                            Phone
                                        </span>
                                        <a href="tel:+919933671072" className="font-semibold font-rajdhani block text-slate-200 hover:text-white transition-colors">
                                            +91 99336 71072
                                        </a>
                                        <a href="tel:+917063253983" className="font-semibold font-rajdhani text-slate-200 hover:text-white transition-colors  block">
                                            +91 70632 53983
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Events */}
                    <div className='flex flex-col items-center md:items-end w-full'>
                        <div className='flex flex-col items-center sm:items-start'>
                            <h3 className="font-orbitron text-[20px] md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-b from-blue-200 to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] uppercase mb-8 relative inline-block -ml-4 sm:ml-0">
                                events
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-purple-200/60 to-transparent"></span>                </h3>


                            <ul className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2">
                                {events.map((event, index) => (
                                    <li key={index}>
                                        <TransitionLink href={event.href} className="group flex items-center justify-between border-b border-transparent hover:border-white/10 pb-0.5 transition-colors gap-x-1" >
                                            <span className="font-rajdhani text-base font-semibold md:text-lg text-slate-300 group-hover:text-cyan-400 transition-colors">
                                                <FlipLink>{event.name}</FlipLink>
                                            </span>
                                            <span className="hidden md:block text-cyan-400 text-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                                                →
                                            </span>
                                        </TransitionLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/*Big Convo Text*/}
            <div className='middle relative w-full -mt-13 md:-mt-30  h-[25vw] md:h-[22vw] overflow-clip z-10 pointer-events-none flex items-end justify-center'>

                <h1
                    ref={ref as React.RefObject<HTMLHeadingElement>}
                    className='font-orbitron text-[13vw] [&_span]:text-transparent [&_span]:bg-clip-text [&_span]:bg-linear-to-b [&_span]:from-[#0e7490] [&_span]:to-black/50 tracking-tight font-extrabold absolute -bottom-3 md:-bottom-9 lg:-bottom-12 leading-none whitespace-nowrap'
                >{text}</h1>

            </div>


            {/*Bottom*/}
            <div className='relative w-full bg-transparent/40 backdrop-blur-md z-30'>
                <div className="w-[95%] h-px bg-linear-to-r from-transparent via-cyan-500/80 to-transparent mx-auto"></div>
                <div className="max-w-360 mx-auto ">
                    <div className="flex flex-col items-center">

                        <div className="font-rajdhani text-sm tracking-wider text-slate-400 text-center md:text-left">
                            © 2026 Convolution
                        </div>

                        <div className="font-rajdhani text-sm tracking-wider text-slate-400 text-center">
                            Made with ❤️ by <span className="text-white text-sm  font-semibold">Team Convo</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Background Image*/}
            {/* <div className="w-full h-40 md:h-40 lg:h-40 absolute bottom-0 left-0 opacity-10 z-0">
                <Image src='/page-bottom.jpg' alt='footer' fill className='object-cover'/>
            </div> */}
        </div>
    );
}