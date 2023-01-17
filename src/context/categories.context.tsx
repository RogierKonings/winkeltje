import * as React from 'react'
import {createContext, useEffect, useState} from 'react'
import {Product} from '../types/product.types'
import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils'

type Props = {
  children: React.ReactNode
}

export const CategoriesContext = createContext({
  categoriesMap: {} as any
})

export const CategoriesProvider = ({children}: Props) => {
  const [categoriesMap, setCategoriesMap] = useState<Product[]>({} as any)

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()

      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, [])

  const value = {categoriesMap}

  return <CategoriesContext.Provider value={value as any}>{children}</CategoriesContext.Provider>
}
