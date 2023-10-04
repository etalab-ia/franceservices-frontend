import { Avatar } from "./Avatar";
import { useEffect } from "react";
import { UserChatTools } from "./UserChatTools";

function Message({ sender, text, state, dispatch }) {
	const	isUser = sender === "user";
	const	classNames = isUser ? "flex flex-row mr-0 ml-auto" : "flex flex-row";

	return (
		<div className={classNames}>
			{!isUser && <div className="flex flex-row">
				<UserChatTools state={state} dispatch={dispatch}/>
					<Avatar user={sender} />
			</div>}
			<div className={`w-[644px] ${isUser ? "mr-[16px]" : "ml-[16px]"}`}>
				<div className={isUser ? "user-chat" : "agent-chat"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}

export function Display(props) {
  	const	{ state, dispatch } = props;

	const scrollToBottom = () => {
		const	chatElement = document.getElementById("chat");

		chatElement.scrollTop = chatElement.scrollHeight;
	};

	useEffect(() => {
		scrollToBottom();
	}, [state.response]);

	return (
		<div className="chat" id="chat">
			{state.messages.slice(1).map((message, index) => (
				<Message key={index} sender={message.sender} text={message.text} state={state} />
			))}
			{state.response.length !== 0 && (
				<div className="streaming-container">
					<UserChatTools state={state} dispatch={dispatch}/>
					<Avatar user="agent" />
					<div className="streaming">
						{state.response.slice(1).map((item, index) => (
							<span key={index}>{item}</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}