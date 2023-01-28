import * as React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart, clearItemFromCart, removeItemFromCart} from 'src/store/cart/cart.action'
import {selectCartItems} from 'src/store/cart/cart.selector'

import {CartProduct} from '../../types/product.types'
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value
} from './checkout-item.styles'

type Props = {
  cartItem: CartProduct
}

const CheckoutItem = ({cartItem}: Props) => {
  const {name, imageUrl, price, quantity} = cartItem

  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
