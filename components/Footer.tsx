import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-52">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold">
              Ni<span className="text-primary">kee</span>
            </h1>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="text-white hover:text-gray-400">
              Home
            </Link>
            <Link href="#" className="text-white hover:text-gray-400">
              Shop
            </Link>
            <Link href="#" className="text-white hover:text-gray-400">
              About Us
            </Link>
            <Link href="#" className="text-white hover:text-gray-400">
              Contact
            </Link>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-gray-400">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Ni
          <span className="text-primary">kee</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
