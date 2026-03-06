"use client";
import EventNav from "@/components/EventNavbar";
import Footer from "./Footer.Inquizzitive";
import Faq from "./Faq.Inquizzitive";
import About from "./About.Inquizzitive";
import Rules from "./Rules.Inquizzitive";
import Team from "./EventLeads.Inquizzitive";
import Timeline from "./TimeLine.Inquizzitive"
import Mentors from "./Mentor.Inquizzitive";

function page() {
  return (
    <div className='bg-linear-to-br from-slate-800 to-blue-800 w-full min-h-screen'>
      {/* <EventNav/> */}
      <About/>
      {/* <Rules/>
      <Timeline />
      <Mentors />
      <Team/>
      <Faq/>
      <Footer/> */}
    </div>
  )
}

export default page