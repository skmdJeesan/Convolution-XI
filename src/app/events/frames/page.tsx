"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Frames";
import Faq from "./Faq.Frames";
import About from "./About.Frames";
import Rules from "./Rules.Frames";
import Team from "./EventLeads.Frames";
import Timeline from "./TimeLine.Frames"
import Mentors from "./Mentor.Frames";
function page() {
  return (
    <div className='w-full min-h-screen'>
      <EventNav navTheme="bg-gradient-to-b from-[#52BAFF] to-[#E7EDF9]"/>
      <About/>
      <Rules/>
      <Timeline/>
      <Mentors/>
      <Team/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default page