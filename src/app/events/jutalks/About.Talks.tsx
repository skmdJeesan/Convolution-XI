import React from "react";
import Image from "next/image";


const About = () => {
  return (
    <section
    id="about"
          className="max-h-screen pt-20 md:pt-25 pb-5 relative w-full flex items-center justify-center bg-[#FF97E3] px-6 overflow-hidden"
        >

          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10 z-10">
    <h1 className="relative z-20 font-orbitron font-bold text-center text-3xl md:text-4xl tracking-wide text-[#592A13] drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
            About Us
          </h1>
            <p className="font-rajdhani text-white sm:text-xl text-base font-semibold leading-relaxed tracking-wide drop-shadow-md max-w-3xl">
              Join us for ‘JU Talks’, a dynamic panel discussion featuring industry experts, veterans, and tech leaders exploring trends, challenges, and innovations shaping our world. Speakers will share unique insights and experiences, fostering an engaging exchange of ideas. This event invites the audience to question , encourages them to participate in this highly dignified conversation and promises to offer them a fresh perspective on today’s world.
    
            </p>
    
          </div>
        </section>
  );
};

export default About;