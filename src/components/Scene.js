import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { MarchingCubes, Environment, Bounds, Float, useProgress, Html } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import MetaBall from './MetaBall'
import Pointer from './Pointer'
import { a, useTransition } from "@react-spring/web";

function useProgressMock() {
  const [progress, setProgress] = useState(0); // Initial progress
  const [loaded, setLoaded] = useState(0); // Initial loaded items
  const total = 100; // Total items to load, for simplicity assuming 100%

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 1; // Increment progress
        if (nextProgress >= 100) {
          clearInterval(interval); // Stop the interval when 100% is reached
          return 100;
        }
        return nextProgress;
      });
      setLoaded((prevLoaded) => {
        const nextLoaded = prevLoaded + 1; // Increment loaded items
        return nextLoaded > total ? total : nextLoaded;
      });
    }, 100); // Update progress every 1 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Mock returning the same structure as the real useProgress
  return { active: true, progress, errors: [], item: '', loaded, total };
}

export default function Scene() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets with a promise
    new Promise((resolve) => {
      // Simulate an async operation like fetching assets
      setTimeout(resolve, 2000); // 2 seconds loading time
    }).then(() => {
      setIsLoading(false); // Set loading to false once assets are loaded
    });
  }, []);

  return (
    <>
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={1} />
        <Physics gravity={[0, 2, 0]}>
          <Float>
            <MarchingCubes resolution={40} maxPolyCount={20000} enableUvs={false} enableColors>
              <meshStandardMaterial vertexColors thickness={0.15} roughness={0} />
              <MetaBall color="indianred" position={[1, 1, 0.5]} />
              <MetaBall color="skyblue" position={[-1, -1, -0.5]} />
              <MetaBall color="teal" position={[2, 2, 0.5]} />
              <MetaBall color="orange" position={[-2, -2, -0.5]} />
              <MetaBall color="hotpink" position={[3, 3, 0.5]} />
              <MetaBall color="aquamarine" position={[-3, -3, -0.5]} />
              <Pointer />
            </MarchingCubes>
          </Float>
        </Physics>
        <Suspense fallback={null}>
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
        </Suspense>
        <Bounds fit clip observe margin={1}>
          <mesh visible={false}>
            <boxGeometry />
          </mesh>
        </Bounds>
    </>
  )
}