'use client'
import { useRouter } from 'next/navigation'
import React, { useContext, useMemo, useState } from 'react'
import { userData } from '@/context/UserContext'
import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

interface User {
  _id: string;
  name: string;
  email: string;
  institution: string;
  dept: string;
  phone: string;
  eventsRegistered: string[]; // This array is CRITICAL
}

interface DashboardProps {
  users: User[]; // We will pass the full list from the server
}

function page({users}: DashboardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const data = useContext(userData)

  const [activeTab, setActiveTab] = useState("All Participants");
  const navItems = ["All Participants", "Algomaniac", "Aboltabol", "Decisia", "Inquizzitive", "Sparchack", "Ju talks", "Eureka", "Circuistics", "24 Frames"];

  // This automatically updates whenever 'activeTab' or 'users' changes
  const filteredUsers = useMemo(() => {
    if (activeTab === "All Participants") return users;
    // Return users who have the activeTab name in their 'eventsRegistered' array
    return users.filter(user => user.eventsRegistered.includes(activeTab));
  }, [activeTab, users]);

  return (
    <div className='h-screen bg-zinc-900 flex flex-col gap-1 items-start justify-start px-10 pt-10 font-sans text-white'>
      <h1 className='text-base md:text-2xl uppercase font-semibold px-4'>This is Leader's dashboard</h1>
      {/* <h1 className='text-lg md:text-2xl'>Welcome <span className='text-purple-400 font-bold'>{data?.user?.name} 🤖</span></h1> */}

      {/* Tab-bar */}
      <div className="py-2 px-4 bg-zinc-800 rounded-full w-full overflow-y-hidden">
        <ul className='flex justify-between gap-2 min-w-max'>
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveTab(item)}
              className="relative px-4 py-2 rounded-full cursor-pointer text-base font-medium transition-colors duration-200"
            >
              {/* 1. The Moving Background (Only renders for the active tab) */}
              {activeTab === item && (
                <motion.span
                  layoutId="active-pill" // This ID connects the animation between different tabs
                  className="absolute inset-0 bg-zinc-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* 2. The Text (Must be z-10 to sit ON TOP of the background) */}
              <span className={`relative z-10 ${activeTab === item ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Data table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-y-auto w-full mt-2 no-scrollbar">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{activeTab}</h2>
          <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md">
            Total: {filteredUsers.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-zinc-200 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Dept</th>
                <th className="px-6 py-4">Events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.institution}</td>
                    <td className="px-6 py-4">{user.dept}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {user.eventsRegistered.map(e => (
                          <span key={e} className="text-[10px] bg-cyan-900/30 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800/30">
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-base text-zinc-600">
                    No participants found for {activeTab}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="w-full border-t border-zinc-900 bg-zinc-900 py-2 mt-auto">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Left Side: Branding */}
              <div className="flex flex-col items-center md:items-start gap-1">
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold tracking-noramal text-zinc-200">Convolution XI</h3>
                  </div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">Official Administration Portal</p>
              </div>

              {/* Right Side: Developer Credit */}
              <div className="flex flex-col items-center md:items-end gap-1">
                  <div className="flex items-center gap-3">
                      <a href="https://github.com/skmdJeesan" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-zinc-900 rounded-full">
                          <FaGithub size={18} />
                      </a>
                      <a href="https://www.linkedin.com/in/smjeesan/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors p-2 hover:bg-zinc-900 rounded-full">
                          <FaLinkedin size={18} />
                      </a>
                      <a href="https://instagram.com/_skmdjeesan" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-pink-500 transition-colors p-2 hover:bg-zinc-900 rounded-full">
                          <FaInstagram size={18} />
                      </a>
                  </div>
                  <div className="text-right">
                      <p className="text-[10px] text-zinc-500 font-medium">
                          System Architect & Developed by <span className="text-zinc-300 font-bold ml-1">Sk Md Jeesan</span>
                      </p>
                  </div>
              </div>
          </div>
      </footer>

    </div>
  )
}

export default page