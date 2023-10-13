import { useState } from "react";
import { askingReason, primaryButtons, thankFeedback } from "../../constants/feedback";
import { UserFeedbackOptions } from "./UserFeedbackOptions";
import { UserFeedbackThanks } from "./UserFeedbackThanks";
import { UserFeedbackResume } from "./UserFeedbackResume";

export function	UserFeedbackInput(props) {

	const   { activeTab, isConfirmed, setIsConfirmed } = props;
	
	return (
		<>
			{!isConfirmed ?
				<div>
					<p className="mt-4">{askingReason(primaryButtons[activeTab].type)}</p>
					<UserFeedbackOptions activeTab={activeTab} setIsConfirmed={setIsConfirmed}/>
				</div>
				:
				<div>
					<UserFeedbackResume />
					<UserFeedbackThanks />
				</div>
			}	
		</>
	);
}