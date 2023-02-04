import {CartProduct, Product} from 'src/types/product.types'
import {createAction} from 'src/utils/reducer/reducer.utils'
import {CART_ACTION_TYPES} from './cart.types'

export const addItemToCart = (cartItems: CartProduct[], productToAdd: Product) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems: CartProduct[], cartItemToRemove: CartProduct) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems: CartProduct[], cartItemToRemove: CartProduct) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
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

export const setIsCartOpen = (bool: boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
