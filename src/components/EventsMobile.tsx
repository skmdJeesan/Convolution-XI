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

interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

const EventsMobile = ({events}: {events: Event[]}) => {

  return (
    <div id="events" className="w-full bg-[#030303] flex flex-col items-center justify-start overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-linear(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[25%_100%]" />
        <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-purple-900/15 via-cyan-900/10 to-transparent pointer-events-none" />
      </div>
      <div className="relative z-10 w-full max-w-350 px-6 md:px-12 pt-24 pb-12 flex flex-col items-center text-center">
        {/* <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-sm animate-fade-in-down">
          <LuCircuitBoard className="text-cyan-400 animate-pulse" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">
            Mission Timeline
          </span>
        </div> */}

        <h1 className="text-4xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-purple-200 to-cyan-400 drop-shadow-2xl mb-6 relative">
          The Events
          <span className="absolute -inset-1 blur-2xl bg-linear-to-r from-purple-600/30 to-cyan-600/30 -z-10"></span>
        </h1>

        <p className="max-w-2xl text-stone-400 text-sm md:text-lg font-medium leading-relaxed tracking-wide">
          Prepare for deployment. Choose your domain and prove your skills in the
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 font-bold"> ultimate techno-management battlefield</span>.
        </p>

        {/* <div className="mt-12 w-full h-px bg-linear-to-r from-transparent via-purple-500/30 via-cyan-500/30 to-transparent relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full shadow-[0_0_20px_#a855f7,0_0_20px_#06b6d4]" />
        </div> */}

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
        {events.map((event, index) => {
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