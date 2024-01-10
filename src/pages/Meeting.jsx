import { MeetingPage } from "../components/Meeting/MeetingPage"
import { MeetingSettings } from "../components/Meeting/MeetingSettings"
import { useEffect, useState } from "react"
import { emitCloseStream } from "../utils/eventsEmitter"
import { useDispatch } from "react-redux"

/*****************************************************************************************************
	
	VARIABLES:
	
	**	generate: to determine whether the user is in the description or stream phase
			true: user entered prompt informations & click on generate button
			false:
				- user has just arrived on the meeting page
				- OR clicked on the modify button. If so, emitCloseStream is called
	
	**	currQuestion: description provided by the user
	**	context: additional informations provided by the user: administrations and themes tags

 *****************************************************************************************************/

export function Meeting() {
	const [generate, setGenerate] = useState(false)
	const [currQuestion, setCurrQuestion] = useState("")
	const [context, setContext] = useState({
		administrations: [],
		themes: [],
	})
	const dispatch = useDispatch()

	useEffect(() => {
		if (!generate) {
			emitCloseStream()
			dispatch({ type: "RESET_USER" })
		}
	}, [generate])

	return (
		<>
			{!generate ? (
				<MeetingSettings
					setGenerate={setGenerate}
					currQuestion={currQuestion}
					setCurrQuestion={setCurrQuestion}
					context={context}
					setContext={setContext}
				/>
			) : (
				<MeetingPage currQuestion={currQuestion} setGenerate={setGenerate} archive={false} />
			)}
		</>
	)
}
