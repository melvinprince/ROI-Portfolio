import MagneticGooeyButton from "../../MagneticGooeyButton";
import ScrambleTextOnHover from "../../ScramblerTextOnHover";
import StarCanvas from "../../StarCanvas";
import MediaCarousel from "./MediaCarousel";

export default function MediaSection() {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <StarCanvas />
      <section className="h-[100vh] px-[15rem] pt-[10rem] text-white grid grid-cols-2 items-center gap-[5rem]">
        <div>
          <h2 className="text-[4rem] pb-[4rem]">
            <ScrambleTextOnHover text="Media Production" />
          </h2>
          <p className="text-[2rem] pb-[2rem]">
            Excepteur nostrud et incididunt id proident ad dolore elit commodo
            culpa dolore veniam. Anim commodo et nostrud sit. Laboris minim
            deserunt ea culpa ex consectetur est do adipisicing enim quis. Amet
            magna ex culpa elit reprehenderit irure dolore enim anim fugiat
            exercitation pariatur. Id cillum et deserunt do elit non eiusmod.
          </p>
          <MagneticGooeyButton text="Contact Us" />
        </div>
        <div>
          <MediaCarousel />
        </div>
      </section>
    </div>
  );
}
