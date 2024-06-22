import Image from "next/image";
import NewProducts from "./NewProducts";
import phone from "../public/images/bg-phone.png";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const NewProductsSection = () => {
  return (
    <section className="mb-24 flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">
      <div className="flex flex-col justify-start gap-8 w-full lg:w-2/3">
        <div className="flex justify-between w-full">
          <h1 className="text-3xl font-bold">Our Newest Products</h1>
          <Link
            href="/AllProducts"
            className="text-blue-600 underline flex gap-2 items-center"
          >
            <p>See all</p>
            <MoveRight />
          </Link>
        </div>

        <NewProducts />
      </div>

      <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
        <Image
          src={phone}
          alt="phone"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default NewProductsSection;
