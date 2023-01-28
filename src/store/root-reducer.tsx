import {combineReducers} from 'redux'
import {cartReducer, CartState} from './cart/cart.reducer'
import {categoriesReducer, CategoriesState} from './categories/category.reducer'
import {userReducer, UserState} from './user/user.reducer'

export interface RootState {
  user: UserState
  categories: CategoriesState
  cart: CartState
}

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer
})
