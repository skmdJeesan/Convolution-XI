import Particles from '@/components/Particles'
import TransitionLink from '@/components/TransitionLink'
import Image from 'next/image'
import { IoArrowBack } from 'react-icons/io5'

function page() {
  return (
    <div className='min-h-screen w-full bg-[#030305] flex flex-col items-center justify-center relative'>
       <TransitionLink
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-black/30 backdrop-blur-md border border-white/10 rounded-full hover:border-cyan-500/50 hover:bg-cyan-950/40 transition-all duration-300 shadow-lg group cursor-pointer overflow-hidden"
      >
        <IoArrowBack className="text-cyan-400 text-lg group-hover:-translate-x-1 transition-transform" />
        <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-cyan-100 group-hover:text-white uppercase">Return Home</span>
      </TransitionLink>
      <h1 className='text-white text-3xl'>Circuistics Event Page</h1>
      <h3 className='text-gray-400'>Coming soon..</h3>
      <Particles />
      <div className="absolute end-0 bottom-5 rotate-y-180">
        <Image
          src="/small_robo.png"
          alt="small robo Logo"
          width={200}
          height={300}
        />
      </div>
    </div>
  )
}

export default page