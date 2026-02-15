"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Spark";
import Faq from "./Faq.Spark";
import About from "./About.Spark";
import Rules from "./Rules.Spark";
import Team from "./EventLeads.Spark";

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