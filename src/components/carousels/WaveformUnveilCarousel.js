import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const WaveformUnveilCarousel = ({ images, width = 1000, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const overlayRef = useRef(null);

  // Number of vertical slices to create a waveform effect
  const slicesCount = 10;

  // Helper function to determine the next or previous index
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
    // Reset load state for the upcoming image
    setIsLoaded(false);

    const nextIndex = getIndex(direction);
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Clear any previous overlay content
    overlay.innerHTML = "";

    // Calculate slice width
    const sliceWidth = width / slicesCount;
    const slices = [];

    // Create slices that will reveal the next image
    for (let i = 0; i < slicesCount; i++) {
      const slice = document.createElement("div");
      slice.style.position = "absolute";
      slice.style.top = "0";
      slice.style.left = `${i * sliceWidth}px`;
      slice.style.width = `${sliceWidth}px`;
      // Start with zero height so they aren’t visible
      slice.style.height = "0px";
      slice.style.overflow = "hidden";
      // Use the next image as the background
      slice.style.backgroundImage = `url(${images[nextIndex]})`;
      slice.style.backgroundSize = `${width}px ${height}px`;
      slice.style.backgroundPosition = `-${i * sliceWidth}px 0`;
      overlay.appendChild(slice);
      slices.push(slice);
    }

    // Create a GSAP timeline to animate slices into view with a wave-like stagger
    const tl = gsap.timeline({
      onComplete: () => {
        // Update the current image once animation completes
        setCurrentIndex(nextIndex);
        // Clean up overlay to avoid flicker
        overlay.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    tl.to(slices, {
      duration: 0.8,
      height: height, // Expand each slice to full container height
      ease: "power3.out",
      stagger: {
        each: 0.1,
        from: "edges",
      },
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Image container */}
      <div className="relative" style={{ width, height }}>
        {/* Display current image */}
        <Image
          src={images[currentIndex]}
          alt="Carousel Image"
          layout="fill"
          objectFit="cover"
          priority
          onLoad={() => setIsLoaded(true)}
        />
        {/* Overlay for waveform slices */}
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      {/* Navigation buttons placed outside the image container */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => handleTransition("prev")}
          disabled={!isLoaded || isTransitioning}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => handleTransition("next")}
          disabled={!isLoaded || isTransitioning}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>

      {/* Global CSS override to remove unwanted image transitions */}
      <style jsx global>{`
        img {
          transition: none !important;
          transform: none !important;
        }
      `}</style>
    </div>
  );
};

export default WaveformUnveilCarousel;
