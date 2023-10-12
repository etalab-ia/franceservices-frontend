import { useState } from "react";
import { askingReason, primaryButtons, thankFeedback } from "../constants/feedback";
import { UserFeedbackButtons } from "./UserFeedbackButtons";

export function	UserFeedback(props) {

	const   { activeTab } = props;
	const	[isConfirmed, setIsConfirmed] = useState(false);
	
	return (
		<>
			{!isConfirmed ?
				<div>
					<p className="mt-4">{askingReason(primaryButtons[activeTab].name)}</p>
					<UserFeedbackButtons activeTab={activeTab} setIsConfirmed={setIsConfirmed}/>
				</div>
				:
				<div className="pt-6">{thankFeedback}</div>
			}	
		</>
	);
}