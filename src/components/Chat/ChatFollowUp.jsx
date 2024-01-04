import { UserExperience } from "../Feedbacks/UserExperience"
import { NOT_SET } from "../../constants/status"
import { DisplayStream } from "../Stream/DisplayStream"
import { NewQuestion } from "./NewQuestion"
import { useSelector } from "react-redux"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { AvatarToolsContainer } from "./AvatarToolsContainer"

export function ChatFollowUp({ stream, tabs }) {
	const user = useSelector((state) => state.user)
	const feedback = useSelector((state) => state.feedback)
	const conditionDiv =
		(stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0
	const newQuestionCondition =
		!stream.isStreaming && user.choices.feedback !== NOT_SET && feedback.isConfirmed

	return (
		<>
			{conditionDiv && (
				<div>
					<GlobalRowContainer extraClass="fr-grid-row--center">
						<AvatarToolsContainer />
						<DisplayStream stream={stream} tabs={tabs} />
					</GlobalRowContainer>
					{!stream.isStreaming && <UserExperience />}
					{newQuestionCondition && <NewQuestion />}
				</div>
			)}
		</>
	)
}
