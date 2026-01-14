import EventShowcase from "@/components/EventShowcase";
import HomeAbout from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-green-900 w-full h-[100vh]">
      <HomeAbout/>
      <EventShowcase/>
    </main>
   
  );
}
