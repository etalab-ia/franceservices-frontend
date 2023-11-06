import { UserFeedbackSatisfaction } from "./UserFeedbackSatisfaction";
import { UserFeedbackInput } from "./UserFeedbackInput";
import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";

export function	Feedback({ isFirst, isArchive }) {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);

	return (
		<div className="user-feedback-container">
			<UserFeedbackSatisfaction isFirst={isFirst} isConfirmed={feedback.isConfirmed} isArchive={isArchive}/>
			{user.choices.feedback !== NOT_SET && <UserFeedbackInput activeTab={user.choices.feedback} isFirst={isFirst} isArchive={isArchive}/>}
		</div>
	);
}