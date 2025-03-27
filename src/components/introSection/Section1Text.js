import Image from "next/image";
import ScrambleTextOnHover from "../ScramblerTextOnHover";
import Link from "next/link";
import MagneticGooeyButton from "../MagneticGooeyButton";

export default function Section1Text({ isLoaded }) {
  return (
    <div
      className={`relative z-10 text-white p-8 transition-opacity duration-300 ease-in-out flex flex-col justify-start items-start pl-[15rem]${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative h-[20rem] w-[20rem] pb-[10rem]">
        <Image
          src="/images/roi-logo.png"
          alt="roi-logo"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-[4rem]">
        <ScrambleTextOnHover text="Delivering Success through Innovations" />
      </h1>

      <p className=" text-[2rem] w-[70%] pt-[3rem]">
        At Royal Orbit Innovations, we merge cutting-edge technology with
        creative vision to transform your business landscape. Our team is
        dedicated to crafting solutions that empower growth, spark change, and
        pave the way for a future where innovation meets opportunity. Join us on
        a journey to redefine success.
      </p>
      <Link href="/" className="text-[3rem] pt-[3rem]">
        <MagneticGooeyButton text="Surf Our Universe" />
      </Link>
    </div>
  );
}
