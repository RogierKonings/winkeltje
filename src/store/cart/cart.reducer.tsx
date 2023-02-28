import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartProduct, Product} from 'src/types/product.types'

export interface CartState {
  isCartOpen: boolean
  cartItems: CartProduct[]
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [] as CartProduct[]
}

const addCartItem = (cartItems: CartProduct[], productToAdd: Product): CartProduct[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    )
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems: CartProduct[], cartItemToRemove: CartProduct): CartProduct[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
  )
}

const clearCartItem = (cartItems: CartProduct[], cartItemToClear: CartProduct): CartProduct[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload)
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload)
    },
    setCartIsOpen(state, action) {
      state.isCartOpen = action.payload
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload)
    }
  }
})

export const {addItemToCart, removeItemFromCart, setCartIsOpen, clearItemFromCart} = cartSlice.actions

export const cartReducer = cartSlice.reducer
