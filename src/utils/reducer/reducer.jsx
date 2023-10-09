import { authReducer } from "./auth";
import { historyReducer } from "./history";
import { institutionsReducer } from "./institutions";
import { streamReducer } from "./stream";
import { tabsReducer } from "./tabs";
import { userReducer } from "./userReducer";
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const           reducer = combineReducers({
	auth: authReducer,
	history: historyReducer,
	institutions: institutionsReducer,
	stream: streamReducer,
	tabs: tabsReducer,
	user: userReducer,
});

export const    store = configureStore({ reducer: reducer });