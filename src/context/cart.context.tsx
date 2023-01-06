import * as React from 'react'
import {useEffect} from 'react'
import {createContext, useState} from 'react'
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

export const CartProvider = ({children}: Props) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => (total = cartItem.quantity * cartItem.price), 0)
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove: CartProduct) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToRemove: CartProduct) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove))
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
