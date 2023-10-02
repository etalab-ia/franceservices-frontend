import React from 'react'
import { UserTools } from '../components/UserTools';
import { Agent } from '../components/Agent';
import { UserMessage } from '../components/UserMessage';
import { useReducer } from 'react';
import { initialState, reducer } from '../utils/reducer';

export function Chatbot() {

	const   [state, dispatch] = useReducer(reducer, initialState);

	console.log('chat')

	return (
		<div className="wrapper-container">
			<UserTools />
			<div className="flex flex-col items-center justify-end h-full mx-auto max-w-screen-xl">
				<Agent
					state={state}
					dispatch={dispatch}
				/>
				<UserMessage 
					state={state}
					dispatch={dispatch}
				/>
			</div>
		</div>
	);
}