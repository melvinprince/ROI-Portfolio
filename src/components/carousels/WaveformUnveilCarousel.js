import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const WaveformUnveilCarousel = ({ images, width = 1000, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);

  // Number of vertical slices to create a waveform effect mask
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

  // Preload the next image to ensure smooth transition
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  const handleTransition = async (direction = "next") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = getIndex(direction);

    // Preload the next image first
    try {
      await preloadImage(images[nextIndex]);
    } catch (e) {
      console.error("Failed to preload image", e);
      setIsTransitioning(false);
      return;
    }

    // Immediately update the main image to the next image
    setCurrentIndex(nextIndex);

    // Get the overlay container for the waveform mask
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.innerHTML = "";

    const sliceWidth = width / slicesCount;
    const slices = [];

    // Create mask slices that fully cover the image initially
    for (let i = 0; i < slicesCount; i++) {
      const slice = document.createElement("div");
      slice.style.position = "absolute";
      slice.style.top = "0";
      slice.style.left = `${i * sliceWidth}px`;
      slice.style.width = `${sliceWidth}px`;
      slice.style.height = `${height}px`; // full cover
      // Use a solid background color (or match your container) as a mask
      slice.style.backgroundColor = "#fff";
      slice.style.willChange = "height";
      overlay.appendChild(slice);
      slices.push(slice);
    }

    // Animate the slices so they collapse (height to 0) revealing the main image
    const tl = gsap.timeline({
      onComplete: () => {
        // Remove the overlay after animation completes
        overlay.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    tl.to(slices, {
      duration: 0.8,
      height: 0,
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
        {/* Main image, updated immediately on transition */}
        <Image
          src={images[currentIndex]}
          alt="Carousel Image"
          layout="fill"
          objectFit="cover"
          priority
        />
        {/* Overlay container for waveform mask slices */}
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      {/* Navigation buttons placed outside the image container */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => handleTransition("prev")}
          disabled={isTransitioning}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => handleTransition("next")}
          disabled={isTransitioning}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>

      {/* Global CSS override to prevent any unwanted transitions */}
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
