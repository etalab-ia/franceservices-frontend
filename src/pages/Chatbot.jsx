import { useEffect } from "react"
import { DisplayChatTab } from "../components/Chat/DisplayChatTab"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { emitCloseStream } from "../utils/eventsEmitter"
import { useDispatch } from "react-redux"

export function Chatbot({ archive }) {
	const dispatch = useDispatch()

	useEffect(() => {
		emitCloseStream(false)
		dispatch({ type: "RESET_QUESTION_FIELDS" })
	}, [])

	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<GlobalDiv>
				<DisplayChatTab archive={archive} />
			</GlobalDiv>
		</GlobalRowContainer>
	)
}
