import * as React from 'react'

import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'

import {CartProduct} from '../../types/product.types'
import {Name, Price} from '../cart-item/cart-item.styles'
import {Arrow, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value} from './checkout-item.styles'

type Props = {
  cartItem: CartProduct
}

const CheckoutItem = ({cartItem}: Props) => {
  const {name, imageUrl, price, quantity} = cartItem

  const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext)

  const clearItemHandler = () => clearItemFromCart(cartItem)

  const addItemHandler = () => addItemToCart(cartItem)

  const removeItemHandler = () => removeItemFromCart(cartItem)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
