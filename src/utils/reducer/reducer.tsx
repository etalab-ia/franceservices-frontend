import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { streamReducer } from './stream'
import { userReducer } from './user'

const reducer = combineReducers({
  stream: streamReducer,
  user: userReducer,
})

export const store = configureStore({ reducer: reducer })
