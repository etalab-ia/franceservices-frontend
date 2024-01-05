import { askingQualityPrecisions, primaryButtons, secondaryButtons } from "../../constants/feedback"
import { UserFeedbackOptions } from "./UserFeedbackOptions"
// import { UserFeedbackThanks } from "./UserFeedbackThanks";
import { UserFeedbackResume } from "./UserFeedbackResume"

export function UserFeedbackInput({ isFirst, feedback, setFeedback }) {
	const buttons = isFirst ? primaryButtons : secondaryButtons
	const activeTab = feedback.isGood

	return (
		<>
			{!feedback.isConfirmed ? (
				<div>
					<p className="mt-4">{askingQualityPrecisions(buttons[activeTab].type)}</p>
					<UserFeedbackOptions activeTab={activeTab} isFirst={isFirst} feedback={feedback} setFeedback={setFeedback}/>
				</div>
			) : (
				<div>
					<UserFeedbackResume feedback={feedback}/>
					{/* <UserFeedbackThanks /> */}
				</div>
			)}
		</>
	)
}
