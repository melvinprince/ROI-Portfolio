"use client";
import { useProgress } from "@react-three/drei";

export default function Loader({ onLoaded }) {
  const { progress } = useProgress();

  // When progress reaches 100, trigger the onLoaded callback
  if (progress >= 100) {
    onLoaded();
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255, 255, 255, 0.4)", // semi-transparent white
        backdropFilter: "blur(10px)", // glass effect
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center", color: "#000" }}>
        <h2>Entering the ROI Verse</h2>
        <p>{Math.floor(progress)}%</p>
        <div
          style={{
            width: "300px",
            height: "10px",
            background: "#ddd",
            borderRadius: "5px",
            overflow: "hidden",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#0070f3",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
