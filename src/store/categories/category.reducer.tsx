import {PayloadAction} from '@reduxjs/toolkit'
import {CATEGORIES_ACTION_TYPE} from './category.types'

export interface CategoriesState {
  categories: any
  isLoading: boolean
  error: Error | null
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: PayloadAction<any> | Record<string, never> = {}
) => {
  const {type, payload} = action

  switch (type) {
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
      return {...state, isLoading: true}
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: payload, isLoading: false}
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
      return {...state, error: payload, isLoading: false}
    default:
      return state
  }
}
