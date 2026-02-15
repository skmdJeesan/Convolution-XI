"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Talks";
import Faq from "./Faq.Talks";
import About from "./About.Talks";
import Rules from "./Rules.Talks";
import Team from "./EventLeads.Talks";

function page() {
  return (
    <div className='bg-gradient-to-b from-[#0D30BB] via-[#2a237e] to-[#7c3aed] w-full min-h-screen'>
      {/* <EventNav/> */}
      <About/>
      {/* <Rules/> */}
      {/* <Team/> */}
      {/* <Faq/>
      <Footer/> */}
    </div>
  )
}

export default page