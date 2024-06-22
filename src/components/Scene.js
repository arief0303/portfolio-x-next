import React from 'react'
import { Canvas } from '@react-three/fiber'
import { MarchingCubes, Environment, Bounds, Float } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import MetaBall from './MetaBall'
import Pointer from './Pointer'

export default function Scene() {
  return (
    <>
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
    </>
  )
}