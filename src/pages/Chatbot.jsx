import { useEffect } from "react"
import { DisplayChatTab } from "../components/Chat/DisplayChatTab"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { emitCloseStream } from "../utils/eventsEmitter"

export function Chatbot({ archive }) {
	
	useEffect(() => {
		emitCloseStream()
	}, [])

	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<GlobalDiv>
				<DisplayChatTab archive={archive} />
			</GlobalDiv>
		</GlobalRowContainer>
	)
}
