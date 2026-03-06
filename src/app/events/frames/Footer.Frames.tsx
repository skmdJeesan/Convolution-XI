'use client'
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import ConvoLogo from "@/assets/images/Convologo.png";
import { MdCall, MdLocationOn, MdOutlineEmail, MdArrowForward } from "react-icons/md";
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
        <div id='contact' className='relative bg-linear-to-b to-[#E7EDF9] from-[#E7EDF9] -mt-0.5 flex flex-col pt-5 overflow-hidden z-0 pt-4'>
            
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
                            <p className="font-orbitron text-[#063547] font-bold text-base uppercase tracking-wide">
                                Innovate. Integrate. Inspire.
                            </p>
                            <p className="font-rajdhani font-bold text-slate-900 mt-4 text-sm md:text-base">
                                Department of Electrical Engineering <br />
                                Jadavpur University <br />
                                188, Raja Subodh Chandra Mallick Rd, Jadavpur, <br />
                                Kolkata, West Bengal 700032 <br />
                                India
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link target='_blank' href="https://www.instagram.com/convolution26/" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/40 border border-[#063547]/30 hover:border-[#063547] hover:bg-white/60 transition-all duration-300'>
                                <FaInstagram size={18} className="text-[#063547] group-hover:text-[#0A5C7A] transition-colors" />
                            </Link>
                            <Link target='_blank' href="https://www.facebook.com/share/15Mh8tfiC7/?mibextid=LQQJ4d" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/40 border border-[#063547]/30 hover:border-[#063547] hover:bg-white/60 transition-all duration-300'>
                                <FaFacebook size={18} className="text-[#063547] group-hover:text-[#0A5C7A] transition-colors" />
                            </Link>
                            <Link target='_blank' href="https://www.linkedin.com/company/convolution-juee/" className='group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/40 border border-[#063547]/30 hover:border-[#063547] hover:bg-white/60 transition-all duration-300'>
                                <FaLinkedin size={18} className="text-[#063547] group-hover:text-[#0A5C7A] transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Lets connect */}
                    <div className='flex flex-col items-center w-full '>

                        <div className='flex flex-col items-center sm:items-start md:items-center md:ml-7 lg-ml-2 lg:items-start'>

                            <h3 className="font-orbitron text-[20px] md:text-xl lg:text-2xl font-bold text-[#063547] uppercase mb-8 relative inline-block whitespace-nowrap sm:ml-11">
                                Let's Connect
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#063547]/50 to-transparent"></span>
                            </h3>

                            <ul className="flex flex-col gap-4">
                                {/* Email */}
                                <li className='flex items-start gap-4 group'>
                                    <Link href="mailto:convolutionxi@gmail.com" className='flex items-center justify-center w-10 h-10 rounded-lg bg-white/40 border border-[#063547]/30 group-hover:border-[#063547] group-hover:bg-white/60 transition-all duration-300 shrink-0'>
                                        <MdOutlineEmail className="text-xl text-[#063547] mt-0.5 transition-colors duration-300" />
                                    </Link>
                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-700 font-extrabold block mb-0.5">Email</span>
                                        <Link
                                            href="mailto:convolutionxi@gmail.com"
                                            className="font-rajdhani font-bold text-slate-900 hover:text-[#0A5C7A] transition-colors block break-all"
                                        >
                                            convolutionxi@gmail.com
                                        </Link>
                                    </div>
                                </li>

                                {/* Address */}
                                <li className='flex items-start gap-4 group'>
                                    <Link target="_blank" href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/40 border border-[#063547]/30 group-hover:border-[#063547] group-hover:bg-white/60 transition-all duration-300 shrink-0">
                                        <MdLocationOn className="text-xl text-[#063547] mt-0.5 transition-colors duration-300" />
                                    </Link>
                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-700 font-extrabold block mb-0.5">Address</span>
                                        <Link
                                            href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5"
                                            target="_blank"
                                            className="font-rajdhani font-bold text-slate-900 hover:text-[#0A5C7A] transition-colors block break-all"
                                        >
                                            Department of Electrical Engineering, <br />
                                            Jadavpur University
                                        </Link>
                                    </div>
                                </li>

                                {/* Phone */}
                                <li className='flex items-start gap-4 group'>
                                    <a href="tel:+918617537124" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/40 border border-[#063547]/30 group-hover:border-[#063547] group-hover:bg-white/60 transition-all duration-300 shrink-0">
                                        <MdCall className="text-xl text-[#063547] mt-0.5 transition-colors duration-300" />
                                    </a>

                                    <div className="text-md">
                                        <span className="font-rajdhani text-slate-700 font-extrabold block mb-0.5">
                                            Phone
                                        </span>
                                        <a href="tel:+918617537124" className="font-semibold font-rajdhani block text-slate-900 hover:text-[#0A5C7A] transition-colors">
                                            +91 86175 37124
                                        </a>
                                        <a href="tel:+916289519690" className="font-semibold font-rajdhani text-slate-900 hover:text-[#0A5C7A] transition-colors block">
                                            +91 62895 19690
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Events */}
                    <div className='flex flex-col items-center md:items-end w-full'>
                        <div className='flex flex-col items-center sm:items-start'>
                            <h3 className="font-orbitron text-[20px] md:text-xl lg:text-2xl font-bold text-[#063547] uppercase mb-8 relative inline-block -ml-4 sm:ml-0">
                                events
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#063547]/50 to-transparent"></span>
                            </h3>


                            <ul className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2">
                                {events.map((event, index) => (
                                    <li key={index}>
                                        <TransitionLink href={event.href} className="group flex items-center justify-between border-b border-transparent hover:border-[#063547]/30 pb-0.5 transition-colors gap-x-1" >
                                            <span className="font-rajdhani text-base font-bold md:text-lg text-slate-900 group-hover:text-[#0A5C7A] transition-colors">
                                                <FlipLink>{event.name}</FlipLink>
                                            </span>
                                            <span className="hidden md:block text-[#063547] text-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
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
                    className='font-orbitron text-[13vw] [&_span]:text-transparent [&_span]:bg-clip-text [&_span]:bg-linear-to-b [&_span]:from-[#063547] [&_span]:to-transparent tracking-tight font-extrabold absolute -bottom-3 md:-bottom-9 lg:-bottom-12 leading-none whitespace-nowrap'
                >{text}</h1>

            </div>


            {/*Bottom*/}
            <div className='relative w-full bg-transparent/40 backdrop-blur-md z-30'>
                <div className="w-[95%] h-px bg-linear-to-r from-transparent via-cyan-500/80 to-transparent mx-auto"></div>
                <div className="max-w-360 mx-auto ">
                    <div className="flex flex-col items-center">

                        <div className="font-rajdhani text-sm font-semibold tracking-wider text-slate-700 text-center md:text-left">
                            © 2026 Convolution
                        </div>

                        <div className="font-rajdhani text-sm font-semibold tracking-wider text-slate-700 text-center">
                            Made with ❤️ by <span className="text-[#063547] text-sm font-bold">Team Convo</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Background Image*/}
            {/* <div className="absolute inset-x-0 bottom-0 w-full h-full z-0 pointer-events-none">
                <Image 
                    src='/Frames/footer-bg2.png' 
                    alt='footer background' 
                    fill 
                    className='object-cover object-bottom'
                />
            </div> */}
        </div>
    );
}