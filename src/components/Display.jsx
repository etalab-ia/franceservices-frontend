import { Avatar } from "./Avatar";
import { useEffect } from "react";

function Message({ sender, text }) {
	const	isUser = sender === "user";
	const	classNames = isUser ? "flex flex-row mr-0 ml-auto" : "flex flex-row";

	return (
		<div className={classNames}>
			{!isUser && <Avatar user={sender} />}
			<div className={`w-[644px] ${isUser ? "mr-[16px]" : "ml-[16px]"}`}>
				<div className={isUser ? "user-chat" : "agent-chat"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}

export function Display(props) {
  	const	{ state } = props;

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
				<Message key={index} sender={message.sender} text={message.text} />
			))}
			{state.response.length !== 0 && (
				<div className="flex flex-row">
					<Avatar user="agent" />
					<div className="w-[644px] ml-[16px] py-4 text-justify">
						{state.response.slice(1).map((item, index) => (
							<span key={index}>{item}</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}