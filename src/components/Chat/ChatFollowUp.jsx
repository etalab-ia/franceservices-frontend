import { UserExperience } from "../Feedbacks/UserExperience";
import { NOT_SET } from "../../constants/status";
import { DisplayStream } from "../Stream/DisplayStream";
import { NewQuestion } from "./NewQuestion";
import { useSelector } from "react-redux";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { AvatarToolsContainer } from "./AvatarToolsContainer";

export function ChatFollowUp({ stream, tabs, archive }) {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	conditionDiv = ((stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0) || archive != NOT_SET;
	const	userExperienceCondition = !stream.isStreaming && archive === -1;
	const	newQuestionCondition = !stream.isStreaming && user.choices.feedback !== NOT_SET && feedback.isConfirmed && archive === -1;

	return (
		<>
			{conditionDiv && (
				<div>
					<GlobalRowContainer extraClass='fr-grid-row--center'>
						<AvatarToolsContainer archive={archive}/>
						<DisplayStream
							stream={stream}
							tabs={tabs}
							archive={archive}
						/>
					</GlobalRowContainer>
					{userExperienceCondition && <UserExperience
						isArchive={archive !== NOT_SET}
					/>}
					{/* {newQuestionCondition && <NewQuestion />} */}
				</div>
			)}
		</>
	);
}