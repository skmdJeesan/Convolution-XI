"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Decisia";
import Faq from "./Faq.Decisia";
import About from "./About.Decisia";
import Rules from "./Rules.Decisia";
import Team from "./EventLeads.Decisia";

function page() {
  return (
    <div className='bg-gradient-to-b from-[#0D30BB] via-[#2a237e] to-[#7c3aed] w-full min-h-screen'>
      <EventNav/>
      <About/>
      <Rules/>
      {/* <Team/> */}
      <Faq/>
      <Footer/>
    </div>
  )
}

export default page