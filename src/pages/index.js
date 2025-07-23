// import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { OrbitControls, MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text, Float } from '@react-three/drei'
// import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
// import MetaBall from '../components/MetaBall'
// import Pointer from '../components/Pointer'
import Scene from '../components/Scene'
import AnimatedText from '../components/AnimatedText'
// import Gallery from '../components/Gallery'
// import Carousel from '@/components/Carousel'
// import Contact from '../components/Contact'
// import Footer from '@/components/Footer'
import Head from 'next/head';
import Loader from '@/components/Loader';
// import { overrideThemeVariables, Card, CardContent, Subtitle1, Subtitle2, H5, Body2, CardAction, Button } from 'ui-neumorphism'
// import 'ui-neumorphism/dist/index.css'
import Image from 'next/image';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <div id='r3f' className='h-screen w-screen relative'>
        <Loader />
        <Scene />

        <div className='gradient-overlay z-1' />
        <div className='flex flex-col absolute bottom-0 left-0 right-0 pointer-events-none'>
          <div className='md:mb-40 md:ml-10'>
            <AnimatedText />
            <div className='text-black text-center md:text-left text-2xl'>Creative Technologist</div>
            <div className='flex justify-center md:justify-start pointer-events-auto mt-3 md:mb-0 mb-4'>
              <button className='text-black nm-convex-white-lg rounded-full py-2 px-4'>Resume</button>
              <button className='text-blue-600 nm-convex-white-lg rounded-full py-2 px-4 ml-3'>Contact</button>
            </div>
          </div>
          <div className='text-gray-600 text-center md:hidden'>Swipe up</div>
          <div className="flex justify-center items-center">
            <Image src="/chevron-compact-up.svg" alt="chevron" width={500} height={300} className="w-16 h-16 fade-up" />
          </div>
        </div>
        {/* Transparent div for capturing touch events in the bottom 25% */}
        <div
          className="absolute bottom-0 w-full h-1/3"
          style={{ touchAction: 'pan-y' }}
        >
        </div>
      </div>
      <p className='flex text-black text-center font-bold text-5xl p-9 bg-light h-screen'></p>
      {/* <div className='w-screen h-screen bg-light flex justify-center'>
        {isClient && <Carousel />}
      </div> */}
      {/* <div className='w-screen h-screen bg-light flex items-center justify-center pt-64 md:pt-10'>
        {isClient && <Contact />}
      </div> */}
      {/* <div className='h-full w-screen bottom-0 mt-60'>
      <Footer />
      </div> */}
    </>
  )
}