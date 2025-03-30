"use client"; // If using Next.js App Router

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./styles/MagneticGooeyButton.module.css"; // Import CSS module

const MagneticGooeyButton = ({ text, textSize }) => {
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  // Determine if the device is mobile.
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  // Store quickTo functions in refs.
  const bgXToRef = useRef(null);
  const bgYToRef = useRef(null);
  const textXToRef = useRef(null);
  const textYToRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const bg = bgRef.current;
    const textEl = textRef.current;

    // Exit early if any ref is missing or if on mobile.
    if (!button || !bg || !textEl || isMobile) return;

    // Create a GSAP context scoped to the button.
    let ctx = gsap.context(() => {
      // Create quickTo functions to only handle transforms.
      bgXToRef.current = gsap.quickTo(bg, "x", {
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
      bgYToRef.current = gsap.quickTo(bg, "y", {
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
      textXToRef.current = gsap.quickTo(textEl, "x", {
        duration: 0.45,
        ease: "power2.out",
      });
      textYToRef.current = gsap.quickTo(textEl, "y", {
        duration: 0.45,
        ease: "power2.out",
      });

      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { height, width, left, top } = button.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Move background and text based on cursor position.
        bgXToRef.current(x * 0.2);
        bgYToRef.current(y * 0.2);
        textXToRef.current(x * 0.12);
        textYToRef.current(y * 0.12);
      };

      const handleMouseLeave = () => {
        // Reset the transform values to 0.
        bgXToRef.current(0);
        bgYToRef.current(0);
        textXToRef.current(0);
        textYToRef.current(0);
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
    }, button);

    // Cleanup GSAP context on unmount.
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      {/* SVG Filter Definition */}
      <svg className={styles.svgContainer}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <button ref={buttonRef} className={styles.button}>
        <span ref={bgRef} className={styles.bg}></span>
        <span
          ref={textRef}
          className={`${styles.text} ${textSize ? `text-[${textSize}]` : ""}`}
        >
          {text}
        </span>
      </button>
    </>
  );
};

export default MagneticGooeyButton;
