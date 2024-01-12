import { useEffect } from "react"
import { DisplayChatTab } from "../components/Chat/DisplayChatTab"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { emitCloseStream } from "../utils/eventsEmitter"
import { useDispatch } from "react-redux"

// TODO WHEN BACK IS READY: change archive type
export function Chatbot({ archive }) {
	const dispatch = useDispatch()
	const handleMount = async () => {
		console.log("Chatbot mounted")
		emitCloseStream()
		dispatch({ type: "SET_CHAT_ID", nextChatId: 0 })
		dispatch({ type: "SET_STREAM_ID", nextChatId: 0 })
	}
	useEffect(() => {
		handleMount()
	}, [])

	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<GlobalDiv>
				<DisplayChatTab archive={archive} />
			</GlobalDiv>
		</GlobalRowContainer>
	)
}
