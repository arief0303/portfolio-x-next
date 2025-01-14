import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text, Float } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import MetaBall from '../components/MetaBall'
import Pointer from '../components/Pointer'
import Scene from '../components/Scene'
import AnimatedText from '../components/AnimatedText'
// import Gallery from '../components/Gallery'
import Carousel from '@/components/Carousel'
import Contact from '../components/Contact'
import Footer from '@/components/Footer'
import Head from 'next/head';
import Loader from '@/components/Loader';
import { overrideThemeVariables, Card, CardContent, Subtitle1, Subtitle2, H5, Body2, CardAction, Button } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

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
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 25 }}>
          <Scene />
        </Canvas>
        <div className='gradient-overlay z-1' />
        <AnimatedText />
        {/* Transparent div for capturing touch events in the bottom 20% of the canvas */}
        <div
          className="absolute bottom-0 w-full h-1/5"
          style={{ touchAction: 'pan-y' }}
        >
        </div>
      </div>
      <div className="flex justify-center items-center bg-light">
        <p className='text-black font-bold text-5xl mt-44 p-9' data-aos="zoom-in-up">Projects</p>
      </div>
      <div className='w-screen h-screen bg-light flex justify-center'>
        {isClient && <Carousel />}
      </div>
      <div className='w-screen h-screen bg-light flex items-center justify-center pt-64 md:pt-10'>
        {isClient && <Contact />}
      </div>
      {/* <div className='h-full w-screen bottom-0 mt-60'>
      <Footer />
      </div> */}
    </>
  )
}