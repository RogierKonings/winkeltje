import {PayloadAction} from '@reduxjs/toolkit'
import {CATEGORIES_ACTION_TYPE} from './category.types'

export interface CategoriesState {
  categories: any
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: []
}

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: PayloadAction<any> | Record<string, never> = {}
) => {
  const {type, payload} = action

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return {...state, categories: payload}
    default:
      return state
  }
}
