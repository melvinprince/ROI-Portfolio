import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function VerticalImageCarousel({
  images,
  direction = "up",
  interval = 3000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = images.length;
  const imageHeight = 200; // Each image's height in px
  const gap = 50; // Gap between images in px
  const [visibleCount, setVisibleCount] = useState(3); // Number of images visible at a time

  // Update visibleCount on window resize.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate effectiveHeight for scrolling.
  const effectiveHeight = imageHeight + gap;

  // Pause the auto-scroll when hovering over the carousel.
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Auto-update currentIndex at the given interval when not paused.
  useEffect(() => {
    if (isPaused) return; // Skip updating when hovered

    const timer = setInterval(() => {
      if (direction === "up") {
        setCurrentIndex((prev) => (prev + 1) % total);
      } else {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [direction, interval, total, isPaused]);

  // Set the container height so exactly visibleCount images (and the gaps) are shown.
  const containerHeight = visibleCount * imageHeight + (visibleCount - 1) * gap;

  // Nested component for an image with a tooltip following the cursor.
  const HoverableImage = ({ img, index, isDuplicate = false }) => {
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseMove = (e) => {
      // Use nativeEvent.offsetX/offsetY to get coordinates relative to the container.
      const { offsetX, offsetY } = e.nativeEvent;
      setTooltipPos({ x: offsetX, y: offsetY });
    };

    return (
      <motion.div
        key={isDuplicate ? `dup-${index}` : index}
        className="relative shadow-lg rounded-2xl overflow-hidden cursor-pointer"
        style={{
          height: imageHeight,
          marginBottom: gap,
          width: 300, // Adjust as needed
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={img}
          alt={`carousel-${isDuplicate ? "dup-" : ""}${index}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {showTooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltipPos.x + 10,
              top: tooltipPos.y + 10,
              pointerEvents: "none",
            }}
            className="text-white text-[1rem] bg-[#008080] bg-opacity-50 px-2 py-1 rounded-full"
          >
            View Project
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div
      className="relative overflow-hidden mx-auto"
      style={{ height: containerHeight }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ y: -currentIndex * effectiveHeight }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {images.map((img, index) => (
          <HoverableImage key={index} img={img} index={index} />
        ))}
        {/* Duplicate the first visibleCount images for seamless looping */}
        {images.slice(0, visibleCount).map((img, index) => (
          <HoverableImage
            key={`dup-${index}`}
            img={img}
            index={index}
            isDuplicate
          />
        ))}
      </motion.div>
    </div>
  );
}
