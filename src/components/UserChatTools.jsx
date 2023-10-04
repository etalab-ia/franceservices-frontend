import { userChatToolsProps } from "../constants/chatbotProps";

export function UserChatTools(props) {

	return (
		<div className="user-chat-tools-container">
			{ userChatToolsProps.map((tool, index) => {
				return <button key={index} className="mr-3">
					<img src={tool.image} alt={tool.alt} title={tool.title}/>
				</button>

			})}
		</div>
	);
}