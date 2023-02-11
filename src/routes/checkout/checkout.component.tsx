import * as React from 'react'

import {useSelector} from 'react-redux'
import {selectCartItems, selectCartTotal} from 'src/store/cart/cart.selector'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {CheckoutContainer, Header, Item, Total} from './checkout.styles'

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

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
      {cartItems.map((cartItem: any) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  )
}

export default Checkout
