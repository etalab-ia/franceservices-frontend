import { UserExperience } from "../Feedbacks/UserExperience"
import { DisplayStream } from "../Stream/DisplayStream"
import { NewQuestion } from "./NewQuestion"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { AvatarToolsContainer } from "./AvatarToolsContainer"
import { useState } from "react"
import { Feedback, InitialFeedback } from "../../utils/feedback";

export function ChatFollowUp({ stream, tabs }) {
	const [feedback, setFeedback] = useState<Feedback>(InitialFeedback)
	const conditionDiv =
		(stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0
	// const newQuestionCondition = !stream.isStreaming && feedback.isConfirmed

	return (
		<>
			{conditionDiv && (
				<div>
					<GlobalRowContainer extraClass="fr-grid-row--center">
						<AvatarToolsContainer />
						<DisplayStream stream={stream} tabs={tabs} />
					</GlobalRowContainer>
					{!stream.isStreaming && <UserExperience feedback={feedback} setFeedback={setFeedback}/>}
					{/* {newQuestionCondition && <NewQuestion />} */}
				</div>
			)}
		</>
	)
}
