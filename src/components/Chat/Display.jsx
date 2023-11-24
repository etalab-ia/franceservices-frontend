import { useSelector } from 'react-redux';
import { DisplayArrayMessages } from "./DisplayArrayMessages";
import { DisplaySingleMessage } from "./DisplaySingleMessage";
import { ChatFollowUp } from "./ChatFollowUp";
import { NOT_SET } from '../../constants/status';
import { GlobalChatContainer } from './ChatContainer';

export function Display({ messages, archive }) {
	const	stream = useSelector((state) => state.stream);
	const	tabs = useSelector((state) => state.tabs);

	return (
		<GlobalChatContainer>
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
					/>
			})}
			<ChatFollowUp stream={stream} tabs={tabs} archive={archive}/>
		</GlobalChatContainer>
	);
}