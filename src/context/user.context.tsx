import {User} from 'firebase/auth'
import * as React from 'react'
import {createContext, useState, useEffect} from 'react'
import {createUserDocumentFromAuth, onAuthStateChangedListener} from 'src/utils/firebase/firebase.utils'

type Props = {
  children: React.ReactNode
}

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: User | null) => null
})

export const UserProvider = ({children}: Props) => {
  const [currentUser, setCurrentUser] = useState(null)
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
