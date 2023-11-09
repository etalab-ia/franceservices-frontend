import { Avatar } from "./Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { UserExperience } from "../Feedbacks/UserExperience";
import { Sheets } from "../Sheets/Sheets";
import { NOT_SET } from "../../constants/status";
import { DisplayStream } from "../Stream/DisplayStream";
import { NewQuestion } from "./NewQuestion";
import { useSelector } from "react-redux";

export function ChatFollowUp({ stream, tabs, archive }) {
	const	user = useSelector((state) => state.user);
	const	conditionDiv = ((stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0) || archive != NOT_SET;
	const	sheetsCondition = ((!stream.isStreaming && user.choices.ressources !== NOT_SET) || archive !== NOT_SET);
	const	userExperienceCondition = !stream.isStreaming && user.choices.sheets !== NOT_SET;
	const	newQuestionCondition = !stream.isStreaming && user.choices.feedback !== NOT_SET;

	return (
		<>
			{conditionDiv && (
				<div>
					<div className="streaming-container">
						<UserChatTools />
						<Avatar user="agent" />
						<DisplayStream stream={stream} tabs={tabs} archive={archive}/>
					</div>
					{sheetsCondition && <Sheets archive={archive}/>}
					{userExperienceCondition && <UserExperience isArchive={archive !== NOT_SET}/>}
					{newQuestionCondition && <NewQuestion />}
				</div>
			)}
		</>
	);
}