import Image from "next/image";
import Link from "next/link";
import heroImage from "../public/images/bg-main.png";

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-20 items-center">
      <div className="flex flex-col gap-4">
        <h1 className="xl:text-7xl lg:text-5xl text-4xl max-sm:3xl font-bold leading-[59px] max-sm:leading-[45px]">
          Let's Explore <span className="text-primary">Unique </span>
          Product!
        </h1>
        <Link
          className="text-white flex items-center justify-center bg-black w-28 p-3 rounded-lg"
          href="/allProducts"
        >
          Shop now
        </Link>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eaque,
          iure consectetur optio porro quisquam perferendis error tenetur
          assumenda atque modi minima ipsam quam unde possimus!
        </p>
      </div>

      <div className="bg-primary rounded-full">
        <Image src={heroImage} alt="hero image" height={1800} width={1800} />
      </div>
    </div>
  );
};

export default HeroSection;
