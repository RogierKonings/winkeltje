import {combineReducers} from 'redux'
import {userReducer} from './user/user.reducer'
import {UserState} from './user/user.types'

export interface RootState {
  user: UserState
}

export const rootReducer = combineReducers({
  user: userReducer
})
