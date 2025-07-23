import React from 'react';
import Image from 'next/image';

const technologies = [
  { name: 'Three.js', icon: '/logos/ThreeJS.svg' },
  { name: 'React', icon: '/logos/React.svg' },
  { name: 'Node.js', icon: '/logos/NodeJS.svg' },
  { name: 'JavaScript', icon: '/logos/JavaScript.svg' },
  { name: 'TypeScript', icon: '/logos/TypeScript.svg' },
  { name: 'MongoDB', icon: '/logos/MongoDB.svg' },
  { name: 'Next.js', icon: '/logos/NextJS.svg' },
  { name: 'TailwindCSS', icon: '/logos/TailwindCSS.svg' },
];

const Technologies = () => {
  return (
    <div className="md:mx-10">
      <h1 className="text-black text-center md:text-left font-thin text-5xl mb-16">Technologies</h1>
      <div className="relative gradient-overlay-edges overflow-hidden w-full">
        <div className="flex animate-scroll-left space-x-4 md:space-x-16 whitespace-nowrap mb-16">
          {technologies.slice(0, Math.ceil(technologies.length)).map((tech, index) => (
            <div key={index} className="flex flex-col items-center justify-center min-w-[120px] md:min-w-[180px]">
              <div className="w-20 h-20 md:w-28 md:h-28 relative hover:scale-125 transition-transform duration-300 flex items-center justify-center">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={112}
                  height={112}
                  className="object-contain w-full h-full p-2"
                />
              </div>
              <p className="mt-2 md:mt-4 text-black text-center text-sm md:text-base font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologies;