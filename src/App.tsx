import * as React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Shop from './routes/shop/shop.component'
import Authentication from './routes/authentication/authentication.component'
import Checkout from './routes/checkout/checkout.component'
import {useEffect} from 'react'
import {createUserDocumentFromAuth, onAuthStateChangedListener} from './utils/firebase/firebase.utils'
import {User} from 'firebase/auth'
import {setCurrentUser} from './store/user/user.action'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user as any))
    })

    return unsubscribe
  }, [dispatch])
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
