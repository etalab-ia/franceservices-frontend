import { Avatar } from "./Avatar";
import { useState } from "react";
import { UserChatTools } from "../User/UserChatTools";
import { useSelector } from 'react-redux';
import { UserExperience } from "../Feedbacks/UserExperience";
import { Sheets } from "../Sheets/Sheets";
import { NOT_SET } from "../../constants/status";
import { DisplayStream } from "../Stream/DisplayStream";

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

	return (
		<div className="chat" id="chat">
			{history.messages.map((message, index) => (
				<Message key={index} sender={message.sender} text={message.text} props={props} />
			))}
			{stream.response.length !== 0 && (
				<div>
					<div className="streaming-container">
						<UserChatTools />
						<Avatar user="agent" />
						<DisplayStream setDisplay={setDisplay}/>
					</div>
					{!stream.isStreaming && display && <Sheets display={display} setDisplay={setDisplay}/>}
					{!stream.isStreaming && !display && <UserExperience />}
				</div>
			)}
		</div>
	);
}