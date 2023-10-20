import { useSelector } from 'react-redux';
import { Ressources } from "../Ressources/Ressources";
import { DisplayArrayMessages } from "./DisplayArrayMessages";
import { DisplaySingleMessage } from "./DisplaySingleMessage";
import { ChatFollowUp } from "./ChatFollowUp";

export function Display() {
	const	history = useSelector((state) => state.history);
	const	stream = useSelector((state) => state.stream);
	const	tabs = useSelector((state) => state.tabs);

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
			{history.messages.length !== 0 && !tabs.activeTab && <Ressources />}
			<ChatFollowUp stream={stream} tabs={tabs}/>
		</div>
	);
}