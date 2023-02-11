import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {setupListeners} from '@reduxjs/toolkit/query'
import {configureStore} from '@reduxjs/toolkit'

import {rootReducer} from './root-reducer'
import {loggerMiddleware} from './middleware/logger'
import createSagaMiddleware from '@redux-saga/core'
import {rootSaga} from './root-saga'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean)

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false
    }).concat(middleWares as any)
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
