import React from 'react'
import { Banner } from '../components/Banner';
import { Messages } from '../components/Messages';

export function Chatbot(props) {

	const   { state, dispatch } = props;

	return (
		<>
			<Banner />
			<Messages
				state={state}
				dispatch={dispatch}
			/>
		</>
	);
}