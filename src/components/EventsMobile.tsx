"use client";
import ConvolutionCard from "./ConvolutionCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel } from 'swiper/modules';
import { LuCircuitBoard } from "react-icons/lu";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './EventsMobile.css';

const eventsData = [
  {
    id: "01",
    category: "ELECTRONICS",
    title: "CIRCUISTICS",
    description: "Design, debug, and dominate the hardware realm. The flagship circuitry challenge for electronics enthusiasts.",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2lyY3VpdCUyMGJvYXJkfGVufDB8fDB8fHww",
  },
  {
    id: "02",
    category: "CODING",
    title: "ALGOMANIAC",
    description: "A competitive programming marathon. Solve complex algorithmic problems against the clock to prove your logic.",
    image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGVyfGVufDB8fDB8fHww",
  },
  {
    id: "03",
    category: "INNOVATION",
    title: "SPARKHACK",
    description: "Pitch your startup idea to industry experts. The tank is open for sharks to find the next big unicorn.",
    image: "https://media.istockphoto.com/id/2247682583/photo/hooded-hacker-silhouette-stealing-data-with-smartphone.jpg?s=612x612&w=0&k=20&c=g8bWEGCoJsIpOrVsOHOHgp6nJ1aSAdDF5731-WkyaSg=",
  },
  {
    id: "04",
    category: "RESEARCH",
    title: "EUREKA",
    description: "Scientific paper presentation and discussions. Where theory meets innovation and ideas take flight.",
    image: "https://media.istockphoto.com/id/1149178089/photo/artificial-intelligence-technology.jpg?s=612x612&w=0&k=20&c=Y4BeLaEJIF6w-7K3plHdxrhwAeA6VBrtowHzsuwSDtA=",
  },
  {
    id: "05",
    category: "ROBOTICS",
    title: "ROBOWARS",
    description: "The ultimate battle of steel and strategy. Build your bot and destroy the opposition in the arena.",
    image: "https://media.istockphoto.com/id/1270295304/photo/cyberpunk-soldier-airlock.jpg?s=612x612&w=0&k=20&c=HYdi9AtpolbggLYDRAcAaEB0jxcmkKbmeoK0BrXf0Is=",
  },
  {
    id: "06",
    category: "HACKATHON",
    title: "EETHON",
    description: "24 hours of coding, coffee, and creation. Build real-world solutions to pressing problems.",
    image: "https://media.istockphoto.com/id/2077057270/vector/abstract-technology-binary-code-background.jpg?s=612x612&w=0&k=20&c=2-7WgM2Hx07l3UjuH4EgVOAjhO7KGEB2w9dwjuJ_ekk=",
  },
];

const EventsMobile = () => {

  return (
    <div id="all-events" className="w-full bg-[#030303] flex flex-col items-center overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[25%_100%]" />
        <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-purple-900/15 via-cyan-900/10 to-transparent pointer-events-none" />
      </div>
      <div className="relative z-10 w-full max-w-350 px-6 md:px-12 pt-24 pb-12 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-sm animate-fade-in-down">
          <LuCircuitBoard className="text-cyan-400 animate-pulse" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">
            Mission Timeline
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-purple-200 to-cyan-400 drop-shadow-2xl mb-6 relative">
          The Events
          <span className="absolute -inset-1 blur-2xl bg-linear-to-r from-purple-600/30 to-cyan-600/30 -z-10"></span>
        </h1>

        <p className="max-w-2xl text-stone-400 text-sm md:text-lg font-medium leading-relaxed tracking-wide">
          Prepare for deployment. Choose your domain and prove your skills in the
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 font-bold"> ultimate techno-management battlefield</span>.
        </p>

        <div className="mt-12 w-full h-px bg-linear-to-r from-transparent via-purple-500/30 via-cyan-500/30 to-transparent relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full shadow-[0_0_20px_#a855f7,0_0_20px_#06b6d4]" />
        </div>

      </div>
      <Swiper 
        className="w-full max-w-350 px-4 md:px-12 relative z-10 flex items-center justify-center gap-8 md:gap-0 text-white"
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides={true}
        mousewheel={false}
        // loop={true}
        // autoplay={{
        //   delay: 1500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        pagination={{
          clickable: true,
          type: 'fraction'
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Mousewheel]}
      >
        {eventsData.map((event, index) => {
          //const isEven = index % 2 === 0;
          return (
            <SwiperSlide
              key={index}
              className={`w-full min-h-auto md:min-h-[50vh] flex items-center py-6 md:py-20 justify-center`}
            >
              <div className="w-full max-w-125 md:max-w-212.5 shrink-0 transform transition-all duration-700 hover:z-20 md:hover:scale-[1.02]">
                <ConvolutionCard data={event}/>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default EventsMobile;