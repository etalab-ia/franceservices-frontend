import { useEffect, useState } from "react"
import { DisplayChatTab } from "../components/Chat/DisplayChatTab"
import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { emitCloseStream } from "../utils/eventsEmitter"
import { useDispatch } from "react-redux"
import { CurrQuestionContext } from "../utils/context/questionContext"
import { InitialQuestion } from "../../types"

// TODO WHEN BACK IS READY: change archive type
export function Chatbot({ archive }) {
	const dispatch = useDispatch()
	const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
	const [generate, setGenerate] = useState(false)

	if (!generate) {
		emitCloseStream()
	}

	const updateCurrQuestion = (newQuestion) => {
		setCurrQuestion(newQuestion)
	}

	const handleMount = async () => {
		emitCloseStream()
		dispatch({ type: "SET_CHAT_ID", nextChatId: 0 })
		dispatch({ type: "SET_STREAM_ID", nextChatId: 0 })
	}
	useEffect(() => {
		handleMount()
	}, [])

	return (
		<CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
			<GlobalRowContainer extraClass="fr-grid-row--center">
				// @ts-expect-error TS(2304) FIXME: Cannot find name 'children'. // @ts-expect-error
				TS(2304): Cannot find name 'children'.
				<GlobalDiv>
					<DisplayChatTab archive={archive} setGenerate={setGenerate} />
				</GlobalDiv>
			</GlobalRowContainer>
		</CurrQuestionContext.Provider>
	)
}
