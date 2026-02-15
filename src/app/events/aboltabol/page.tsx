"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.AbolTabol";
import Faq from "./Faq.AbolTabol";
import About from "./About.AbolTabol";
import Rules from "./Rules.AbolTabol";
import Team from "./EventLeads.AbolTabol";

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