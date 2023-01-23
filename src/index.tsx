import {createRoot} from 'react-dom/client'
import './index.scss'
import App from './App'
import {CartProvider} from './context/cart.context'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import * as React from 'react'
import {Provider} from 'react-redux'
import {store} from './store/store'

const container = document.getElementById('root')
const root = createRoot(container as Element)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
