import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text, Float } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import MetaBall from '../components/MetaBall'
import Pointer from '../components/Pointer'
import Scene from '../components/Scene'
import AnimatedText from '../components/AnimatedText'

export default function Home() {
  return (
    <>
      <div id='r3f' className='h-screen w-screen relative'>
        <Scene />
        <div className='gradient-overlay z-1' />
        <AnimatedText />
        <div className="flex justify-center items-center">
          <img src={'/chevron-compact-up.svg'} alt='Chevron Up' className="mt-[-250px] z-10 w-16 h-16 fade-up" />
        </div>
        {/* Transparent div for capturing touch events in the bottom 20% of the canvas */}
        <div
          className="absolute bottom-0 w-full h-1/5"
          style={{ touchAction: 'pan-y' }}
        ></div>
      </div>
      <div className='h-screen w-screen bg-white' />
    </>
  )
}