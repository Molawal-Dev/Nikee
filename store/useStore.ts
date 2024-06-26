import { create } from 'zustand'
import CartItemTypes from './types/CartItemsTypes'
import createCartSlice from './slices/cartSlice'

const useStore = create<CartItemTypes>()((...a)=> ({
    ...createCartSlice(...a)
}))

export default useStore;