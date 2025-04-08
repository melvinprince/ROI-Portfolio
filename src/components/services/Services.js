import StarCanvas from "../StarCanvas";
import ServciesContent from "./ServciesContent";

export default function Services() {
  return (
    <div className="relative py-[15rem] max-15xl:py-[10rem]">
      <StarCanvas />
      <section className="px-[15rem] max-10xl:px-[5rem] max-6xl:px-[2rem]">
        <ServciesContent />
      </section>
    </div>
  );
}
