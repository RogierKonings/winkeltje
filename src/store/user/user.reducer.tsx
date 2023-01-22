import {PayloadAction} from '@reduxjs/toolkit'
import {User} from 'firebase/auth'
import {UserState, USER_ACTION_TYPES} from './user.types'

const INITIAL_STATE: UserState = {
  currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action: PayloadAction<User | null>) => {
  const {type, payload} = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload}
    default:
      return state
  }
}
