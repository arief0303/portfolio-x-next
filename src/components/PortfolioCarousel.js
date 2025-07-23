import React, { useRef, useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use your own icons

const PortfolioCarousel = ({ projects, autoPlay = false, autoPlayInterval = 5000 }) => {
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scrollBy = (amount) => {
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => (isDragging.current = false);
  const handleMouseUp = () => (isDragging.current = false);

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Optional autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      scrollBy(300);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        onClick={() => scrollBy(-300)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scrollBy(300)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md"
      >
        <ChevronRight size={24} />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-6 px-8 py-8 overflow-x-auto scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <PortfolioCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioCarousel;
