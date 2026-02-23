'use client';
import EventCarousel from "./EventCarousel";
import EventsMobile from "./EventsMobile";
import { 
  FaMicrochip, FaCode, FaLaptopCode, FaLightbulb, 
  FaChess, FaRandom, FaQuestion, FaMicrophone, 
  FaCamera 
} from 'react-icons/fa';

export interface Event {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
  color: string;
}

const events: Event[] = [
  { 
    id: "circuistics", 
    title: 'Circuistics', 
    desc: "Master the flow! Design complex circuits and prove your electrical prowess.",
    icon: <FaMicrochip />,
    image: '/assets/images/circuistics.webp',
    color: '#06b6d4' // Cyan
  },
  { 
    id: "algomaniac", 
    title: 'Algomaniac', 
    desc: "The ultimate coding showdown. Solve algorithms and race against time.",
    icon: <FaCode />,
    image: '/assets/images/algomaniac.webp',
    color: '#FF00FF' // Magenta
  },
  { 
    id: "sparkhack", 
    title: 'SparkHack', 
    desc: "Innovate, Build, Deploy. A 24-hour hackathon to bring ideas to life.",
    icon: <FaLaptopCode />,
    image: '/assets/images/sparkhack.webp',
    color: '#DD6E0F' // ADeep Orange
  },
  { 
    id: "eureka", 
    title: 'Eureka', 
    desc: "Present your groundbreaking research and push the boundaries of tech.",
    icon: <FaLightbulb />,
    image: '/assets/images/eureka.jpeg',
    color: '#eab308' // Yellow
  },
  { 
    id: "decisia", 
    title: 'Decisia', 
    desc: "Make the strategic choice in this intense business case study battle.",
    icon: <FaChess />,
    image: '/assets/images/decisia.webp',
    color: '#6366f1' // Indigo
  },
  { 
    id: "aboltabol", 
    title: 'Abol Tabol', 
    desc: "Where logic meets absurdity. A fun event for the creative minds.",
    icon: <FaRandom />,
    image: '/assets/images/aboltabol.webp',
    color: '#ec4899' // Pink
  },
  { 
    id: "inquizzitive", 
    title: 'Inquizzitive', 
    desc: "The Grand Tech Quiz. Test your knowledge across all domains.",
    icon: <FaQuestion />,
    image: '/assets/images/inquizzitive.webp',
    color: '#7F00FF' // Violet
  },
  { 
    id: "jutalks", 
    title: 'JU Talks', 
    desc: "Inspiring journeys. Listen to industry leaders share their experiences.",
    icon: <FaMicrophone />,
    image: '/assets/images/jutalks.jpeg',
    color: '#ef4444' // Red
  },
  { 
    id: "frames", 
    title: '24 Frames', 
    desc: "Capture the moment. A photography contest for visual storytellers.",
    icon: <FaCamera />,
    image: '/assets/images/24frames.webp',
    color: '#0ea5e9' // Sky Blue
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
      <div className="block md:hidden">
        <EventsMobile events={events}/>
      </div>
    </div>
  );
}