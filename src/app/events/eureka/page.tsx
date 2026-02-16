"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Eureka";
import Faq from "./Faq.Eureka";
import About from "./About.Eureka";
import Rules from "./Rules.Eureka";
import Team from "./EventLeads.Eureka";

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