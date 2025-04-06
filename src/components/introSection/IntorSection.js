"use client";

import { useState } from "react";
import Astronaut3D from "./Astronaut3D";
import StarCanvas from "../StarCanvas";
import Loader from "@/app/Loader";
import Section1Text from "./Section1Text";
import LottieAnimation from "../LottieAnimation";
import animationData from "@/animations/homepage.json";

export default function IntroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative h-[100vh] overflow-hidden px-[15rem]">
      <StarCanvas />

      <section className="relative h-full grid grid-cols-2 justify-around items-center">
        <Section1Text isLoaded={isLoaded} />
        <div className="">
          <LottieAnimation animationData={animationData} />
        </div>
      </section>

      {!isLoaded && <Loader onLoaded={handleLoaded} />}
    </div>
  );
}
