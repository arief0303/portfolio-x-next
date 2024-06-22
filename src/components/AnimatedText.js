import React, { useEffect, useState } from 'react'

export default function AnimatedText() {
  const words = ['Hello, I am ', "Hallo, ik ben ", "Bonjour, je m'appelle ", 'Hola, mi es ', 'Nǐ hǎo, wǒ shì ', "Kon'nichiwa, watashi wa ", "Hallo ich bin ", "Halo, nama saya "];
  const duration = 2000;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div id="TitleText" className="word-fade absolute bottom-0 left-0 right-0 text-center text-4xl text-black z-2 mb-52">
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