import { Avatar } from "./Avatar";
import { useState } from "react";
import { UserChatTools } from "../User/UserChatTools";
import { useSelector } from 'react-redux';
import { UserExperience } from "../Feedbacks/UserExperience";
import { Sheets } from "../Sheets/Sheets";
import { NOT_SET } from "../../constants/status";
import { DisplayStream } from "../Stream/DisplayStream";
import { Ressources } from "../Ressources/Ressources";
import { DisplayArrayMessages } from "./DisplayArrayMessages";
import { DisplaySingleMessage } from "./DisplaySingleMessage";

export function Display() {
	const	history = useSelector((state) => state.history);
	const	stream = useSelector((state) => state.stream);
	const	tabs = useSelector((state) => state.tabs);
	const   [display, setDisplay] = useState(NOT_SET);

	return (
		<div className="chat" id="chat">
			{history.messages.map((message, index) => {
				return Array.isArray(message.text) ? 
				<DisplayArrayMessages
					key={index}
					messages={message.text}
				/>
				:
				<DisplaySingleMessage
					key={index}
					sender={message.sender}
					text={message.text}
				/>
			})}
			{history.messages.length !== 0 && <Ressources />}
			{(stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0 && (
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