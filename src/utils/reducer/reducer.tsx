import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { archiveReducer } from './archive'
import { streamReducer } from './stream'
import { userReducer } from './user'

const reducer = combineReducers({
  archive: archiveReducer,
  stream: streamReducer,
  user: userReducer,
})

export const store = configureStore({ reducer: reducer })
