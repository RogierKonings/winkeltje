import * as React from 'react'

import {useContext} from 'react'
import {CartContext} from '../../context/cart.context'

import {Product} from '../../types/product.types'
import Button from '../button/button.component'

import './product-card.styles.scss'

type Props = {
  product: Product
}

const ProductCard = ({product}: Props) => {
  const {name, price, imageUrl} = product
  const {addItemToCart} = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product)

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to card
      </Button>
    </div>
  )
}

export default ProductCard
