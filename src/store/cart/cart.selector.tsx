import {createSelector} from 'reselect'
import {CartProduct} from 'src/types/product.types'
import {RootState} from '../store'

const selectCartReducer = (state: RootState) => state.cart

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems)

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen)

export const selectCartCount = createSelector([selectCartItems], (cartItems: CartProduct[]) =>
  cartItems.reduce((total: number, cartItem: CartProduct) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector([selectCartItems], (cartItems: CartProduct[]) =>
  cartItems.reduce((total: number, cartItem: CartProduct) => (total = cartItem.quantity * cartItem.price), 0)
)
