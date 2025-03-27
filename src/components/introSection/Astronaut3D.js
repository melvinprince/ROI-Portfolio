"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Astronaut } from "./Astronaut";

export default function Astronaut3D() {
  return (
    <Canvas
      className="relative top-[50%] translate-y-[-50%] z-[2] mx-auto"
      camera={{ position: [0, -10, 5], fov: 50 }}
    >
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} intensity={5} />

      {/* Astronaut Model positioned at the center */}
      <Astronaut position={[0, -4, 0]} scale={0.018} />

      {/* Controls for debugging (optional) */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
