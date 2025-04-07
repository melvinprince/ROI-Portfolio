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
    <div className="relative z-10 text-white p-8 max-10xl:p-0">
      <div
        ref={containerRef}
        className={`transition-opacity duration-300 ease-in-out flex flex-col justify-start items-start ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Logo */}
        <div
          className="relative h-[20rem] w-[20rem] pb-[5rem] max-6xl:h-[15rem] max-6xl:w-[15rem]"
          ref={logoRef}
        >
          <Image
            src="/images/roi-logo.png"
            alt="ROI Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <h1
          className="text-[4rem] pb-[1.5rem] max-17xl:text-[3.5rem] max-15xl:text-[2.5rem]"
          ref={headingRef}
        >
          <ScrambleTextOnHover text="Delivering Success Through Innovations" />
        </h1>

        {/* Text (with some bullet points for scannability) */}
        <div
          ref={paragraphRef}
          className="text-[2rem] text-justify space-y-0 max-15xl:text-[1.8rem] max-4xl:text-[1.5rem]"
        >
          <p>
            At Royal Orbit Innovations, we fuse advanced technology with
            creative thinking to amplify your brand’s impact. Our tailored
            solutions empower growth, spark lasting change, and shape the future
            of innovation.
          </p>
          {/* <ul className="list-disc list-inside space-y-2">
            <li>AI &amp; Cloud Solutions</li>
            <li>Custom Web &amp; App Development</li>
            <li>Innovation Consulting</li>
          </ul> */}
        </div>

        {/* CTA(s) */}
        <div className="pt-[3rem] flex gap-8" ref={buttonRef}>
          <Link
            href="https://roi.qa/contact"
            className="text-[3rem] underline hover:no-underline"
          >
            <MagneticGooeyButton text="Get in Touch" />
          </Link>
        </div>
      </div>
    </div>
  );
}
