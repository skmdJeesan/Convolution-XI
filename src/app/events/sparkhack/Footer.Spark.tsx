'use client'
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import ConvoLogo from "@/assets/images/Convologo.png";
import { MdCall, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useWaveText } from '@/hooks/useWaveText';
import FlipLink from '@/components/FlipLink';
import TransitionLink from '@/components/TransitionLink';

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
        <div id='contact' className='relative bg-transparent flex flex-col pt-16 overflow-hidden z-20 border-t border-white/30 mt-10'>
            <div className="w-full maxWidthForSections relative z-20">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mt-4 w-full">

                    {/*Logo & Address*/}
                    <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                        <div className="w-60 relative">
                            <Image
                                src={ConvoLogo}
                                alt="convo logo"
                                className="object-cover drop-shadow-sm"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <p className="font-orbitron text-slate-800 font-bold text-base uppercase tracking-wide">
                                Innovate. Integrate. Inspire.
                            </p>
                            <p className="font-rajdhani font-semibold text-slate-700 mt-4 text-sm md:text-base">
                                Department of Electrical Engineering <br />
                                Jadavpur University <br />
                                188, Raja Subodh Chandra Mallick Rd, Jadavpur, <br />
                                Kolkata, West Bengal 700032 <br />
                                India
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start gap-4 mt-2">
                            <Link target='_blank' href="https://www.instagram.com/convolution26/" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 border border-white/40 hover:border-[#2c9bac] hover:bg-[#2c9bac]/10 hover:shadow-[0_0_15px_rgba(44,155,172,0.3)] transition-all duration-300'>
                                <FaInstagram size={18} className="text-slate-700 group-hover:text-[#2c9bac] transition-colors" />
                            </Link>
                            <Link target='_blank' href="https://www.facebook.com/share/15Mh8tfiC7/?mibextid=LQQJ4d" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 border border-white/40 hover:border-[#2c9bac] hover:bg-[#2c9bac]/10 hover:shadow-[0_0_15px_rgba(44,155,172,0.3)] transition-all duration-300'>
                                <FaFacebook size={18} className="text-slate-700 group-hover:text-[#2c9bac] transition-colors" />
                            </Link>
                            <Link target='_blank' href="https://www.linkedin.com/company/convolution-juee/" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 border border-white/40 hover:border-[#2c9bac] hover:bg-[#2c9bac]/10 hover:shadow-[0_0_15px_rgba(44,155,172,0.3)] transition-all duration-300'>
                                <FaLinkedin size={18} className="text-slate-700 group-hover:text-[#2c9bac] transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Lets connect */}
                    <div className='flex flex-col items-center w-full '>

                        <div className='flex flex-col items-center sm:items-start md:items-center md:ml-7 lg-ml-2 lg:items-start'>

                            <h3 className="font-orbitron text-[20px] md:text-xl lg:text-2xl font-bold text-slate-800 drop-shadow-sm uppercase mb-8 relative inline-block whitespace-nowrap sm:ml-11">
                                Let's Connect
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400/60 to-transparent"></span>
                            </h3>

                            <ul className="flex flex-col gap-4">
                                {/* Email */}
                                <li className='flex items-start gap-4 group'>
                                    <Link href="mailto:convolutionxi@gmail.com" className='flex items-center justify-center w-10 h-10 rounded-lg  bg-white/20 border border-white/40 group-hover:border-[#2c9bac] group-hover:bg-[#2c9bac]/10 group-hover:shadow-[0_0_15px_rgba(44,155,172,0.2)] transition-all duration-300 shrink-0'>
                                        <MdOutlineEmail className="text-xl text-slate-700 mt-0.5 group-hover:text-[#2c9bac] transition-colors duration-300" />
                                    </Link>
                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-600 font-bold block mb-0.5 group-hover:text-[#2c9bac] transition-colors duration-300">Email</span>
                                        <Link
                                            href="mailto:convolutionxi@gmail.com"
                                            className="font-rajdhani font-semibold text-slate-800 hover:text-[#2c9bac] transition-colors block break-all"
                                        >
                                            convolutionxi@gmail.com
                                        </Link>
                                    </div>
                                </li>

                                {/* Address */}
                                <li className='flex items-start gap-4 group'>
                                    <Link target="_blank" href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5" className="flex items-center justify-center w-10 h-10 rounded-lg  bg-white/20 border border-white/40 group-hover:border-[#2c9bac] group-hover:bg-[#2c9bac]/10 group-hover:shadow-[0_0_15px_rgba(44,155,172,0.2)] transition-all duration-300 shrink-0">
                                        <MdLocationOn className="text-xl text-slate-700 mt-0.5 group-hover:text-[#2c9bac] transition-colors duration-300" />
                                    </Link>
                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-600 font-bold block mb-0.5 group-hover:text-[#2c9bac] transition-colors duration-300">Address</span>
                                        <Link
                                            href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5"
                                            target="_blank"
                                            className="font-rajdhani font-semibold text-slate-800 hover:text-[#2c9bac] transition-colors block break-all"
                                        >
                                            Department of Electrical Engineering, <br />
                                            Jadavpur University
                                        </Link>
                                    </div>
                                </li>

                                {/* Phone */}
                                <li className='flex items-start gap-4 group'>
                                    <a href="tel:+916289243103" className="flex items-center justify-center w-10 h-10 rounded-lg  bg-white/20 border border-white/40 group-hover:border-[#2c9bac] group-hover:bg-[#2c9bac]/10 group-hover:shadow-[0_0_15px_rgba(44,155,172,0.2)] transition-all duration-300 shrink-0">
                                        <MdCall className="text-xl text-slate-700 mt-0.5 group-hover:text-[#2c9bac] transition-colors duration-300" />
                                    </a>

                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-600 font-bold block mb-0.5 group-hover:text-[#2c9bac] transition-colors duration-300">
                                            Phone
                                        </span>
                                        <a href="tel:+916289243103" className="font-semibold font-rajdhani block text-slate-800 hover:text-[#2c9bac] transition-colors">
                                            +91 62892 43103
                                        </a>
                                        <a href="tel:+919836677963" className="font-semibold font-rajdhani text-slate-800 hover:text-[#2c9bac] transition-colors  block">
                                            +91 98366 77963
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Events */}
                    <div className='flex flex-col items-center md:items-end w-full'>
                        <div className='flex flex-col items-center sm:items-start'>
                            <h3 className="font-orbitron text-[20px] md:text-xl lg:text-2xl font-bold text-slate-800 drop-shadow-sm uppercase mb-8 relative inline-block -ml-4 sm:ml-0">
                                events
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400/60 to-transparent"></span>
                            </h3>

                            <ul className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2">
                                {events.map((event, index) => (
                                    <li key={index}>
                                        <TransitionLink href={event.href} className="group flex items-center justify-between border-b border-transparent hover:border-slate-400/30 pb-0.5 transition-colors gap-x-1" >
                                            <span className="font-rajdhani text-base font-semibold md:text-lg text-slate-700 group-hover:text-[#2c9bac] transition-colors">
                                                <FlipLink>{event.name}</FlipLink>
                                            </span>
                                            <span className="hidden md:block text-[#2c9bac] text-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
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

            {/*Big Convo Text Background Watermark */}
            <div className='middle relative w-full -mt-13 md:-mt-30  h-[25vw] md:h-[22vw] overflow-clip z-10 pointer-events-none flex items-end justify-center'>

                <h1
                    ref={ref as React.RefObject<HTMLHeadingElement>}
                    className='font-orbitron text-[13vw] [&_span]:text-transparent [&_span]:bg-clip-text [&_span]:bg-linear-to-b [&_span]:from-slate-800/45 [&_span]:via-slate-600/70 [&_span]:to-transparent tracking-tight font-extrabold absolute -bottom-3 md:-bottom-9 lg:-bottom-12 leading-none whitespace-nowrap'
                >{text}</h1>

            </div>

            {/*Bottom Bar*/}
            <div className='relative w-full bg-transparent/40 backdrop-blur-md z-30'>
                <div className="w-[95%] h-px  bg-gradient-to-r from-transparent via-slate-400/40 to-transparent mx-auto"></div>
                <div className="max-w-360 mx-auto ">
                    <div className="flex flex-col items-center">

                        <div className="font-rajdhani text-sm font-semibold tracking-wider text-slate-600 text-center md:text-left">
                            © 2026 Convolution
                        </div>

                        <div className="font-rajdhani text-sm tracking-wider text-slate-600 text-center mt-1">
                            Made with <span className="text-[#2c9bac]">❤️</span> by <span className="text-slate-800 text-sm font-bold">Team Convo</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}