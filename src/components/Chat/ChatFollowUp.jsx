import { Avatar } from "./Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { UserExperience } from "../Feedbacks/UserExperience";
import { Sheets } from "../Sheets/Sheets";
import { NOT_SET } from "../../constants/status";
import { DisplayStream } from "../Stream/DisplayStream";
import { NewQuestion } from "./NewQuestion";
import { useSelector } from "react-redux";

export function ChatFollowUp({ stream, tabs }) {
	const	conditionDiv = (stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0;
	const	user = useSelector((state) => state.user);

	console.log('user: ', user);
	
	return (
		<>
			{conditionDiv && (
				<div>
					<div className="streaming-container">
						<UserChatTools />
						<Avatar user="agent" />
						<DisplayStream />
					</div>
					{!stream.isStreaming && user.choices.ressources !== NOT_SET && <Sheets />}
					{!stream.isStreaming && user.choices.sheets !== NOT_SET && <UserExperience />}
					{!stream.isStreaming && user.choices.feedback !== NOT_SET && <NewQuestion />}
				</div>
			)}
		</>
	);
}