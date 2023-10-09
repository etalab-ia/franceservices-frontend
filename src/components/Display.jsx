import { Avatar } from "./Avatar";
import { useEffect } from "react";
import { scrollToBottom } from "../utils/manageEffects";
import { UserChatTools } from "./UserChatTools";
import { useSelector } from 'react-redux';

function Message({ sender, text }) {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "row-message";

	return (
		<div className={classNames}>
			{!isUser && <div className="row-message">
				<UserChatTools />
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
	const	history = useSelector((state) => state.history);
	const	stream = useSelector((state) => state.stream);

	useEffect(() => { scrollToBottom(); }, [stream.response]);

	return (
		<div className="chat" id="chat">
			{history.messages.slice(1).map((message, index) => (
				<Message key={index} sender={message.sender} text={message.text} props={props} />
			))}
			{stream.response.length !== 0 && (
				<div className="streaming-container">
					<UserChatTools />
					<Avatar user="agent" />
					<div className="streaming">
						{stream.response.slice(1).map((item, index) => (
							<span key={index}>{item}</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}