"use client";

import Link from "next/link";
import { useState } from "react";
import { links } from "@/constants";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [menu, setMenu] = useState<boolean>(false);

  const handleLinkClick = () => {
    setMenu(false);
  };

  return (
    <header className="border-b py-2">
      <div className="flex items-center justify-between mx-auto max-w-3xl px-3 lg:max-w-[1500px]">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            Ni<span className="text-primary">kee</span>
          </h1>
        </Link>

        <nav className="flex justify-end space-x-7">
          <div className="hidden gap-12 lg:flex 2xl:ml-16">
            {links.map((link, index) => (
              <div key={index}>
                {pathname === link.href ? (
                  <Link
                    href={link.href}
                    className=" text-lg font-semibold text-white bg-primary px-4 py-2 rounded-full"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className=" text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-between">
            <Menu
              className="text-primary cursor-pointer hidden max-lg:flex"
              size={30}
              onClick={() => setMenu(true)}
            />
            <ShoppingCart className="text-primary cursor-pointer" size={30} />
          </div>

          <div className="items-center gap-4 flex">
            {menu && (
              <div className="flex flex-col bg-white border absolute top-3 right-3 h-[32%] w-[40%] gap-5 p-3 rounded-xl shadow-md">
                <X
                  className="cursor-pointer text-primary font-bold"
                  onClick={() => setMenu(false)}
                />

                {links.map((link, index) => (
                  <div key={index} className="w-full">
                    {pathname === link.href ? (
                      <Link
                        href={link.href}
                        className=" text-lg font-semibold text-white bg-primary px-4 py-2 w-full"
                        onClick={handleLinkClick}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className=" text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary w-full"
                        onClick={handleLinkClick}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
