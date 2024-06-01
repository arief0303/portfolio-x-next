import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Home() {
  return (
    <div className='h-screen w-screen'>
      <Canvas>
        <OrbitControls
          enableDamping
          enablePan
          enableRotate
          enableZoom
        />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  )
}