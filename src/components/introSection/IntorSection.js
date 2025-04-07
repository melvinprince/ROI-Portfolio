"use client";

import { useState, useEffect } from "react";
import StarCanvas from "../StarCanvas";
import Section1Text from "./Section1Text";
import LottieAnimation from "../LottieAnimation";
import animationData from "@/animations/home3.json";

export default function IntroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Once all resources load, mark as loaded
    const handleWindowLoad = () => {
      console.log("All resources have finished loading!");
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  return (
    <div className="relative h-[100vh] overflow-hidden px-[15rem] max-16xl:px-[10rem] max-10xl:px-[5rem] max-6xl:px-[2rem]">
      {/* Minimal loader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <h2 className="text-xl">Loading...</h2>
          </div>
        </div>
      )}

      {/* Star background canvas */}
      <StarCanvas />

      {/* Main content */}
      <section className="relative h-full w-full grid grid-cols-2 items-center pl-[5rem] max-19xl:pl-0 max-19xl:gap-[5rem] max-12xl:grid-cols-1 max-12xl:gap-[2rem] max-12xl:pl-[2rem] max-10xl:pl-0">
        <Section1Text isLoaded={isLoaded} />
        <div className="max-16xl:w-[90%] flex  justify-self-end max-12xl:w-[50%] max-12xl:justify-center max-12xl:justify-self-center max-12xl:items-center max-8xl:w-[70%]">
          <LottieAnimation animationData={animationData} />
        </div>
      </section>
    </div>
  );
}
