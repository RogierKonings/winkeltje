import {User} from 'firebase/auth'
import {createAction} from 'src/utils/reducer/reducer.utils'
import {USER_ACTION_TYPES} from './user.types'

export const setCurrentUser = (user: User) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
