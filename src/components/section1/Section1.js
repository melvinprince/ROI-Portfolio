// pages/index.js
import Astronaut3D from "@/components/section1/Astronaut3D";
import StarCanvas from "@/components/StarCanvas"; // your previously defined star canvas component
import { Avatar } from "./Astronaut";

export default function Home() {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background stars */}
      <StarCanvas />

      {/* First section */}
      <section style={{ position: "relative", height: "100vh" }}>
        {/* Interactive 3D Astronaut */}

        <Astronaut3D />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "white",
            padding: "2rem",
          }}
        >
          <h1>Welcome to the 3D Experience</h1>
          <p>Explore the stars with our interactive astronaut.</p>
        </div>
      </section>
      {/* Additional sections go here */}
    </div>
  );
}
