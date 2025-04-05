import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const PaperTearCarousel = ({ images, width = 800, height = 600 }) => {
  // currentIndex shows the image that is fully visible when not transitioning
  const [currentIndex, setCurrentIndex] = useState(0);
  // transitioning holds the index of the image that is about to be revealed during transition.
  const [transitioningIndex, setTransitioningIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const leftTearRef = useRef(null);
  const rightTearRef = useRef(null);

  // Helper function to compute next or previous index.
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
    const nextIdx = getIndex(direction);
    // Set the transitioning image index (this will render the next image in the background)
    setTransitioningIndex(nextIdx);
    setIsTransitioning(true);

    // Use GSAP to animate the torn pieces offscreen
    const tl = gsap.timeline({
      onComplete: () => {
        // Once animation completes, update the current image and clear transitioning state.
        setCurrentIndex(nextIdx);
        setTransitioningIndex(null);
        setIsTransitioning(false);
      },
    });

    // Animate the left tear piece to slide off to the left.
    tl.to(
      leftTearRef.current,
      {
        duration: 0.8,
        x: -width,
        ease: "power3.in",
      },
      0
    );
    // Animate the right tear piece to slide off to the right.
    tl.to(
      rightTearRef.current,
      {
        duration: 0.8,
        x: width,
        ease: "power3.in",
      },
      0
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Image container */}
      <div className="relative" style={{ width, height }}>
        {/* Background: Render the next image if transitioning, else the current image */}
        {transitioningIndex !== null ? (
          <Image
            src={images[transitioningIndex]}
            alt="Next Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src={images[currentIndex]}
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        )}

        {/* Overlay: During transition, display torn pieces of the current image */}
        {isTransitioning && (
          <>
            {/* Left torn piece */}
            <div
              ref={leftTearRef}
              className="absolute top-0 left-0"
              style={{
                width: "50%",
                height: "100%",
                // Jagged clip-path for a torn paper effect on the left half.
                clipPath: "polygon(0% 0%, 48% 8%, 46% 50%, 48% 92%, 0% 100%)",
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: `${width}px ${height}px`,
                backgroundPosition: "left top",
              }}
            />
            {/* Right torn piece */}
            <div
              ref={rightTearRef}
              className="absolute top-0 right-0"
              style={{
                width: "50%",
                height: "100%",
                // Jagged clip-path for the right half.
                clipPath:
                  "polygon(52% 0%, 100% 0%, 100% 100%, 54% 92%, 56% 50%, 54% 8%)",
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: `${width}px ${height}px`,
                backgroundPosition: "right top",
              }}
            />
          </>
        )}

        {/* When not transitioning, render the current image normally on top */}
        {!isTransitioning && transitioningIndex === null && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
        )}
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

export default PaperTearCarousel;
