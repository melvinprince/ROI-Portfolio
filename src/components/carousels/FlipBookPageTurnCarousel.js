import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const FlipbookPageTurnCarousel = ({ images, width = 800, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // This ref is for the inner container that holds both front and back faces.
  const flipCardInnerRef = useRef(null);

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

    // Animate the flip-card inner element to rotate from 0 to -180 (or 180) degrees.
    gsap.to(flipCardInnerRef.current, {
      duration: 1,
      rotationY: direction === "next" ? -180 : 180,
      ease: "power3.inOut",
      onComplete: () => {
        // After the flip, update the current index and reset the rotation.
        setCurrentIndex(nextIdx);
        gsap.set(flipCardInnerRef.current, { rotationY: 0 });
        setIsTransitioning(false);
      },
    });
  };

  // Preload next image for the backside.
  const nextIndex = getIndex("next");

  return (
    <div className="flex flex-col items-center">
      {/* Container with perspective for 3D flip effect */}
      <div className="relative" style={{ width, height, perspective: 1200 }}>
        <div className="w-full h-full">
          <div
            ref={flipCardInnerRef}
            className="w-full h-full relative transform-style-3d"
            style={{
              transform: "rotateY(0deg)",
            }}
          >
            {/* Front face: Current image */}
            <div
              className="absolute top-0 left-0 w-full h-full backface-hidden"
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={images[currentIndex]}
                alt="Carousel Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* Back face: Next image */}
            <div
              className="absolute top-0 left-0 w-full h-full backface-hidden"
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <Image
                src={images[nextIndex]}
                alt="Next Carousel Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
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

export default FlipbookPageTurnCarousel;
