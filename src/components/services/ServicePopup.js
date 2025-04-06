"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import VerticalImageCarousel from "../VerticalImageCarousel";
import WaveformUnveilCarousel from "../WaveformUnveilCarousel";

export default function ServicePopup({ service, onClose, images, type }) {
  console.log(images);

  const popupRef = useRef(null);

  const total = images.length;
  const chunkSize = Math.ceil(total / 3);
  const carousel1Images = images.slice(0, chunkSize);
  const carousel2Images = images.slice(chunkSize, chunkSize * 2);
  const carousel3Images = images.slice(chunkSize * 2);

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

  const handleClose = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      ease: "expo.in",
      onComplete: onClose,
    });
  };

  const popupContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div
        ref={popupRef}
        className="relative flex h-fit w-[80vw] flex-col items-center justify-center rounded-2xl bg-[#008080] p-8 text-white"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full bg-[#005555] text-white text-[3rem] px-8 py-2 hover:bg-[#004444]"
        >
          &times;
        </button>
        <h1 className="text-[3rem] pt-[3rem] font-bold text-center">
          {service}
        </h1>

        {type === "ac" && (
          <div className="mx-auto overflow-hidden pt-[5rem]">
            <WaveformUnveilCarousel images={images} width={1200} height={550} />
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

  return typeof window !== "undefined"
    ? createPortal(popupContent, document.body)
    : null;
}
