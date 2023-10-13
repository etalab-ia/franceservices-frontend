import { useState } from "react";
import { UserSatisfaction } from "./UserSatisfaction";
import { UserFeedback } from "./UserFeedback";
import { NOT_SET } from "../../constants/status";

export function	Feedback() {

	const	[activeTab, setActiveTab] = useState(NOT_SET);

	return (
		<div className="user-feedback-container">
			<UserSatisfaction activeTab={activeTab} setActiveTab={setActiveTab}/>
			{activeTab !== -1 && <UserFeedback activeTab={activeTab}/>}
		</div>
	);
}