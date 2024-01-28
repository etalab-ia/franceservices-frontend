import { UserExperience } from "../Feedbacks/UserExperience"
import { DisplayStream } from "../Stream/DisplayStream"
// import { NewQuestion } from "./NewQuestion"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { AvatarToolsContainer } from "./AvatarToolsContainer"
import { useState } from "react"
import { Feedback, InitialFeedback } from "../../utils/feedback"

export function ChatFollowUp({ stream }) {
	const [feedback, setFeedback] = useState<Feedback>(InitialFeedback)
	const conditionDiv = stream.response.length !== 0 || stream.historyStream.length !== 0
	// const newQuestionCondition = !stream.isStreaming && feedback.isConfirmed

	return (
		<>
			{conditionDiv && (
				<div>
					<GlobalRowContainer extraClass="fr-grid-row--center">
						// @ts-expect-error TS(2741): Property 'archive' is missing in type '{}' but req...
						Remove this comment to see the full error message // @ts-expect-error TS(2741) FIXME:
						Property 'archive' is missing in type '{}' but req... Remove this comment to see the
						full error message // @ts-expect-error TS(2741): Property 'archive' is missing in type '
						{}' but req... Remove this comment to see the full error message
						<AvatarToolsContainer />
						<DisplayStream stream={stream} />
					</GlobalRowContainer>
					{!stream.isStreaming && <UserExperience feedback={feedback} setFeedback={setFeedback} />}
					{/* {newQuestionCondition && <NewQuestion />} */}
				</div>
			)}
		</>
	)
}
