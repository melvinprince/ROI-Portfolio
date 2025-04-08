"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrambleTextOnHover from "../ScramblerTextOnHover";
import { services } from "@/app/lib/servicesData";
import Service from "./Service";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesContent() {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = gsap.utils.toArray(".card-wrapper");

    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: -100,
          rotateZ: 5,
        },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="text-white " ref={containerRef}>
      <h1 className="text-[3rem] pb-[5rem]">
        <ScrambleTextOnHover text="OUR SERVICES" />
      </h1>
      <div className="grid grid-cols-3 gap-[2rem] place-items-center max-14xl:grid-cols-2 max-7xl:grid-cols-1">
        {services.map((item, index) => (
          <div className="card-wrapper" key={index}>
            <div className="service-card">
              <Service service={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
