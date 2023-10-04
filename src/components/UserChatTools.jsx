import { userChatToolsProps } from "../constants/chatbotProps";

export function UserChatTools(props) {

	const	{ state, dispatch } = props;

	return (
		<div className="user-chat-tools-container">
			{ userChatToolsProps.map((tool, index) => {
				return <button disabled={state.isStoppable} key={index} className="mr-3" onClick={() => tool.onClick(state, dispatch)}>
					<img src={tool.image} alt={tool.alt} title={tool.title}/>
				</button>

			})}
		</div>
	);
}