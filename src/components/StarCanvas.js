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
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      increasing: Math.random() < 0.5,
    }));

    // Shooting star setup.
    let shootingStars = [];
    const createShootingStar = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height * 0.5; // Only from the top half.
      return {
        x: startX,
        y: startY,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 15 + 10,
        angle: Math.PI / 4, // 45° diagonal
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

    // Update shooting stars: move and fade out.
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
      // Add a new shooting star with low probability if none exist.
      if (shootingStars.length < 1 && Math.random() < 0.005) {
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

    // Animation control variables.
    let animationId;
    let isInView = false;

    // The animation loop.
    const animate = () => {
      updateStars();
      updateShootingStars();
      drawStars();
      if (isInView) {
        animationId = requestAnimationFrame(animate);
      }
    };

    // Intersection Observer to check if the canvas is in view.
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isInView) {
            isInView = true;
            animate();
          }
        } else {
          isInView = false;
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      observer.disconnect();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
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
