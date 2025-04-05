// src/components/AnimatedImageCarousel.js
import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import DispersionPlane from "./DispersionPlane";

const AnimatedImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Determine next index and image URLs
  const currentImageUrl = images[currentIndex];
  const nextIndex = (currentIndex + 1) % images.length;
  const nextImageUrl = images[nextIndex];

  // Trigger a simple progress animation on "Next" button click.
  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 0.02;
      if (p >= 1) {
        p = 1;
        clearInterval(interval);
        setCurrentIndex(nextIndex);
        setProgress(0);
        setAnimating(false);
      } else {
        setProgress(p);
      }
    }, 16); // roughly 60fps
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <Canvas style={{ width: "100%", height: "100%" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <DispersionPlane
            texture1Url={currentImageUrl}
            texture2Url={nextImageUrl}
            progress={progress}
          />
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <button onClick={handleNext} style={{ padding: "10px 20px" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimatedImageCarousel;
