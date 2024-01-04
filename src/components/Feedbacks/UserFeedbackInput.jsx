import { askingQualityPrecisions, primaryButtons, secondaryButtons } from "../../constants/feedback"
import { UserFeedbackOptions } from "./UserFeedbackOptions"
// import { UserFeedbackThanks } from "./UserFeedbackThanks";
import { UserFeedbackResume } from "./UserFeedbackResume"
import { useSelector } from "react-redux"

export function UserFeedbackInput({ activeTab, isFirst }) {
	const buttons = isFirst ? primaryButtons : secondaryButtons
	const feedback = useSelector((state) => state.feedback)

	return (
		<>
			{!feedback.isConfirmed ? (
				<div>
					<p className="mt-4">{askingQualityPrecisions(buttons[activeTab].type)}</p>
					<UserFeedbackOptions activeTab={activeTab} isFirst={isFirst} />
				</div>
			) : (
				<div>
					<UserFeedbackResume />
					{/* <UserFeedbackThanks /> */}
				</div>
			)}
		</>
	)
}
