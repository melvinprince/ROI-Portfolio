"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrambleTextOnHover from "../ScramblerTextOnHover";
import ServicePopup from "./ServicePopup"; // Make sure to create this component

export default function Service({ service }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  // Set initial states for the text and overlay
  useLayoutEffect(() => {
    gsap.set(textRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  const handleMouseEnter = () => {
    gsap.killTweensOf([
      leftRef.current,
      rightRef.current,
      overlayRef.current,
      textRef.current,
    ]);

    gsap
      .timeline()
      // Slide the left half left and blur it
      .to(
        leftRef.current,
        {
          x: "-50%",
          filter: "blur(5px)",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      // Slide the right half right and blur it
      .to(
        rightRef.current,
        {
          x: "50%",
          filter: "blur(5px)",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      // Fade in the black overlay
      .to(
        overlayRef.current,
        {
          opacity: 0.4,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      // Reveal and scale the text
      .to(
        textRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf([
      leftRef.current,
      rightRef.current,
      overlayRef.current,
      textRef.current,
    ]);

    gsap
      .timeline()
      // Hide the text
      .to(
        textRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      // Remove the overlay
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      // Return the left half to center and remove blur
      .to(
        leftRef.current,
        {
          x: "0%",
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Return the right half to center and remove blur
      .to(
        rightRef.current,
        {
          x: "0%",
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
  };

  const handleClick = () => {
    // Open the popup on click
    setPopupOpen(true);
  };

  const closePopup = () => {
    // A callback to close the popup
    setPopupOpen(false);
  };

  return (
    <>
      <div
        className="relative h-[30rem] w-[50rem] cursor-pointer rounded-[2rem] shadow-lg overflow-hidden border-2 border-[#008080]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Left half: shows the left side of the image */}
        <div
          ref={leftRef}
          className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
        >
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover object-left scale-125"
          />
        </div>

        {/* Right half: now positioned from left at 50% */}
        <div
          ref={rightRef}
          className="absolute top-0 left-[50%] w-1/2 h-full overflow-hidden"
        >
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover object-right scale-125"
          />
        </div>

        {/* Inset black overlay for text contrast */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none z-[5]"
        />

        {/* h2 text revealed on hover */}
        <h2
          ref={textRef}
          style={{ opacity: 0, transform: "scale(0.8)" }}
          className="absolute inset-0 flex justify-center items-center text-[3rem] text-white z-10"
        >
          <ScrambleTextOnHover text={service.name} />
        </h2>
      </div>

      {/* Conditionally render the popup */}
      {popupOpen && (
        <ServicePopup
          service={service.name}
          images={service.images}
          type={service.type}
          onClose={closePopup}
        />
      )}
    </>
  );
}
