import { Avatar } from "./Avatar";
import { useEffect, useState } from "react";
import { scrollToBottom } from "../utils/manageEffects";
import { UserChatTools } from "./UserChatTools";
import { useSelector } from 'react-redux';
import { UserExperience } from "./UserExperience";
import { Sheets } from "./Sheets";
import { NOT_SET } from "../constants/status";

function Message({ sender, text }) {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "row-message";

	return (
		<div className={classNames}>
			{!isUser && <div className="row-message">
				<UserChatTools />
				<Avatar user={sender} />
			</div>}
			<div className={`w-[648px] ${isUser ? "mr-4" : "ml-4"}`}>
				<div className={isUser ? "user-chat" : "agent-chat"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}

export function Display(props) {
	const	history = useSelector((state) => state.history);
	const	stream = useSelector((state) => state.stream);
	const   [display, setDisplay] = useState(NOT_SET);

	useEffect(() => { scrollToBottom(); setDisplay(NOT_SET); }, [stream.response]);

	return (
		<div className="chat" id="chat">
			{history.messages.slice(1).map((message, index) => (
				<Message key={index} sender={message.sender} text={message.text} props={props} />
			))}
			{stream.response.length !== 0 && (
				<div>
					<div className="streaming-container">
						<UserChatTools />
						<Avatar user="agent" />
						<div className="streaming">
							{stream.response.slice(1).map((item, index) => (
								<span key={index}>{item}</span>
							))}
						</div>
					</div>
					{!stream.isStreaming && display && <Sheets display={display} setDisplay={setDisplay}/>}
					{!stream.isStreaming && !display && <UserExperience />}
				</div>
			)}
		</div>
	);
}