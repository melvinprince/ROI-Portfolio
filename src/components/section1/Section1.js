"use client";

import { useState } from "react";
import Astronaut3D from "./Astronaut3D";
import StarCanvas from "../StarCanvas";
import Loader from "@/app/Loader";
import Section1Text from "./Section1Text";

export default function Section1() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative h-screen overflow-hidden mx-[10rem]">
      <StarCanvas />

      <section className="relative h-screen flex justify-around items-center">
        <Section1Text isLoaded={isLoaded} />
        <Astronaut3D />
      </section>

      {!isLoaded && <Loader onLoaded={handleLoaded} />}
    </div>
  );
}
