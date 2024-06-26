import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { MarchingCubes, Environment, Bounds, Float, useProgress, Html } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import MetaBall from './MetaBall'
import Pointer from './Pointer'

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

function Loader() {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <Html>
      <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '2px', margin: '20px 0' }}>
        <div style={{
          position: 'fixed',
          zIndex: 100,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '20px',
          width: '17vw',
          background: `linear-gradient(to right, #ffffff ${progress}%, #d9d9d9 ${progress}%)`,
          borderRadius: '2px',
          transition: 'background 0.5s ease-in-out, opacity 0.5s ease-in-out',
          textAlign: 'center',
          color: 'black',
          lineHeight: '20px',
          opacity: progress === 100 ? 0 : 1,
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
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
      {isLoading ? (
        <Loader /> // Show loader while loading
      ) : (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 25 }}>
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
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
          {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
          <Bounds fit clip observe margin={1}>
            <mesh visible={false}>
              <boxGeometry />
            </mesh>
          </Bounds>
        </Canvas>
      )}
    </>
  )
}