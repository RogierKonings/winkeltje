import * as React from 'react'

import {CartProduct} from '../../types/product.types'

import './cart-item.styles.scss'

type Props = {
  cartItem: CartProduct
}

const CartItem = ({cartItem}: Props) => {
  const {name, imageUrl, price, quantity} = cartItem
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  )
}

export default CartItem
