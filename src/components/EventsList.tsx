'use client';
import EventCarousel from "./EventCarousel";
// import EventsMobile from "./EventsMobile";

export default function EventsList() {
  return (
    <div id="events" className="w-full">
      {/* Hidden by default (mobile), displays on medium screens (tablet/desktop) and up */}
      <div className="hidden md:block">
        <EventCarousel />
      </div>

      {/* Displays by default (mobile), hidden on medium screens (tablet/desktop) and up */}
      {/* <div className="block md:hidden">
        <EventsMobile />
      </div> */}
    </div>
  );
}