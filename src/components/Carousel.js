import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { overrideThemeVariables, Card, CardContent, Subtitle1, Subtitle2, H5, Body2, CardAction, Button, CardHeader, H6, IconButton, CardMedia, Spacer } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import { useSwipeable } from 'react-swipeable';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(10000);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [direction, setDirection] = useState('');

  // useMemo to memoize the slides array
  const slides = useMemo(() => [
    {
      url: '/images/closepay.png',
      title: 'Closepay',
      details: 'I specialised in pixel-perfect front-end development with a focus on React and Next.js. I am responsible for both development and UI design, utilising tools such as Figma to ensure seamless functionality and visually appealing user interfaces.',
      category: 'Web Design & Development',
    },
    {
      url: '/images/demo21.gif',
      title: '3D Van Interior Configurator',
      details: 'I developed an online 3D product customizer using Three.js, a JavaScript library for 3D graphics. The web app lets users customize and preview vehicle interiors for a particular model of a van for the client.',
      category: 'Web Development',
    },
    {
      url: '/images/customizer-demo.gif',
      title: 'Shoe Configurator Demo',
      details: "A demo of a shoe customizer using React Three Fiber (a Three.js library wrapper for React & Next.js) this particular site is build on top of Next.js framework. The web app lets users customize a shoe color material by simply clicking each part of the shoe and modify its material. Check it out here.",
      link: "https://konfigurator-one.vercel.app/",
      category: 'Web Development',
    },
    {
      url: '/images/bitaverse-demo.gif',
      title: 'Bitaverse',
      details: 'A metaverse featuring multiplayer made by utilizing Babylon.js, Colyseus, and React. I used Babylon.js to create and render the scenes for the metaverses. Colyseus is used to create and manage the game rooms, networking, and interactivity for the multiplayer features. Beta version can be checked out here.',
      link: "https://beta.bitaverse.id/en",
      category: 'Web Development',
    },
    {
      url: '/images/aspace-demo.gif',
      title: 'Aspace',
      details: 'A prototype metaverse variant built on same technologies as Bitaverse for the client Sampoerna. Featuring additional components such as minimap for player navigation, location based audio system, LOD performance optimization, and player area based teleportation.',
      category: 'Web Development',
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

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setDirection('left');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setAnimate(true);
    },
    onSwipedRight: () => {
      setDirection('right');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      setAnimate(true);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(false), 1000); // 1 second delay
    return () => clearTimeout(timeout);
  }, [currentIndex]);

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

  const handlePrev = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setAnimate(true);
  };

  const handleNext = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setAnimate(true);
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
      <Card className='h-[110vh] mt-10 mx-3 lg:mx-56'>
        <CardHeader
          title={
            <H6>
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
            </H6>}
          subtitle={
            <Subtitle2 secondary className={`${animate ? 'fade-in-right' : ''}`}>
              {slides[currentIndex].category}
            </Subtitle2>
          }
        />
                <div {...handlers} className="carousel-container hover-show-buttons">
          <a
            onClick={handlePrev}
            type="button"
            className="slider-button prev-button rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-black dark:hover:bg-secondary-900"
            data-twe-ripple-init>
            <span className="mx-auto icon-container">
              <Icon path={mdiChevronLeft} size={1} className="icon" />
            </span>
          </a>
          <CardMedia
            component="img"
            height={512}
            src={slides[currentIndex].url}
            alt={slides[currentIndex].title}
            className={`carousel-image ${animate ? (direction === 'left' ? 'slide-fade-in-left' : 'slide-fade-in-right') : ''}`}
          />
          <a
            onClick={handleNext}
            type="button"
            className="slider-button next-button rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-black dark:hover:bg-secondary-900"
            data-twe-ripple-init>
            <span className="mx-auto icon-container">
              <Icon path={mdiChevronRight} size={1} className="icon" />
            </span>
          </a>
        </div>
        <div className="bullet-container">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`bullet ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                setShouldContinue(false);
                setTimeout(() => {
                  setShouldContinue(true);
                }, 3000); // 3000ms delay (3 seconds)
              }}
            ></span>
          ))}
        </div>
        <CardContent>
          <Body2 className='mt-10'>
            {slides[currentIndex].details && (
              <p className={`text-black text-lg font-light h-auto ${animate ? 'fade-in-details' : ''}`}>
                {slides[currentIndex].details.includes("Check it out here.") || slides[currentIndex].details.includes("Beta version can be checked out here.") ? (
                  <>
                    {slides[currentIndex].details.includes("Beta version can be checked out here.") ? (
                      <>
                        {slides[currentIndex].details.substring(0, slides[currentIndex].details.indexOf("Beta version can be checked out here."))}
                        <a href={slides[currentIndex].link} className="text-blue-500">Beta version can be checked out here.</a>
                        {slides[currentIndex].details.substring(slides[currentIndex].details.indexOf("Beta version can be checked out here.") + "Beta version can be checked out here.".length)}
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
          </Body2>
        </CardContent>
      </Card>
    </>
  );
}