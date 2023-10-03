import React from 'react'
import { useReducer } from 'react';
import { initialState, reducer } from '../utils/reducer';
import { Banner } from '../components/Banner';
import { Messages } from '../components/Messages';
import { UserTools } from '../components/UserTools';

export function Chatbot() {

	const   [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<Banner />
			<Messages state={state} dispatch={dispatch} />
			{/* <UserTools state={state} dispatch={dispatch} /> */}
		</>
	);
}