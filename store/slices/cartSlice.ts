import { StateCreator } from "zustand";
import CartItemTypes, { CartItem } from "../types/CartItemsTypes";
import { productTypes } from "@/app/types";

// Function to save cart items to local storage
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

// Function to load cart items from local storage
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const createCartSlice: StateCreator<CartItemTypes> = (set, get) => ({
  cartItems: loadCartFromLocalStorage(),
  isSheetOpen: false,

  addToCart(product: productTypes) {
    const { cartItems } = get();
    const existingIndex = cartItems.findIndex(item => item._id === product._id);

    let newCartItems;
    if (existingIndex !== -1) {
      // If product exists, increase quantity
      newCartItems = cartItems.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If product does not exist, add it with quantity 1
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },

  removeFromCart(productId: string) {
    const { cartItems } = get();
    const newCartItems = cartItems.filter(item => item._id !== productId);

    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },

  clearCart() {
    set({ cartItems: [] });
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartItems");
    }
  },

  toggleSheet() {
    set(state => ({ isSheetOpen: !state.isSheetOpen }));
  },

  incrementQuantity(productId: string) {
    const { cartItems } = get();
    const newCartItems = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );

    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },

  decrementQuantity(productId: string) {
    const { cartItems } = get();
    const newCartItems = cartItems
      .map(item =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    set({ cartItems: newCartItems });
    saveCartToLocalStorage(newCartItems);
  },
});

export default createCartSlice;

