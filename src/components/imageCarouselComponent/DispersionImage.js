// src/components/DispersionImage.js
import React from "react";
import { useTexture } from "@react-three/drei";

const DispersionImage = ({ textureUrl }) => {
  // Load the texture from the URL
  const texture = useTexture(textureUrl);

  return (
    <mesh>
      {/* Adjust the plane geometry dimensions as needed */}
      <planeGeometry args={[4, 3]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default DispersionImage;
