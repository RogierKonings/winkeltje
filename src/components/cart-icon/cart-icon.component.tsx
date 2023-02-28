import * as React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {setCartIsOpen} from 'src/store/cart/cart.reducer'
import {selectCartCount, selectIsCartOpen} from 'src/store/cart/cart.selector'

import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'

const CartIcon = () => {
  const dispatch = useDispatch()

  const cartCount = useSelector(selectCartCount)

  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => dispatch(setCartIsOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
