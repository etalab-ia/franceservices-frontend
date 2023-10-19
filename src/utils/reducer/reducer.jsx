import { authReducer } from "./auth";
import { historyReducer } from "./history";
import { institutionsReducer } from "./institutions";
import { streamReducer } from "./stream";
import { tabsReducer } from "./tabs";
import { userReducer } from "./user";
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { feedbackReducer } from "./feedback";
import { ressourcesReducer } from "./ressources";
import { archiveReducer } from "./archive";

const           reducer = combineReducers({
	archive: archiveReducer,
	auth: authReducer,
	feedback: feedbackReducer,
	history: historyReducer,
	institutions: institutionsReducer,
	ressources: ressourcesReducer,
	stream: streamReducer,
	tabs: tabsReducer,
	user: userReducer,
});

export const    store = configureStore({ reducer: reducer });