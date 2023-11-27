import { UserFeedbackSatisfaction } from "./UserFeedbackSatisfaction";
import { UserFeedbackInput } from "./UserFeedbackInput";
import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";
import { GlobalColContainer } from "../Global/GlobalColContainer";

export function	Feedback({ isFirst, isArchive }) {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);

	return (
		<GlobalColContainer>
			<div className="fr-ml-10w">
				<UserFeedbackSatisfaction
					isFirst={isFirst}
					isConfirmed={feedback.isConfirmed}
					isArchive={isArchive}
				/>
				{user.choices.feedback !== NOT_SET && <UserFeedbackInput
					activeTab={user.choices.feedback}
					isFirst={isFirst}
					isArchive={isArchive}
				/>}
			</div>
		</GlobalColContainer>
	);
}