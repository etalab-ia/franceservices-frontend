import React from 'react'

export function Display(props) {

	const	{ state, dispatch } = props;

	return (
		<div className="agent-chat">
				<div className='user-chat'>{state.question.user_text}</div>
				<div>{state.response}</div>
		
		</div>
	);
}