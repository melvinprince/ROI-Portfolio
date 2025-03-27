"use client";

import { useState } from "react";
import Astronaut3D from "./Astronaut3D";
import StarCanvas from "../StarCanvas";
import Loader from "@/app/Loader";
import Section1Text from "./Section1Text";

export default function IntroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative h-[100vh] overflow-hidden px-[15rem]">
      <StarCanvas />

      <section className="relative h-full flex justify-around items-center">
        <Section1Text isLoaded={isLoaded} />
        {/* <Astronaut3D /> */}
      </section>

      {/* {!isLoaded && <Loader onLoaded={handleLoaded} />} */}
    </div>
  );
}
