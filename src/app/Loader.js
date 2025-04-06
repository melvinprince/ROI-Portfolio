"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Once the entire window (images, fonts, etc.) has loaded:
    const handleLoad = () => {
      // Animate the loader out using GSAP
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false), // after animation, remove from DOM
      });

      tl.to(overlayRef.current, {
        duration: 0.8,
        opacity: 0,
        ease: "power2.out",
      });
    };

    // If already loaded (e.g., fast refresh), run handleLoad immediately
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Otherwise, wait for the load event
      window.addEventListener("load", handleLoad);
    }

    // Cleanup
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // If the loader is done, don’t render anything
  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#008080]"
    >
      <div className="text-white text-center">
        <h1 className="text-4xl mb-4">Loading...</h1>
        <p>Please wait while we load all content</p>
      </div>
    </div>
  );
}
