import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const generate = () => {
      const numberOfStars = Math.min(
        90,
        Math.floor((window.innerWidth * window.innerHeight) / 18000)
      );

      setStars(
        Array.from({ length: numberOfStars }, (_, i) => ({
          id: i,
          size: Math.random() * 2 + 0.6,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.45 + 0.25,
          animationDuration: Math.random() * 4 + 2,
        }))
      );

      setMeteors(
        Array.from({ length: 3 }, (_, i) => ({
          id: i,
          size: Math.random() * 1.4 + 0.8,
          x: Math.random() * 100,
          y: Math.random() * 18,
          delay: Math.random() * 12,
          animationDuration: Math.random() * 3 + 3,
        }))
      );
    };

    generate();
    window.addEventListener("resize", generate);
    return () => window.removeEventListener("resize", generate);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 42 + "px",
            height: meteor.size + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};
