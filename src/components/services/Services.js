import StarCanvas from "../StarCanvas";
import ServciesContent from "./ServciesContent";

export default function Services() {
  return (
    <div className="relative h-auto py-[15rem] max-15xl:py-[10rem]">
      <StarCanvas />
      <section className="h-auto px-[15rem] max-10xl:px-[5rem] max-6xl:px-[2rem]">
        <ServciesContent />
      </section>
    </div>
  );
}
