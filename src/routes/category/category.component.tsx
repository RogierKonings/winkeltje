import * as React from 'react'

import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import {Params, useParams} from 'react-router-dom'
import {selectCategoriesMap} from '../../store/categories/category.selector'
import ProductCard from '../../components/product-card/product-card.component'
import {Product} from '../../types/product.types'
import {CategoryContainer, Title} from './category.styles'

const Category = () => {
  const {category}: Readonly<Params<string>> = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState(categoriesMap[category!])

  useEffect(() => {
    setProducts(categoriesMap[category!])
  }, [category, categoriesMap])

  return (
    <>
      <Title>{category!.toUpperCase()}</Title>
      <CategoryContainer>
        {products && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
      </CategoryContainer>
    </>
  )
}

export default Category
