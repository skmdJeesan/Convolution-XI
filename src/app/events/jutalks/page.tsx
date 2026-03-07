"use client";
import Footer from "./Footer.Talks";
import Faq from "./Faq.Talks";
import About from "./About.Talks";
import Team from "./EventLeads.Talks";
import Navbar from "./Navbar.Talks";
import Hero from "./Hero.Talks";
import Timeline from "./TimeLine.Talks";
import Mentors from "./Mentor.Talks";
import Panelist from "./Panelist";

function page() {
  return (
    <div className=' w-full'>
      <Navbar navTheme="bg-[linear-gradient(to_bottom,#FF97E3,#B128A6,#96009B)]"/>
      <Hero/>
      <About/>
      <Timeline/>
      <Mentors/>
      <Panelist/>
      <Team/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default page