import {User} from 'firebase/auth'
import * as React from 'react'
import {createContext, useEffect, useReducer} from 'react'
import {createUserDocumentFromAuth, onAuthStateChangedListener} from 'src/utils/firebase/firebase.utils'
import {createAction} from 'src/utils/reducer/reducer.utils'

type Props = {
  children: React.ReactNode
}

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: User | null) => null
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state: any, action: any) => {
  const {type, payload} = action

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload}
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({children}: Props) => {
  const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)

  const setCurrentUser = (user: any) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }

  const value = {currentUser, setCurrentUser}

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user as any)
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={value as any}>{children}</UserContext.Provider>
}
