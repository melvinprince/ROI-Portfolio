import StarCanvas from "../StarCanvas";
import ServciesContent from "./ServciesContent";

export default function Services() {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <StarCanvas />
      <section className="h-[100vh] px-[15rem] pt-[10rem]">
        <ServciesContent />
      </section>
    </div>
  );
}
