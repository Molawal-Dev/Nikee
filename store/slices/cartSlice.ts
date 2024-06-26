import { StateCreator } from "zustand";
import CartItemTypes from "../types/CartItemsTypes";
import { productTypes } from "@/app/types";



const createCartSlice: StateCreator<CartItemTypes> = (set, get) => ({
  cartItems: [],
  isSheetOpen: false,

  addToCart(product: productTypes) {
    const { cartItems } = get();
    const existingIndex = cartItems.findIndex(item => item._id === product._id);

    if (existingIndex !== -1) {
      // If product exists, increase quantity
      set(state => ({
        cartItems: state.cartItems.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      }));
    } else {
      // If product does not exist, add it with quantity 1
      set(state => ({
        cartItems: [...state.cartItems, { ...product, quantity: 1 }]
      }));
    }
  },

  removeFromCart(productId: string) {
    set(state => ({
      cartItems: state.cartItems.filter(item => item._id !== productId)
    }));
  },

  clearCart() {
    set(() => ({
      cartItems: []
    }));
  },

  toggleSheet() {
    set(state => ({ isSheetOpen: !state.isSheetOpen }));
  },
});

export default createCartSlice;
