import NomralImageCarousel from "../NomralImageCarousel";
import StarCanvas from "../StarCanvas";

export default function MediaSection() {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <StarCanvas />
      <section className="h-[100vh] px-[15rem] pt-[10rem] text-white grid grid-cols-2 items-center">
        <div>
          <h2 className="text-[4rem]">Media Section</h2>

          <p className="text-[2rem]">
            Laboris elit duis dolore anim mollit cillum nostrud qui incididunt
            irure nisi. Enim sunt aliquip excepteur id dolore fugiat magna
            laboris duis eu. Do do ea nostrud eiusmod officia labore. Nisi est
            mollit incididunt elit ipsum est aute ut incididunt minim pariatur
            ullamco adipisicing amet. Eu voluptate culpa nostrud ex enim aliqua
            occaecat tempor est labore.
          </p>
        </div>
        <div>{/* <div><NomralImageCarousel /></div> */}</div>
      </section>
    </div>
  );
}
