import {createAction} from 'src/utils/reducer/reducer.utils'
import {CATEGORIES_ACTION_TYPE} from './category.types'

export const setCategories = (categories: any[]) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories)
