"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Decisia";
import Faq from "./Faq.Decisia";
import About from "./About.Decisia";
import Rules from "./Rules.Decisia";
import Team from "./EventLeads.Decisia";
import Timeline from "./TimeLine.Decisia";
import Mentors from "./Mentors.Decisia";
import Prizes from "./Prize.Decisia";

function page() {
  return (
    <div className='bg-gradient-to-b from-[#DE5C00] via-[#931308] to-[#2A0401] w-full min-h-screen'>
      {/* <EventNav navTheme="bg-[linear-gradient(to_bottom,#de5c00,#c74304,#b02b06,#981406,#830000)]"/> */}
        <About />
        {/* <Rules />
        <Timeline />
        <Mentors />
        <Prizes/>
        <Team />
        <Faq />
        <Footer /> */}
    </div>
  )
}

export default page