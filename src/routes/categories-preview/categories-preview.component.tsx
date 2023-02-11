import * as React from 'react'

import {useSelector} from 'react-redux'
import Spinner from 'src/components/spinner/spinner.component'
import {selectCategoriesIsLoading, selectCategoriesMap} from 'src/store/categories/category.selector'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return <CategoryPreview key={title} title={title} products={products} />
        })
      )}
    </>
  )
}

export default CategoriesPreview
