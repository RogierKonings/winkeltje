import * as React from 'react'
import {useReducer} from 'react'
import {createContext} from 'react'
import {createAction} from 'src/utils/reducer/reducer.utils'
import {CartProduct, Product} from '../types/product.types'

type Props = {
  children: React.ReactNode
}

const addCartItem = (cartItems: CartProduct[], productToAdd: Product): CartProduct[] => {
  const existingCartItem = cartItems.find((cartitem) => cartitem.id === productToAdd.id)

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen: boolean) => {},
  cartItems: [] as CartProduct[],
  addItemToCart: (productToAdd: Product) => {},
  removeItemFromCart: (cartItemToRemove: CartProduct) => {},
  clearItemFromCart: (cartItemToRemove: CartProduct) => {},
  cartCount: 0,
  cartTotal: 0
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [] as CartProduct[],
  cartCount: 0,
  cartTotal: 0
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state: any, action: any) => {
  const {type, payload} = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}: Props) => {
  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems: CartProduct[]) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotal = newCartItems.reduce((total, cartItem) => (total = cartItem.quantity * cartItem.price), 0)

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartitems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      })
    )
  }

  const addItemToCart = (productToAdd: Product) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (cartItemToRemove: CartProduct) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (cartItemToRemove: CartProduct) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (bool: boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  }

  return <CartContext.Provider value={value as any}>{children}</CartContext.Provider>
}
