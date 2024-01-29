import { useSelector } from "react-redux"
import { DisplayArrayMessages } from "./DisplayArrayMessages"
import { DisplaySingleMessage } from "./DisplaySingleMessage"
import { ChatFollowUp } from "./ChatFollowUp"
import { GlobalChatContainer } from "./GlobalChatContainer"
import { type RootState, type Message } from "types"

/*
 *
 */
export function Display({ messages, archive }: { messages: Message[]; archive: boolean }) {
	const stream = useSelector((state: RootState) => state.stream)

	return (
		<GlobalChatContainer>
			{messages.map((message, index) => {
				return Array.isArray(message.text) ? (
					<DisplayArrayMessages key={index} messages={message.text} />
				) : (
					<DisplaySingleMessage key={index} sender={message.sender} text={message.text} />
				)
			})}
			{!archive && <ChatFollowUp stream={stream} />}
		</GlobalChatContainer>
	)
}
