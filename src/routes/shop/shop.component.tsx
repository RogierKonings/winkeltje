import * as React from 'react'
import {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {useAppDispatch} from 'src/hooks/hooks'
import {fetchCategoriesStart} from 'src/store/categories/category.action'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [dispatch])
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop
