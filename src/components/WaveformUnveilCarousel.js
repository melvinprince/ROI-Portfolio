import React, { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const WaveformUnveilCarousel = ({ images, width = 1000, height = 600 }) => {
  console.log(images);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Store the displayed image dimensions and offsets.
  const [imgSize, setImgSize] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  // Number of slices to create the mask
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

  // Preload the next image to ensure a smooth transition
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  // onLoadingComplete callback to compute the displayed image dimensions.
  const handleImageLoad = ({ naturalWidth, naturalHeight }) => {
    // Calculate the aspect ratios.
    const containerAspect = width / height;
    const imageAspect = naturalWidth / naturalHeight;
    let displayWidth,
      displayHeight,
      offsetX = 0,
      offsetY = 0;

    if (imageAspect > containerAspect) {
      // Image is wider: fill the container width.
      displayWidth = width;
      displayHeight = width / imageAspect;
      offsetY = (height - displayHeight) / 2;
    } else {
      // Image is taller: fill the container height.
      displayHeight = height;
      displayWidth = height * imageAspect;
      offsetX = (width - displayWidth) / 2;
    }
    setImgSize({
      width: displayWidth,
      height: displayHeight,
      offsetX,
      offsetY,
    });
  };

  const handleTransition = async (direction = "next") => {
    // Ensure we have computed image dimensions.
    if (isTransitioning || imgSize.width === 0 || imgSize.height === 0) return;
    setIsTransitioning(true);
    const nextIndex = getIndex(direction);

    // Preload the next image
    try {
      await preloadImage(images[nextIndex]);
    } catch (e) {
      console.error("Failed to preload image", e);
      setIsTransitioning(false);
      return;
    }

    // Immediately update the main image to the next image.
    setCurrentIndex(nextIndex);

    // Randomly pick one of the reveal variants.
    const variants = [
      { type: "vertical", origin: "top" },
      { type: "vertical", origin: "bottom" },
      { type: "horizontal", origin: "left" },
      { type: "horizontal", origin: "right" },
    ];
    const currentVariant =
      variants[Math.floor(Math.random() * variants.length)];

    // Get the overlay container for the mask.
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.innerHTML = "";

    // Use the computed image dimensions.
    const currentWidth = imgSize.width;
    const currentHeight = imgSize.height;

    const slices = [];
    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up overlay after animation completes.
        overlay.innerHTML = "";
        setIsTransitioning(false);
      },
    });

    if (currentVariant.type === "vertical") {
      // Create vertical slices.
      const sliceWidth = currentWidth / slicesCount;
      for (let i = 0; i < slicesCount; i++) {
        const slice = document.createElement("div");
        slice.style.position = "absolute";
        slice.style.top = "0";
        slice.style.left = `${i * sliceWidth}px`;
        slice.style.width = `${sliceWidth}px`;
        slice.style.height = `${currentHeight}px`;
        slice.style.backgroundColor = "#008080";
        slice.style.transformOrigin = currentVariant.origin;
        slice.style.transform = "scaleY(1)";
        slice.style.willChange = "transform";
        overlay.appendChild(slice);
        slices.push(slice);
      }
      tl.to(slices, {
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.1,
          from: "edges",
        },
        scaleY: 0,
      });
    } else if (currentVariant.type === "horizontal") {
      // Create horizontal slices.
      const sliceHeight = currentHeight / slicesCount;
      for (let i = 0; i < slicesCount; i++) {
        const slice = document.createElement("div");
        slice.style.position = "absolute";
        slice.style.left = "0";
        slice.style.top = `${i * sliceHeight}px`;
        slice.style.width = `${currentWidth}px`;
        slice.style.height = `${sliceHeight}px`;
        slice.style.backgroundColor = "#008080";
        slice.style.transformOrigin = currentVariant.origin;
        slice.style.transform = "scaleX(1)";
        slice.style.willChange = "transform";
        overlay.appendChild(slice);
        slices.push(slice);
      }
      tl.to(slices, {
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.1,
          from: "edges",
        },
        scaleX: 0,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Fixed-size image container */}
      <div
        ref={containerRef}
        className="relative rounded-[25px] overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Main image, updated immediately on transition */}
        <Image
          src={images[currentIndex]}
          alt="Carousel Image"
          fill
          objectFit="contain"
          priority
          onLoadingComplete={handleImageLoad}
        />
        {/* Overlay container for the mask slices, matching the image dimensions */}
        <div
          ref={overlayRef}
          className="absolute pointer-events-none"
          style={{
            width: `${imgSize.width}px`,
            height: `${imgSize.height}px`,
            top: `${imgSize.offsetY}px`,
            left: `${imgSize.offsetX}px`,
          }}
        />
      </div>

      {/* Navigation buttons */}
      <div className="pt-[5rem] flex gap-4">
        <button
          onClick={() => handleTransition("prev")}
          disabled={isTransitioning}
          className="bg-[#006666] hover:bg-[#005555] text-white py-2 px-[2rem] rounded-full text-[3rem] transition duration-300 ease-in-out cursor-pointer"
        >
          &#8592;
        </button>
        <button
          onClick={() => handleTransition("next")}
          disabled={isTransitioning}
          className="bg-[#006666] hover:bg-[#005555] text-white py-2 px-[2rem] rounded-full text-[3rem] transition duration-300 ease-in-out cursor-pointer"
        >
          &#8594;
        </button>
      </div>

      {/* Global CSS override to prevent unwanted transitions */}
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
