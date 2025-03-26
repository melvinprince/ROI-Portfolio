import StarCanvas from "@/components/StarCanvas";

export default function Section1() {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <StarCanvas />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          padding: "2rem",
        }}
      >
        <h1>ROI Projects</h1>
      </div>
    </div>
  );
}
