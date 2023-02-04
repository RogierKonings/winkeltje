import {configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {loggerMiddleWare} from './middleware/logger'
import {rootReducer} from './root-reducer'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancer = process.env.NODE_ENV !== 'production' && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleWare].filter(Boolean)

export const store = configureStore({reducer: persistedReducer, middleware: middleWares as any, enhancers: enhancer})

export const persistor = persistStore(store)
