"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Algo";
import Faq from "./Faq.Algo";
import About from "./About.Algo";
import Rules from "./Rules.Algo";
import Team from "./EventLeads.Algo";

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