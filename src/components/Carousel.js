import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(10000); // Update to 3 seconds
  const [isImageLoading, setIsImageLoading] = useState(true);

  // useMemo to memoize the slides array
  const slides = useMemo(() => [
    {
      url: '/images/demo21.gif',
      title: '3D Van Interior Configurator',
      details: 'I developed an online 3D product customizer using Three.js, a JavaScript library for 3D graphics. The web app lets users customize and preview vehicle interiors for a particular model of a van for the client.',
    },
    {
      url: '/images/customizer-demo.gif',
      title: 'Shoe Configurator Demo',
      details: "A demo of a shoe customizer using React Three Fiber (a Three.js library wrapper for React & Next.js) this particular site is build on top of Next.js framework. The web app lets users customize a shoe color material by simply clicking each part of the shoe and modify its material. Check it out here.",
      link: "https://konfigurator-one.vercel.app/",
    },
    {
      url: '/images/bitaverse-demo.gif',
      title: 'Bitaverse',
      details: 'A metaverse featuring multiplayer made for the client Dentsu by utilizing Babylon.js & Colyseus using React as the framework. I developed metaverses featuring multiplayer using Babylon.js and Colyseus. I used Babylon.js to create and render the 3D models, materials, lights, cameras, and scenes for the metaverses. I used Colyseus to create and manage the game rooms, state synchronization, networking, and interactivity for the multiplayer features. A beta prototype build can be checked out here.',
      link: "https://beta.bitaverse.id/en",
    },
    {
      url: '/images/aspace-demo.gif',
      title: 'Aspace',
      details: 'A prototype metaverse variant built on same technologies as Bitaverse for the client Sampoerna. Featuring additional components such as minimap for player navigation, location based audio system, LOD performance optimization, and player area based teleportation.',
    },
    /* {
    url: '/images/Screenshot4.png',
    title: 'Closepay',
    details: 'I developed web applications for a fintech startup using various frameworks, mainly React and Next.js. The company focuses on payment systems especially in the educational industry.',
  }, */
    /* {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    }, */
  ], []);

  const isLastSlide = currentIndex === slides.length - 1;
  const { text, url, linkText } = slides[currentIndex].details;

  const prevSlideBtnClick = () => {
    setShouldContinue(false);
    setTimeout(() => setShouldContinue(true), 15000);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlideBtnClick = useCallback(() => {
    setShouldContinue(false);
    setTimeout(() => setShouldContinue(true), 15000);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length, setShouldContinue]);

  // useEffect hooks that use slides and  nextSlide
  // For example, preloading images
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.url;
    });
  }, [slides]);


  const goToSlide = ({ slideIndex }) => {
    setCurrentIndex(slideIndex);
  };

  //for every second change the slide
  useEffect(() => {
    // Preload images only when slides change
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;
    });
  }, [slides]);

  useEffect(() => {
    if (shouldContinue) {
      const interval = setInterval(() => {
        setCurrentIndex(currentIndex => isLastSlide ? 0 : currentIndex + 1);
      }, intervalDuration);

      return () => clearInterval(interval);
    }
  }, [currentIndex, shouldContinue, intervalDuration, isLastSlide]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    // Trigger the animation every time currentIndex changes
    setAnimate(false); // Reset animation
    const timer = setTimeout(() => setAnimate(true), 50); // Brief delay to reset the animation state
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="flex justify-center items-center">
        <p className='text-black font-bold text-5xl p-8' data-aos="zoom-in-up">Projects</p>
      </div>
      <div className='h-full w-full m-auto py-0 relative group bg-inherit'>
        <img
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex}`}
          className='h-1/4 sm:h-1/2 w-auto rounded-xl duration-500 overflow-hidden object-contain mx-auto'
        />
        {/* Bullet Indicators */}
        <div className="bullet-container">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`bullet ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
        <div className="w-screen h-auto px-4 md:px-32 pt-10">
          {slides[currentIndex].title && (
            slides[currentIndex].link ? (
              <a href={slides[currentIndex].link} className={`text-black text-2xl font-bold ${animate ? 'fade-in-title' : ''}`}>
                {slides[currentIndex].title}
              </a>
            ) : (
              <p className={`text-black text-2xl font-bold ${animate ? 'fade-in-title' : ''}`}>
                {slides[currentIndex].title}
              </p>
            )
          )}
          {slides[currentIndex].details && (
            <p className={`text-black text-lg font-light h-auto ${animate ? 'fade-in-details' : ''}`}>
              {slides[currentIndex].details.includes("Check it out here.") || slides[currentIndex].details.includes("A beta prototype build can be checked out here.") ? (
                <>
                  {slides[currentIndex].details.includes("A beta prototype build can be checked out here.") ? (
                    <>
                      {slides[currentIndex].details.substring(0, slides[currentIndex].details.indexOf("A beta prototype build can be checked out here."))}
                      <a href={slides[currentIndex].link} className="text-blue-500">A beta prototype build can be checked out here.</a>
                      {slides[currentIndex].details.substring(slides[currentIndex].details.indexOf("A beta prototype build can be checked out here.") + "A beta prototype build can be checked out here.".length)}
                    </>
                  ) : (
                    <>
                      {slides[currentIndex].details.substring(0, slides[currentIndex].details.indexOf("Check it out here."))}
                      <a href={slides[currentIndex].link} className="text-blue-500">Check it out here.</a>
                      {slides[currentIndex].details.substring(slides[currentIndex].details.indexOf("Check it out here.") + "Check it out here.".length)}
                    </>
                  )}
                </>
              ) : (
                slides[currentIndex].details
              )}
            </p>
          )}
        </div>
      </div>
    </>
  );
}