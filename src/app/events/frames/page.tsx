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
      <EventNav/>
      <About/>
      <Rules/>
<<<<<<< HEAD
=======
      <Timeline/>
      <Mentors/>
>>>>>>> SayanIndra
      <Team/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default page