import StarCanvas from "../StarCanvas";
import ServciesContent from "./ServciesContent";

export default function Services() {
  return (
    <div className="relative h-auto pb-[10rem] max-15xl:py-[10rem]">
      <StarCanvas />
      <div className="h-auto px-[15rem] max-10xl:px-[5rem] max-6xl:px-[2rem]">
        <ServciesContent />
      </div>
    </div>
  );
}
