import * as React from 'react'

import {CartProduct} from '../../types/product.types'
import {CartItemContainer, Details, Image, Name, Price} from './cart-item.styles'

type Props = {
  cartItem: CartProduct
}

const CartItem = ({cartItem}: Props) => {
  const {name, imageUrl, price, quantity} = cartItem
  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Details>
        <Name>{name}</Name>
        <Price>
          {quantity} x ${price}
        </Price>
      </Details>
    </CartItemContainer>
  )
}

export default CartItem
