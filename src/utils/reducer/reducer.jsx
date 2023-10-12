import { authReducer } from "./auth";
import { historyReducer } from "./history";
import { institutionsReducer } from "./institutions";
import { streamReducer } from "./stream";
import { tabsReducer } from "./tabs";
import { userReducer } from "./userReducer";
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { feedbackReducer } from "./feedback";

const           reducer = combineReducers({
	auth: authReducer,
	feedback: feedbackReducer,
	history: historyReducer,
	institutions: institutionsReducer,
	stream: streamReducer,
	tabs: tabsReducer,
	user: userReducer,
});

export const    store = configureStore({ reducer: reducer });