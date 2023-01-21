import * as React from 'react'

import {useContext, useState, useEffect} from 'react'

import {useParams} from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'
import {CategoriesContext} from '../../context/categories.context'
import {Product} from '../../types/product.types'
import {CategoryContainer, Title} from './category.styles'

const Category = () => {
  const {category}: any = useParams()
  const {categoriesMap} = useContext(CategoriesContext)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
      </CategoryContainer>
    </>
  )
}

export default Category
