"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const TriangularCascadeCarousel = ({ images, width = 800, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);

  // Calculate the next index
  const nextIndex = (currentIndex + 1) % images.length;

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        if (overlayRef.current) {
          overlayRef.current.innerHTML = "";
        }
        setIsTransitioning(false);
      },
    });

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Clear any previous overlay content
    overlay.innerHTML = "";

    // Define triangle configurations with CSS clip-paths and background positions
    const triangles = [
      {
        clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
        backgroundPosition: "left top",
      },
      {
        clipPath: "polygon(100% 0%, 100% 100%, 0% 0%)",
        backgroundPosition: "right top",
      },
      {
        clipPath: "polygon(0% 100%, 0% 0%, 100% 100%)",
        backgroundPosition: "left bottom",
      },
      {
        clipPath: "polygon(100% 100%, 0% 100%, 100% 0%)",
        backgroundPosition: "right bottom",
      },
    ];

    // Create triangle divs overlaying the container
    const triangleDivs = [];
    triangles.forEach((tri) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.top = "0";
      div.style.left = "0";
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.clipPath = tri.clipPath;
      div.style.backgroundImage = `url(${images[nextIndex]})`;
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = tri.backgroundPosition;
      // Start with a small scale and rotated state
      div.style.transform = "scale(0) rotate(45deg)";
      overlay.appendChild(div);
      triangleDivs.push(div);
    });

    // Animate triangles to scale up and rotate into place
    tl.to(triangleDivs, {
      duration: 1,
      scale: 1,
      rotate: 0,
      ease: "power3.out",
      stagger: 0.2,
    });
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* Render current image using Next Image */}
      <Image
        src={images[currentIndex]}
        alt="Carousel Image"
        layout="fill"
        objectFit="cover"
      />

      {/* Overlay container for triangle pieces */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></div>

      {/* Navigation Buttons */}
      <button
        onClick={handleNext}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-black"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[-20] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-black"
      >
        Next
      </button>
    </div>
  );
};

export default TriangularCascadeCarousel;
