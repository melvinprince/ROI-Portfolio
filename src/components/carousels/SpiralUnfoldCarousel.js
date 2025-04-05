import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const SpiralUnfoldCarousel = ({ images, width = 800, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentImageRef = useRef(null);

  // Helper function to compute the next/previous index
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

    // Animate the current image: spiral effect (rotate twice while scaling down)
    gsap.to(currentImageRef.current, {
      duration: 1.2,
      rotation: 720, // Two full spins
      scale: 0,
      ease: "power3.in",
      onComplete: () => {
        // Update the current image index and reset the transform of the animated layer
        setCurrentIndex(nextIdx);
        gsap.set(currentImageRef.current, { rotation: 0, scale: 1 });
        setIsTransitioning(false);
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Container with perspective for 3D effect */}
      <div className="relative" style={{ width, height, perspective: 1000 }}>
        {/* Background: Preloaded next image for a seamless transition */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[getIndex("next")]}
            alt="Next Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Foreground: Current image that will spiral out */}
        <div
          ref={currentImageRef}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
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

export default SpiralUnfoldCarousel;
