import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const FractalDisintegrationCarousel = ({
  images,
  width = 800,
  height = 600,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);

  // Define grid dimensions to simulate fractal pieces.
  const rows = 10;
  const cols = 10;

  // Helper function to get next/previous index.
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
    const nextIndex = getIndex(direction);
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Clear any previous overlay content.
    overlay.innerHTML = "";

    // Calculate dimensions for each fractal piece.
    const pieceWidth = width / cols;
    const pieceHeight = height / rows;
    const pieces = [];

    // Create pieces that show the correct portion of the current image.
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = document.createElement("div");
        piece.style.position = "absolute";
        piece.style.width = `${pieceWidth}px`;
        piece.style.height = `${pieceHeight}px`;
        piece.style.top = `${row * pieceHeight}px`;
        piece.style.left = `${col * pieceWidth}px`;
        piece.style.backgroundImage = `url(${images[currentIndex]})`;
        piece.style.backgroundSize = `${width}px ${height}px`;
        piece.style.backgroundPosition = `-${col * pieceWidth}px -${
          row * pieceHeight
        }px`;
        overlay.appendChild(piece);
        pieces.push(piece);
      }
    }

    // Use a GSAP timeline to animate the fractal pieces.
    // Each piece will randomly rotate, shift, scale down, and fade out.
    const tl = gsap.timeline({
      onComplete: () => {
        // Once animation completes, update the current image,
        // clear the overlay, and reset the transitioning flag.
        setCurrentIndex(nextIndex);
        overlay.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    tl.to(pieces, {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      rotation: () => gsap.utils.random(-180, 180),
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
      ease: "power3.in",
      stagger: {
        each: 0.02,
        from: "random",
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Container with layered images */}
      <div className="relative" style={{ width, height }}>
        {/* Background: Preloaded next image for a smooth transition */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[getIndex("next")]}
            alt="Next Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Foreground: Current image */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[currentIndex]}
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Overlay container for fractal pieces */}
        <div
          ref={overlayRef}
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

export default FractalDisintegrationCarousel;
