import React, { useEffect, useState } from "react";

const STAR_COUNT = 60;

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
};

export default function TwinklingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = getRandom(1, 2.5);
      const duration = getRandom(4, 8);
      const twinkleDuration = getRandom(1.5, 3.5);
      const top = getRandom(0, 100);
      const left = getRandom(0, 100);
      const moveDistance = getRandom(10, 30);
      const opacity = getRandom(0.5, 1);
      const animationDelay = `${getRandom(0, 3)}s, ${getRandom(0, 3)}s`;
      const moveKey = `moveY${i}`;

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
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <div className="twinkling-stars-bg">
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            borderRadius: "50%",
            opacity: star.opacity,
            animation: `twinkle ${star.twinkleDuration}s infinite alternate, ${star.moveKey} ${star.duration}s linear infinite alternate`,
            animationDelay: star.animationDelay,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}