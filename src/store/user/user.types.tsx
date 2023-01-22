import {User} from 'firebase/auth'

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export interface UserState {
  currentUser: User | null
}
