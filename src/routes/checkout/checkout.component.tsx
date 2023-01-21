import * as React from 'react'

import {useContext} from 'react'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {CartContext} from '../../context/cart.context'
import {CheckoutContainer, Header, Item, Total} from './checkout.styles'

const Checkout = () => {
  const {cartItems, cartTotal} = useContext(CartContext)

  return (
    <CheckoutContainer>
      <Header>
        <Item>
          <span>Product</span>
        </Item>
        <Item>
          <span>Description</span>
        </Item>
        <Item>
          <span>Quantity</span>
        </Item>
        <Item>
          <span>Price</span>
        </Item>
        <Item>
          <span>Remove</span>
        </Item>
      </Header>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  )
}

export default Checkout
