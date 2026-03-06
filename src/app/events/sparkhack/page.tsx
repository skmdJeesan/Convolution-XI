"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Spark";
import Faq from "./Faq.Spark";
import About from "./About.Spark";
import Rules from "./Rules.Spark";
import Team from "./EventLeads.Spark";
import Mentors from "./Mentor.Spark";
import Prizes from "./Prize.Spark";
import Timeline from "./TimeLine.Spark";
import ParticlesBackground from "./ParticlesBackground";

export default function Page() {
  return (
    <div className='bg-gradient-to-b from-[#60b6d1] via-[#85d3eb] to-[#a3e2f5] w-full min-h-screen relative overflow-hidden'>
      {/* Global Light Blue Winter Background */}

      <ParticlesBackground theme="snow" />

      {/* Optional: Adjust Nav to contrast nicely with the new light background */}
      <EventNav navTheme="bg-gradient-to-b from-[#52BAFF] to-[#a9b9d6]" />
      <div className="relative z-10">
        <About />
        <Rules />
        <Timeline />
        <Mentors />
        <Prizes />
        <Team />
        <Faq />
        <Footer />
      </div>
    </div>
  )
}