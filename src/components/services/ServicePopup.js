"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import VerticalImageCarousel from "../VerticalImageCarousel";
import WaveformUnveilCarousel from "../WaveformUnveilCarousel";

export default function ServicePopup({
  service,
  onClose,
  images = [],
  type,
  text = "",
}) {
  console.log(images);

  const popupRef = useRef(null);

  // total images length (used in other cases too)
  const total = images.length;

  // For vc type, determine number of carousels responsively.
  const [numCarousels, setNumCarousels] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1000) {
        setNumCarousels(3);
      } else if (width > 600) {
        setNumCarousels(2);
      } else {
        setNumCarousels(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // For non-vc types, the old slicing was used:
  const chunkSize = Math.ceil(total / 3);
  const carousel1Images = images.slice(0, chunkSize);
  const carousel2Images = images.slice(chunkSize, chunkSize * 2);
  const carousel3Images = images.slice(chunkSize * 2);

  // For vc type, split images based on numCarousels.
  let verticalCarousels = [];
  if (type === "vc" && total > 0) {
    const vcChunkSize = Math.ceil(total / numCarousels);
    for (let i = 0; i < numCarousels; i++) {
      verticalCarousels.push(
        images.slice(i * vcChunkSize, (i + 1) * vcChunkSize)
      );
    }
  }

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

  // Predefined directions and intervals for vc carousels.
  const directions = ["up", "down", "up"];
  const intervals = [2000, 2500, 1500];

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

        {type === "text" && (
          <div className="flex flex-col justify-center items-center gap-8 py-16 md:py-24">
            <p className="text-2xl w-full md:w-1/2 self-center">{text}</p>
            <div className="relative mt-8 md:mt-0 rounded-[25px] w-full md:w-1/2 aspect-video">
              <Image
                src={images[0]}
                alt="Service Image"
                className="object-cover scale-105 transition-all duration-300"
                fill
              />
            </div>
          </div>
        )}

        {type === "ac" && (
          <div className="mx-auto overflow-hidden pt-[5rem]">
            <WaveformUnveilCarousel images={images} width={1200} height={550} />
          </div>
        )}

        {type === "vc" && (
          <div
            className="grid items-center justify-center gap-[5rem] border border-white/20 rounded-[2rem] p-8"
            style={{ gridTemplateColumns: `repeat(${numCarousels}, 1fr)` }}
          >
            {verticalCarousels.map((imagesChunk, index) => (
              <VerticalImageCarousel
                key={index}
                images={imagesChunk}
                direction={directions[index % directions.length]}
                interval={intervals[index % intervals.length]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(popupContent, document.body)
    : null;
}
