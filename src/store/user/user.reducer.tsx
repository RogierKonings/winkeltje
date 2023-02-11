import {PayloadAction} from '@reduxjs/toolkit'
import {User} from 'firebase/auth'
import {USER_ACTION_TYPES} from './user.types'

export interface UserState {
  currentUser: User | null
  isLoading: boolean
  error: Error | null
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: PayloadAction<User | null>) => {
  const {type, payload} = action

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {...state, currentUser: payload}
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {...state, error: payload}
    default:
      return state
  }
}
