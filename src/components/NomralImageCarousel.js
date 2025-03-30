"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

function NormalImageCarousel({ images, play }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5, // adjust threshold as needed
  });

  useEffect(() => {
    if (!images || images.length === 0 || !play || !inView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images, play, inView]);

  return (
    <div ref={ref} className="relative w-full h-full">
      {images.map((src, index) => (
        <div
          key={index}
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`Carousel image ${index}`}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default React.memo(NormalImageCarousel);
