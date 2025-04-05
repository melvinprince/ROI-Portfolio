import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const CubeFlipCarousel = ({ images, width = 1000, height = 800 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);

  // Adjust these values for your grid – here we use a 3x3 grid.
  const rows = 3;
  const cols = 3;

  const totalCubes = rows * cols;

  // Get next index (for Next) or previous index (for Prev) based on the direction.
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

    // Clear any previous overlay cubes
    overlay.innerHTML = "";

    // Calculate dimensions for each cube
    const cubeWidth = width / cols;
    const cubeHeight = height / rows;

    // Create a cube for each grid cell
    const cubes = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cube = document.createElement("div");
        cube.style.position = "absolute";
        cube.style.width = `${cubeWidth}px`;
        cube.style.height = `${cubeHeight}px`;
        cube.style.top = `${row * cubeHeight}px`;
        cube.style.left = `${col * cubeWidth}px`;
        // Set the background to the next image and adjust the position so the correct part is shown.
        cube.style.backgroundImage = `url(${images[nextIndex]})`;
        cube.style.backgroundSize = `${width}px ${height}px`;
        cube.style.backgroundPosition = `-${col * cubeWidth}px -${
          row * cubeHeight
        }px`;
        // Use a 3D perspective on each cube
        cube.style.transformStyle = "preserve-3d";
        // Start with the cube rotated by 90 degrees along Y axis (hidden)
        cube.style.transform = "rotateY(90deg)";
        overlay.appendChild(cube);
        cubes.push(cube);
      }
    }

    // Create a GSAP timeline for the cube flip animation.
    const tl = gsap.timeline({
      onComplete: () => {
        // After animation, update the current image
        setCurrentIndex(nextIndex);
        // Clean up the overlay
        overlay.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    // Animate each cube to rotate from 90deg to 0deg with a stagger for a smooth, cascading effect.
    tl.to(cubes, {
      duration: 0.8,
      rotateY: 0,
      ease: "power3.out",
      stagger: {
        each: 0.05,
        grid: [rows, cols],
        from: "center",
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Image container */}
      <div className="relative" style={{ width, height }}>
        {/* Current image */}
        <Image
          src={images[currentIndex]}
          alt="Carousel Image"
          layout="fill"
          objectFit="cover"
        />
        {/* Overlay for cube pieces */}
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

export default CubeFlipCarousel;
