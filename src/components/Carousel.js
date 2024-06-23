import React, { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

export default function Carousel() {
  const slides = [
    {
      url: '/images/screenshot1.png',
      description: 'Bitaverse',
      details: 'A metaverse featuring multiplayer made with Babylon.js & Colyseus using React as the framework. I developed metaverses featuring multiplayer using Babylon.js and Colyseus. I used Babylon.js to create and render the 3D models, materials, lights, cameras, and scenes for the metaverses. I used Colyseus to create and manage the game rooms, state synchronization, networking, and interactivity for the multiplayer features.',
    },
    {
      url: '/images/image1.png',
      description: 'Aspace',
      details: 'A metaverse variant built on same technologies as Bitaverse for the client Sampoerna. Featuring additional components such as location based audio system, LOD performance optimization, and player area based(portal) teleportation.',
    },
    {
      url: '/images/image3.png',
      description: '3D Van interior configurator',
      details: 'I developed an online 3D product customizer using Three.js, a JavaScript library for 3D graphics. The web app lets users customize and preview vehicle interiors for a particular model of a van.',
    },
    {
      url: '/images/Screenshot4.png',
      description: 'Closepay',
      details: 'I developed web applications for a fintech startup using various frameworks, mainly React and Next.js. The company focuses on payment systems especially in the educational industry.',
    },
    /* {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    }, */
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const prevSlideBtnClick = () => {
    setShouldContinue(false);
    setTimeout(() => setShouldContinue(true), 10000);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const nextSlideBtnClick = () => {
    setShouldContinue(false);
    setTimeout(() => setShouldContinue(true), 10000);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = ({ slideIndex }) => {
    setCurrentIndex(slideIndex);
  };

  //for every second change the slide
  useEffect(() => {
    //preload all images first
    slides.forEach((slide) => {
      new Image().src = slide.url;
    });

    const interval = setInterval(() => {
      if (shouldContinue) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, shouldContinue]);

  return (
    <>
      <div className="flex justify-center items-center">
        <p className='text-black font-bold text-5xl p-20'>Projects</p>
      </div>
      <div className='h-full w-full m-auto py-0 px-4 relative group bg-inherit'>
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
          <p className='text-black text-2xl font-bold'>
            {slides[currentIndex].description}
          </p>
          <h4 className='text-black text-lg font-light h-auto'>
            {slides[currentIndex].details}
          </h4>
        </div>
      </div>
    </>
  );
}