import StarCanvas from "../StarCanvas";
import ServciesContent from "./ServciesContent";

export default function Services() {
  return (
    <div className="relative h-fit py-[15rem] ">
      <StarCanvas />
      <section className="h-auto px-[15rem]">
        <ServciesContent />
      </section>
    </div>
  );
}
