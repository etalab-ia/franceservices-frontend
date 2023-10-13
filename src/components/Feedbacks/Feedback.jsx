import { useState } from "react";
import { UserFeedbackSatisfaction } from "./UserFeedbackSatisfaction";
import { UserFeedbackInput } from "./UserFeedbackInput";
import { NOT_SET } from "../../constants/status";

export function	Feedback() {

	const	[activeTab, setActiveTab] = useState(NOT_SET);
	const	[isConfirmed, setIsConfirmed] = useState(false);

	return (
		<div className="user-feedback-container">
			<UserFeedbackSatisfaction activeTab={activeTab} setActiveTab={setActiveTab} isConfirmed={isConfirmed}/>
			{activeTab !== -1 && <UserFeedbackInput activeTab={activeTab} isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed}/>}
		</div>
	);
}