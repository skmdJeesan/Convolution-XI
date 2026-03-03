"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Eureka";
import Faq from "./Faq.Eureka";
import About from "./About.Eureka";
import Rules from "./Rules.Eureka";
import Team from "./EventLeads.Eureka";
import Timeline from "./TimeLine.Eureka";
import Mentors from "./Mentor.Eureka";

function page() {
  return (
    <div className=' w-full min-h-screen'>
      <EventNav navTheme="bg-[linear-gradient(to_bottom,#8b9216,#a79f0f,#eda421,#e98604,#df3908)]"/>
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