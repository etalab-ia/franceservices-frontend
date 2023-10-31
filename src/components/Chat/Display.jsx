import { useSelector } from 'react-redux';
import { Ressources } from "../Ressources/Ressources";
import { DisplayArrayMessages } from "./DisplayArrayMessages";
import { DisplaySingleMessage } from "./DisplaySingleMessage";
import { ChatFollowUp } from "./ChatFollowUp";
import { NOT_SET } from '../../constants/status';

export function Display({ messages, isArchive, archive }) {
	const	stream = useSelector((state) => state.stream);
	const	tabs = useSelector((state) => state.tabs);

	return (
		<div className="chat" id="chat">
			{messages.map((message, index) => {
				return Array.isArray(message.text) ? 
					<DisplayArrayMessages
						key={index}
						messages={message.text}
						isArchive={isArchive}
					/>
					:
					<DisplaySingleMessage
						key={index}
						sender={message.sender}
						text={message.text}
						isArchive={isArchive}
					/>
			})}
			{messages.length !== 0 && (!tabs.activeTab || archive !== NOT_SET) && <Ressources archive={archive}/>}
			<ChatFollowUp stream={stream} tabs={tabs}/>
		</div>
	);
}