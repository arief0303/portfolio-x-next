import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  {
    id: 1,
    title: "Project A",
    color: "white",
    imageUrl: "/images/closepay.png", // public folder
  },
  {
    id: 2,
    title: "Project B",
    color: "white",
    videoUrl: "/videos/regan-harney.mp4",
  },
  {
    id: 3,
    title: "Project C",
    color: "gray",
  },
];


function ProjectCard({ project, position }) {
  const [texture, setTexture] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    if (project.imageUrl) {
      new THREE.TextureLoader().load(project.imageUrl, setTexture);
    } else if (project.videoUrl) {
      const video = document.createElement('video');
      video.src = project.videoUrl;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play();
      videoRef.current = video;
      setTexture(new THREE.VideoTexture(video));
    }
  }, [project.imageUrl, project.videoUrl]);

  return (
    <mesh position={position}>
      <boxGeometry args={[2, 1.2, 0.1]} />
      <meshBasicMaterial map={texture} color={project.color} toneMapped={false} />
      <Html center>
        <div style={{
          position: 'absolute',
          top: '110%',
          fontSize: '0.9rem',
          color: 'white',
          background: 'rgba(0,0,0,0.5)',
          padding: '0.3rem 0.6rem',
          borderRadius: '0.3rem'
        }}>
          {project.title}
        </div>
      </Html>
    </mesh>
  );
}


function Carousel() {
  const radius = 4;
  const [index, setIndex] = useState(0);

  const angleStep = (2 * Math.PI) / projects.length;

  const rotateLeft = () => setIndex((prev) => (prev + 1) % projects.length);
  const rotateRight = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <>
      {projects.map((project, i) => {
        const angle = angleStep * ((i - index + projects.length) % projects.length);
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        return <ProjectCard key={project.id} project={project} position={[x, 0, z]} />;
      })}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Html position={[-2, -2.5, 0]}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={rotateLeft}>◀</button>
          <button onClick={rotateRight}>▶</button>
        </div>
      </Html>
    </>
  );
}

export default function PortfolioCarousel() {
  return (
    <div style={{ height: '500px' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <Carousel />
      </Canvas>
    </div>
  );
}
