"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ScrambleTextOnHover from "../ScramblerTextOnHover";
import ServicePopup from "./ServicePopup";

export default function Service({ service }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

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
      .to(
        leftRef.current,
        { x: "-50%", filter: "blur(5px)", duration: 0.5, ease: "power2.out" },
        0
      )
      .to(
        rightRef.current,
        { x: "50%", filter: "blur(5px)", duration: 0.5, ease: "power2.out" },
        0
      )
      .to(
        overlayRef.current,
        { opacity: 0.4, duration: 0.5, ease: "power2.out" },
        0
      )
      .to(
        textRef.current,
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
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
      .to(
        textRef.current,
        { opacity: 0, scale: 0.8, duration: 0.5, ease: "power2.out" },
        0
      )
      .to(
        overlayRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.out" },
        0
      )
      .to(
        leftRef.current,
        { x: "0%", filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .to(
        rightRef.current,
        { x: "0%", filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
  };

  return (
    <>
      <div
        className="relative h-[30rem] w-[50rem] cursor-pointer rounded-[2rem] shadow-lg overflow-hidden border-2 border-[#008080]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setPopupOpen(true)}
      >
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

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none z-[5]"
        />

        <h2
          ref={textRef}
          className="absolute inset-0 flex justify-center items-center text-[3rem] text-white z-10"
        >
          <ScrambleTextOnHover text={service.name} />
        </h2>
      </div>

      {popupOpen && (
        <ServicePopup
          service={service.name}
          images={service.images}
          type={service.type}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </>
  );
}
