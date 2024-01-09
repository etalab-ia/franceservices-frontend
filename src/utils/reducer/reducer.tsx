import { streamReducer } from "./stream"
import { userReducer } from "./user"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { archiveReducer } from "./archive"

const reducer = combineReducers({
	archive: archiveReducer,
	stream: streamReducer,
	user: userReducer,
})

export const store = configureStore({ reducer: reducer })
