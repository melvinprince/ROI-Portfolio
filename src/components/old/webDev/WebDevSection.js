import StarCanvas from "../../StarCanvas";

export default function WebDevSection() {
  return (
    <div className="relative h-[100vh] overflow-hidden">
      <StarCanvas />
      <section className="h-[100vh] px-[15rem] pt-[10rem] text-white">
        <h2 className="text-[4rem]">Web Development</h2>
      </section>
    </div>
  );
}
