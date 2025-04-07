"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieAnimation({ animationData }) {
  const [scale, setScale] = useState(1);

  const handleMouseEnter = () => {
    setScale(1.05); // Increase scale on hover
  };

  const handleMouseLeave = () => {
    setScale(1); // Reset scale when mouse leaves
  };

  return (
    <div
      className="overflow-hidden flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `scale(${scale})`,
        transition: "transform 3s ease",
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        style={{ width: "100%", height: "100%" }}
        className="transition-transform duration-300 ease-in-out"
      />
    </div>
  );
}
