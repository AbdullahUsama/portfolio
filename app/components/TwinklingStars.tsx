import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"


const STAR_COUNT = 160;
// const PASTEL_COLORS = [
//   "#FFD6E0", // pink
//   "#B5EAD7", // mint
//   "#C7CEEA", // lavender
//   "#FFDAC1", // peach
//   "#E2F0CB", // light green
//   "#FFFACD", // lemon
//   "#B5D8FA", // blue
// ];
const PASTEL_COLORS = [
  "#FF69B4", // hot pink
  "#40E0D0", // turquoise
  "#9370DB", // medium purple
  "#FFA07A", // light salmon
  "#90EE90", // light green
  "#FFFF66", // light yellow
  "#87CEFA", // light sky blue
];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Star = {
  size: number;
  duration: number;
  twinkleDuration: number;
  top: number;
  left: number;
  moveDistance: number;
  opacity: number;
  animationDelay: string;
  moveKey: string;
  color: string;
};

export default function TwinklingStars({ darkMode }: { darkMode: boolean }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: STAR_COUNT }).map((_, i) => {
      // Make stars much bigger in light mode
      const size = darkMode ? getRandom(1, 2.5) : getRandom(8, 18);
      const duration = getRandom(4, 8);
      const twinkleDuration = getRandom(1.5, 3.5);
      const top = getRandom(0, 100);
      const left = getRandom(0, 100);
      const moveDistance = getRandom(10, 30);
      const opacity = getRandom(0.5, 1);
      const animationDelay = `${getRandom(0, 3)}s, ${getRandom(0, 3)}s`;
      const moveKey = `moveY${i}`;
      const color = darkMode
        ? "rgba(255,255,255,0.8)"
        : PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];

      // Inject keyframes only once per star
      if (!document.getElementById(moveKey)) {
        const styleTag = document.createElement("style");
        styleTag.id = moveKey;
        styleTag.innerHTML = `
          @keyframes ${moveKey} {
            from { transform: translateY(0); }
            to { transform: translateY(${moveDistance}px); }
          }
        `;
        document.head.appendChild(styleTag);
      }

      return {
        size,
        duration,
        twinkleDuration,
        top,
        left,
        moveDistance,
        opacity,
        animationDelay,
        moveKey,
        color,
      };
    });
    setStars(generatedStars);
  }, [darkMode]);

  // Inject twinkle keyframes once
  useEffect(() => {
    if (!document.getElementById("twinkle-keyframes")) {
      const styleTag = document.createElement("style");
      styleTag.id = "twinkle-keyframes";
      styleTag.innerHTML = `
        @keyframes twinkle {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);



return (
  <div
    className="twinkling-stars-bg"
    style={{
      position: "absolute",
      inset: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}
  >
    {darkMode ? (
      stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            borderRadius: "50%",
            opacity: star.opacity,
            animation: `twinkle ${star.twinkleDuration}s infinite alternate, ${star.moveKey} ${star.duration}s linear infinite alternate`,
            animationDelay: star.animationDelay,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))
    ) : (
// ...existing code...
      <svg
        className="w-full h-full"
        viewBox="0 0 3840 2160"
        fill="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1000,
        }}
      >
        <title>Background Floating Paths</title>
        {Array.from({ length: 80 }).map((_, i) => {
          // Distribute paths more widely and make them larger
          const offset = i * 50;
          const color = PASTEL_COLORS[i % PASTEL_COLORS.length];
          const d = `
            M${400 + offset} ${200 + i * 20}
            C${800 + offset} ${400 + i * 30}, ${1600 + offset} ${600 + i * 20}, ${2400 + offset} ${800 + i * 30}
          `;
          return (
            <motion.path
              key={i}
              d={d}
              stroke={color}
              strokeWidth={100 + i * 400}
              strokeOpacity={0.8}
              fill="none"
              initial={{ pathLength: 0.3, opacity: 0.5 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.5, 0.3],
                pathOffset: [1, 0, 0.5, 0, 0.5],
              }}
              transition={{
                duration: 28 + Math.random() * 14,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
// ...existing code...
    )}
    <style>
      {`
        @keyframes floatBokeh {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-24px) scale(1.08); }
        }
      `}
    </style>
  </div>
);
// ...existing code...
// ...existing code...
}