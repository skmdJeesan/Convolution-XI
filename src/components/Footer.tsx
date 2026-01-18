'use client'
import Link from 'next/link';
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import ConvoLogo from "@/assets/images/CovoSvg.svg";
import { MdCall, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useWaveText } from '@/hooks/useWaveText';

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

function Footer() {
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
    <div id='contact' className='footer relative min-h-[85vh] bg-black flex flex-col px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8'>

      <div className="top h-auto md:h-[40vh] w-full flex flex-col md:flex-row items-start md:items-center justify-between md:justify-center gap-8 md:gap-4 px-2 md:px-4 mb-4 md:mb-10 lg:mb-10 lg:px-8 py-4 md:py-2">
        <div className="logo flex flex-col items-center lg:items-start gap-4 md:gap-8 w-full md:w-[30%]">
          <div className="w-40 h-16 md:w-52 md:h-20">
            <Image src={ConvoLogo} alt='convo logo' className='object-cover'/>
          </div>
          <p className="text-white/80 text-xs md:text-sm lg:text-base text-center md:text-left">
            Department of Electrical Engineering <br />
            Jadavpur University <br />
            188, Raja Subodh Chandra Mallick Rd, Jadavpur, <br />
            Kolkata, West Bengal 700032 <br />
            India
          </p>
        </div>
        <div className="getInTouch flex flex-col items-center w-full md:w-[30%]">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white">Get In Touch</h2>
          <span className="h-1 w-16 md:w-24 mt-2 rounded-full bg-white"></span>
          <ul className="mt-4 md:mt-6 flex flex-col gap-y-4 md:gap-y-6 [&>*]:listFooter text-white/80">
            <li className='flex items-center gap-4 md:gap-7'>
                <div className="rounded-md h-8 w-8 md:h-10 md:w-10 flex items-center justify-center glassmorphism-bg shrink-0">
                  <MdOutlineEmail className="iconsFooter text-sm md:text-base" />
                </div>
                <div className="text-xs md:text-sm">
                  <h1 className="listHead">Email</h1>
                  <p className="listPara">convolutionx2026@gmail.com</p>
                </div>
            </li>
            <li className='flex items-center gap-4 md:gap-7'>
              <a target="_blank" href="https://maps.app.goo.gl/wKYjjoLyR1ScsFEq5">
                <div className="rounded-md h-8 w-8 md:h-10 md:w-10 flex items-center justify-center glassmorphism-bg shrink-0">
                  <MdLocationOn className="iconsFooter text-sm md:text-base" />
                </div>
              </a>
              <div className="text-xs md:text-sm">
                <h1 className="listHead">Location</h1>
                <p className="listPara">
                  Department of Electrical Engineering, <br />
                  Jadavpur University
                </p>
              </div>
            </li>
            <li className='flex items-center gap-4 md:gap-7'>
              <div className="rounded-md h-8 w-8 md:h-10 md:w-10 flex items-center justify-center glassmorphism-bg shrink-0">
                <MdCall className="iconsFooter text-sm md:text-base" />
              </div>
              <div className="text-xs md:text-sm">
                <h1 className="listHead">Phone</h1>
                <p className="listPara">+91 89459XXXXX</p>
                <p className="listPara">+91 81013XXXXX</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="events flex flex-col items-center md:items-start lg:items-center w-full md:w-[20%]">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white">Events</h2>
          <span className="h-1 w-10 md:w-14 mt-2 rounded-full bg-white"></span>
          <ul className="mt-4 md:mt-6 [&>*]:eventLinks flex flex-row flex-wrap gap-2 md:gap-[0.5px] md:flex-col justify-center md:justify-start">
            {events.map((event, index) => (
                <li key={index} className="hover:scale-105 hover:text-purple-400 text-sm md:text-sm lg:text-base md:text-left text-white/80 shrink-0">
                  <Link href={event.href}>{event.name}</Link>
                </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='middle h-[10vh] md:h-[10vh] lg:h-[20vh] w-full border-b-2 flex justify-center overflow-clip relative z-10'>
        <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className='text-[16vw] md:text-[14vw] lg:text-[16vw] text-white tracking-tight font-bold absolute -bottom-4 md:-bottom-7 lg:-bottom-12 leading-none'>{text}</h1>
      </div>

      <div className='bottom h-auto md:h-[10vh] w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative z-10 py-4 md:py-0'>
        <div className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-200 text-center md:text-left">© 2026 Convolution. Made by Team Convo.</div>
        <div className="social-icons flex items-center gap-3 md:gap-4">
            <Link href={'#'} className='rounded-md h-7 w-7 md:h-8 md:w-8 flex items-center justify-center glassmorphism-bg'><FaInstagram className='text-white text-sm' /></Link>
            <Link href={'#'} className='rounded-md h-7 w-7 md:h-8 md:w-8 flex items-center justify-center glassmorphism-bg'><FaFacebook className='text-white text-sm'/></Link>
            <Link href={'#'} className='rounded-md h-7 w-7 md:h-8 md:w-8 flex items-center justify-center glassmorphism-bg'><FaLinkedin className='text-white text-sm'/></Link>
        </div>
      </div>

      <div className="w-full h-40 md:h-40 lg:h-40 absolute bottom-0 left-0 opacity-30 z-0">
        <Image src='/page-bottom.jpg' alt='footer' fill className='object-cover'/>
      </div>
    </div>
  );
}

export default Footer;