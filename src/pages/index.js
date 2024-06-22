import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text, Float } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'

function MetaBall({ color, vec = new THREE.Vector3(), ...props }) {
  const api = useRef()
  useFrame((state, delta) => {
    if (api.current) {
      delta = Math.min(delta, 0.1)
      api.current.applyImpulse(
        vec
          .copy(api.current.translation())
          .normalize()
          .multiplyScalar(delta * -0.05),
      )
    }
  })
  return (
    <RigidBody ref={api} colliders={false} linearDamping={4} angularDamping={0.95} {...props}>
      <MarchingCube strength={0.35} subtract={6} color={color} />
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  const { viewport } = useThree(); // Use useThree to get viewport
  useFrame(({ pointer, viewport }) => {
    const { width, height } = viewport.getCurrentViewport();
    const marginWidth = width * 0.15; // 15% margin on each side for width
    const marginHeight = height * 0.15; // 15% margin on each side for height

    // Calculate the effective width and height within the margins
    const effectiveWidth = width - 2 * marginWidth;
    const effectiveHeight = height - 2 * marginHeight;

    // Check if the pointer is within the center area with 25% margin on each side
    if (
      pointer.x >= -effectiveWidth / 2 &&
      pointer.x <= effectiveWidth / 2 &&
      pointer.y >= -effectiveHeight / 2 &&
      pointer.y <= effectiveHeight / 2
    ) {
      vec.set(pointer.x * (width / 2), pointer.y * (height / 2), 0);
      if (ref.current) {
        ref.current.setNextKinematicTranslation(vec);
      }
    }
  });

  useEffect(() => {
    const handleTouchMove = (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      const { width, height } = viewport.getCurrentViewport();
      const marginWidth = width * 0.15;
      const marginHeight = height * 0.15;
      const effectiveWidth = width - 2 * marginWidth;
      const effectiveHeight = height - 2 * marginHeight;

      // Convert touch position to [-1, 1] range, considering margins
      const x = ((touch.clientX / window.innerWidth) * 2 - 1) * (width / effectiveWidth);
      const y = -((touch.clientY / window.innerHeight) * 2 - 1) * (height / effectiveHeight);

      // Apply the same margin logic to touch input
      if (
        x >= -effectiveWidth / 2 &&
        x <= effectiveWidth / 2 &&
        y >= -effectiveHeight / 2 &&
        y <= effectiveHeight / 2
      ) {
        vec.set(x * (width / 2), y * (height / 2), 0);
        if (ref.current) {
          ref.current.setNextKinematicTranslation(vec);
        }
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <MarchingCube strength={0.5} subtract={10} color="orange" />
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  );
}

function Scene() {
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

function WordFade({ words, duration }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div id="TitleText" className="word-fade absolute bottom-0 left-0 right-0 text-center text-4xl text-black z-2 mb-36">
      {words.map((word, i) => (
        <h1
          key={i}
          className={`word ${i === index ? 'fade-in' : 'fade-out'}`}
          style={{
            transition: `opacity 1.5s ease-in-out`,
            opacity: i === index ? 1 : 0,
          }}
        >
          {word} Arief.
        </h1>
      ))}
    </div>
  );
}


function AnimatedText() {
  const words = ['Hello, I am ', "Hallo, ik ben ", "Bonjour, je m'appelle ", 'Hola, mi es ', 'Nǐ hǎo, wǒ shì ', "Kon'nichiwa, watashi wa ", "Hallo ich bin ", "Halo, Nama saya "];
  return <WordFade words={words} duration={2000} />;
}

export default function Home() {
  let text = "[Placeholder]";
  return (
    <>
      <div className='h-screen w-screen relative'>
        <Scene />
        {/* <h1 className='absolute bottom-0 left-0 right-0 text-center text-4xl text-black z-2 mb-36'>{text}</h1> */}
        <AnimatedText />
        <div className='gradient-overlay z-1' />
      </div>
      <div className='h-screen w-screen bg-white' />
    </>
  )
}