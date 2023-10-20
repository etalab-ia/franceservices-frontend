import { Avatar } from "./Avatar";
import { useState } from "react";
import { UserChatTools } from "../User/UserChatTools";
import { UserExperience } from "../Feedbacks/UserExperience";
import { Sheets } from "../Sheets/Sheets";
import { NOT_SET } from "../../constants/status";
import { DisplayStream } from "../Stream/DisplayStream";
import { NewQuestion } from "./NewQuestion";

export function ChatFollowUp({ stream, tabs }) {
	const	conditionDiv = (stream.response.length !== 0 || stream.historyStream.length !== 0) && tabs.activeTab === 0;
	const   [display, setDisplay] = useState(NOT_SET);

	console.log(tabs.activeTab)

	return (
		<>
			{conditionDiv && (
				<div>
					<div className="streaming-container">
						<UserChatTools />
						<Avatar user="agent" />
						<DisplayStream setDisplay={setDisplay}/>
					</div>
					{!stream.isStreaming && display && <Sheets display={display} setDisplay={setDisplay}/>}
					{!stream.isStreaming && !display && <UserExperience />}
					{!stream.isStreaming && <NewQuestion tabs={tabs}/>}
				</div>
			)}
		</>
	);
}