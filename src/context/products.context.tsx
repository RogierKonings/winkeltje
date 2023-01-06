import * as React from 'react'
import {createContext, useState} from 'react'
import {Product} from 'src/types/product.types'

import PRODUCTS from '../shop-data.json'

type Props = {
  children: React.ReactNode
}

export const ProductsContext = createContext({
  products: [] as Product[]
})

export const ProductsProvider = ({children}: Props) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const value = {products}

  return <ProductsContext.Provider value={value as any}>{children}</ProductsContext.Provider>
}
