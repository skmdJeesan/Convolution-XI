'use client';
import EventCarousel from "./EventCarousel";
import EventsMobile from "./EventsMobile";
import { 
  FaMicrochip, FaCode, FaLaptopCode, FaLightbulb, 
  FaChess, FaRandom, FaQuestion, FaMicrophone, 
  FaCamera, FaArrowRight 
} from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
}

const events: Event[] = [
  { 
    id: "circuistics", 
    title: 'Circuistics', 
    desc: "Master the flow! Design complex circuits and prove your electrical prowess.",
    icon: <FaMicrochip />,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "algomaniac", 
    title: 'Algomaniac', 
    desc: "The ultimate coding showdown. Solve algorithms and race against time.",
    icon: <FaCode />,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "sparkhack", 
    title: 'SparkHack', 
    desc: "Innovate, Build, Deploy. A 24-hour hackathon to bring ideas to life.",
    icon: <FaLaptopCode />,
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "eureka", 
    title: 'Eureka', 
    desc: "Present your groundbreaking research and push the boundaries of tech.",
    icon: <FaLightbulb />,
    image: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "decisia", 
    title: 'Decisia', 
    desc: "Make the strategic choice in this intense business case study battle.",
    icon: <FaChess />,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "aboltabol", 
    title: 'Abol Tabol', 
    desc: "Where logic meets absurdity. A fun event for the creative minds.",
    icon: <FaRandom />,
    image: 'https://images.pexels.com/photos/3709370/pexels-photo-3709370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "inquizzitive", 
    title: 'Inquizzitive', 
    desc: "The Grand Tech Quiz. Test your knowledge across all domains.",
    icon: <FaQuestion />,
    image: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "jutalks", 
    title: 'JU Talks', 
    desc: "Inspiring journeys. Listen to industry leaders share their experiences.",
    icon: <FaMicrophone />,
    image: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: "frames", 
    title: '24 Frames', 
    desc: "Capture the moment. A photography contest for visual storytellers.",
    icon: <FaCamera />,
    image: 'https://images.pexels.com/photos/1251299/pexels-photo-1251299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  }
];

export default function EventsList() {
  return (
    <div id="events" className="w-full">
      {/* Hidden by default (mobile), displays on medium screens (tablet/desktop) and up */}
      <div className="hidden md:block">
        <EventCarousel events={events}/>
      </div>

      {/* Displays by default (mobile), hidden on medium screens (tablet/desktop) and up */}
      /* <div className="block md:hidden">
        <EventsMobile events={events}/>
      </div>
    </div>
  );
}