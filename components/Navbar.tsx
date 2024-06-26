"use client";

import Link from "next/link";
import { useState } from "react";
import { links } from "@/constants";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import useStore from "@/store/useStore";

const Navbar = () => {
  const pathname = usePathname();
  const openCart = useStore((state) => state.toggleSheet);
  const cartItems = useStore((state) => state.cartItems);
  const [menu, setMenu] = useState<boolean>(false);

  const handleLinkClick = () => {
    setMenu(false);
  };

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white py-2">
      <div className="flex items-center justify-between mx-auto max-w-3xl px-3 lg:max-w-[1500px]">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            Ni<span className="text-primary">kee</span>
          </h1>
        </Link>

        <nav className="flex items-center space-x-7">
          <div className="hidden gap-12 lg:flex 2xl:ml-16">
            {links.map((link, index) => (
              <div key={index}>
                {pathname === link.href ? (
                  <Link
                    href={link.href}
                    className="text-lg font-semibold text-white bg-primary px-4 py-2 rounded-full"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Menu
              className="text-primary cursor-pointer hidden max-lg:flex"
              size={30}
              onClick={() => setMenu(true)}
            />
            <div className="relative flex items-center">
              <ShoppingCart
                className="text-primary cursor-pointer"
                size={30}
                onClick={openCart}
              />
              {totalQuantity > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalQuantity}
                </div>
              )}
            </div>
          </div>

          {menu && (
            <div className="absolute top-16 right-3 bg-white border rounded-xl shadow-md w-[80%] max-w-xs p-4 z-40">
              <div className="flex justify-end">
                <X
                  className="cursor-pointer text-primary font-bold"
                  onClick={() => setMenu(false)}
                />
              </div>
              <div className="flex flex-col gap-4 mt-2">
                {links.map((link, index) => (
                  <div key={index} className="w-full">
                    {pathname === link.href ? (
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-white bg-primary px-4 py-2 rounded-lg block text-center"
                        onClick={handleLinkClick}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary px-4 py-2 rounded-lg block text-center"
                        onClick={handleLinkClick}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
