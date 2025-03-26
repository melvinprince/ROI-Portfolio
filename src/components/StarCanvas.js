"use client";

import { useRef, useEffect } from "react";

const StarCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set canvas to full viewport size.
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create an array of twinkling stars.
    const numStars = 500;
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      // Random initial opacity for twinkling effect.
      opacity: Math.random(),
      // Speed at which the star twinkles.
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      // Determine if opacity is increasing (true) or decreasing (false).
      increasing: Math.random() < 0.5,
    }));

    // Shooting star setup: create and manage shooting stars.
    let shootingStars = [];
    const createShootingStar = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height * 0.5; // Only from the top half.
      return {
        x: startX,
        y: startY,
        // The length of the shooting star's trail.
        length: Math.random() * 80 + 50,
        // Speed of the shooting star.
        speed: Math.random() * 15 + 10,
        // Angle for the shooting star (45° for a diagonal effect).
        angle: Math.PI / 4,
        // Opacity for fading out.
        opacity: 1,
      };
    };

    // Update twinkling stars.
    const updateStars = () => {
      stars.forEach((star) => {
        if (star.increasing) {
          star.opacity += star.twinkleSpeed;
          if (star.opacity >= 1) {
            star.opacity = 1;
            star.increasing = false;
          }
        } else {
          star.opacity -= star.twinkleSpeed;
          if (star.opacity <= 0) {
            star.opacity = 0;
            star.increasing = true;
          }
        }
      });
    };

    // Update shooting stars: move them and fade them out.
    const updateShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        let s = shootingStars[i];
        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
        s.opacity -= 0.02;
        if (s.opacity <= 0) {
          shootingStars.splice(i, 1);
        }
      }
      // Randomly add a shooting star (if none exists) with a low probability.
      if (shootingStars.length < 1 && Math.random() < 0.1) {
        shootingStars.push(createShootingStar());
      }
    };

    // Draw all stars.
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars.
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Draw shooting stars.
      shootingStars.forEach((s) => {
        ctx.beginPath();
        // The shooting star trail: draw a line backwards from the current position.
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - s.length * Math.cos(s.angle),
          s.y - s.length * Math.sin(s.angle)
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    // The animation loop.
    const animate = () => {
      updateStars();
      updateShootingStars();
      drawStars();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default StarCanvas;
