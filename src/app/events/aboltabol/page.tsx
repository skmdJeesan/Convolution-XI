"use client";
import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.AbolTabol";
import Faq from "./Faq.AbolTabol";
import About from "./About.AbolTabol";
import Rules from "./Rules.AbolTabol";
import Leads from "./EventLeads.AbolTabol";
import Mentors from './Mentor.AbolTabol'
import Timeline from "./TimeLine.AbolTabol";

function page() {
  return (
    <div className='bg-linear-to-b from-[#0D30BB] via-[#2a237e] to-[#6e03e0]  w-full min-h-screen'>
      <EventNav/>
      <About/>
      <Rules/>
      <Timeline />
      {/* <Mentors /> */}
      <Leads/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default page