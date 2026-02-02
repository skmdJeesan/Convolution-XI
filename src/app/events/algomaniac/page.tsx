import Particles from '@/components/Particles'
import Image from 'next/image'

function page() {
  return (
    <div className='min-h-screen w-full bg-[#030305] flex flex-col items-center justify-center relative'>
      <h1 className='text-white text-3xl'>Algomaniac Event Page</h1>
      <h3 className='text-gray-400'>Comming soon..</h3>
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