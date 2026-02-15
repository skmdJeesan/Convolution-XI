"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Frames";
import Faq from "./Faq.Frames";
import About from "./About.Frames";
import Rules from "./Rules.Frames";
import Team from "./EventLeads.Frames";

function page() {
  return (
    <div className='bg-gradient-to-b from-[#0D30BB] via-[#2a237e] to-[#7c3aed] w-full min-h-screen'>
      {/* <EventNav/> */}
      <About/>
      {/* <Rules/>
      <Team/>
      <Faq/>
      <Footer/> */}
    </div>
  )
}

export default page