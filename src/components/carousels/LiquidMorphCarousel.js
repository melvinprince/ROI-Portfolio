import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const LiquidMorphCarousel = ({ images, width = 800, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dropletsRef = useRef(null);

  // Grid dimensions for droplets – adjust for finer/coarser effect.
  const cols = 10;
  const rows = 10;

  // Helper to compute next/previous index.
  const getIndex = (direction) => {
    if (direction === "next") {
      return (currentIndex + 1) % images.length;
    } else if (direction === "prev") {
      return (currentIndex - 1 + images.length) % images.length;
    }
    return currentIndex;
  };

  const handleTransition = (direction = "next") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIdx = getIndex(direction);
    const dropletContainer = dropletsRef.current;
    if (!dropletContainer) return;

    // Clear any previous droplets.
    dropletContainer.innerHTML = "";

    // Create droplets that cover the entire image.
    const dropletWidth = width / cols;
    const dropletHeight = height / rows;
    const droplets = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const droplet = document.createElement("div");
        droplet.style.position = "absolute";
        droplet.style.width = `${dropletWidth}px`;
        droplet.style.height = `${dropletHeight}px`;
        droplet.style.top = `${row * dropletHeight}px`;
        droplet.style.left = `${col * dropletWidth}px`;
        // Set the background to the current image with proper positioning.
        droplet.style.backgroundImage = `url(${images[currentIndex]})`;
        droplet.style.backgroundSize = `${width}px ${height}px`;
        droplet.style.backgroundPosition = `-${col * dropletWidth}px -${
          row * dropletHeight
        }px`;
        // Optional: give droplets a circular shape.
        droplet.style.borderRadius = "50%";
        dropletContainer.appendChild(droplet);
        droplets.push(droplet);
      }
    }

    // Create a GSAP timeline for the liquid morph effect.
    const tl = gsap.timeline({
      onComplete: () => {
        // Once droplets have dispersed, update the current image.
        setCurrentIndex(nextIdx);
        dropletContainer.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    // Animate each droplet: random offset, scale down, and fade out.
    tl.to(droplets, {
      duration: 1,
      opacity: 0,
      scale: 0,
      // Randomize x and y movement for a fluid, "liquid" dispersion.
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
      ease: "power3.in",
      stagger: {
        each: 0.01,
        from: "random",
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Container: Next image is rendered in the background. */}
      <div className="relative" style={{ width, height }}>
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[getIndex("next")]} // Preload next image behind
            alt="Next Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Current image rendered on top */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[currentIndex]}
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Droplets overlay for the liquid morph transition */}
        <div
          ref={dropletsRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      {/* Navigation buttons placed outside the image container */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => handleTransition("prev")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => handleTransition("next")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LiquidMorphCarousel;
