import * as React from 'react'
import {Product} from 'src/types/product.types'
import ProductCard from '../product-card/product-card.component'
import {CategoryPreviewContainer, PreviewContainer, TitleLink} from './category-preview.styles'

const CategoryPreview = ({title, products}: {title: string; products: Product[]}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <TitleLink to={title}>{title.toUpperCase()}</TitleLink>
      </h2>
      <PreviewContainer>
        {products
          .filter((_: any, idx: number) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
