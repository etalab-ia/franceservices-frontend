import React from 'react'

export function Display(props) {

	const	{ state, dispatch } = props;
	
	return (
		<div className="agent-chat">
			{state.messages.map((message, index) => {
				if (index === 0)
					return ;
				else if (message.sender === 'user')
					return <div className='user-chat' key={index}>{message.text}</div>
				return <div className='mb-[4vw]' key={index}>{message.text}</div>
			})}
			{state.response}
		</div>
	);
}