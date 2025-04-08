"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrambleTextOnHover from "../ScramblerTextOnHover";
import ServicePopup from "./ServicePopup";

export default function Service({ service }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const overlayRef = useRef(null);
  const imageOverlayRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(imageOverlayRef.current, { y: "100%" });
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(imageOverlayRef.current, {
      y: "0%",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(imageOverlayRef.current, {
      y: "100%",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <>
      <div
        className="relative h-[30rem] w-[50rem] cursor-pointer rounded-[2rem] shadow-lg overflow-hidden border-2 border-[#008080] max-19xl:w-[45rem] max-19xl:h-[25rem] max-19xl:rounded-[1rem] max-17xl:w-[40rem]  max-15xl:w-[35rem] max-14xl:w-[45rem] max-14xl:h-[30rem] max-12xl:w-[40rem] max-12xl:h-[25rem] max-11xl:w-[35rem] max-8xl:w-[30rem] max-7xl:[40rem] max-5xl:w-[30rem] max-4xl:w-[30rem]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setPopupOpen(true)}
      >
        {/* Default Blurred Background Image */}
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover scale-105 transition-all duration-500"
        />

        {/* Slide-up Overlay Image from service.images[0] */}
        <div
          ref={imageOverlayRef}
          className="absolute inset-0 z-10 overflow-hidden"
        >
          <Image
            src={service.images?.[0] || service.image}
            alt=""
            fill
            className="object-cover scale-105"
          />
        </div>

        {/* Optional dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/30 pointer-events-none z-[15]"
        />

        {/* Centered Text */}
        <h2 className="absolute inset-0 flex justify-center items-center text-[3rem] text-white z-[20] font-extrabold transition-all duration-300 text-center max-6xl:text-[2.5rem]">
          {hovered ? "View More" : service.name}
        </h2>
      </div>

      {popupOpen && (
        <ServicePopup
          service={service.name}
          images={service.images}
          type={service.type}
          text={service.text}
          innerImage={service.innerImage}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </>
  );
}
