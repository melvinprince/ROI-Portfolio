"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "gsap";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieAnimation({ animationData }) {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    // Normalize mouse position within the container (0 to 1)
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    // Animate the container's rotation and scale based on mouse position
    gsap.to(containerRef.current, {
      rotation: x * 5, // rotate up to 20 degrees based on horizontal position
      scale: 1 + y * 0.001, // scale up slightly based on vertical position
      ease: "power3.out",
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    // Reset the container's transformation when the mouse leaves
    gsap.to(containerRef.current, {
      rotation: 0,
      scale: 1,
      ease: "power3.out",
      duration: 0.5,
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
