import Image from "next/image";
import Link from "next/link";
import error from "../public/images/error.png";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Image src={error} alt="404 image" height={500} width={500} />
      <Link
        href="/"
        className="absolute top-20 left-8 hover:bg-primary py-2 px-2 rounded-full hover:text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
