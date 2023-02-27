import {createSlice} from '@reduxjs/toolkit'
import {User} from 'firebase/auth'

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

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    googleSignInStart() {},
    emailSignInStart(state, action) {},
    signInSuccess(state, action) {
      state.currentUser = action.payload
    },
    signInFailed(state, action) {
      state.error = action.payload
    },
    signOutStart() {},
    signOutSuccess(state) {
      state.currentUser = null
    },
    signOutFailed(state, action) {
      state.error = action.payload
    },
    signUpStart(state, action) {},
    signUpSuccess(state, action) {},
    signUpFailed(state, action) {
      state.error = action.payload
    },
    checkUserSession() {}
  }
})

export const {
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  checkUserSession
} = userSlice.actions

export const userReducer = userSlice.reducer
