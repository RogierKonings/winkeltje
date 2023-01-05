import * as React from 'react'
import {createContext, useState} from 'react'

type Props = {
  children: React.ReactNode
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen: boolean) => {}
})

export const CartProvider = ({children}: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const value = {isCartOpen, setIsCartOpen}

  return <CartContext.Provider value={value as any}>{children}</CartContext.Provider>
}
