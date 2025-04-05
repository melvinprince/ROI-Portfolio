"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import VerticalImageCarousel from "../VerticalImageCarousel";
import WaveformUnveilCarousel from "../carousels/WaveformUnveilCarousel";

export default function ServicePopup({ service, onClose, images, type }) {
  const popupRef = useRef(null);
  console.log("Service", service);

  // Calculate how many images per carousel.
  const total = images.length;
  const chunkSize = Math.ceil(total / 3);
  const carousel1Images = images.slice(0, chunkSize);
  const carousel2Images = images.slice(chunkSize, chunkSize * 2);
  const carousel3Images = images.slice(chunkSize * 2);

  // Animate popup on mount
  useLayoutEffect(() => {
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.5, y: "-50%", rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        y: "0%",
        rotation: 0,
        duration: 1.2,
        ease: "expo.out",
      }
    );
  }, []);

  // Animate popup on close, then call onClose
  const handleClose = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      ease: "expo.in",
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div
        ref={popupRef}
        className="relative flex h-fit w-[80vw] flex-col items-center justify-center rounded-2xl bg-[#008080] p-8"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded bg-white text-black px-4 py-2 hover:cursor-pointer hover:bg-gray-300"
        >
          Close
        </button>
        <h1 className="text-[3rem] pb-[2rem] font-bold text-center">
          {service}
        </h1>
        {type === "ac" && (
          <div className="max-w-4xl mx-auto shadow-lg rounded-lg">
            {/* Added container styling */}
            <WaveformUnveilCarousel
              images={carousel1Images}
              width={1300}
              height={600}
            />
          </div>
        )}
        {type === "vc" && (
          <div className="grid grid-cols-3 items-center justify-center gap-[5rem] border border-white/20 rounded-[2rem] p-8">
            <VerticalImageCarousel
              images={carousel1Images}
              direction="up"
              interval={2000}
            />
            <VerticalImageCarousel
              images={carousel2Images}
              direction="down"
              interval={2500}
            />
            <VerticalImageCarousel
              images={carousel3Images}
              direction="up"
              interval={1500}
            />
          </div>
        )}
      </div>
    </div>
  );
}
