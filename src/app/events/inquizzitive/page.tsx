"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Inquizzitive";
import Faq from "./Faq.Inquizzitive";
import About from "./About.Inquizzitive";
import Rules from "./Rules.Inquizzitive";
import Team from "./EventLeads.Inquizzitive";

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