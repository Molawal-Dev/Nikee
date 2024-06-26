import { productTypes } from "@/app/types"

interface CartItemTypes {
    cartItems: Array<object>,
    addToCart: (cartItem: productTypes) => void,
    isSheetOpen: boolean,
    toggleSheet: () => void,
    removeFromCart: (productId: string) => void,
    clearCart: () => void,
}

export default CartItemTypes;