"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useStore from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ShoppingCart = () => {
  // States and functions from zustand store
  const cartItems = useStore((state) => state.cartItems);
  const isSheetOpen = useStore((state) => state.isSheetOpen);
  const toggleSheet = useStore((state) => state.toggleSheet);
  const removeItem = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const incrementQuantity = useStore((state) => state.incrementQuantity);
  const decrementQuantity = useStore((state) => state.decrementQuantity);

  // Calculate total price based on items in cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // checkout to navigate to stripe page
  const checkout = async () => {
    await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cartItems }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        //goes to payment successful when payment is made.
        if (response.url) {
          window.location.href = response.url;
        }
      });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader className="flex justify-center">
          <SheetTitle className="font-bold text-2xl text-primary">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-2 flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {cartItems.length !== 0 ? (
                cartItems.map((item) => (
                  <li key={item._id} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link href={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.productCategory}
                        </p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="text-lg text-black hover:bg-orange-500 bg-primary py-0.5 px-2 rounded-sm"
                            onClick={() => decrementQuantity(item._id)}
                          >
                            -
                          </button>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                          <button
                            type="button"
                            className="text-lg text-black hover:bg-orange-500 bg-primary py-0.5 px-2 rounded-sm"
                            onClick={() => incrementQuantity(item._id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-primary hover:text-primary-dark"
                            onClick={() => removeItem(item._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center gap-3 text-center">
                  <Image
                    src="/images/emptyCart.png"
                    alt="Empty Cart"
                    height={210}
                    width={210}
                  />
                  <p className="font-bold text-gray-800 text-lg">
                    Your cart is empty!
                  </p>
                </div>
              )}
            </ul>
          </div>
          {/* Total Price, Checkout Button, and clear cart button */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Price</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant={"default"}
                  className="flex-1 py-2 text-white rounded-lg transition-colors duration-300 font-bold"
                  onClick={checkout}
                >
                  Checkout
                </Button>
                <Button
                  variant={"default"}
                  className="flex-1 py-2 bg-black text-white rounded-lg transition-colors duration-300 font-bold"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
