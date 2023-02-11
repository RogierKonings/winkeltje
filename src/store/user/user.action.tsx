import {User} from 'firebase/auth'
import {createAction} from 'src/utils/reducer/reducer.utils'
import {USER_ACTION_TYPES} from './user.types'

export const setCurrentUser = (user: User) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)

export const emailSignInStart = (email: string, password: string) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password})

export const signInSuccess = (user: User) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, {user})

export const signInFailed = (error: Error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, {error})
