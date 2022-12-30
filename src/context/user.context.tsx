import {UserCredential} from 'firebase/auth'
import * as React from 'react'
import {createContext, useState} from 'react'

type Props = {
  children: React.ReactNode
}

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: UserCredential | null) => null
})

export const UserProvider = ({children}: Props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = {currentUser, setCurrentUser}
  return <UserContext.Provider value={value as any}>{children}</UserContext.Provider>
}
