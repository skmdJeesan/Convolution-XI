import React from 'react';
import styles from './EventCarousel.module.css';
import { 
  FaMicrochip, FaCode, FaLaptopCode, FaLightbulb, 
  FaChess, FaRandom, FaQuestion, FaMicrophone, 
  FaCamera, FaArrowRight 
} from 'react-icons/fa';

const events = [
  { 
    id: 1, 
    title: 'Circuistics', 
    desc: "Master the flow! Design complex circuits and prove your electrical prowess.",
    icon: <FaMicrochip />,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 2, 
    title: 'Algomaniac', 
    desc: "The ultimate coding showdown. Solve algorithms and race against time.",
    icon: <FaCode />,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 3, 
    title: 'SparkHack', 
    desc: "Innovate, Build, Deploy. A 24-hour hackathon to bring ideas to life.",
    icon: <FaLaptopCode />,
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 4, 
    title: 'Eureka', 
    desc: "Present your groundbreaking research and push the boundaries of tech.",
    icon: <FaLightbulb />,
    image: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 5, 
    title: 'Decisia', 
    desc: "Make the strategic choice in this intense business case study battle.",
    icon: <FaChess />,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 6, 
    title: 'Abol Tabol', 
    desc: "Where logic meets absurdity. A fun event for the creative minds.",
    icon: <FaRandom />,
    image: 'https://images.pexels.com/photos/3709370/pexels-photo-3709370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 7, 
    title: 'Inquizzitive', 
    desc: "The Grand Tech Quiz. Test your knowledge across all domains.",
    icon: <FaQuestion />,
    image: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 8, 
    title: 'JU Talks', 
    desc: "Inspiring journeys. Listen to industry leaders share their experiences.",
    icon: <FaMicrophone />,
    image: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    id: 9, 
    title: '24 Frames', 
    desc: "Capture the moment. A photography contest for visual storytellers.",
    icon: <FaCamera />,
    image: 'https://images.pexels.com/photos/1251299/pexels-photo-1251299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  }
];

const EventCarousel = () => {
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.carousel}>
        
        {/* Carousel Control Buttons */}
        <div className={`${styles.carouselControlButton} ${styles.left}`}>
          <input type="radio" name="carousel-control-input" />
        </div>
        <div className={`${styles.carouselControlButton} ${styles.right}`}>
          <input type="radio" name="carousel-control-input" defaultChecked />
        </div>

        {/* 3D Rotating Wrapper */}
        <div className={styles.carouselRotationDirection}>
          
          {/* --- NEW WRAPPER FOR ROBOT --- */}
          {/* This wrapper sits inside the rotating ring to fix depth sorting (Z-Index),
              but the CSS counter-rotates it so the robot stays facing forward. */}
          <div className={styles.centerRobotWrapper}>
             <div className={styles.centerPiece}>
                <img 
                  src="/assets/images/event_robot.png" 
                  alt="Event Mascot" 
                  className={styles.robotImage} 
                />
                {/* === NEW LINE ADDED HERE === */}
                {/* <div className={styles.robotLegsGradient}></div> */}
                {/* =========================== */}
                <div className={styles.spotlight}></div>
             </div>
          </div>
          {/* ----------------------------- */}

          {/* Cards List */}
          <ul 
            className={styles.carouselItemWrapper} 
            style={{ '--_num-elements': events.length } as React.CSSProperties}
          >
            {events.map((event, index) => (
              <li
                key={event.id}
                className={styles.carouselItem}
                style={{
                  '--_index': index + 1,
                  '--_image-url': `url('${event.image}')`,
                } as React.CSSProperties}
              >
                <div className={styles.cardContent}>
                  <div className={styles.iconContainer}>
                    {event.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDesc}>{event.desc}</p>
                  <a href={`/events/${event.id}`} className={styles.exploreBtn}>
                    Explore <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </li>
            ))}
            <li className={styles.carouselGround}></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default EventCarousel;