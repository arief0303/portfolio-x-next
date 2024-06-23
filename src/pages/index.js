import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text, Float } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import MetaBall from '../components/MetaBall'
import Pointer from '../components/Pointer'
import Scene from '../components/Scene'
import AnimatedText from '../components/AnimatedText'
import Carousel from '../components/Carousel'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div id='r3f' className='h-screen w-screen relative'>
        <Scene />
        <div className='gradient-overlay z-1' />
        <AnimatedText />
        {/* Transparent div for capturing touch events in the bottom 20% of the canvas */}
        <div
          className="absolute bottom-0 w-full h-1/5"
          style={{ touchAction: 'pan-y' }}
        ></div>
      </div>
      <div className='h-screen w-screen bg-white pt-52'>
        <Carousel />
      </div>
      {/* <div className='h-full w-screen bottom-0 mt-60'>
      <Footer />
      </div> */}
    </>
  )
}