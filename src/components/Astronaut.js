"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Astronaut(props) {
  const group = useRef();
  const gltf = useGLTF("models/astronaut.glb");
  console.log("GLTF loaded:", gltf);
  console.log("GLTF node keys:", Object.keys(gltf.nodes));
  console.log("GLTF material keys:", Object.keys(gltf.materials));

  return (
    <group {...props} ref={group} dispose={null}>
      {/* Directly add the glTF scene */}
      <primitive object={gltf.scene} />
    </group>
  );
}

useGLTF.preload("models/astronaut.glb");
