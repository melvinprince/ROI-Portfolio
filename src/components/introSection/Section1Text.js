"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import ScrambleTextOnHover from "../ScramblerTextOnHover";
import Link from "next/link";
import MagneticGooeyButton from "../MagneticGooeyButton";

export default function Section1Text({ isLoaded }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(logoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "-=0.6"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        "-=0.6"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.5"
      );
  }, [isLoaded]);

  return (
    <div className="relative z-10 text-white p-8">
      <div
        ref={containerRef}
        className={`transition-opacity duration-300 ease-in-out flex flex-col justify-start items-start ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative h-[20rem] w-[20rem] pb-[10rem]" ref={logoRef}>
          <Image
            src="/images/roi-logo.png"
            alt="roi-logo"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-[4rem]" ref={headingRef}>
          <ScrambleTextOnHover text="Delivering Success through Innovations" />
        </h1>

        <p ref={paragraphRef} className="text-[2rem] pt-[3rem] text-justify">
          At Royal Orbit Innovations, we merge cutting-edge technology with
          creative vision to transform your business landscape. Our team is
          dedicated to crafting solutions that empower growth, spark change, and
          pave the way for a future where innovation meets opportunity. Join us
          on a journey to redefine success.
        </p>

        <div className="pt-[3rem]" ref={buttonRef}>
          <Link href="/" className="text-[3rem]">
            <MagneticGooeyButton text="Surf Our Universe" />
          </Link>
        </div>
      </div>
    </div>
  );
}
