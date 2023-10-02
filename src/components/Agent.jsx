import React from 'react'

export function Agent(props) {

	const	{ state, dispatch } = props;

	return (
		<div className="agent-chat">
			{state.response}
		</div>
	);
}