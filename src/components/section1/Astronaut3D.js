"use client";

import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Astronaut } from "../Astronaut";

export default function Astronaut3D() {
  return (
    <Canvas
      style={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "40vw",
        height: "100vh",
        zIndex: 2,
      }}
      camera={{ position: [0, -10, 5], fov: 50 }}
    >
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} intensity={5} />

      {/* Astronaut Model */}
      <Astronaut position={[0, -5, 0]} scale={0.02} />

      {/* Controls for debugging (optional) */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
