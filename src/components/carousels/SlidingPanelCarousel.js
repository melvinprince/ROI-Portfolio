import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const SlidingPanelsCarousel = ({ images, width = 800, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const panelsRef = useRef(null);

  // Define the number of vertical panels
  const panelsCount = 6;

  // Helper to compute next/previous index
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
    const panelsContainer = panelsRef.current;
    if (!panelsContainer) return;
    panelsContainer.innerHTML = "";

    // Calculate panel width and create panels that show the current image slice
    const panelWidth = width / panelsCount;
    const panels = [];

    for (let i = 0; i < panelsCount; i++) {
      const panel = document.createElement("div");
      panel.style.position = "absolute";
      panel.style.top = "0";
      panel.style.left = `${i * panelWidth}px`;
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${height}px`;
      panel.style.backgroundImage = `url(${images[currentIndex]})`;
      panel.style.backgroundSize = `${width}px ${height}px`;
      panel.style.backgroundPosition = `-${i * panelWidth}px 0`;
      // Alternate transform origin for a dynamic rotation: left for even panels, right for odd panels.
      panel.style.transformOrigin =
        i % 2 === 0 ? "left center" : "right center";
      panel.style.transform = "rotateY(0deg)";
      panelsContainer.appendChild(panel);
      panels.push(panel);
    }

    // Use a GSAP timeline to stagger the rotation of each panel.
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIdx);
        panelsContainer.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    // Animate panels to rotate off screen (left panels rotate -90deg, right panels rotate 90deg)
    panels.forEach((panel, index) => {
      tl.to(
        panel,
        {
          duration: 0.8,
          rotateY: index % 2 === 0 ? -90 : 90,
          ease: "power3.inOut",
        },
        index * 0.1 // Cascade effect: slight stagger between panels
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* The container applies perspective for the 3D effect */}
      <div className="relative" style={{ width, height, perspective: 1000 }}>
        {/* Render the next image in the background to ensure a seamless transition */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[getIndex("next")]}
            alt="Next Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Render the current image on top */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={images[currentIndex]}
            alt="Carousel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Panels overlay for the sliding rotation effect */}
        <div
          ref={panelsRef}
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

export default SlidingPanelsCarousel;
