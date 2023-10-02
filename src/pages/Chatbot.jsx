import React from 'react'
import { useReducer } from 'react';
import { initialState, reducer } from '../utils/reducer';
import { Banner } from '../components/Banner';
import { Chat } from '../components/Chat';
import { UserTools } from '../components/UserTools';

export function Chatbot() {

	const   [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className='wrapper-container'>
			<Banner />
			<Chat state={state} dispatch={dispatch} />
			{/* <UserTools state={state} dispatch={dispatch} /> */}
		</div>
	);
}