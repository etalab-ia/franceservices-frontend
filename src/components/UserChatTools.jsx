import { useState } from "react";
import { userChatToolsFunc } from "../constants/chatbotProps";
import { animated } from '@react-spring/web'

export function UserChatTools(props) {

	const	{ state, dispatch } = props;
	const	[isSelected, setIsSelected] = useState();
	const	userChatToolsProps = userChatToolsFunc(state, dispatch);

	const handleClick = (index) => {
		setIsSelected(index);
		setTimeout(() => setIsSelected(null), 100);
	};

	return (
		<div className="user-chat-tools-container">
			{ userChatToolsProps.map((tool, index) => {
				return <animated.button 
					disabled={state.isStoppable}
					key={index} className="mr-3"
					style={{
						opacity: index === isSelected ? 0 : 1,
						boxShadow: index === isSelected ? '0 0 10px 3px rgba(0, 0, 0, 0.5)' : 'none',
					}}
					onClick={() => { handleClick(index); tool.onClick(state, dispatch); }}
				>
					<img
						src={tool.image}
						alt={tool.alt}
						title={tool.title}
					/>
				</animated.button>

			})}
		</div>
	);
}