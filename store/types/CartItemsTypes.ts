import { productTypes } from "@/app/types";

// Adding a quantity type to my productType type definition.
export interface CartItem extends productTypes {
  quantity: number;
}

interface CartItemTypes {
  cartItems: Array<CartItem>,
  addToCart: (cartItem: productTypes) => void,
  isSheetOpen: boolean,
  toggleSheet: () => void,
  removeFromCart: (productId: string) => void,
  clearCart: () => void,
  incrementQuantity: (productId: string) => void,
  decrementQuantity: (productId: string) => void,
}

export default CartItemTypes;
