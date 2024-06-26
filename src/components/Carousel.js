import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [animate, setAnimate] = useState(false);

  // useMemo to memoize the slides array
  const slides = useMemo(() => [
    {
      url: '/images/bitaverse-demo.gif',
      title: 'Bitaverse',
      details: 'A metaverse featuring multiplayer made with Babylon.js & Colyseus using React as the framework. I developed metaverses featuring multiplayer using Babylon.js and Colyseus. I used Babylon.js to create and render the 3D models, materials, lights, cameras, and scenes for the metaverses. I used Colyseus to create and manage the game rooms, state synchronization, networking, and interactivity for the multiplayer features.',
    },
    {
      url: '/images/aspace-demo.gif',
      title: 'Aspace',
      details: 'A prototype metaverse variant built on same technologies as Bitaverse for the client Sampoerna. Featuring additional components such as minimap for player navigation, location based audio system, LOD performance optimization, and player area based teleportation.',
    },
    {
      url: '/images/demo21.gif',
      title: '3D Van interior configurator',
      details: 'I developed an online 3D product customizer using Three.js, a JavaScript library for 3D graphics. The web app lets users customize and preview vehicle interiors for a particular model of a van.',
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

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const prevSlideBtnClick = () => {
    setShouldContinue(false);
    setTimeout(() => setShouldContinue(true), 5000);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, []);

  // useEffect hooks that use slides and nextSlide
  // For example, preloading images
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.url;
    });
  }, [slides]);

const nextSlideBtnClick = useCallback(() => {
  setShouldContinue(false);
  setTimeout(() => setShouldContinue(true), 5000);
  const isLastSlide = currentIndex === slides.length - 1;
  const newIndex = isLastSlide ? 0 : currentIndex + 1;
  setCurrentIndex(newIndex);
}, [currentIndex, slides.length, setShouldContinue]);

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
    const interval = setInterval(() => {
      if (shouldContinue) {
        nextSlide();
      }
    }, 10000);

    // Cleanup to prevent memory leaks
    return () => clearInterval(interval);
  }, [shouldContinue, nextSlide]);

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
        <p className='text-black font-bold text-5xl p-20' data-aos="zoom-in-up">Projects</p>
      </div>
      <div className='h-full w-full m-auto py-0 relative group bg-inherit'>
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`, backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          className='w-full h-1/2 rounded-2xl bg-center bg-cover duration-500'
        >
        </div>
        <div className='flex justify-center mt-4'>
          {/* Left Arrow */}
          <div className='text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlideBtnClick} size={30} />
          </div>
          {/* Spacer for visual balance, adjust as needed */}
          <div className='mx-2'></div>
          {/* Right Arrow */}
          <div className='text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlideBtnClick} size={30} />
          </div>
        </div>
        <div className='w-screen h-auto px-4 md:px-32 pt-10'>
          <p className={`text-black text-2xl font-bold ${animate ? 'fade-in-title' : ''}`}>
            {slides[currentIndex].title}
          </p>
          <h4 className={`text-black text-lg font-light h-auto ${animate ? 'fade-in-details' : ''}`}>
            {slides[currentIndex].details}
          </h4>
        </div>
      </div>
    </>
  );
}