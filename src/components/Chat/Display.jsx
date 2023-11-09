import { useSelector } from 'react-redux';
import { Ressources } from "../Ressources/Ressources";
import { DisplayArrayMessages } from "./DisplayArrayMessages";
import { DisplaySingleMessage } from "./DisplaySingleMessage";
import { ChatFollowUp } from "./ChatFollowUp";
import { NOT_SET } from '../../constants/status';

export function Display({ messages, archive }) {
	const	stream = useSelector((state) => state.stream);
	const	tabs = useSelector((state) => state.tabs);
	const	ressourcesCondition = ((messages.length !== 0 && !tabs.activeTab) || archive !== NOT_SET);

	return (
		<div className="chat">
			{messages.map((message, index) => {
				return Array.isArray(message.text) ? 
					<DisplayArrayMessages
						key={index}
						messages={message.text}
						isArchive={archive !== NOT_SET}
					/>
					:
					<DisplaySingleMessage
						key={index}
						sender={message.sender}
						text={message.text}
						isArchive={archive !== NOT_SET}
					/>
			})}
			{ressourcesCondition && <Ressources archive={archive}/>}
			<ChatFollowUp stream={stream} tabs={tabs} archive={archive}/>
		</div>
	);
}