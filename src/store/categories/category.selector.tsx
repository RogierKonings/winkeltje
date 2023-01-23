import {RootState} from '../root-reducer'

export const selectCategoriesMap = (state: RootState) =>
  state.categories.categories.reduce((acc: any, category: any) => {
    const {title, items} = category
    acc[title.toLowerCase()] = items
    return acc
  }, {})
