import { UserFeedbackSatisfaction } from "./UserFeedbackSatisfaction"
import { UserFeedbackInput } from "./UserFeedbackInput"
import { NOT_SET } from "../../constants/status"
import { useSelector } from "react-redux"
import { GlobalColContainer } from "../Global/GlobalColContainer"

export function Feedback({ isFirst, feedback, setFeedback }) {
	const user = useSelector((state) => state.user)

	return (
		<GlobalColContainer>
			<div className="fr-ml-10w">
				<UserFeedbackSatisfaction isFirst={isFirst} feedback={feedback} setFeedback={setFeedback}/>
				{feedback.isGood !== undefined && (
					<UserFeedbackInput isFirst={isFirst} feedback={feedback} setFeedback={setFeedback}/>
				)}
			</div>
		</GlobalColContainer>
	)
}
