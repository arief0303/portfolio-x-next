import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

// Mock portfolio data with media support
const portfolioProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack web application with React, Node.js, and MongoDB",
    media: {
      type: "image",
      src: "/images/closepay.png",
      fallback: "#6366f1"
    },
    tech: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot with natural language processing capabilities",
    media: {
      type: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      fallback: "#10b981"
    },
    tech: ["Python", "TensorFlow", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      fallback: "#f59e0b"
    },
    tech: ["React Native", "Firebase", "Redux"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for real-time analytics and insights",
    media: {
      type: "video",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      fallback: "#ef4444"
    },
    tech: ["D3.js", "Vue.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform using blockchain technology",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      fallback: "#8b5cf6"
    },
    tech: ["Solidity", "Web3.js", "Ethereum"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

function ProjectCard({ project, position, isActive, onClick }) {
  const meshRef = useRef();
  const [mediaTexture, setMediaTexture] = useState(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const videoRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Scale effect for active card
      const targetScale = isActive ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Hover effect
      if (isActive) {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0.5, 0.1);
      } else {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
      }
    }
    
    // Update video texture if it exists
    if (mediaTexture && project.media.type === 'video' && videoRef.current) {
      mediaTexture.needsUpdate = true;
    }
  });

  // Load media texture
  useEffect(() => {
    if (project.media.type === 'image') {
      const loader = new THREE.TextureLoader();
      loader.load(
        project.media.src,
        (texture) => {
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          setMediaTexture(texture);
          setMediaLoaded(true);
        },
        undefined,
        (error) => {
          console.log('Image failed to load, using fallback');
          setMediaLoaded(false);
        }
      );
    } else if (project.media.type === 'video') {
      const video = document.createElement('video');
      video.src = project.media.src;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = false;
      
      video.onloadeddata = () => {
        const texture = new THREE.VideoTexture(video);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        setMediaTexture(texture);
        setMediaLoaded(true);
        videoRef.current = video;
        
        // Auto-play video for active card
        if (isActive) {
          video.play().catch(console.log);
        }
      };
      
      video.onerror = () => {
        console.log('Video failed to load, using fallback');
        setMediaLoaded(false);
      };
    }
  }, [project.media]);

  // Handle video play/pause based on active state
  useEffect(() => {
    if (videoRef.current && project.media.type === 'video') {
      if (isActive) {
        videoRef.current.play().catch(console.log);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, project.media.type]);

  // Fallback color if media fails to load
  const getFallbackColor = () => {
    return project.media.fallback || '#6366f1';
  };

  return (
    <group position={position} onClick={onClick}>
      {/* Main card with media or fallback */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 0.2]} />
        {mediaLoaded && mediaTexture ? (
          <meshStandardMaterial 
            map={mediaTexture}
            metalness={0.1}
            roughness={0.3}
          />
        ) : (
          <meshStandardMaterial 
            color={getFallbackColor()}
            metalness={0.3}
            roughness={0.4}
          />
        )}
      </mesh>
      
      {/* Card border/frame */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[4.1, 3.1, 0.05]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Media type indicator */}
      <mesh position={[1.7, 1.2, 0.12]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color={project.media.type === 'video' ? '#ef4444' : '#10b981'} 
          emissive={project.media.type === 'video' ? '#ef4444' : '#10b981'}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Loading indicator */}
      {!mediaLoaded && (
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Loading...
        </Text>
      )}
      
      {/* Project title */}
      <Text
        position={[0, -1.8, 0.2]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {project.title}
      </Text>
      
      {/* Media type label */}
      <Text
        position={[0, -2.1, 0.2]}
        fontSize={0.08}
        color="#e0e0e0"
        anchorX="center"
        anchorY="middle"
      >
        {project.media.type.toUpperCase()}
      </Text>
      
      {/* Tech stack */}
      <Text
        position={[0, -2.4, 0.2]}
        fontSize={0.08}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {project.tech.join(' • ')}
      </Text>
    </group>
  );
}

function Scene({ projects, currentIndex, onProjectClick }) {
  const groupRef = useRef();
  const { camera } = useThree();
  
  useFrame(() => {
    // Smooth camera movement
    const targetX = -(currentIndex * 5);
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.1
      );
    }
  });

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 5, 5]} intensity={0.4} color="#ffffff" />
      
      {/* Projects */}
      <group ref={groupRef}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            position={[index * 5, 0, 0]}
            isActive={index === currentIndex}
            onClick={() => onProjectClick(index)}
          />
        ))}
      </group>
      
      {/* Ground plane */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshPhysicalMaterial 
          color="#f8fafc"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

export default function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const currentProject = portfolioProjects[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioProjects.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => 
      prev === 0 ? portfolioProjects.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % portfolioProjects.length);
  };

  const handleProjectClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <Scene 
          projects={portfolioProjects}
          currentIndex={currentIndex}
          onProjectClick={handleProjectClick}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-auto">
          <button
            onClick={handlePrevious}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-auto">
          <button
            onClick={handleNext}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Project Info Panel */}
        <div className="absolute bottom-8 left-8 right-8 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentProject.title}
                </h2>
                <p className="text-white/80 text-lg max-w-2xl">
                  {currentProject.description}
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <ExternalLink className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Github className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Progress Indicators */}
            <div className="flex space-x-2">
              {portfolioProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleProjectClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Auto-play toggle */}
        <div className="absolute top-8 right-8 pointer-events-auto">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
              isAutoPlaying 
                ? 'bg-green-500/20 border-green-500/50 text-green-200' 
                : 'bg-white/10 border-white/20 text-white/70'
            }`}
          >
            {isAutoPlaying ? 'Auto-play ON' : 'Auto-play OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}