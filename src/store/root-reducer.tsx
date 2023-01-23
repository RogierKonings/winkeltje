import {combineReducers} from 'redux'
import {categoriesReducer, CategoriesState} from './categories/category.reducer'
import {userReducer, UserState} from './user/user.reducer'

export interface RootState {
  user: UserState
  categories: CategoriesState
}

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer
})
