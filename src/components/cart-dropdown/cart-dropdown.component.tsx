import * as React from 'react'

import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {selectCartItems} from 'src/store/cart/cart.selector'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item: any) => <CartItem key={item.id} cartItem={item}></CartItem>)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
