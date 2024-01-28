import { UserFeedbackSatisfaction } from "./UserFeedbackSatisfaction"
import { UserFeedbackInput } from "./UserFeedbackInput"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { useEffect } from "react"
import { InitialFeedback } from "../../utils/feedback"

export function Feedback({ isFirst, feedback, setFeedback }) {
	useEffect(() => {
		setFeedback(InitialFeedback)
	}, [])

	return (
		<GlobalColContainer>
			<div className="fr-ml-10w">
				<UserFeedbackSatisfaction isFirst={isFirst} feedback={feedback} setFeedback={setFeedback} />
				{feedback.isGood !== undefined && (
					<UserFeedbackInput isFirst={isFirst} feedback={feedback} setFeedback={setFeedback} />
				)}
			</div>
		</GlobalColContainer>
	)
}
