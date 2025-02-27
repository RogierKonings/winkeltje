import * as React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Shop from './routes/shop/shop.component'
import Authentication from './routes/authentication/authentication.component'
import Checkout from './routes/checkout/checkout.component'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {checkUserSession} from './store/user/user.reducer'

const App = () => {
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(checkUserSession())
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
