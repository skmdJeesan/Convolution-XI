"use client";

import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.circuistics";
import Faq from "./Faq.circuistics";
import About from "./About.circuistics";
import Rules from "./Rules.circuistics";
import Team from "./EventLeads.circuistics";
import TimeLine from "./TimeLine.circuistics";
import Mentors from "./Mentor.circuistics";
import Prizes from "./Prize.circuistics"

function page() {
  return (
    <div className='bg-linear-to-b from-[#0D30BB] via-[#2a237e] to-[#2d194e] w-full min-h-screen'>
      {/* <EventNav/> */}
      <About/>
      <Rules/>
      <TimeLine />
      <Mentors />
      <Prizes />
      <Team/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default page