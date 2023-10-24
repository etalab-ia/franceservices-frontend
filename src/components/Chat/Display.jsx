import { useSelector } from 'react-redux';
import { Ressources } from "../Ressources/Ressources";
import { DisplayArrayMessages } from "./DisplayArrayMessages";
import { DisplaySingleMessage } from "./DisplaySingleMessage";
import { ChatFollowUp } from "./ChatFollowUp";

export function Display({ messages }) {
	const	stream = useSelector((state) => state.stream);
	const	tabs = useSelector((state) => state.tabs);

	return (
		<div className="chat" id="chat">
			{messages.map((message, index) => {
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
			{messages.length !== 0 && !tabs.activeTab && <Ressources />}
			<ChatFollowUp stream={stream} tabs={tabs}/>
		</div>
	);
}