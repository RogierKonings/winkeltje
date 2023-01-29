import {createSelector} from 'reselect'
import {RootState} from '../root-reducer'

const selectCategoryReducer = (state: RootState) => state.categories

export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categories)

export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((acc: any, category: any) => {
    const {title, items} = category
    acc[title.toLowerCase()] = items
    return acc
  }, {})
)
