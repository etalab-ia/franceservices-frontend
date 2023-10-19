import { useState } from "react";
import { redoUserQuestion } from "../../constants/chatbotProps";
import { BotQuestion } from "../Global/BotQuestion";
import { Avatar } from "./Avatar";
import { NOT_SET } from "../../constants/status";
import { NotifyArchiving } from "../Archive/NotifyArchiving";

export function NewQuestion() {
	const	[display, setDisplay] = useState(NOT_SET);

	return (
		<div className="col-message">
			<div className="row-message ml-[114px]">
				<Avatar user='agent' />
				<p className="flex items-center ml-4">{redoUserQuestion}</p>
			</div>
			<BotQuestion setDisplay={setDisplay}/>
			{display !== -1 && <NotifyArchiving />}
		</div>
	);
}