"use client";

import { useState, useEffect } from "react";
import StarCanvas from "../StarCanvas";
import Section1Text from "./Section1Text";
import LottieAnimation from "../LottieAnimation";
import animationData from "@/animations/homepage.json";

export default function IntroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // A function that sets isLoaded to true once everything is loaded
    const handleWindowLoad = () => {
      console.log("All resources have finished loading!");
      setIsLoaded(true);
    };

    // If the page is already loaded (e.g., a client-side transition),
    // handleWindowLoad immediately; otherwise, wait for "load" event.
    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden px-[15rem]">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <h1>Loading…</h1>
        </div>
      )}

      {/* Your background or visual elements */}
      <StarCanvas />

      {/* Main content (hidden behind the loader until isLoaded = true) */}
      <section className="relative h-full grid grid-cols-2 justify-around items-center">
        <Section1Text isLoaded={isLoaded} />
        <div>
          <LottieAnimation animationData={animationData} />
        </div>
      </section>
    </div>
  );
}
