import {PayloadAction} from '@reduxjs/toolkit'
import {User} from 'firebase/auth'
import {USER_ACTION_TYPES} from './user.types'

export interface UserState {
  currentUser: User | null
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: PayloadAction<User | null>) => {
  const {type, payload} = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload}
    default:
      return state
  }
}
