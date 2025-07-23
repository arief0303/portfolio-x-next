import React, { useEffect, useState, useMemo } from 'react'

export default function AnimatedText() {
  const words = useMemo(() => ['Hello, I am Arief', "Hallo, ich bin Arief", "Hallo, ik ben Arief", "Halo, saya Arief",  "Bonjour, je m'appelle Arief", "Kon'nichiwa, watashi wa Arīfudesu", 'Nǐ hǎo, wǒ shì Arief'], []);
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
      <div id="TitleText" className="word-fade text-black text-center md:text-left text-4xl flex items-end justify-start min-h-screen">
        {words.map((word, i) => (
          <h1
            key={i}
            className={`word ${i === index ? 'fade-in' : 'fade-out'}`}
            style={{
              transition: `opacity 1.5s ease-in-out`,
              opacity: i === index ? 1 : 0,
              lineHeight: '1.5em',
            }}
          >
            {word}.
          </h1>
        ))}
      </div>
    </>
  );
}