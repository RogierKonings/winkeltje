import {PayloadAction} from '@reduxjs/toolkit'
import {CartProduct} from 'src/types/product.types'
import {CART_ACTION_TYPES} from './cart.types'

export interface CartState {
  isCartOpen: boolean
  cartItems: CartProduct[]
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [] as CartProduct[]
}

export const cartReducer = (state = CART_INITIAL_STATE, action: PayloadAction<any> | Record<string, never> = {}) => {
  const {type, payload} = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      return state
  }
}
