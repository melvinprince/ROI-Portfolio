"use client";
import { useState } from "react";
import NormalImageCarousel from "../NomralImageCarousel"; // or rename if needed
import { mediaData } from "./mediaData";
import Image from "next/image";
import MagneticGooeyButton from "../MagneticGooeyButton";

function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCarousels = mediaData.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCarousels) % totalCarousels);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCarousels);
  };

  const currentMedia = mediaData[currentIndex];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-[2rem] items-center justify-center">
        <div className="text-center mt-4 col-span-2 flex gap-[2rem] items-center justify-center">
          <h3 className="text-white text-[5rem]">{currentMedia.name}</h3>
          <a
            href={currentMedia.pdf}
            download
            className="relative h-[5rem] w-[5rem] cursor-pointer"
          >
            <Image
              src="/svg/download.svg"
              alt="Download Icon"
              className="object-contain hover:scale-110 transition-all duration-300"
              fill
            />
          </a>
        </div>
        <div className="w-full h-[50vh] relative col-span-2">
          {/* Render the carousel only when this instance is active */}
          <NormalImageCarousel images={currentMedia.images} play={true} />
        </div>

        <div onClick={handlePrev} className="place-self-end">
          <MagneticGooeyButton text="&#8592;" />
        </div>

        <div onClick={handleNext}>
          <MagneticGooeyButton text="&#8594;" />
        </div>
      </div>
    </div>
  );
}

export default MediaCarousel;
