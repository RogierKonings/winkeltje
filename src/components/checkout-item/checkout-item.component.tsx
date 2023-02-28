import * as React from 'react'

import {useDispatch} from 'react-redux'
import {addItemToCart, removeItemFromCart, clearItemFromCart} from 'src/store/cart/cart.reducer'

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

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem))

  const addItemHandler = () => dispatch(addItemToCart(cartItem))

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem))

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
