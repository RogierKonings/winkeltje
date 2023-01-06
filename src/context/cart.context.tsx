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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen: boolean) => {},
  cartItems: [] as CartProduct[],
  addItemToCart: (product: Product) => {},
  cartCount: 0
})

export const CartProvider = ({children}: Props) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}

  return <CartContext.Provider value={value as any}>{children}</CartContext.Provider>
}
