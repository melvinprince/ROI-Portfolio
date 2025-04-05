// src/components/DispersionPlane.js
import React, { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Shader code as plain template literals.
const vertexShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.x += sin(uv.y * 10.0 + uTime) * uProgress * 0.5;
    pos.y += cos(uv.x * 10.0 + uTime) * uProgress * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  void main() {
    vec4 color1 = texture2D(uTexture1, vUv);
    vec2 offset = vec2(uProgress * 0.05);
    vec4 color2 = vec4(
      texture2D(uTexture2, vUv + offset).r,
      texture2D(uTexture2, vUv).g,
      texture2D(uTexture2, vUv - offset).b,
      1.0
    );
    gl_FragColor = mix(color1, color2, uProgress);
  }
`;

const DispersionMaterial = shaderMaterial(
  {
    uTexture1: null,
    uTexture2: null,
    uProgress: 0,
    uTime: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ DispersionMaterial });

const DispersionPlane = ({ texture1Url, texture2Url, progress }) => {
  const materialRef = useRef();

  // Load the textures using useTexture (now inside the Canvas context)
  const texture1 = useTexture(texture1Url);
  const texture2 = useTexture(texture2Url);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      materialRef.current.uProgress = progress;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[4, 3, 50, 50]} />
      <dispersionMaterial
        ref={materialRef}
        uTexture1={texture1}
        uTexture2={texture2}
        uProgress={progress}
      />
    </mesh>
  );
};

export default DispersionPlane;
