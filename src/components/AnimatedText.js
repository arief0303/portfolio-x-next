import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image';

export default function AnimatedText() {
  const words = useMemo(() => ['Hello, I am Arief', "Halo, nama saya Arief", "Hallo, ik ben Arief", "Hallo, ich bin Arief", "Bonjour, je m'appelle Arief", "Kon'nichiwa, watashi wa Arīfudesu",'Nǐ hǎo, wǒ shì Arief', 'Hola, mi es Arief'], []);
  const duration = 2000;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <>
      <div id="TitleText" className="word-fade absolute bottom-0 left-0 right-0 text-center text-4xl text-black z-2 mb-40">
        {words.map((word, i) => (
          <h1
            key={i}
            className={`word ${i === index ? 'fade-in' : 'fade-out'}`}
            style={{
              transition: `opacity 1.5s ease-in-out`,
              opacity: i === index ? 1 : 0,
            }}
          >
            {word}.
          </h1>
        ))}
        <div className="flex justify-center items-center">
        <Image src="/chevron-compact-up.svg" alt="chevron" width={500} height={300} className="z-10 w-16 h-16 fade-up mt-20"/>
        </div>
      </div>
    </>
  );
}