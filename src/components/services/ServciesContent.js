import ScrambleTextOnHover from "../ScramblerTextOnHover";
import { services } from "@/app/lib/servicesData";
import Service from "./Service";

export default function ServciesContent() {
  return (
    <div className="text-white">
      <h1 className="text-[3rem] pb-[5rem]">
        <ScrambleTextOnHover text="OUR SERVICES" />
      </h1>
      <div className="grid grid-cols-3 gap-[2rem] place-items-center">
        {services.map((item, index) => (
          <Service key={index} service={item} />
        ))}
      </div>
    </div>
  );
}
