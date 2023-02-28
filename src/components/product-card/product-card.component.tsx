import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart} from 'src/store/cart/cart.reducer'
import {selectCartItems} from 'src/store/cart/cart.selector'

import {Product} from '../../types/product.types'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {Footer, Name, Price, ProductCartContainer} from './product-card.styles'

type Props = {
  product: Product
}

const ProductCard = ({product}: Props) => {
  const {name, price, imageUrl} = product
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)

  const addProductToCart = () => dispatch(addItemToCart(product))

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to card
      </Button>
    </ProductCartContainer>
  )
}

export default ProductCard
