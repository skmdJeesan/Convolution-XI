'use client'
import EventShowcase from "@/components/EventShowcase";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/HomeAbout";
import { userData } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Home() {
  const router = useRouter()
  let [loading, setLoading] = useState(false)

  const handleSignOut = async()=> {
    setLoading(true)
    try {
      await signOut()
      router.push('/login')
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  
  return (
    <main className="bg-black w-full h-screen">
      <HeroSection/>
      <HomeAbout/>
      <EventShowcase/>
      <FaqSection/>
      <Footer />
    </main>
   
  );
}
