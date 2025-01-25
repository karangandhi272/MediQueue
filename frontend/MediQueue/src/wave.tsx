import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated, useSprings } from "@react-spring/web";

const Wave: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Wave animation with symmetric breathing effect
  const waveAnimation = useSpring({
    from: { strokeDashoffset: 2000 },
    to: async (next) => {
      while (true) {
        await next({ strokeDashoffset: 0 }); // Breath in (left to right)
        await next({ strokeDashoffset: 2000 }); // Breath out (right to left)
      }
    },
    config: { duration: 4000 },
  });

  // Blue-themed fish data
  const fishData = Array.from({ length: 10 }, () => ({
    x: Math.random() * dimensions.width, 
    y: Math.random() * (dimensions.height * 0.4), 
    duration: 5000 + Math.random() * 5000,
  }));

  const fishSprings = useSprings(
    fishData.length,
    fishData.map((fish) => ({
      from: { transform: `translate(${fish.x}px, ${dimensions.height - fish.y}px)` },
      to: async (next: (arg0: { transform: string; }) => any) => {
        while (true) {
          await next({
            transform: `translate(${Math.random() * dimensions.width}px, ${dimensions.height - (Math.random() * (dimensions.height * 0.4))}px)`,
          });
        }
      },
      config: { duration: fish.duration, tension: 120, friction: 14 },
    }))
  );

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Dynamic window resize handling
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen bg-blue-50 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-b from-blue-200 to-blue-400"></div>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute w-full h-full"
      >
        <animated.path
          style={waveAnimation}
          d="M0,160 C360,100 1080,220 1440,160 C1440,100 1440,320 1440,320"
          fill="none"
          stroke="#1E90FF"
          strokeWidth="3"
          strokeDasharray="2000"
        />
      </svg>

      {fishSprings.map((spring, index) => (
        <animated.div
          key={index}
          style={{
            ...spring,
            position: "absolute",
            width: "30px",
            height: "15px",
          }}
        >
          <svg
            viewBox="0 0 64 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#4169E1"
          >
            <path d="M2,16 Q28,4 32,16 Q28,28 2,16 Z" />
            <circle cx="48" cy="16" r="3" fill="#87CEFA" />
          </svg>
        </animated.div>
      ))}


    </div>
  );
};

export default Wave;